const seed = "https://seed.bytedance.com/zh/blog/more-realistic-images-more-stable-editing-across-100-rounds-introducing-seedream-5-5";
const omni = "https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/";
const adobe = "https://labs.adobe.com/sneaks/on-cue";
const dreamina = "https://dreamina.capcut.com/seedance/seedance-2-5-flash";
const ark = "https://docs.volcengine.com/docs/ark/seedance-2-5?lang=zh";
const imageGuide = "https://developers.openai.com/api/docs/guides/image-prompting#generate-a-looping-gif";

export const visualNews = [
  {
    id: "seedance-flash",
    category: "视频",
    model: "Seedance 2.5 Flash",
    title: "一段描述生成了连续开盒镜头",
    summary: "提示词指定了黑色耳机盒、开盖和镜头环绕。Dreamina 的成片长约 4 秒，能在连续镜头里看到这些动作。",
    limit: "这次从文字生成，未提供商品参考图。成片里的耳机结构不能拿来核对真实商品。",
    date: "2026-11-13",
    dateLabel: "11月13日核对",
    access: "火山方舟公告安排 11 月 15 日 14:00（北京时间）开放体验与 API。",
    credit: "Dreamina 官方生成样片",
    source: { label: "Dreamina 样片与提示词", url: dreamina },
    accessSource: { label: "火山方舟", url: ark },
    type: "video",
    media: {
      src: "https://p16-seeyou-sg.ibyteimg.com/tos-alisg-i-2zwwjm3azk-sg/69837a42cef3434c96e0bd45b8ee73de~tplv-2zwwjm3azk-image.image",
      poster: "/cases/seedance-flash.webp",
      sourceUrl: dreamina,
      label: "Seedance 2.5 Flash 耳机盒开盖样片",
      duration: "0:04",
      muted: true,
      eager: true,
    },
  },
  {
    id: "seedream",
    story: "seedream-55",
    category: "图像",
    model: "Seedream 5.5",
    headline: ["多轮改图后", "原石仍在同一位置"],
    summary: "拖过桌沿和棕色背景，能看到它们仍在原来的位置，石头也留在同一区域。",
    limit: "桌上的阴影会跟着新物件变化，石头右侧也被遮住。这个例子说明大构图得以保留，无法代表每次改图的稳定性。",
    date: "2026-11-09",
    credit: "字节 Seed 官方演示首尾帧",
    source: { label: "字节 Seed 原始演示", url: seed },
    type: "compare",
    media: {
      before: "/cases/seedream-still-before.webp",
      after: "/cases/seedream-still-after.webp",
      beforeAlt: "红色桌面上只有一块石头，后方是棕色墙面",
      afterAlt: "同一块石头上方加入了果实、瓷杯和花枝",
    },
  },
  {
    id: "adobe",
    category: "视频",
    model: "Adobe Project On Cue",
    title: "视频里的小狗，能在指定时刻跳起来",
    summary: "两个波峰对应两次起跳。Adobe 在舞台上调的是动作发生的时间。",
    date: "2026-11-11",
    limit: "这是研究原型。Adobe Labs 目前提供上线通知。",
    credit: "Adobe MAX 官方演示片段",
    source: { label: "Adobe Labs 演示", url: adobe },
    type: "video",
    media: {
      src: "https://images-tv.adobe.com/mpcv3/11664/3492659/b8f920e0-0298-4d82-9ec3-c17d4c9ceda9/c8654585-93e8-474a-849c-0969dd9a1b5c_1794458873.854x480at800_h264.mp4",
      poster: "/cases/adobe-on-cue.webp",
      sourceUrl: adobe,
      label: "Adobe MAX Project On Cue 舞台演示",
      startAt: 105,
      endAt: 138,
      duration: "0:33",
    },
  },
  {
    id: "images",
    story: "chatgpt-images-26",
    category: "图像",
    model: "ChatGPT Images 2.6",
    title: "OpenAI 展示了用文字生成的循环动图",
    summary: "同一角色举灯笼、眨眼，木屋灯光跟着变化。这段循环约 1.8 秒。",
    date: "2026-11-04",
    limit: "官方示例只有 9 帧，提示词要求相机固定、动作回到起点。",
    credit: "OpenAI API 文档示例",
    poster: "/cases/images26-lantern.webp",
    motion: "https://developers.openai.com/images/platform/guides/image-prompting/monkey-lantern-gpt-image-2-6-sunburst.gif",
    alt: "雪夜里，小猴举起暖黄色纸灯笼，背景是一间亮灯的木屋",
    source: { label: "OpenAI API 示例", url: imageGuide },
    type: "motion",
  },
];

export const continuity = {
  title: "两张参考图连成一次推镜",
  text: "左边给出街景和吃面两张图。右侧新版用一次推镜把它们连起来，并补出厨师端面的过程。约 7.5 秒，两版人物手里的餐具也不同。参考图能指定镜头两端，中间的动作和道具仍由模型补全。",
  credit: "Google 官方样片 · 左侧参考图，中间 1.1，右侧 1.2",
  source: { label: "Google 官方对照", url: omni },
  media: {
    src: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/Ramen_Bar_Demo_jeWGtqx.mp4",
    poster: "/cases/omni-ramen.webp",
    sourceUrl: omni,
    label: "Gemini Omni 拉面店新旧版本对照",
    duration: "0:10",
    muted: true,
  },
};

export const walletNews = [
  {
    id: "wallet-read",
    product: "Gemini · Google Wallet",
    title: "能读账单和生成图表",
    text: "美国 Gemini 应用用户可授权读取已连接账户的支出。这次新增的是只读授权，读到的账户信息只用于分析，无法用这项授权转账或付款。",
    source: { label: "Google 官方演示", url: "https://blog.google/innovation-and-ai/products/gemini-app/google-wallet-gemini-app/" },
  },
  {
    id: "wallet-approval",
    product: "ChatGPT Wallet · dots",
    title: "能代结账，要本人批准",
    text: "每笔都要确认商品、总价和卡片，并通过生物识别。只在 dots 内使用，正向持有符合条件信用卡的美国成年 Pro 用户逐步开放。",
    source: { label: "OpenAI 购买说明", url: "https://help.openai.com/en/articles/20001654-making-purchases-with-chatgpt-wallet" },
  },
];
