const kling = "https://kling.ai/quickstart/kling-image-4-user-guide";
const genie = "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/genie-4-now-available-project-genie/";
const lynote = "https://github.com/lynote-ai/local-ai-note-taker#the-measurements";
const tinyVoca = "https://huggingface.co/n4ze3m/tiny-voca#samples";

export const klingCase = {
  id: "kling-views",
  date: "2026-11-18",
  product: "可灵 Image 4.0",
  title: "一张角色参考图扩成正、侧、背三视图",
  summary: "同一角色被并排画在三个角度，另有脸部特写，服装轮廓和发型可以直接对照。",
  limit: "背面由模型根据参考推断。这组是官方选出的样张，各视角的衣饰细节仍需逐个核对。",
  source: { label: "可灵原图与提示词", url: kling },
  images: [{ src: "/outputs/kling-views.webp", width: 1360, height: 768, alt: "可灵生成的角色参考表，左侧为脸部特写，右侧为全身正面、侧面和背面" }],
  caption: "可灵发布的生成结果",
};

export const antsCase = {
  id: "genie-ants",
  date: "2026-11-18",
  product: "Genie 4 · Anand Gandhi",
  title: "以蚂蚁的视角走进生成的蚁穴",
  summary: "镜头贴着泥土前进，在枝梗和蚁群之间转向。这是电影创作者 Anand Gandhi 参与制作的可探索场景。",
  limit: "画面由模型随操作生成。Google 仍在解决复杂接触和离开后回到同一地点时的场景一致性。",
  source: { label: "项目原始演示", url: genie },
  video: { src: "/outputs/genie-ants.mp4", poster: "/outputs/genie-ants.webp", label: "Genie 4 蚁穴探索片段", duration: "0:15" },
  caption: "项目公布的《The Life of Ants》节选",
};

export const tinyVocaCase = {
  id: "tiny-voca",
  date: "2026-11-14",
  product: "n4ze3m · tiny-voca",
  title: "18 MB 的模型能合成带反问语气的英语",
  summary: "这段关于生日的反问句来自作者公开的女声样本。仅用 CPU 即可运行。",
  limit: "18 MB 指 PyTorch 权重。作者只提供两种美式英语声音，样本范围是短句。",
  source: { label: "Hugging Face · 原声与模型说明", url: tinyVoca },
  audioText: "Did you really think I would forget your birthday?",
  audio: { src: "/outputs/tiny-voca.mp3", label: "tiny-voca 女声英语试听" },
};

export const lynoteCase = {
  id: "lynote-context",
  date: "2026-11-12",
  product: "Lynote · Qwen3 1.7B",
  title: "会议逐字稿太长时，本地助手悄悄漏掉末尾提问",
  summary: "开发者在模拟会议中放入三条标记，再要求模型逐条找出。输入超出这台设备的上下文设定后，结果差异很大。",
  limit: "这是一次固定上下文设定下的故障复现。项目随后改为按实际长度拆分，长稿要多次调用模型。",
  source: { label: "GitHub · 实测日志与改动", url: lynote },
  sample: [
    { label: "短稿 · 实际输出", text: "找回全部 3 条标记。" },
    { label: "超长稿 · 实际输出", text: "给出了会议摘要，3 条标记均未列出，程序也没报错。" },
  ],
  caption: "根据作者的同任务测试记录转述",
};

export const booCase = {
  id: "boo-mas",
  date: "2026-11-19",
  product: "Robin Duckett · Claude Fable 5.2",
  title: "一个提示生成可玩的雪地小星球",
  summary: "在 Boo-mas，玩家用鼠标或触控带着串灯绕行。闭合一圈后，里面的树和房子会亮起来。",
  limit: "单次提示是作者自述。现场录制验证了移动和串灯反馈，规模是一个浏览器小游戏。",
  source: { label: "打开原作者的游戏", url: "https://robinduckett.github.io/boo-mas/" },
  video: { src: "/outputs/boo-mas.mp4", poster: "/outputs/boo-mas.webp", label: "Boo-mas 游戏中控制幽灵在雪地拖动串灯", duration: "0:08", muted: true },
  caption: "本站在作者发布的游戏中实际操作录制",
};

export const fastFramesCase = {
  id: "fastframes-lingbot",
  date: "2026-11-18",
  product: "Apple FastFrames · GitHub",
  title: "同一次按键，生成画面的响应从约 0.8 秒降到 0.05 秒",
  summary: "左右画面同时接收键盘输入。右侧镜头能及时跟上连续按键，左侧的动作还在排队。",
  limit: "约 0.05 秒是团队这次 LingBot 演示的延迟。FastFrames-S 的单卡性能数据来自 NVIDIA B200。",
  source: { label: "原始对照录像", url: "https://apple-aiml-research.github.io/ml-fastframes/#interactive-demo" },
  video: { src: "/community/fastframes-lingbot.mp4", poster: "/community/fastframes-lingbot.webp",
    label: "LingBot 原版与使用 FastFrames 优化版对照", duration: "0:21", muted: true },
  caption: "原作者录像节选 · 左为原版，右为优化版",
};
