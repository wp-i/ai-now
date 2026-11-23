const DAY = 86_400_000;
const WATCH = [
  { repo: "ayanoby/hexanima", label: "手机离线图像处理" },
  { repo: "Comfy-Org/ComfyUI", label: "图像、视频与声音工作流" },
  { repo: "deepbeepmeep/WanGP", label: "本地视频与交互世界" },
];
const POST_SOURCES = [
  { repo: "Tencent-Hunyuan/Hy-Nomas", label: "交互视频的社区工作流" },
  { repo: "Lampodigital/fable-5-2-demos", label: "Claude Fable 的作者演示" },
];
const SEARCH_TERMS = [
  'site:x.com (playable OR "motion capture" OR "world model") (AI OR Claude OR ComfyUI)',
  'site:x.com (workflow OR "making of" OR "side by side") (AI video OR image generation OR AI music)',
  'site:facebook.com/reel ("made with" OR "making of" OR "before and after") (AI animation OR AI film OR AI music)',
  'site:facebook.com ("原片" OR "制作过程" OR "可试玩") (AI 影片 OR AI 作曲 OR AI 生成)',
  '("制作过程" OR "实测" OR "复现" OR "工作流") (生图 OR 视频 OR 配音 OR 机器人)',
  '("making of" OR workflow OR "side by side") (AI OR ComfyUI OR Claude OR robotics)',
];
const SHOW_HN = "https://hn.algolia.com/api/v1/search_by_date?tags=show_hn&query=AI&hitsPerPage=30";
const REPO_SEARCHES = [
  { repo: "GitHub · 交互世界", query: "webgpu claude in:description,readme" },
  { repo: "GitHub · 生成媒体", query: '("video generation" OR "motion capture" OR "music generation") in:name,description' },
];

function withinWindow(value, now) {
  const ms = Date.parse(value);
  return Number.isFinite(ms) && ms >= now - 14 * DAY && ms <= now;
}

function clean(text, limit = 160) {
  return text.replace(/https?:\/\/[^\s)\]<>]+/g, "").replace(/[#*_\x60\[\]]/g, "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function releaseCandidates(raw, repo, label, now) {
  const releases = JSON.parse(raw);
  if (!Array.isArray(releases)) throw new Error("Invalid GitHub release response");
  return releases.filter(release => !release?.draft && !release?.prerelease &&
    typeof release?.published_at === "string" && withinWindow(release.published_at, now) &&
    typeof release?.tag_name === "string" && typeof release?.body === "string" && release.body.trim()
  ).sort((a, b) => b.published_at.localeCompare(a.published_at)).slice(0, 2).map(release => ({
    platform: "GitHub", author: repo, topic: label,
    title: clean(release.name || release.tag_name, 90),
    url: "https://github.com/" + repo + "/releases/tag/" + encodeURIComponent(release.tag_name),
    publishedAt: new Date(release.published_at).toISOString(),
    note: clean(release.body, 220),
  }));
}

function creditedPosts(raw, repo, label, now) {
  const found = new Map();
  for (const line of raw.split(/\r?\n/)) {
    for (const match of line.matchAll(/https:\/\/(?:www\.)?(?:x|twitter)\.com\/([\w]{1,15})\/status\/(\d{15,20})(?!\d)/gi)) {
      const [, author, id] = match;
      if (found.has(id)) continue;
      const publishedAt = new Date(Number((BigInt(id) >> 22n) + 1_288_834_974_657n));
      if (!withinWindow(publishedAt, now)) continue;
      found.set(id, {
        platform: "X", author, topic: label, url: "https://x.com/" + author + "/status/" + id,
        publishedAt: publishedAt.toISOString(), discoveredIn: "https://github.com/" + repo,
        note: clean(line, 210),
      });
    }
  }
  return [...found.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 6);
}

function githubSearchURL(query, now) {
  const from = new Date(now.getTime() - 14 * DAY).toISOString().slice(0, 10);
  const params = new URLSearchParams({ q: query + " created:>=" + from + " stars:>=15", sort: "stars", order: "desc", per_page: "12" });
  return "https://api.github.com/search/repositories?" + params;
}

function projectCandidates(raw, label, now) {
  const { items } = JSON.parse(raw);
  if (!Array.isArray(items)) throw new Error("Invalid GitHub repository search response");
  return items.flatMap(repo => {
    if (!repo || repo.fork || repo.archived || typeof repo.description !== "string" ||
        typeof repo.name !== "string" || !/^[\w.-]+\/[\w.-]+$/.test(repo.full_name) ||
        !withinWindow(repo.created_at, now)) return [];
    return [{
      platform: "GitHub", author: repo.full_name.split("/")[0], topic: label,
      title: clean(repo.name, 90), url: "https://github.com/" + repo.full_name,
      publishedAt: new Date(repo.created_at).toISOString(), stars: repo.stargazers_count,
      note: clean(repo.description, 220),
    }];
  }).slice(0, 8);
}

function creatorShowcases(raw, now) {
  const { hits } = JSON.parse(raw);
  if (!Array.isArray(hits)) throw new Error("Invalid Show HN response");
  return hits.flatMap(hit => {
    if (typeof hit?.title !== "string" || typeof hit.author !== "string" ||
        !/^\d+$/.test(hit.objectID) || !withinWindow(hit.created_at, now)) return [];
    let url;
    try { url = new URL(hit.url); } catch { return []; }
    if (url.protocol !== "https:" || url.username || url.password) return [];
    if (!/\b(?:video|audio|music|speech|translat\w*|vision|robot\w*|imag\w*|animation|playable|world|game)\b/i.test(hit.title)) return [];
    return [{
      platform: "Show HN", author: hit.author, topic: "作者自荐",
      title: clean(hit.title.replace(/^Show HN:\s*/i, ""), 105),
      url: url.href, publishedAt: new Date(hit.created_at).toISOString(),
      discoveredIn: "https://news.ycombinator.com/item?id=" + hit.objectID,
    }];
  }).slice(0, 6);
}

async function fetchText(url, fetchImpl) {
  const accept = url.startsWith("https://api.github.com/") ? "application/vnd.github+json" : "*/*";
  const response = await fetchImpl(url, {
    headers: { Accept: accept, "User-Agent": "AI-application-discovery" },
    signal: AbortSignal.timeout(5_000), redirect: "manual",
  });
  if (!response.ok) throw new Error(`Community source returned HTTP ${response.status}`);
  if (Number(response.headers.get("content-length")) > 2_000_000) throw new Error("Community source response too large");
  if (!response.body) throw new Error("Community source response is empty");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let raw = "";
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return raw + decoder.decode();
      size += value.byteLength;
      if (size > 2_000_000) {
        void reader.cancel().catch(() => {});
        throw new Error("Community source response too large");
      }
      raw += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}

export async function getCommunityDiscovery(fetchImpl = (url, options) => globalThis.fetch(url, options), now = new Date()) {
  const sources = [
    ...WATCH.map(source => ({ ...source, kind: "releases" })),
    ...POST_SOURCES.map(source => ({ ...source, kind: "posts" })),
    ...REPO_SEARCHES.map(source => ({ ...source, kind: "projects" })),
    { repo: "Show HN", kind: "creator-posts" },
  ];
  const checks = await Promise.allSettled(sources.map(async ({ repo, label, kind, query }) => {
    if (kind === "creator-posts") return creatorShowcases(await fetchText(SHOW_HN, fetchImpl), now);
    if (kind === "projects") return projectCandidates(await fetchText(githubSearchURL(query, now), fetchImpl), repo, now);
    if (kind === "releases") {
      const raw = await fetchText("https://api.github.com/repos/" + repo + "/releases?per_page=4", fetchImpl);
      return releaseCandidates(raw, repo, label, now);
    }
    const raw = await fetchText("https://raw.githubusercontent.com/" + repo + "/main/README.md", fetchImpl);
    return creditedPosts(raw, repo, label, now);
  }));
  const entries = checks.flatMap(check => check.status === "fulfilled" ? check.value : []);
  const unique = [...new Map(entries.map(entry => [entry.url.toLowerCase(), entry])).values()]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const sourceStates = sources.map(({ repo, kind }, index) => {
    const check = checks[index];
    if (check.status === "fulfilled") return { repo, kind, status: "ok" };
    const detail = check.reason instanceof Error ? check.reason.message : "Unknown source error";
    console.warn(`[Community discovery] ${repo}: ${detail.replace(/https?:\/\/\S+/gi, "[url]").replace(/\s+/g, " ").slice(0, 140)}`);
    return { repo, kind, status: "unavailable" };
  });
  return {
    checkedAt: now.toISOString(),
    sources: sourceStates,
    candidates: unique,
    searchQueries: SEARCH_TERMS,
    editorialGuidance: "GitHub 新项目、版本、Show HN 和跟帖提到的作者原帖都是线索。每轮按 searchQueries 分别检查 X 和 Facebook 的公开原创作品。先看实际画面或听样本，核对作者、首次发布时间、输入、生成方式和限制。热度用于发现，只有原始产出本身有观看价值、且与站内内容不重复才发布。没有可信原帖或原始素材的候选跳过。",
  };
}
