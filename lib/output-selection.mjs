import { outputTopics, retiredOutputTopic } from "../content/output-topics.js";
import { beijingDate } from "./editorial-schema.mjs";

const legacyTopics = { image: "images", video: "video" };

function fromEditorial(story, today) {
  if (!story.evidence || !story.boundary || !story.sources?.length ||
      story.published > today || /[？?]/.test(story.title)) return null;

  const topic = story.output ?? legacyTopics[story.category];
  const { type, url, poster, description } = story.evidence;
  const item = {
    id: story.id,
    topic,
    product: story.tag,
    title: story.title,
    summary: story.summary,
    limit: story.boundary,
    date: story.published,
    source: story.sources[0],
    caption: description,
  };
  if (type === "image") item.images = [{ src: url, alt: description }];
  if (type === "video") item.video = { src: url, poster, label: description };
  if (type === "audio") item.audio = { src: url, label: description };
  return item;
}

export function groupOutputs(curated, edition, archived = [], now = new Date()) {
  const today = beijingDate(now);
  const selected = new Map();
  const idSet = new Set();
  const recentItems = edition.map(story => fromEditorial(story, today)).filter(Boolean);
  const archiveItems = archived.map(story => fromEditorial(story, today)).filter(Boolean);
  const recent = new Set(recentItems);
  const active = new Set();
  const latestFirst = (a, b) => (b.date ?? "").localeCompare(a.date ?? "");
  for (const candidate of [...curated, ...recentItems.sort(latestFirst), ...archiveItems.sort(latestFirst)]) {
    if (!candidate) continue;
    const retired = retiredOutputTopic(candidate.topic);
    const item = retired ? { ...candidate, topic: retired.slug, section: candidate.section ?? retired.section } : candidate;
    if (!outputTopics.some(topic => topic.slug === item.topic)) continue;
    if (idSet.has(item.id)) continue;
    const page = new URL(item.source.url);
    // Comparisons and layer demos can cite different originals on one project page.
    if (!item.comparison && !item.artwork) page.hash = "";
    for (const key of [...page.searchParams.keys()]) {
      if (key.startsWith("utm_") || key === "gclid" || key === "fbclid") page.searchParams.delete(key);
    }
    page.searchParams.sort();
    if (selected.has(page.href)) continue;
    selected.set(page.href, item);
    idSet.add(item.id);
    if (recent.has(candidate)) active.add(item);
  }
  const result = [...selected.values()];
  return outputTopics.map(topic => {
    const [first, ...rest] = result.filter(item => item.topic === topic.slug);
    return { ...topic, items: first ? [first, ...rest.filter(item => active.has(item)), ...rest.filter(item => !active.has(item))] : [] };
  });
}
