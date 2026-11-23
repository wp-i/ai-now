export const paintedValley = {
  id: "painted-valley",
  topic: "worlds",
  product: "Blendi Byl · Claude Fable 5.2",
  date: "2026-11-12",
  title: "可以走进手绘山谷，从正午逛到日落",
  summary: "斗篷下方的草地、河流和村庄是一个可以随意行走的三维场景。走下山，远处的房子就成了身边的建筑。",
  limit: "这是作者搭好的一座山谷。草地、云层和笔触由代码绘制，试玩时可以切换时段和画面质感。",
  source: { label: "X · 作者原帖和试玩入口", url: "https://x.com/BlendiByl/status/2120694003230560585" },
  video: { src: "/community/painted-valley.mp4", poster: "/community/painted-valley.webp", label: "Blendi Byl 在手绘山谷步行的原始录屏", duration: "0:19" },
};

export const abyssalGarden = {
  id: "abyssal-garden",
  topic: "worlds",
  product: "Noniv · Claude Fable 5.2",
  date: "2026-11-14",
  title: "一个 HTML 文件里可以潜到海底",
  summary: "可以绕过海藻和礁石，游到沉船旁。鱼群、光束和水下声音都由浏览器内的代码实时生成。",
  limit: "需要支持 WebGPU 的浏览器，流畅度随设备变化。初版来自一段提示词，后续补上碰撞和画质选项。",
  source: { label: "GitHub · 作者源码和试玩", url: "https://github.com/Noniv/abyssal-garden" },
  caption: "Noniv 作品 · @Octoberry 录屏节选",
  video: { src: "/community/abyssal-garden.mp4", poster: "/community/abyssal-garden.webp", label: "海藻森林中游动，水面光束照到礁石和鱼群", duration: "0:20" },
};

export const mimicMotion = {
  id: "mimic-motion",
  topic: "motion",
  product: "Abadli-Badro · Mimic",
  title: "真人蹑步从录像里变成三维动作",
  summary: "左侧是录像里识别出的骨架，右侧是用实际导出的动作文件驱动的角色，两侧同步播放。",
  limit: "只跟踪一人，角色在原地重放动作。关节被遮挡太久，导出的动作会提前结束。",
  source: { label: "GitHub · 原始对照和动作文件", url: "https://github.com/Abadli-Badro/Mimic#demo" },
  video: { src: "/community/mimic-motion.mp4", poster: "/community/mimic-motion.webp", label: "真人蹑步和导出的三维角色运动同步对照", duration: "0:06", aspect: "16 / 7" },
};

export const dunkSwap = {
  id: "dunk-swap",
  topic: "motion",
  product: "@techhalla · Magnific Illusion",
  date: "2026-11-19",
  title: "扣篮的人和球场都换了，起跳时机还相近",
  summary: "两边在几乎同一刻起跳。右侧换成深色衣服的球员和另一座篮球场，扣篮动作来自左侧原片。",
  limit: "这是按参考动作改写的一段视频。对照里，人物腾空时的腿部姿势和球的位置仍有偏差。",
  source: { label: "X · 作者前后对照", url: "https://x.com/techhalla/status/2123369123229106258" },
  caption: "左 原片 · 右 改写 · 按作者原始对照重排",
  video: { src: "/community/dunk-swap.mp4", poster: "/community/dunk-swap.webp", teaser: "/outputs/dunk-preview.mp4",
    label: "扣篮原片与改写结果逐帧对照", duration: "0:05", aspect: "32 / 9" },
};

export const musicVideo = {
  id: "sync-music-video",
  topic: "video",
  product: "@techhalla · Magnific One / H3",
  date: "2026-11-20",
  title: "说唱 MV 切换场景，嘴形仍然跟着歌词",
  summary: "镜头从码头切到街头，同一个角色继续对嘴。原片也能听到剪辑怎么踩着节拍落下。",
  limit: "作者先把歌切成 16 段，逐镜提供同一张角色参考、场景和对应音轨，再剪成整片。",
  source: { label: "X · 完整 MV 与制作记录", url: "https://x.com/techhalla/status/2123744345803391268" },
  caption: "创作者原片节选，保留原声",
  video: { src: "/community/music-video.mp4", poster: "/community/music-video.webp", label: "AI 说唱音乐视频片段及原始音轨", duration: "0:18" },
};
