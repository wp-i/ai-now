export const abyssalGarden = {
  id: "abyssal-garden", topic: "creative", product: "Noniv · Claude Fable 5.2", date: "2026-11-14",
  title: "在网页里潜到沉船旁",
  summary: "穿过海藻和岩拱，能游到沉船旁，也能抬头看鱼群从光束里游过。",
  limit: "可用电脑上的 Chrome 或 Edge 打开原作。",
  source: { label: "进入 Noniv 的海底", url: "https://noniv.github.io/abyssal-garden/" },
  caption: "Octoberry 的实游录屏。",
  video: { src: "/originals/abyssal-garden.mp4", poster: "/community/abyssal-garden.webp",
    previewStart: 4, previewSeconds: 4, duration: "1:50", muted: true, label: "在 Abyssal Garden 的海藻与礁石之间游动" },
};

export const jcaMotion = {
  id: "jca-motion", topic: "motion", product: "Joints, Camera, Action! · NVIDIA Research",
  title: "生成跨栏镜头，也生成能重放的关节动作",
  summary: "上面是生成的短片，下面是同次输出的三维关节动作。起跳后绕过横杆，骨骼随画面一起屈伸。",
  limit: "实验先给模型角色骨架和场景。输出包括动作和对齐视角，演示用的是固定机位。",
  source: { label: "NVIDIA 研究团队的原始对照", url: "https://research.nvidia.com/labs/par/projects/jca/index.html#scenes" },
  video: { src: "/originals/jca-motion.mp4", poster: "/originals/jca-motion.jpg", previewStart: 11.5, previewSeconds: 4, duration: "0:16",
    muted: true, label: "NVIDIA 生成的猿猴跨栏短片及同时输出的三维骨骼动作" },
};

export const pikaSetEdit = {
  id: "pika-set-edit", topic: "editing", product: "Pika H3 Flex · Pika", date: "2026-10-29",
  title: "草地变球馆，抬手和滚动还接得上",
  summary: "左边的球滚过草地，右边滚过木球道。换了地点，坐着的人依然在同一段动作里抬手、回头。",
  limit: "远处的人和物件也跟着场景变了。",
  source: { label: "Pika 发布的两段原片", url: "https://pika.art/blog/pika-h3-flex" },
  videos: [
    { stage: "参考片 · 草地", src: "/originals/pika-lawn.mp4",
      poster: "/originals/pika-lawn.webp", duration: "0:10", aspect: "7 / 4", label: "更换场景前的草地参考视频" },
    { stage: "生成结果 · 球馆", src: "/originals/pika-bowling.mp4",
      poster: "/originals/pika-bowling.webp", previewSeconds: 4, duration: "0:10", aspect: "7 / 4",
      label: "更换场景后的保龄球馆原片" },
  ],
};

export const astraPiano = {
  id: "astra-piano", topic: "music", product: "GPT-6.2 Astra · rvm0n_", date: "2026-11-18",
  title: "一首独奏，音符落到琴键上",
  summary: "旋律和伴奏像两条线在键盘上交错。亮起的琴键可以和实际听到的音符对上。",
  limit: "这是创作者发布的一次钢琴作曲结果，演奏和画面是数字回放。",
  source: { label: "rvm0n_ 的完整演奏", url: "https://x.com/rvm0n_/status/2122768551354208665" },
  video: { src: "/originals/astra-piano.mp4", poster: "/originals/astra-piano.jpg", previewSeconds: 4,
    duration: "1:40", label: "GPT-6.2 Astra 钢琴曲及琴键回放" },
};

export const skateFoley = {
  id: "skate-foley", topic: "audio", product: "小米 ControlFoley",
  title: "滑板起跳，落地时才响",
  summary: "打开声音就能听到板轮在地面滚动。滑板腾空后，下一次撞击声跟着画面里的接触出现。",
  limit: "声音由模型根据画面生成。录到现实里，地面和板材不同，声音也会变。",
  source: { label: "ControlFoley 原始音画示例", url: "https://yjx-research.github.io/ControlFoley/#demos" },
  video: { src: "/originals/skate-foley.mp4", poster: "/originals/skate-foley.webp", previewStart: 3,
    previewSeconds: 4, duration: "0:08", aspect: "30 / 17", label: "滑板动作与生成的轮声、落地音" },
};

export const valsera = {
  id: "valsera", topic: "software", product: "Claude Fable 5.2 · Kevin Ngo", date: "2026-11-15",
  title: "能走进手绘地图的横版角色游戏",
  summary: "沿着手绘风的小路经过木楼和发光蘑菇，再走进一段可以战斗的试玩关卡。",
  source: { label: "Kevin Ngo 的试玩原作", url: "https://valsera-game.vercel.app/" },
  video: { src: "/originals/valsera.mp4", poster: "/originals/valsera.jpg", previewStart: 65,
    previewSeconds: 4, duration: "1:45", label: "Valsera 横版游戏的作者实机录像" },
};

export const notreDame = {
  id: "notre-dame", topic: "spatial", product: "GPT-6.2 Astra · Dimillian", date: "2026-11-18",
  title: "用旧平面图搭出教堂中殿",
  summary: "镜头在 Unreal Engine 5 里穿过立柱。朝侧廊移动时，能看到圣坛、拱顶和彩窗的空间关系。",
  limit: "作者用照片和历史平面图作参考。这是可移动镜头的三维重建演示，尺寸精度未公布。",
  source: { label: "Dimillian 的原始场景录像", url: "https://x.com/Dimillian/status/2122750651998355800" },
  video: { src: "/originals/notre-dame.mp4", poster: "/originals/notre-dame.jpg", previewStart: 4.5, previewSeconds: 4,
    duration: "0:56", label: "在 Unreal Engine 中进入重建的巴黎圣母院中殿" },
};

export const typedPage = {
  id: "typed-page", topic: "creative", product: "Claude Fable 5.2 · Claire Vo", date: "2026-11-10",
  title: "敲一下键，纸跟着向左走",
  summary: "按下键盘的一刻，网页上的打字机响一声，纸上出现一个字。桌灯和沙漏也能操作。",
  source: { label: "试打 Claire Vo 的打字机", url: "https://typed.page/" },
  caption: "本站在原网页上的连续操作录屏。",
  video: { src: "/originals/typed-page.webm", poster: "/originals/typed-page.png",
    previewStart: 10, previewSeconds: 4, duration: "0:23", muted: true, aspect: "8 / 5",
    label: "在 typed.page 敲键盘，纸面随输入打出文字" },
};

export const svgPeacock = {
  id: "svg-peacock", topic: "creative", product: "GPT-6.2 Astra · Peter Gostev", date: "2026-11-18",
  title: "孔雀的羽片是用代码画出来的",
  summary: "冠羽、蓝色颈部和林间薄雾都画在同一幅 SVG 里。作者的原片可以近看羽片纹理。",
  limit: "这是一个矢量绘图结果。站内保留作者发布的展示视频。",
  source: { label: "Peter Gostev 的原作与说明", url: "https://x.com/petergostev/status/2122816629402910859" },
  video: { src: "/originals/svg-peacock.mp4", poster: "/originals/svg-peacock.jpg", previewStart: 4, previewSeconds: 4,
    duration: "0:55", muted: true, label: "作者展示 GPT-6.2 Astra 用 SVG 绘制的孔雀" },
};
