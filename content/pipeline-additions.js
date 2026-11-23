const forgeTracks = [
  {
    src: "/originals/forge-hammer-hit.wav", label: "锤击烧红的铁坯",
    peaks: [7, 7, 91, 66, 30, 7, 7, 91, 60, 35, 7, 7, 7, 91, 64, 33, 7, 7, 91, 66, 41, 7, 7, 7, 91, 57, 29, 7, 7, 91, 62, 22, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
  },
  {
    src: "/originals/forge-quench.wav", label: "铁坯入水的汽响",
    peaks: [84, 12, 7, 7, 7, 7, 7, 7, 14, 7, 7, 7, 7, 88, 31, 7, 7, 7, 89, 44, 7, 7, 13, 7, 7, 7, 7, 7, 7, 89, 20, 7, 7, 7, 7, 81, 89, 83, 88, 80, 79, 70, 52, 28, 18, 7, 16, 7],
  },
  {
    src: "/originals/forge-furnace.wav", label: "炉火和余烬",
    peaks: [82, 80, 80, 83, 79, 83, 82, 83, 81, 83, 80, 81, 79, 81, 80, 81, 83, 81, 78, 81, 80, 80, 79, 75, 78, 77, 81, 78, 79, 75, 74, 76, 76, 78, 75, 77, 78, 79, 77, 81, 79, 81, 81, 83, 83, 80, 81, 83],
  },
  {
    src: "/originals/forge-anvil-ambience.wav", label: "铁砧余响",
    peaks: [80, 78, 82, 81, 78, 82, 82, 81, 79, 78, 75, 75, 75, 69, 68, 72, 64, 62, 63, 56, 54, 47, 45, 43, 39, 30, 28, 24, 18, 19, 11, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
  },
];

export const adobeForgeSoundscape = {
  id: "adobe-forge-soundscape",
  topic: "audio",
  product: "Adobe Premiere · Generate Soundscape",
  date: "2026-11-11",
  title: "一段锻剑镜头，四条可单独试听的音轨",
  summary: "看锤子敲下、铁坯入水，再分别听锤击、汽响、炉火和铁砧余响。声音由 AI 根据画面生成。",
  limit: "铁坯还没入水时，单听水汽那一路也会听见几声响。",
  caption: "Adobe Research 发布的无声参考片。",
  source: {
    url: "https://research.adobe.com/news/the-sound-of-a-scene-adobe-research-brings-video-guided-ai-soundscapes-to-premiere-pro/#adobe-soundscape-demo",
    label: "Adobe Research 原始分轨演示",
  },
  video: {
    src: "/originals/forge-soundscape.mp4",
    poster: "/originals/forge-soundscape.png",
    label: "无声锻剑片段，先用锤子敲铁坯，再放入水中",
    duration: "0:08",
    previewSeconds: 4,
    muted: true,
  },
  tracks: forgeTracks.map(track => ({ ...track, duration: 8.08, loadForSeeking: true })),
};

export const reversibleClothingRail = {
  id: "reversible-clothing-rail",
  topic: "creative",
  product: "Amir Mušić · Codex、LTX-2.5 Pro、Kling 3.0",
  date: "2026-10-19",
  title: "移到哪件衣服上，哪件就转过来",
  summary: "鼠标移到衣服上，它就转向你。鼠标移开，它从刚才的位置转回去。",
  limit: "AI 补出了正面和侧面之间的画面。能看到的角度由作者选定。",
  caption: "本站连续操作录屏，展示 Amir Mušić 开源的两件原创印花示例。",
  source: {
    url: "https://amirmushich.com/publications/interactive-clothing-hero/#motion-lab",
    label: "Amir Mušić 原作与逐帧演示",
  },
  video: {
    src: "/originals/garment-rail.webm",
    poster: "/originals/garment-rail.png",
    label: "鼠标依次移到两件 T 恤上，衣服当场转向，再点击查看背面",
    duration: "0:07",
    aspect: "29 / 18",
    previewSeconds: 4.8,
    muted: true,
  },
};
