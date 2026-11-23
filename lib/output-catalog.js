import { kodaOpening, noirTeaser } from "../content/creator-edits";
import { mulaCase, redlineCase, yueCase } from "../content/creative-cases";
import { listenToMeh } from "../content/frontier-films";
import { imageStories } from "../content/image-stories";
import {
  clockworkOrchard, cocktailLayer, desertCowboy, dumplingHands, glassPitcher, iceGown, redIceHandbag,
} from "../content/november-images";
import { evensong, jealousySong, movingTypography } from "../content/november-outputs";
import {
  abyssalGarden, astraPiano, pikaSetEdit, svgPeacock, typedPage, valsera,
} from "../content/frontier-showcase";
import { redScarfGameAsset } from "../content/game-components";
import { adobeForgeSoundscape, reversibleClothingRail } from "../content/pipeline-additions";
import { animeFight, shareAPeach } from "../content/reviewed-outputs";
import { saltlineCase } from "../content/community-cases";
import { groupOutputs } from "./output-selection.mjs";

const roadSnow = imageStories.find(item => item.id === "road-snow");

// Only works reviewed against content/showcase-review.md enter the public catalog.
const curated = [
  iceGown,
  clockworkOrchard,
  { ...roadSnow, role: "天气编辑" },
  glassPitcher,
  desertCowboy,
  dumplingHands,
  redIceHandbag,
  cocktailLayer,
  { ...redlineCase, section: "generated-clips", role: "赛车短片" },
  { ...animeFight, section: "generated-clips", role: "原创动作" },
  { ...shareAPeach, section: "generated-clips", role: "动作细节" },
  { ...listenToMeh, section: "generated-clips" },
  movingTypography,
  { ...kodaOpening, section: "finished-edits" },
  { ...noirTeaser, section: "finished-edits" },
  { ...pikaSetEdit, topic: "video", section: "scene-edits" },
  jealousySong,
  { ...mulaCase, topic: "audio", section: "music", role: "续写歌曲" },
  { ...astraPiano, topic: "audio", section: "music", role: "钢琴演奏" },
  { ...yueCase, topic: "audio", date: undefined, section: "music", role: "改编与演唱", feature: true },
  { ...adobeForgeSoundscape, section: "sound-design", role: "分轨音效", wide: true },
  evensong,
  { ...valsera, section: "playable-games", role: "角色扮演" },
  { ...redScarfGameAsset, section: "game-production", role: "关卡资产", feature: true },
  { ...saltlineCase, topic: "software", section: "playable-games", role: "射击关卡" },
  { ...typedPage, role: "互动网页" },
  { ...reversibleClothingRail, role: "商品交互组件" },
  { ...svgPeacock, role: "矢量插画" },
  { ...abyssalGarden, role: "可游览场景", feature: true },
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
