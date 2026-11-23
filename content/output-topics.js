export const outputTopics = [
  { slug: "images", name: "图像", description: "AI 生成的摄影风格图像、概念艺术与可拆分的透明素材。" },
  {
    slug: "video", name: "视频", description: "可在站内看原片的 AI 叙事、广告与剪辑成片。",
    sections: [
      { id: "generated-clips", name: "短片" },
      { id: "finished-edits", name: "剪辑成片" },
      { id: "scene-edits", name: "镜头编辑" },
    ],
  },
  {
    slug: "audio", name: "声音", description: "试听 AI 改编与演唱的音乐，以及逐个拆开的生成音效。",
    sections: [
      { id: "sound-design", name: "拟音与声音设计" },
      { id: "music", name: "作曲与编曲" },
    ],
  },
  {
    slug: "software", name: "游戏", description: "实机游戏原型，以及 AI 生成的资产如何用在关卡里。",
    sections: [
      { id: "game-production", name: "制作环节" },
      { id: "playable-games", name: "游戏实机" },
    ],
  },
  { slug: "creative", name: "网页创作", nav: "网页", description: "可以打字、游览或转看商品的 AI 网页原作。" },
];

export const retiredOutputTopics = {
  worlds: { slug: "creative", section: "abyssal-garden" },
  motion: { slug: "video", section: "generated-clips" },
  editing: { slug: "video", section: "finished-edits" },
  music: { slug: "audio", section: "music" },
  spatial: { slug: "software", section: "game-production" },
};

export const retiredOutputTopic = slug => Object.hasOwn(retiredOutputTopics, slug) ? retiredOutputTopics[slug] : undefined;
export const topicPath = slug => "/topics/" + slug;
