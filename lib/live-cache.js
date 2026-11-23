import { env } from "cloudflare:workers";
import { getLiveFeed } from "./live.mjs";
import { getCommunityDiscovery } from "./community-discovery.mjs";

const key = "live";
const successInterval = 5 * 60_000;
const retryInterval = 60_000;
const archiveLimit = 36 * 60 * 60_000;
let memory;
let inFlight;

async function readCachedFeed() {
  if (!env.DB) return memory;
  try {
    const row = await env.DB.prepare("SELECT payload, updated_at FROM site_snapshots WHERE key = ?").bind(key).first();
    if (row && (!memory || row.updated_at > memory.lastAttempt)) {
      memory = { lastAttempt: row.updated_at, data: JSON.parse(row.payload) };
    }
  } catch (error) {
    console.error("Live feed cache could not be read", error);
  }
  return memory;
}

function mergeUnavailableSources(fresh, previous, now) {
  const unavailable = new Set(fresh.sources.filter(source => source.status === "unavailable").map(source => source.label));
  const old = previous?.items.filter(item => unavailable.has(item.source.label) &&
    now - Date.parse(item.publishedAt) <= archiveLimit) ?? [];
  const items = new Map(fresh.items.map(item => [item.id, item]));
  for (const item of old) if (!items.has(item.id)) items.set(item.id, { ...item, stale: true });
  return {
    ...fresh,
    stale: old.length > 0,
    items: [...items.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 16),
  };
}

async function fetchAndStore(previous) {
  const now = new Date();
  const [fresh, community] = await Promise.all([getLiveFeed({ now }), getCommunityDiscovery(undefined, now)]);
  const data = { ...mergeUnavailableSources(fresh, previous, now.getTime()), community };
  memory = { lastAttempt: now.getTime(), data };
  if (env.DB) {
    try {
      await env.DB.prepare(
        "INSERT INTO site_snapshots (key, payload, updated_at, revision) VALUES (?, ?, ?, 1) " +
        "ON CONFLICT(key) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at WHERE excluded.updated_at > site_snapshots.updated_at"
      ).bind(key, JSON.stringify(data), now.getTime()).run();
    } catch (error) {
      console.error("Live feed cache could not be saved", error);
    }
  }
  return data;
}

export async function readLive({ force = false } = {}) {
  const cached = await readCachedFeed();
  const interval = !force && cached?.data.status === "ok" ? successInterval : retryInterval;
  if (cached?.data.community && Date.now() - cached.lastAttempt < interval) return cached.data;
  inFlight ??= fetchAndStore(cached?.data).finally(() => { inFlight = undefined; });
  return inFlight;
}
