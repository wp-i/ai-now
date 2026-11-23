export const timeFreezeCase = {
  id: "time-freeze",
  topic: "video",
  product: "Kiki · GPT Image 2 / Seedance 2.5",
  date: "2026-09-28",
  title: "角色定在空中，镜头从她身旁绕过去",
  summary: "上方是动画，下方是角色设定。镜头靠近伸出的手，再越过耳机和甩飞的配件。",
  limit: "衣着和色彩能对应设定图。飞散的配件仍有位移，画面呈现的是时间冻结的视觉效果。",
  source: { label: "X · Kiki 的原片与提示词", url: "https://x.com/Mayz1169/status/2104465208337182787" },
  video: { src: "/outputs/time-freeze.mp4", poster: "/outputs/time-freeze.webp", teaser: "/outputs/time-freeze-preview.mp4",
    label: "Kiki 的时间冻结动画和角色设定图", duration: "0:20", aspect: "1670 / 1864" },
};

export const librarySeasonsCase = {
  id: "library-seasons",
  topic: "editing",
  product: "Pavel Matveev · Gemini Omni 1.2 Flash",
  date: "2026-11-06",
  title: "图书馆从冬夜变成夏日，进门时间也变了",
  summary: "两个镜头都从广场穿过图书馆，再飞出圆顶。短预览里，左边已经进门，右边还在门外。",
  limit: "作者要求保留原来的镜头路线。大致路线保住了，进门时机、外立面和广场陈设都发生了变化。",
  caption: "左为冬季生成片段，右为夏季编辑结果，两侧从各自起点同步播放",
  source: { label: "Pavel Matveev · 原片与实测记录", url: "https://matveev.tech/gemini-omni-1-2-flash-obzor/" },
  video: { src: "/outputs/library-seasons.mp4", poster: "/outputs/library-seasons.webp", teaser: "/outputs/library-seasons-preview.mp4",
    label: "冬季和夏季图书馆的镜头路线对照", duration: "0:15", aspect: "32 / 9", muted: true },
};

export const hurdleContactCase = {
  id: "hurdle-contact",
  topic: "motion",
  product: "nakaaki04 · Gemini Omni 1.2 Flash",
  date: "2026-11-11",
  title: "看起来跑得很顺，跨栏时腿穿过了横杆",
  summary: "左侧看完整动作，右侧放大同一时刻的腿和栏杆。模型画出了助跑，却丢掉了跨越时的空间关系。",
  limit: "截取作者的一次 720p 输出。红圈是作者标记，原帖还发布了 360p 结果和测试过程。",
  source: { label: "X · 作者测试与完整视频", url: "https://x.com/nakaaki04/status/2120471927878025580" },
  video: { src: "/outputs/hurdle-contact.mp4", poster: "/outputs/hurdle-contact.webp", teaser: "/outputs/hurdle-preview.mp4",
    label: "跨栏试作及同步放大的腿部细节", duration: "0:06", aspect: "28 / 17", muted: true },
};
