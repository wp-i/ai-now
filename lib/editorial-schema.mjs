import { z } from "zod";
import { outputTopics, retiredOutputTopics } from "../content/output-topics.js";

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const ms = Date.parse(value);
  return Number.isFinite(ms) && new Date(ms).toISOString().startsWith(value);
}, "Invalid date");
const text = z.string().trim().min(1);
const label = text.max(90);
const href = z.string().url().max(600).refine(url => new URL(url).protocol === "https:", "Use an HTTPS link");
const link = z.object({ label, url: href }).strict();
const evidence = z.discriminatedUnion("type", [
  z.object({ type: z.literal("image"), url: href, description: text.max(170) }).strict(),
  z.object({ type: z.literal("video"), url: href, poster: href, description: text.max(170) }).strict(),
  z.object({ type: z.literal("audio"), url: href, description: text.max(170) }).strict(),
]);
const sources = z.array(link).min(1).max(6).refine(list => new Set(list.map(item => item.url)).size === list.length, "Duplicate sources");
const id = z.string().max(70).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const category = z.enum(["chat", "image", "work", "video"]);
const area = z.enum(["cn", "global", "both"]);
const output = z.enum([...outputTopics.map(topic => topic.slug), ...Object.keys(retiredOutputTopics), "text"]);
const uniqueIds = list => new Set(list.map(item => item.id)).size === list.length;

export const storySchema = z.object({
  id, category, area, tag: text.max(42), title: label, summary: text.max(220),
  impact: text.max(320), access: text.max(320), published: date, sources,
  action: link.optional(), prompt: text.max(520).optional(), boundary: text.max(170).optional(), evidence: evidence.optional(),
  output: output.optional(), featured: z.boolean().optional(),
}).strict();

const toolSchema = z.object({
  id, category, area, brand: label, model: label, summary: text.max(200),
  price: z.enum(["free", "paid", "varies"]), priceLabel: text.max(50),
  limits: text.max(320), task: text.max(110), prompt: text.max(520), sources, action: link,
}).strict();

export const editionInput = z.object({
  edition: date,
  stories: z.array(storySchema).min(1).max(12).refine(uniqueIds, "Duplicate story IDs"),
  tools: z.array(toolSchema).min(4).max(24).refine(uniqueIds, "Duplicate tool IDs"),
}).strict().refine(value => value.stories.every(story => story.published <= value.edition), "A story is dated after this edition");

export const editionSchema = z.object({
  edition: date,
  checkedAt: z.string().datetime({ offset: true }),
  stories: z.array(storySchema).min(1).max(12).refine(uniqueIds, "Duplicate story IDs"),
  tools: z.array(toolSchema).min(4).max(24).refine(uniqueIds, "Duplicate tool IDs"),
}).strict();

export const archiveSchema = z.array(storySchema).max(90);
export const beijingDate = instant => new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Shanghai" }).format(instant);

export function mergeArchive(oldStories, archive, newStories) {
  const activeIds = new Set(newStories.map(story => story.id));
  const past = new Map();
  for (const story of [...oldStories, ...archive]) {
    if (!activeIds.has(story.id) && !past.has(story.id)) past.set(story.id, story);
  }
  return [...past.values()].sort((a, b) => b.published.localeCompare(a.published)).slice(0, 90);
}
