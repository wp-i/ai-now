import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { editionInput, editionSchema, mergeArchive, storySchema } from "../lib/editorial-schema.mjs";
import { groupOutputs } from "../lib/output-selection.mjs";

const seed = JSON.parse(await readFile(new URL("../content/editorial.json", import.meta.url), "utf8"));

test("initial editorial edition has valid entries and official HTTPS links", () => {
  const { checkedAt, ...input } = editionSchema.parse(seed);
  assert.equal(editionInput.safeParse(input).success, true);
  assert.equal(checkedAt.length >= 20, true);
  assert.deepEqual(new Set(seed.tools.map(tool => tool.category)), new Set(["chat", "image", "work", "video"]));
  assert.ok(seed.tools.some(tool => tool.area !== "global" && tool.price === "free"));
});

test("invalid entries cannot mark an edition as newly checked", () => {
  const { checkedAt, ...input } = seed;
  const story = { ...seed.stories[0] };
  assert.equal(editionInput.safeParse({ ...input, stories: [story, story] }).success, false);
  assert.equal(editionInput.safeParse({ ...input, stories: [{ ...story, published: "2099-01-01" }] }).success, false);
  assert.equal(editionInput.safeParse({ ...input, stories: [{ ...story, sources: [{ label: "Unsafe", url: "javascript:alert(1)" }] }] }).success, false);
});

test("reappearing stories leave the archive and previous items are kept once", () => {
  const [lead, second] = seed.stories;
  assert.deepEqual(mergeArchive([lead, second], [second], [lead]), [second]);
});

test("distinct comparison examples on one source guide remain visible", () => {
  const comparison = (id, anchor) => ({
    id, topic: "images",
    source: { url: "https://example.com/image-guide#" + anchor },
    comparison: { before: "/before.webp", after: "/" + id + ".webp" },
  });
  const selected = [
    comparison("outfit", "change-clothing"),
    comparison("snow", "change-weather"),
    comparison("repeated", "change-weather"),
  ];
  const images = groupOutputs(selected, []).find(topic => topic.slug === "images");
  assert.deepEqual(images.items.map(item => item.id), ["outfit", "snow"]);
});

test("selected outputs lead newer entries and archived text stays readable without a public topic", () => {
  const now = new Date("2026-11-13T18:00:00Z");
  const source = (path) => ({ label: "Original", url: "https://example.com/" + path });
  const story = (id, published, path = id, fields = {}) => storySchema.parse({
    ...seed.stories[0], id, category: "work", output: "audio", title: "Audio example",
    published, boundary: "Short English sample", sources: [source(path)],
    evidence: { type: "audio", url: "https://example.com/sample.mp3", description: "Short sample" },
    ...fields,
  });
  const featured = { id: "featured", topic: "audio", date: "2026-11-13", source: source("featured") };
  const newest = story("newest", "2026-11-14");
  const archived = story("archived", "2026-11-12", "archived", { featured: true });
  const active = [
    newest,
    story("same-source", "2026-11-14", "featured?utm_source=social#demo"),
    story("featured", "2026-11-14", "other-source"),
    story("guide-title", "2026-11-14", "guide", { title: "What can it do?" }),
    story("no-demo", "2026-11-14", "no-demo", { evidence: undefined }),
    story("legacy-model-update", "2026-11-14", "specs", { output: undefined }),
    story("future", "2026-11-15"),
    story("legacy-text", "2026-11-14", "text", { output: "text" }),
    story("legacy-motion", "2026-11-13", "motion", { output: "motion",
      evidence: { type: "video", poster: "https://example.com/motion.webp", url: "https://example.com/motion.mp4", description: "Motion sample" } }),
    story("legacy-video", "2026-11-14", "video", { output: undefined, category: "video",
      evidence: { type: "video", poster: "https://example.com/preview.webp", url: "https://example.com/sample.mp4", description: "Video sample" } }),
  ];
  const topics = groupOutputs([featured], active, [archived, newest], now);
  const ids = slug => topics.find(topic => topic.slug === slug).items.map(item => item.id);
  assert.deepEqual(ids("audio"), ["featured", "newest", "archived"]);
  assert.deepEqual(ids("video"), ["legacy-video", "legacy-motion"]);
  assert.equal(topics.find(topic => topic.slug === "video").items[1].section, "generated-clips");
  assert.ok(!topics.some(topic => topic.slug === "motion"));
  assert.ok(!topics.some(topic => topic.slug === "text"));
});
