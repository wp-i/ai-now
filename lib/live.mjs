const DAY = 86_400_000;
const MAX_FEED_BYTES = 1_600_000;
const FETCH_TIMEOUT_MS = 4500;

const SOURCES = [
  {
    id: 'gemini-news', label: 'Google 官方博客', url: 'https://blog.google/products-and-platforms/products/gemini/',
    endpoint: 'https://blog.google/products-and-platforms/products/gemini/rss/', parse: parseNews, type: 'xml',
  },
  {
    id: 'openai-news', label: 'OpenAI 官方公告', url: 'https://openai.com/news/',
    endpoint: 'https://openai.com/news/rss.xml', parse: parseNews, type: 'xml',
  },
  {
    id: 'openai-status', label: 'OpenAI 服务状态', url: 'https://status.openai.com/',
    endpoint: 'https://status.openai.com/api/v2/incidents.json', parse: parseStatusJson, type: 'json',
  },
  {
    id: 'deepseek-status', label: 'DeepSeek 服务状态', url: 'https://status.deepseek.com/',
    endpoint: 'https://status.deepseek.com/feed.atom', parse: parseDeepSeekStatus, type: 'xml',
  },
  {
    id: 'claude-status', label: 'Claude 服务状态', url: 'https://status.claude.com/',
    endpoint: 'https://status.claude.com/api/v2/incidents.json', parse: parseStatusJson, type: 'json',
  },
];

const INCIDENT_STATES = {
  investigating: '官方正在排查。',
  identified: '官方已定位问题，正在处理。',
  monitoring: '官方已实施修复，正在观察恢复情况。',
  resolved: '官方已标记为恢复。',
  postmortem: '官方已标记为恢复，并公布了事后报告。',
};

const XML_ENTITIES = {amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', ndash: '–', mdash: '—'};
const LOCAL_TITLES = {
  'Elevated errors affecting the Microsoft 365 connector': 'Microsoft 365 连接器错误增多',
  'Get quick answers from Gemini on any website.': '在 Chrome 里用 Gemini 就当前网页提问',
  'Talk it through with Gemini, now on Apple CarPlay': 'Gemini Live 开始向 Apple CarPlay 推送',
};

function decodeEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (reference, entity) => {
    if (entity[0] !== '#') return XML_ENTITIES[entity] ?? reference;
    const isHex = entity[1].toLowerCase() === 'x';
    const codePoint = Number.parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
    if (codePoint < 32 || codePoint > 0x10ffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)) return ' ';
    return String.fromCodePoint(codePoint);
  });
}

function xmlText(value) {
  const decoded = decodeEntities(value.trim().replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, '$1'));
  return decodeEntities(decoded.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function elements(xml, tag) {
  const pattern = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'gi');
  return Array.from(xml.matchAll(pattern), match => match[1]);
}

function field(xml, tag) {
  return xmlText(elements(xml, tag)[0] ?? '');
}

function dateOf(value) {
  if (typeof value !== 'string' || value.length > 80 || !/(Z|GMT|[+-]\d{2}:?\d{2})$/i.test(value)) return null;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : null;
}

function officialUrl(value, source, pathPattern) {
  try {
    const url = new URL(value);
    if (url.origin !== new URL(source.url).origin || url.username || url.password || !pathPattern.test(url.pathname)) return null;
    url.search = '';
    url.hash = '';
    return url.href;
  } catch {
    return null;
  }
}

function buildItem(source, {id, url, date, title, category, summary, kind = 'update'}) {
  return {
    id: `${source.id}:${id}`, category, title: (LOCAL_TITLES[title] ?? title).slice(0, 180), summary,
    source: {label: source.label, url}, publishedAt: date.toISOString(), kind,
  };
}

function newsCategory(source, title, path, categories) {
  const slug = path.split('/').filter(Boolean).at(-1);
  const subject = `${title} ${slug}`;
  if (/benchmark|system.card|cyber|research.preview|aws.marketplace|govcloud|api.only|security.report|^how to|^\d+ examples/i.test(subject)) return null;
  const isProduct = categories.has('Product');
  const isGeminiApp = categories.has('Gemini App') || categories.has('Gemini');
  const isGeminiModel = categories.has('Gemini models');
  if (source.id === 'openai-news' && (!isProduct || !/\b(?:ChatGPT|Images|Sora|Codex|GPT[-‑–])/i.test(title))) return null;
  if (source.id === 'gemini-news') {
    if (categories.has('Developer tools') || (!isGeminiApp && !isGeminiModel)) return null;
    if (!/(?:\/gemini-app\/|\/products\/gemini\/|\/gemini-models\/)/i.test(path)) return null;
  }
  if (/\b(?:image|images|banana)\b/i.test(subject)) return 'image';
  if (/\b(?:video|videos|veo|sora)\b/i.test(subject)) return 'video';
  if (/\b(?:documents?|files|codex|businesses|agents?|notebook|spreadsheets|slides|apps)\b/i.test(subject)) return 'work';
  return 'chat';
}

function parseNews(raw, source, now) {
  if (!/<rss\b/i.test(raw) || !/<channel\b/i.test(raw) || !/<\/rss>\s*$/i.test(raw)) throw new Error('Invalid RSS');
  const items = elements(raw, 'item');
  if (/<item\b/i.test(raw) && items.length === 0) throw new Error('Invalid RSS items');
  const results = [];
  let parsed = 0;
  for (const entry of items.slice(0, 180)) {
    const pathPattern = source.id === 'openai-news' ? /^\/index\/[\w-]+\/?$/ : /^\/(?:innovation-and-ai|products-and-platforms)\/.+\/$/;
    const url = officialUrl(field(entry, 'link'), source, pathPattern);
    const date = dateOf(field(entry, 'pubDate'));
    const title = field(entry, 'title');
    if (!url || !date || !title) continue;
    parsed++;
    if (now - date > 14 * DAY || date - now > 60_000) continue;
    const path = new URL(url).pathname;
    const category = newsCategory(source, title, path, new Set(elements(entry, 'category').map(xmlText)));
    if (!category) continue;
    results.push(buildItem(source, {
      id: path.replace(/\/$/, ''), url, date, title, category,
      summary: '官方发布。使用入口、套餐、地区和推送范围见原文。',
    }));
  }
  if (items.length && parsed === 0) throw new Error('No readable RSS items');
  return results;
}

function incidentKind(state) {
  return state === 'resolved' || state === 'postmortem' ? 'resolved' : 'incident';
}

function withinIncidentWindow(date, now, kind) {
  return date && date - now <= 60_000 && (kind === 'incident' || now - date <= 7 * DAY);
}

function parseStatusJson(raw, source, now) {
  const data = JSON.parse(raw);
  if (!Array.isArray(data?.incidents) || !officialUrl(data.page?.url, source, /^\/$/)) throw new Error('Invalid incident JSON');
  const items = [];
  let parsed = 0;
  for (const incident of data.incidents.slice(0, 100)) {
    if (typeof incident?.id !== 'string' || !/^[a-z\d]{8,40}$/i.test(incident.id) || typeof incident.name !== 'string') continue;
    const title = incident.name.replace(/\s+/g, ' ').trim();
    const state = incident.status;
    if (!title || typeof state !== 'string' || !dateOf(incident.created_at)) continue;
    parsed++;
    if (!Object.hasOwn(INCIDENT_STATES, state)) continue;
    const kind = incidentKind(state);
    const date = dateOf(kind === 'resolved' ? incident.resolved_at : incident.updated_at) ?? dateOf(incident.updated_at) ?? dateOf(incident.created_at);
    if (!withinIncidentWindow(date, now, kind)) continue;
    const components = Array.isArray(incident.components) ? incident.components.slice(0, 30).map(component => component?.name ?? '').join(' ') : '';
    const isImageApi = /\bGPT[-‑–]image\b/i.test(title);
    const isImage = isImageApi || /\bimage (?:generation|editing)\b/i.test(title);
    const isWork = /\b(?:workspace agents?|codex|cowork|connectors?)\b/i.test(title);
    const affectsClaude = source.id === 'claude-status' && /claude\.ai|claude code|claude cowork/i.test(components);
    if (!isImage && !isWork && !affectsClaude && !/\b(?:ChatGPT|Sora)\b/i.test(title)) continue;
    if (/\b(?:costs? API|payments?|mastercards?|webhooks?)\b/i.test(title)) continue;
    if (kind === 'resolved' && incident.impact === 'none' && !/outage|unavailable/i.test(title)) continue;
    items.push(buildItem(source, {
      id: incident.id, url: new URL(`/incidents/${incident.id}`, source.url).href, date, title,
      category: isImage ? 'image' : isWork ? 'work' : 'service', kind,
      summary: (isImageApi ? '涉及图像 API。' : '') + INCIDENT_STATES[state],
    }));
  }
  if (data.incidents.length && parsed === 0) throw new Error('No readable incidents');
  return items;
}

function parseDeepSeekStatus(raw, source, now) {
  if (!/<feed\b/i.test(raw) || !/<\/feed>\s*$/i.test(raw) || field(raw, 'title') !== 'DeepSeek') throw new Error('Invalid DeepSeek Atom');
  const entries = elements(raw, 'entry');
  if (/<entry\b/i.test(raw) && entries.length === 0) throw new Error('Invalid Atom entries');
  const items = [];
  let parsed = 0;
  for (const entry of entries.slice(0, 100)) {
    const href = entry.match(/<link\b[^>]*\bhref="([^"]+)"[^>]*>/i)?.[1];
    const url = officialUrl(decodeEntities(href ?? ''), source, /^\/incidents\/\d+$/);
    const date = dateOf(field(entry, 'updated'));
    const title = field(entry, 'title').split(/（[\sa-z]/i)[0].trim();
    if (!url || !date || !title) continue;
    parsed++;
    const state = field(entry, 'summary').match(/\bStatus:\s*(\w+)/i)?.[1]?.toLowerCase();
    if (!Object.hasOwn(INCIDENT_STATES, state)) continue;
    const kind = incidentKind(state);
    if (!withinIncidentWindow(date, now, kind) || !/网页|对话|搜索|上传/.test(title)) continue;
    items.push(buildItem(source, {
      id: new URL(url).pathname.split('/').at(-1), url, date, title, category: 'service', kind,
      summary: INCIDENT_STATES[state],
    }));
  }
  if (entries.length && parsed === 0) throw new Error('No readable Atom entries');
  return items;
}

async function boundedBody(response) {
  if (Number(response.headers.get('content-length')) > MAX_FEED_BYTES || !response.body) throw new Error('Invalid feed length');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const chunks = [];
  let bytes = 0;
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_FEED_BYTES) {
        void reader.cancel().catch(() => {});
        throw new Error('Feed exceeds maximum length');
      }
      chunks.push(decoder.decode(value, {stream: true}));
    }
    return chunks.join('') + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

async function fetchSource(source, fetchImpl, now) {
  const response = await fetchImpl(source.endpoint, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS), redirect: 'manual',
    headers: {Accept: source.type === 'json' ? 'application/json' : 'application/rss+xml, application/atom+xml, text/xml, application/xml'},
  });
  if (!response.ok) throw new Error(`Feed returned HTTP ${response.status}`);
  if (!response.headers.get('content-type')?.includes(source.type)) throw new Error('Feed returned an unsupported content type');
  const age = Number(response.headers.get('age'));
  if (Number.isFinite(age) && age > 3_600) throw new Error('Feed response is stale');
  return source.parse(await boundedBody(response), source, now);
}

function sourceWarning(id, reason) {
  const detail = reason instanceof Error ? reason.message : 'Unknown feed error';
  console.warn(`[Live feed] ${id}: ${detail.replace(/https?:\/\/\S+/gi, '[url]').replace(/\s+/g, ' ').slice(0, 140)}`);
}

export async function getLiveFeed({fetchImpl = (url, options) => globalThis.fetch(url, options), now = new Date()} = {}) {
  const checkedAt = now.toISOString();
  const checks = await Promise.allSettled(SOURCES.map(source => fetchSource(source, fetchImpl, now)));
  const sources = SOURCES.map(({id, label, url}, index) => {
    const check = checks[index];
    const ok = check.status === 'fulfilled';
    if (!ok) sourceWarning(id, check.reason);
    return {id, label, url, status: ok ? 'ok' : 'unavailable', checkedAt: ok ? checkedAt : null};
  });
  const healthy = sources.filter(source => source.status === 'ok').length;
  const items = checks.flatMap(check => check.status === 'fulfilled' ? check.value : []);
  items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id));
  const unique = new Map();
  for (const item of items) {
    const key = item.source.url.replace(/\/$/, '');
    if (!unique.has(key)) unique.set(key, item);
  }
  return {
    checkedAt,
    status: healthy === SOURCES.length ? 'ok' : healthy ? 'partial' : 'unavailable',
    sources,
    items: Array.from(unique.values()).slice(0, 24),
  };
}
