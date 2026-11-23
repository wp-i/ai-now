import { env } from "cloudflare:workers";
import seed from "../content/editorial.json";
import { archiveSchema, beijingDate, editionInput, editionSchema, mergeArchive } from "./editorial-schema.mjs";

const key = "editorial";

export async function readEdition() {
  const fallback = { revision: 0, edition: seed, archived: [] };
  if (!env.DB) return fallback;
  try {
    const row = await env.DB.prepare("SELECT payload, revision FROM site_snapshots WHERE key = ?").bind(key).first();
    if (!row) return fallback;
    const snapshot = JSON.parse(row.payload);
    return { revision: row.revision, edition: editionSchema.parse(snapshot.edition), archived: archiveSchema.parse(snapshot.archived) };
  } catch (error) {
    console.error("Editorial data could not be read", error);
    return { ...fallback, storageUnavailable: true };
  }
}

export async function publishEdition(value, expectedRevision, now = new Date()) {
  if (!env.DB) throw new Error("编辑存储暂时不可用。");
  const draft = editionInput.parse(value);
  const current = await readEdition();
  if (current.storageUnavailable) throw new Error("编辑存储暂时不可用。");
  if (draft.edition < current.edition.edition || draft.edition > beijingDate(now)) {
    throw new Error("版次日期应在当前版次与北京时间今天之间。");
  }
  if (expectedRevision !== current.revision) throw new Error("版次已变更，请重新读取后合并。");

  const edition = { ...draft, checkedAt: now.toISOString() };
  const archived = mergeArchive(current.edition.stories, current.archived, edition.stories);
  const revision = current.revision + 1;
  const payload = JSON.stringify({ edition, archived });
  const result = current.revision === 0
    ? await env.DB.prepare("INSERT OR IGNORE INTO site_snapshots (key, payload, updated_at, revision) VALUES (?, ?, ?, ?)").bind(key, payload, now.getTime(), revision).run()
    : await env.DB.prepare("UPDATE site_snapshots SET payload = ?, updated_at = ?, revision = ? WHERE key = ? AND revision = ?").bind(payload, now.getTime(), revision, key, expectedRevision).run();
  if (result.meta.changes !== 1) throw new Error("版次已变更，请重新读取后合并。");
  return { revision, edition: edition.edition, checkedAt: edition.checkedAt, stories: edition.stories.length, tools: edition.tools.length };
}
