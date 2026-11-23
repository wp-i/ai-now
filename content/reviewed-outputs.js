export const familyPhoto = {
  id: "family-photo", topic: "images", product: "Seedream 5.5 · Recraft 实测", date: "2026-11-17",
  title: "孩子趴在爸爸肩上",
  summary: "两人刚好对上视线。窗边亮、屋里暗，衣袖的皱褶和孩子搭下来的手都有重量。",
  limit: "同一提示词测试中的一张 2K 直出图，未经后期编辑。",
  source: { label: "Recraft 原图与提示词", url: "https://www.recraft.ai/blog/seedream-5-5#father-and-toddler-at-home" },
  images: [{ src: "/originals/family-photo.webp", width: 1600, height: 904, alt: "一名父亲坐在家里，抬头望向伏在肩上的孩子" }],
};

export const leafLettering = {
  id: "negative-leaf", topic: "images", product: "Nano Banana 2.1 · fofr", date: "2026-10-07",
  title: "字是叶片的空隙",
  summary: "叶片缺口组成两行 NANO BANANA。裂口依着叶脉，仍看得出是龟背竹。",
  limit: "原作提示指定了这两个词和负形排字。",
  source: { label: "fofr 原图与提示词", url: "https://x.com/fofrAI/status/2107509669514113058" },
  images: [{ src: "/originals/leaf-lettering.jpg", width: 1792, height: 2400, alt: "一片龟背竹叶的自然裂口构成 NANO BANANA 字样" }],
};

export const animeFight = {
  id: "mira-fight", topic: "video", product: "Seedance 2.5 · Mira", date: "2026-11-10",
  title: "冲拳、近景、退步溅水",
  summary: "两个人从贴身交手切到眼睛特写，最后撞拳、滑退。十五秒里，镜头和动作贴着同一个节奏走。",
  limit: "作者还公开了用来排动作和镜头的草稿，可以和成片对照。",
  source: { label: "Mira 原片与预演", url: "https://x.com/MiraMusic_AI/status/2120060174878867689" },
  video: { src: "/originals/mira-fight.mp4", poster: "/originals/mira-fight.jpg",
    previewSeconds: 4, duration: "0:15", label: "Mira 的十五秒原创动作动画" },
};

export const shareAPeach = {
  id: "share-a-peach", topic: "video", product: "可灵 O3 · FromSummerF", date: "2026-10-21",
  title: "咬一口桃子，再抬头对视",
  summary: "树影下，两个人把桃子递到对方手里，咬下、鼓腮，再看着对方笑。十秒只用一个镜头。",
  limit: "作者先调整开场画面，再告诉 AI 谁先递桃、谁开口。",
  source: { label: "FromSummerF 原片与提示词", url: "https://x.com/FromSummerF/status/2112785503892496876" },
  video: { src: "/originals/share-a-peach.mp4", poster: "/originals/share-a-peach.jpg",
    previewStart: 4, previewSeconds: 4, duration: "0:10", aspect: "1294 / 720", label: "树下两个人分桃的十秒原片" },
};

export const noOrdinaryLove = {
  id: "no-ordinary-love", topic: "video", product: "Seedance 2.5 · antrofrog", date: "2026-10-28",
  title: "红花之后，鸽群排成一颗心",
  summary: "从红花近景切到俯拍，再切回伦敦街头。两个角色靠剪影和配色就能从头认到尾。",
  limit: "角色分别用 Midjourney 8.2 和 Krea 3 设计，Seedance 2.5 生成动画。原声配乐是 Sade 的歌曲。",
  source: { label: "X 上的 59 秒原片", url: "https://x.com/antrofrog_/status/2115376771004862719" },
  caption: "Krea 发布的两张原片画面。",
  images: [
    { src: "/originals/no-ordinary-love-flowers.webp", width: 1920, height: 1080, alt: "乔治在红色罂粟花丛中捧花追着吉娜" },
    { src: "/originals/no-ordinary-love-heart.webp", width: 1920, height: 1080, alt: "俯拍一群鸽子在乔治身边排成心形" },
  ],
};

export const frameboy = {
  id: "frameboy", topic: "worlds", product: "Atlas · World Labs", date: "2026-11-05",
  title: "从一张图走进雪街和山村",
  summary: "视角可以左右转、沿路前进，原图里看不到的角度会随镜头出现。原演示展示了三个单图生成的场景。",
  limit: "这是 Frameboy 的研究演示，画面由云端生成，演示最高约 15 帧每秒。",
  source: { label: "World Labs 原始演示", url: "https://worldlabs.ai/blog/atlas-realtime" },
  video: { src: "https://wlt-ai-cdn.art/videos/2026-atlas-realtime/fantastical-single-image-v2.mp4",
    poster: "/originals/frameboy.webp", previewSeconds: 4, duration: "0:40", muted: true, label: "Frameboy 原始单图世界漫游" },
};

export const libraryComparison = {
  id: "library-seasons", topic: "editing", product: "Gemini Omni 1.2 Flash · Pavel Matveev", date: "2026-11-06",
  title: "图书馆从冬夜换到夏日",
  summary: "广场、圆窗和屋顶在原片和编辑版都有。对照中，窗格、喷泉和城里建筑也发生了变化。",
  limit: "作者要求保留飞行路线。两段都从广场穿门再飞出圆顶，但进门的时机也变了。",
  source: { label: "Pavel 的两段完整原片", url: "https://matveev.tech/gemini-omni-1-2-flash-obzor/" },
  images: [{ src: "/originals/library-comparison.jpg", width: 2000, height: 1688,
    alt: "作者的三组对照帧。左边从冬夜广场飞进图书馆再越过屋顶，右边是改为夏日后的对应场景" }],
  caption: "Pavel 发布的对照图。左为原片，右为换季版。",
};
