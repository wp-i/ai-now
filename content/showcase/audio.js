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

export const audioShowcase = [
  {
    id: "suno-jealousy",
    topic: "audio",
    section: "music",
    role: "完整歌曲",
    product: "Johio · Suno v6",
    date: "2026-11-10",
    title: "《Jealousy》从轻声推进到舞曲副歌",
    summary: "人声先贴在较轻的节拍上，叠进鼓点和低音后，副歌转成更饱满的电子舞曲。",
    source: { label: "Johio 发布的完整歌曲", url: "https://suno.com/song/51d606ee-ae10-4a5f-b274-f981fcf1b74f" },
    audio: {
      src: "/originals/suno-jealousy.mp4",
      label: "《Jealousy》原曲",
      duration: 238.805,
      loadForSeeking: true,
      peaks: [82, 84, 91, 93, 88, 84, 100, 84, 92, 83, 80, 79, 90, 81, 95, 83,
        88, 79, 80, 75, 82, 79, 74, 73, 66, 66, 64, 76, 90, 89, 93, 91,
        74, 74, 83, 87, 85, 79, 90, 88, 92, 93, 94, 85, 89, 83, 90, 88],
    },
  },

  {
    id: "mula-chorus",
    topic: "audio",
    product: "MuLa Labs · MuLaCover",
    date: "2026-11-04",
    title: "只给一段副歌，也能扩成一首歌",
    summary: "第一段是模型拿到的副歌。第二段节选自它根据副歌和给定歌词生成的整首歌曲。",
    limit: "主歌、过门和配器由模型补出，适合听它如何接续已有旋律。",
    source: { label: "原音、歌词与完整歌曲", url: "https://mulalabs.ai/mulacover/#intro-partial" },
    tracks: [
      {
        label: "输入副歌",
        src: "/impact/mule-chorus.mp3",
        duration: 22.5,
        peaks: [
          81, 51, 33, 92, 42, 36, 77, 46, 64, 75, 15, 7, 80, 47, 69, 76,
          41, 66, 65, 47, 90, 39, 30, 74, 59, 42, 91, 47, 38, 84, 56, 39,
          87, 32, 20, 79, 42, 42, 76, 47, 38, 81, 34, 61, 76, 31, 45, 81,
        ],
      },
      {
        label: "扩写后的歌曲片段",
        src: "/impact/mule-expanded.mp3",
        duration: 17,
        peaks: [
          74, 54, 77, 66, 73, 47, 53, 82, 79, 78, 80, 72, 74, 75, 78, 82,
          85, 83, 89, 87, 86, 76, 77, 75, 63, 56, 75, 58, 48, 77, 35, 59,
          64, 84, 63, 69, 61, 87, 77, 67, 91, 68, 70, 67, 88, 84, 87, 92,
        ],
      },
    ],
    section: "music",
    role: "续写歌曲",
  },

  {
    id: "astra-piano",
    topic: "audio",
    product: "GPT-6.2 Astra · rvm0n_",
    date: "2026-11-18",
    title: "一首独奏，音符落到琴键上",
    summary: "旋律和伴奏像两条线在键盘上交错。亮起的琴键可以和实际听到的音符对上。",
    limit: "这是创作者发布的一次钢琴作曲结果，演奏和画面是数字回放。",
    source: { label: "rvm0n_ 的完整演奏", url: "https://x.com/rvm0n_/status/2122768551354208665" },
    video: { src: "/originals/astra-piano.mp4", poster: "/originals/astra-piano.jpg", previewSeconds: 4,
      duration: "1:40", label: "GPT-6.2 Astra 钢琴曲及琴键回放" },
    section: "music",
    role: "钢琴演奏",
  },

  {
    id: "yue-last-train",
    topic: "audio",
    product: "YuE2 ·《The Last Train》",
    date: undefined,
    title: "同一首中文歌，从原声流行改成爵士",
    summary: "歌词和旋律听得出是同一首歌。爵士版里的低音和轻轻扫过的鼓，让整段的感觉变了。",
    limit: "换编曲时也重新生成了歌声。",
    source: { label: "作者原声与曲谱", url: "https://map-yue2.github.io/#agentic-music-editing" },
    tracks: [
      {
        label: "流行原版",
        src: "/impact/yue-pop.mp3",
        duration: 17,
        peaks: [
          38, 47, 49, 48, 47, 42, 42, 35, 27, 20, 12, 50, 80, 82, 75, 78,
          87, 70, 89, 62, 39, 43, 30, 59, 65, 75, 71, 80, 65, 66, 87, 92,
          86, 69, 44, 41, 46, 32, 40, 35, 53, 91, 67, 81, 71, 85, 68, 79,
        ],
      },
      {
        label: "爵士改编",
        src: "/impact/yue-jazz.mp3",
        duration: 17,
        peaks: [
          38, 34, 29, 42, 29, 36, 38, 26, 18, 15, 34, 73, 66, 57, 58, 83,
          66, 61, 49, 29, 27, 35, 44, 92, 62, 47, 83, 63, 66, 61, 59, 78,
          78, 30, 25, 25, 34, 42, 37, 37, 78, 57, 53, 47, 80, 62, 58, 48,
        ],
      },
    ],
    section: "music",
    role: "改编与演唱",
    feature: true,
  },

  {
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
    section: "sound-design",
    role: "分轨音效",
    wide: true,
  },
];
