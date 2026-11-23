export const surfingTheSunset = {
  id: "surfing-the-sunset",
  topic: "images",
  role: "AI 改造照片",
  product: "Bernardo Hernandez",
  title: "余晖里的浪尖",
  summary: "冲浪者立在浪尖，脚下海浪像慢门里扫过的一整笔蓝色。地平线只留一道暖光。",
  limit: "基于摄影原作的 AI 再创作，获 HIPA「Dreams Through AI」第三名。",
  source: { label: "获奖作品图", url: "https://50mm.vn/2026/11/16/hipa-2026-anh-thang-giai/" },
  images: [{
    src: "/originals/surfing-the-sunset.avif", width: 1000, height: 665,
    alt: "一道宽阔的蓝黑色浪头在夕光下扫过，冲浪者在浪尖上展开双臂",
  }],
};

export const impact = {
  id: "impact",
  topic: "images",
  role: "夜景瞬间",
  product: "Dreamwaves.exe · Midjourney",
  title: "雨夜里的鹿与碎光",
  summary: "雨夜的公路上，鹿只被车灯和一瞬间的碎光照亮。雨滴、玻璃和溅开的火花像挤在同一帧里。",
  source: { label: "原作与作者说明", url: "https://fineartawards.ai/submissions/impact/" },
  images: [{
    src: "/originals/impact.png", width: 1920, height: 2400,
    alt: "夜雨中一只鹿被车尾灯和左侧飞溅的碎光映亮",
  }],
};

export const mananaFall = {
  id: "manana-fall",
  topic: "images",
  role: "时装概念",
  product: "Wanja Olten · Midjourney / ChatGPT",
  title: "在花丛里散开的红裙",
  summary: "人物蜷进花丛，红裙的褶层和花瓣连成一体。蓝色的腿从高饱和的红色里伸出来。",
  source: { label: "原图与同系列作品", url: "https://fineartawards.ai/submissions/manana-fall/" },
  images: [{
    src: "/originals/manana-fall.jpg", width: 1968, height: 2464,
    alt: "蓝黑色背景中，穿雕塑般红裙的人物卧在绽开的深粉花团里",
  }],
};

export const whatTheBirdsTook = {
  id: "what-the-birds-took",
  topic: "images",
  wide: true,
  role: "黑白构图",
  product: "Joem Joem",
  title: "椅子上的人影散成鸟群",
  summary: "光从侧窗横扫一间空屋。椅子上方，浮起的人影散进鸟群，只剩椅脚仍然牢牢落在木地板上。",
  source: { label: "原图与作者署名", url: "https://globallensawards.com/2026/journalofemptiness/what-the-birds-took/" },
  images: [{
    src: "/originals/what-the-birds-took.jpg", width: 1024, height: 1024,
    alt: "黑白图像中，木椅上方的人影散入飞鸟，右侧长窗投下光线",
  }],
};

export const theEyeRemains = {
  id: "the-eye-remains",
  topic: "images",
  role: "材质特写",
  product: "Ejaiminds · Midjourney",
  title: "黑色珠绣里的一只眼睛",
  summary: "一只眼睛从黑色珠绣里望出来。近看能分辨滴状的珠子、垂直的丝线和湿润的眼角。",
  source: { label: "原图与同系列作品", url: "https://fineartawards.ai/submissions/the-eye-remains/" },
  images: [{
    src: "/originals/the-eye-remains.png", width: 1856, height: 2464,
    alt: "一只眼睛从黑色珠绣和绳线织成的面纱间露出",
  }],
};

const pelagicParts = [
  { id: "jellyfish", label: "玻璃水母", layers: [4, 5] },
  { id: "fish", label: "鱼群", layers: [2] },
  { id: "type", label: "标题", layers: [7] },
];

export const pelagicBallet = {
  id: "pelagic-ballet",
  topic: "images",
  role: "透明素材组合",
  product: "AlphaAnything · 研究团队",
  date: "2026-10-26",
  title: "深海里的玻璃水母",
  summary: "水母像透光的玻璃。关掉鱼群，再关掉水母，能分别看清它们和海底背景的关系。",
  limit: "团队用 AI 分别生成素材，再把它们排成一张图。",
  source: { label: "原作与每一层素材", url: "https://wluli.github.io/AlphaAnything/#compositions" },
  artwork: {
    poster: "/originals/pelagic-ballet.webp",
    width: 1536,
    height: 1920,
    alt: "光束穿入深蓝海水，两只玻璃质感的水母浮在海扇和远处的鱼群之间",
    parts: pelagicParts,
    layers: Array.from({ length: 7 }, (_, index) => {
      const number = index + 1;
      return {
        src: "/originals/pelagic-ballet/" + number + ".webp",
        part: pelagicParts.find(part => part.layers.includes(number))?.id,
      };
    }),
  },
};
