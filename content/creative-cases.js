import { audioProfiles } from "./audio-profiles";

const redline = "https://kling.ai/blog/hitting-redline-make-cinematic-racing-kling4";
const king = "https://kling.ai/blog/king-card-making-kling4-everchanging-world";
const nano = "https://deepmind.google/models/gemini-image/flash/";
const runway = "https://help.runwayml.com/hc/en-us/articles/51683104370451-Creating-with-Edit-Studio#use-cases";
const ash = "https://kling.ai/blog/kling4-cut-discarded-footage-ash-koosha";
const yue = "https://map-yue2.github.io/#agentic-music-editing";
const mula = "https://mulalabs.ai/mulacover/#intro-partial";

export const redlineCase = {
  id: "redline",
  topic: "video",
  product: "Stephane Benini · 可灵 4.0",
  date: "2026-11-20",
  dateLabel: "11月20日发布本段",
  title: "《REDLINE》在雨夜紧贴赛车跟拍",
  summary: "黑白两辆赛车在湿滑路面逼近镜头。低机位掠过积水，车灯倒影跟着视角变化。",
  limit: "导演和团队设计镜头、挑选素材并统一调色。这里展示的是正式成片的 12 秒节选。",
  source: { label: "原片与制作过程", url: redline },
  video: { src: "/impact/redline.mp4", poster: "/impact/redline.webp", previewStart: 0, previewSeconds: 5.5,
    label: "REDLINE 雨夜赛车短片节选", duration: "0:12" },
};

export const kingCase = {
  id: "king-card",
  topic: "video",
  product: "KING CARD · 可灵 4.0",
  date: "2026-10-23",
  title: "一副扑克牌飞满整座剧场",
  summary: "牌从魔术师手中飞散，镜头后退时展现了席间的纸牌旋流。",
  limit: "制作团队用多张关键帧指定纸牌变形的时刻，并用参考素材保持镜头间的连贯性。",
  source: { label: "原片与分镜", url: king },
  video: { src: "/impact/king-card.mp4", poster: "/impact/king-card.webp", label: "KING CARD 纸牌飞满剧场", duration: "0:10" },
};

export const danceCase = {
  id: "spinning-dress",
  topic: "images",
  product: "Google DeepMind · Nano Banana 2 系列",
  title: "裙摆已经甩成残影，胸前刺绣仍然清楚",
  summary: "同一张 AI 图片里，飞扬的红裙带着拖影，人物面部和绣线仍有清楚细节。",
  limit: "这是一张生成的静帧，拖影是画出来的。袖口和远端纹样会随模糊丢失。",
  source: { label: "DeepMind 原始样张", url: nano },
  images: [{ src: "/impact/dancer.webp", width: 1440, height: 810,
    alt: "生成图中的舞者闭眼旋转，衣襟花卉刺绣清晰，红色裙摆和袖口有方向性拖影" }],
};

export const fireEditCase = {
  id: "aleph-fire",
  topic: "editing",
  product: "Runway Aleph 2.0",
  title: "翻手熄灭火球，火光也从脸上退去",
  summary: "Runway 在现有镜头中加入两团火。翻手后火光褪去，房间的窗户和床仍在原来的位置。",
  limit: "光影也由模型随画面重生成，灯光和人物的手部细节可能一起变化。",
  source: { label: "Runway 原片与修改版", url: runway },
  caption: "左为输入，右为加入特效后的片段",
  video: { src: "/impact/edit-fire.mp4", poster: "/impact/edit-fire.webp", label: "翻手熄火特效的原片与修改版", duration: "0:06", muted: true, aspect: "32 / 9" },
};

export const tapeEditCase = {
  id: "tape-edit",
  topic: "editing",
  product: "Ash Koosha · 可灵 4.0",
  date: "2026-11-04",
  title: "扔掉磁带的动作，被改成放回桌上",
  summary: "导演公布了同一镜头的两个版本。左边抛掉手里的东西，右边转身把它放回去。",
  limit: "两个版本原始时长不同，人物反应也有变化。这里对照的是同一段动作。",
  source: { label: "导演的两版片段", url: ash },
  caption: "左为原版，右为动作修改版",
  video: { src: "/impact/edit-tape.mp4", poster: "/impact/edit-tape.webp", label: "导演保留场景并修改磁带动作的原版与修改版", duration: "0:04", muted: true, aspect: "32 / 9" },
};

export const yueCase = {
  id: "yue-last-train",
  topic: "music",
  product: "YuE2 ·《The Last Train》",
  date: "2026-09-26",
  title: "同一首中文歌，从原声流行改成爵士",
  summary: "歌词和旋律听得出是同一首歌。爵士版里的低音和轻轻扫过的鼓，让整段的感觉变了。",
  limit: "换编曲时也重新生成了歌声。",
  source: { label: "作者原声与曲谱", url: yue },
  tracks: [
    { label: "流行原版", src: "/impact/yue-pop.mp3", ...audioProfiles["yue-pop"] },
    { label: "爵士改编", src: "/impact/yue-jazz.mp3", ...audioProfiles["yue-jazz"] },
  ],
};

export const mulaCase = {
  id: "mula-chorus",
  topic: "music",
  product: "MuLa Labs · MuLaCover",
  date: "2026-11-04",
  title: "只给一段副歌，也能扩成一首歌",
  summary: "第一段是模型拿到的副歌。第二段节选自它根据副歌和给定歌词生成的整首歌曲。",
  limit: "主歌、过门和配器由模型补出，适合听它如何接续已有旋律。",
  source: { label: "原音、歌词与完整歌曲", url: mula },
  tracks: [
    { label: "输入副歌", src: "/impact/mule-chorus.mp3", ...audioProfiles["mule-chorus"] },
    { label: "扩写后的歌曲片段", src: "/impact/mule-expanded.mp3", ...audioProfiles["mule-expanded"] },
  ],
};
