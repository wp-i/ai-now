import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import test from "node:test";
import { readOutputTopics } from "../lib/output-catalog.js";

function collectLocalFiles(value, files) {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) collectLocalFiles(child, files);
  } else if (typeof value === "string" && value.startsWith("/")) {
    for (const candidate of value.split(/,\s*(?=\/)/)) {
      const [path] = candidate.trim().split(/\s+/);
      files.add(path);
    }
  }
}

test("keeps the local media referenced by the public catalog and published editorial edition", async () => {
  // These two assets are also referenced from the live editorial store.
  const files = new Set([
    "/community/fastframes-lingbot.mp4",
    "/community/fastframes-lingbot.webp",
  ]);
  const topics = await readOutputTopics();
  collectLocalFiles(topics, files);
  await Promise.all([...files].map(async path => {
    const asset = await stat(new URL("../public" + path, import.meta.url));
    assert.ok(asset.isFile() && asset.size > 0, path);
  }));
});
