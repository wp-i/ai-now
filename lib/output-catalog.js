import { imageShowcase } from "../content/showcase/images.js";
import { videoShowcase } from "../content/showcase/video.js";
import { audioShowcase } from "../content/showcase/audio.js";
import { gameShowcase } from "../content/showcase/games.js";
import { webShowcase } from "../content/showcase/web.js";
import { groupOutputs } from "./output-selection.mjs";

const curated = [
  ...imageShowcase,
  ...videoShowcase,
  ...audioShowcase,
  ...gameShowcase,
  ...webShowcase,
];

const homeSelection = {
  images: ["red-ice-handbag", "glass-pitcher-edit", "ice-gown"],
  video: ["redline", "enbu-opening"],
  audio: ["suno-jealousy", "mula-chorus"],
  software: ["evensong", "red-scarf-game-asset"],
  creative: ["typed-page", "abyssal-garden"],
};

export async function readOutputTopics() {
  return groupOutputs(curated, []);
}

export async function readHomeTopics() {
  const topics = await readOutputTopics();
  return topics.map(topic => ({
    ...topic,
    homeItems: homeSelection[topic.slug]
      .map(id => topic.items.find(item => item.id === id))
      .filter(Boolean),
  }));
}
