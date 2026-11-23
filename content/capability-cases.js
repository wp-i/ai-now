const model = "https://seed.bytedance.com/zh/seed3d_2_0";
const translate = "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-live-3-5-translate/";
const search = "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/#fast-everyday-help-in-the-gemini-app-and-search";

export const modelCase = {
  id: "model-3d",
  product: "Seed3D 2.0",
  date: "2026-04-23",
  title: "烤箱图片生成了可拆分的三维模型",
  summary: "模型把门板和箱体分开，生成的部件可以转动查看。",
  limit: "原图看不到内部连接和尺寸。拆得开的结构由模型推断，装配间隙、铰链和尺寸精度需要实测。",
  source: { label: "字节 Seed 原始演示", url: model },
  video: { src: "/boundaries/model.mp4", poster: "/boundaries/model.webp", label: "Seed3D 2.0 烤箱部件拆分", duration: "0:13", muted: true },
  caption: "输入图在右下，生成模型在中央",
};

export const speechCase = {
  id: "speech-case",
  product: "Google 翻译 · Gemini 3.5 Live Translate",
  date: "2026-06-09",
  title: "西班牙语导览边说边译成英语",
  summary: "导游讲话时，原文和译文都在继续增长。",
  limit: "译音要等待一点上下文。Google 说明译音会落后原声几秒，这个样片只展示一位导游连续讲话。",
  source: { label: "Google 同传演示", url: translate },
  video: { src: "/boundaries/translation.mp4", poster: "/boundaries/translation.webp", label: "西班牙语导览实时译成英语", duration: "0:20" },
  caption: "保留原声的官方片段 · 西班牙语 → 英语",
};

export const searchCase = {
  id: "search-case",
  product: "Google 搜索 · Gemini 4 Hydrogen",
  date: "2026-11-12",
  title: "AI 搜索给出预算区间和隔断方案",
  summary: "两版搜索收到同一个问题：小公寓怎么隔开床和办公区，预算低于 200 美元。",
  limit: "新版的 80–140 美元是参考区间。该回答未列出能按这个价买到的具体商品。",
  source: { label: "Google 搜索原始对照", url: search },
  sample: [
    { label: "Gemini 3.5 Flash", text: "先调整书桌方向和沙发位置。这一步可以免费完成。" },
    { label: "Gemini 4 Hydrogen", text: "换成开放式书架做隔断。给出的预算区间为 80–140 美元。" },
  ],
  caption: "据官方回答转述 · 同一个问题",
};

export const writingCase = {
  id: "writing-case",
  product: "ChatGPT · 可编辑草稿",
  title: "通知草稿保留了待确认的日期",
  summary: "零散便签被改写成一条可编辑的通知。",
  limit: "输入只有星期和时刻。草稿仍需要补齐日期和会议链接。",
  source: { label: "OpenAI 草稿编辑说明", url: "https://help.openai.com/en/articles/20001246-working-with-writing-blocks-and-code-blocks-in-chatgpt" },
  sample: [
    { label: "输入便签", text: "周四三点，十分钟，讲新版试用。线上，链接待补。" },
    { label: "生成草稿", text: "新版试用介绍定于周四 15:00 线上举行，约 10 分钟。具体日期和会议链接待确认。" },
  ],
  caption: "本站示例 · 使用虚构便签",
};
