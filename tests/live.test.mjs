import assert from 'node:assert/strict';
import test from 'node:test';
import {getLiveFeed} from '../lib/live.mjs';

const now = new Date('2026-11-13T04:00:00.000Z');
const gemini = 'https://blog.google/products-and-platforms/products/gemini/rss/';
const openai = 'https://openai.com/news/rss.xml';
const openaiStatus = 'https://status.openai.com/api/v2/incidents.json';
const claudeStatus = 'https://status.claude.com/api/v2/incidents.json';
const deepseek = 'https://status.deepseek.com/feed.atom';

function xml(body, headers = {}) {
  return new Response(body, {headers: {'content-type': 'application/xml', ...headers}});
}

function rss(items = '') {
  return xml(`<?xml version="1.0"?><rss version="2.0"><channel><title>News</title>${items}</channel></rss>`);
}

function announcement(title, url, categories, date = 'Thu, 12 Nov 2026 18:00:00 +0000') {
  return `<item><title><![CDATA[${title}]]></title><link>${url}</link><pubDate>${date}</pubDate>${categories.map(category => `<category>${category}</category>`).join('')}</item>`;
}

function status(url, incidents = []) {
  return Response.json({page: {url}, incidents});
}

function incident(overrides) {
  return {
    id: 'workspace123', name: 'Workspace Agent is unavailable', status: 'monitoring', impact: 'major',
    created_at: '2026-11-11T21:10:09Z', updated_at: '2026-11-13T01:00:00Z', ...overrides,
  };
}

function mockSources(overrides = {}) {
  const sources = {
    [gemini]: () => rss(),
    [openai]: () => rss(),
    [openaiStatus]: () => status('https://status.openai.com/'),
    [claudeStatus]: () => status('https://status.claude.com'),
    [deepseek]: () => xml('<feed xmlns="http://www.w3.org/2005/Atom"><title>DeepSeek</title></feed>'),
    ...overrides,
  };
  return async (url, options) => {
    assert.equal(options.redirect, 'manual');
    assert.ok(options.signal instanceof AbortSignal);
    return sources[url]();
  };
}

test('includes relevant product announcements, strips URL tracking, and deduplicates links', async () => {
  const hydrogen = 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/';
  const apps = 'https://blog.google/innovation-and-ai/products/gemini-app/edit-files/';
  const images = 'https://openai.com/index/introducing-images-2-6';
  const feed = await getLiveFeed({now, fetchImpl: mockSources({
    [gemini]: () => rss(
      announcement('Introducing Gemini 4 Hydrogen', `${hydrogen}?utm_source=rss`, ['Gemini models']) +
      announcement('Introducing Gemini 4 Hydrogen', hydrogen, ['Gemini models']) +
      announcement('Introducing the benchmark', hydrogen + 'benchmark/', ['Gemini models']) +
      announcement('Gemini 4 tools for developers', hydrogen + 'api/', ['Gemini models', 'Developer tools']) +
      announcement('Edit documents &amp; files', apps, ['Gemini App'], 'Thu, 12 Nov 2026 17:00:00 +0000') +
      announcement('Another new Gemini model', hydrogen + 'future/', ['Gemini models'], 'Fri, 13 Nov 2026 06:00:00 +0000') +
      announcement('An old Gemini release', hydrogen + 'old/', ['Gemini models'], 'Fri, 23 Oct 2026 18:00:00 +0000') +
      announcement('Introducing a new Gemini', 'https://not-google.invalid/news/override/', ['Gemini models'])
    ),
    [openai]: () => rss(
      announcement('Introducing Images 2.6', images, ['Product'], 'Wed, 04 Nov 2026 00:00:00 GMT') +
      announcement('Codex in business', 'https://openai.com/index/codex-customer-story', ['Company']) +
      announcement('Introducing GPT-6 Cyber', 'https://openai.com/index/introducing-gpt-6-cyber', ['Product'])
    ),
  })});
  assert.equal(feed.status, 'ok');
  assert.equal(feed.checkedAt, now.toISOString());
  assert.deepEqual(feed.items.map(item => [item.source.url, item.category]), [[hydrogen, 'chat'], [apps, 'work'], [images, 'image']]);
  assert.equal(feed.items[1].title, 'Edit documents & files');
  assert.ok(feed.sources.every(source => source.checkedAt === feed.checkedAt));
  assert.ok(feed.items.every(item => feed.sources.some(source => source.label === item.source.label)));
});

test('uses incident update and recovery times, and retains an older incident still active', async () => {
  const feed = await getLiveFeed({now, fetchImpl: mockSources({
    [openaiStatus]: () => status('https://status.openai.com/', [
      incident({}),
      incident({id: 'openaigptimage', name: 'GPT-image-2.6 High error rate', status: 'resolved', resolved_at: '2026-11-12T22:00:00Z'}),
      incident({id: 'oldincident', name: 'ChatGPT sign-in outage', status: 'identified', updated_at: '2026-11-02T02:00:00Z'}),
      incident({id: 'oldrecovery', name: 'ChatGPT sign-in outage', status: 'resolved', resolved_at: '2026-11-01T05:00:00Z'}),
      incident({id: 'unrelatedapi', name: 'Costs API errors'}),
      incident({id: 'scheduled11', name: 'Planned maintenance for ChatGPT', status: 'scheduled'}),
    ]),
    [deepseek]: () => xml(`<feed xmlns="http://www.w3.org/2005/Atom">
      <title>DeepSeek</title><entry><title>DeepSeek 网页/API 部分中断（DeepSeek Web/API Partially Unavailable）</title>
      <updated>2026-11-07T15:56:50+08:00</updated><link href="https://status.deepseek.com/incidents/7219383236287" rel="alternate"></link>
      <summary type="html">&lt;p&gt;&lt;strong&gt;Status:&lt;/strong&gt; resolved&lt;/p&gt;</summary></entry></feed>`),
  })});
  assert.deepEqual(feed.items.map(item => [item.id, item.kind, item.publishedAt]), [
    ['openai-status:workspace123', 'incident', '2026-11-13T01:00:00.000Z'],
    ['openai-status:openaigptimage', 'resolved', '2026-11-12T22:00:00.000Z'],
    ['deepseek-status:7219383236287', 'resolved', '2026-11-07T07:56:50.000Z'],
    ['openai-status:oldincident', 'incident', '2026-11-02T02:00:00.000Z'],
  ]);
  assert.match(feed.items[1].summary, /图像 API/);
  assert.equal(feed.items[2].title, 'DeepSeek 网页/API 部分中断');
});

test('distinguishes failures, cached upstream responses, and successful empty feeds', async () => {
  const feed = await getLiveFeed({now, fetchImpl: mockSources({
    [gemini]: () => xml('<rss><channel><item>broken</channel></rss>'),
    [openai]: () => xml('<rss><channel></channel></rss>', {age: '3601'}),
    [openaiStatus]: () => status('https://example.com/'),
    [deepseek]: () => xml('x'.repeat(1_600_001)),
  })});
  assert.equal(feed.status, 'partial');
  assert.equal(feed.sources.find(source => source.id === 'claude-status').checkedAt, now.toISOString());
  assert.ok(feed.sources.filter(source => source.id !== 'claude-status').every(source => source.status === 'unavailable' && source.checkedAt === null));
  assert.deepEqual(feed.items, []);

  const unavailable = await getLiveFeed({now, fetchImpl: async () => {throw new Error('Network unreachable');}});
  assert.equal(unavailable.status, 'unavailable');
  assert.ok(unavailable.sources.every(source => source.checkedAt === null));
});
