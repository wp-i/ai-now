const orchardParts = [
  { id: "insects", label: "机械昆虫", layers: [2, 3] },
  { id: "trees", label: "近处的树", layers: [5, 6] },
  { id: "tools", label: "梯子和工具", layers: [7, 8, 9] },
];

export const imageShowcase = [
  {
    id: "ice-gown",
    topic: "images",
    role: "时装影像",
    product: "Lumio",
    date: "2026-11-23",
    title: "穿一件冰做的婚纱",
    summary: "逆光穿过曳地裙摆。换到近景，脸侧的冰晶、皮肤和透明头饰有不同的反光。",
    limit: "创作者标注为 AI 作品，未在这篇原帖注明具体模型。",
    source: { label: "Lumio 同组原图", url: "https://x.com/lumioaigc/status/2124650956742906155" },
    images: [
      { src: "/originals/lumio-ice-gown.jpg", width: 1664, height: 2496, alt: "冰海边的模特回头，逆光照透玻璃状的长裙" },
      { src: "/originals/lumio-ice-detail.jpg", width: 896, height: 1344, alt: "人像近景，半透明冰晶覆盖鬓角和肩颈" },
    ],
  },

  {
    id: "clockwork-orchard",
    topic: "images",
    role: "插画拆分",
    product: "AlphaAnything · 研究团队",
    date: "2026-10-26",
    title: "一张插画，能单独拿掉树和机械蜂",
    summary: "关掉近处的树，会露出 AI 补画的山坡。机械蜂、铜梨树和梯子都能分别隐藏。",
    source: { label: "作者原画与图层", url: "https://wluli.github.io/AlphaAnything/#decompositions" },
    artwork: {
      poster: "/originals/clockwork-orchard.webp",
      width: 1024,
      height: 1024,
      alt: "机械果园里有金色梨树、梯子和工具，两只机械昆虫飞在空中",
      parts: orchardParts,
      layers: Array.from({ length: 9 }, (_, index) => {
        const number = index + 1;
        return {
          src: "/originals/clockwork-orchard/" + number + ".webp",
          part: orchardParts.find(part => part.layers.includes(number))?.id,
        };
      }),
    },
  },

  {
    id: "road-snow",
    topic: "images",
    dimension: "编辑前后",
    product: "GPT Image 2.6 Sunburst",
    title: "雪落在同一块广告牌上",
    summary: "雪积在牌顶和路肩，车尾灯在湿路面上多了一道红色倒影。瓶身和广告字仍在原位。",
    limit: "左图是 AI 先生成的黄昏场景，右图在它的基础上加入了雪。",
    source: { label: "OpenAI 原始样张", url: "https://developers.openai.com/api/docs/guides/image-prompting?model=gpt-image-2.6#change-one-condition" },
    comparison: { before: "/stills/road-sunset.webp", after: "/stills/road-snow.webp",
      beforeSrcSet: "/stills/road-sunset-480.webp 480w, /stills/road-sunset-900.webp 900w, /stills/road-sunset.webp 1024w", afterSrcSet: "/stills/road-snow-480.webp 480w, /stills/road-snow-900.webp 900w, /stills/road-snow.webp 1024w",
      width: 1024, height: 1536, references: false, beforeLabel: "生成底图", afterLabel: "加雪后",
      beforeAlt: "落日下的公路，广告牌上写着 Fresh and clean，车辆驶过干燥路面",
      afterAlt: "同一块广告牌覆着积雪，车灯和天光映在湿滑路面上" },
    role: "天气编辑",
  },

  {
    id: "glass-pitcher-edit",
    topic: "images",
    role: "并入原景",
    product: "StitchEdit · Qin Guo、Dan Xu",
    date: "2026-11-05",
    title: "玻璃壶移到柠檬篮后面",
    summary: "挪动玻璃壶后，篮沿挡住了壶身，把手转向另一侧，原位置的倒影也消失了。",
    source: { label: "研究者原图与对照", url: "https://guoqincode.github.io/StitchEdit/#example-5-caption" },
    comparison: {
      before: "/originals/stitch-pitcher-before.webp",
      after: "/originals/stitch-pitcher-after.webp",
      width: 1024,
      height: 1024,
      references: false,
      beforeLabel: "移动前",
      afterLabel: "移动后",
      beforeAlt: "水壶在柠檬篮左边，把手朝左，台面上有水壶倒影",
      afterAlt: "水壶在柠檬篮后面，把手朝右，原位置的倒影消失",
    },
  },

  {
    id: "desert-cowboy",
    topic: "images",
    role: "时装广告",
    product: "Recraft V4.1 Pro · Recraft 实测",
    date: "2026-11-05",
    title: "红色天空下的黄车与蓝外套",
    summary: "车身和大檐帽把画面切成几个大色块。帽沿后方留下像慢门拍到的残影，正脸保有细节。",
    source: { label: "Recraft 原图和同题对照", url: "https://www.recraft.ai/blog/seedream-5-5#:~:text=Cowboy%20at%20a%20gas%20station" },
    images: [{ src: "/originals/recraft-gas-station.webp", width: 896, height: 1152,
      alt: "深红天空下，穿蓝色毛皮外套的男子斜倚黄色汽车，帽沿后留下一道模糊的影子" }],
  },

  {
    id: "dumpling-hands",
    topic: "images",
    role: "写实近摄",
    product: "Kling Image 4.0 · Min Choi",
    date: "2026-11-18",
    title: "指尖捏紧一层薄薄的饺子皮",
    summary: "光从窗边进来，面粉留在指节的皱褶里，指腹压住面皮的地方有一道很浅的凹痕。",
    limit: "手和面皮的细节成立，左边饺子的排列没有照提示词生成。",
    source: { label: "原图与完整提示词", url: "https://x.com/minchoi/status/2122906761208234149" },
    images: [{ src: "/originals/kling-dumpling.jpg", width: 4096, height: 2731,
      alt: "年长者的双手在撒着面粉的木板上捏紧饺子褶，旁边有擀面杖和馅料" }],
  },

  {
    id: "red-ice-handbag",
    topic: "images",
    role: "商业静物",
    product: "Recraft V4.1 Pro",
    date: "2026-11-05",
    title: "冰块里冻着一只红色手提包",
    summary: "硬光照进有气泡和裂纹的冰层，隔着冰仍能看清包身轮廓和包带的反光。",
    source: { label: "Recraft 原图与提示词", url: "https://www.recraft.ai/blog/gpt-image-2-6" },
    images: [{ src: "/originals/red-ice-handbag.webp", width: 1344, height: 768,
      alt: "一只透明红色手提包冻在有裂纹和气泡的冰块内" }],
  },

  {
    id: "cocktail-glass-layer",
    topic: "images",
    role: "半透明素材",
    product: "AlphaAnything · 研究团队",
    date: "2026-10-26",
    title: "从海报里单独拿出玻璃杯",
    summary: "背景和字都拿掉之后，杯沿、高光与透过玻璃的空处仍在同一份可用图层里。",
    source: { label: "研究者原始示例", url: "https://wluli.github.io/AlphaAnything/" },
    images: [
      { src: "/originals/alpha-cocktail-before.webp", width: 1024, height: 1024, label: "原海报",
        alt: "一张背景有橙片与绿叶的鸡尾酒海报" },
      { src: "/originals/alpha-cocktail-layer.webp", width: 1024, height: 1024, label: "独立图层",
        alt: "从海报里提取的橙色鸡尾酒杯，杯身和杯柄部分透明" },
    ],
  },
];
