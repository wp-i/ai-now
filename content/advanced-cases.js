import { audioProfiles } from "./audio-profiles";

export const breakfastCase = {
  id: "gr00t-breakfast",
  topic: "spatial",
  product: "NVIDIA GR00T 2",
  date: "2026-11-09",
  title: "双手机器人切香蕉、倒酸奶，再加麦片",
  summary: "两只五指手轮流拿刀、扶住碗和舀麦片。右上角的近景能看到手指如何调整握法。",
  limit: "团队用人佩戴外骨骼时做的动作来训练这项任务。这里播放的是机器人自主完成的一次实机演示。",
  source: { label: "NVIDIA · 人手示范与实机原片", url: "https://research.nvidia.com/labs/gear/gr00t-2/#dexumi" },
  video: { src: "/outputs/gr00t2-breakfast.mp4", poster: "/outputs/gr00t2-breakfast.webp",
    label: "GR00T 2 自主操作双手完成早餐准备的实机录像", duration: "1:15", muted: true },
};

export const yokaiCase = {
  id: "tripo-yokai",
  topic: "spatial",
  product: "Lunah · Tripo",
  date: "2026-11-18",
  title: "生成的三维角色和建筑，进了可漫游的街区",
  summary: "作者把生成的鸟居、灯笼、屋舍和妖怪组进同一个浏览器场景，人在街上可以转向和靠近角色。",
  limit: "作者在 Blender 里组装场景，并修正自动绑定和脚底滑动。原文展示独脚纸伞两次生成的差别。",
  source: { label: "作者制作记录与试玩", url: "https://www.tripo3d.ai/blog/build-ukiyo-e-yokai-3d-town-with-tripo-in-one-day" },
  video: { src: "/outputs/tripo-yokai.mp4", poster: "/outputs/tripo-yokai.webp",
    label: "作者发布的浮世绘风格街区漫游记录", duration: "0:08", aspect: "4 / 3", muted: true },
};

export const expressiveVoiceCase = {
  id: "eleven-v4-voice",
  topic: "audio",
  product: "Eleven v4",
  date: "2026-09-28",
  title: "合成语音能读出兴奋，也能打着哈欠说话",
  summary: "第一段兴奋地宣布新菜单。第二段像被叫醒的人，停下来打了个哈欠才接着说。",
  limit: "两段是厂商发布的英语短句，分别用了不同台词和语气提示。",
  source: { label: "ElevenLabs · 原声与语气提示", url: "https://elevenlabs.io/blog/eleven-v4#a-new-architecture-built-for-performance" },
  tracks: [
    { src: "/outputs/eleven-v4-excited.mp3", label: "兴奋 · 宣布新菜单", ...audioProfiles["eleven-v4-excited"] },
    { src: "/outputs/eleven-v4-drowsy.mp3", label: "困倦 · 哈欠后接着说", ...audioProfiles["eleven-v4-drowsy"] },
  ],
};

export const scoreToSongCase = {
  id: "yue-score-to-song",
  topic: "music",
  product: "YuE2 · Nu-Disco",
  date: "2026-09-13",
  title: "AI 先写出可编辑的乐谱，再唱成一首歌",
  summary: "可以听完整的中文舞曲，也可以单听它的乐谱回放，对照人声旋律和伴奏从哪里进入。",
  limit: "两轨都是研究团队发布的同一首作品。乐谱回放可听到编排骨架，成曲里的人声和音色另行生成。",
  source: { label: "YuE2 · 原始乐谱文件", url: "https://map-yue2.github.io/assets/genre/383f774d73b0099f1b207c82/score.abc" },
  tracks: [
    { src: "/outputs/yue-song.mp3", label: "完整成曲 · 中文演唱", loadForSeeking: true, ...audioProfiles["yue-song"] },
    { src: "/outputs/yue-score.mp3", label: "乐谱回放 · 无演唱", loadForSeeking: true, ...audioProfiles["yue-score"] },
  ],
};
