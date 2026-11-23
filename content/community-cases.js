const hexanima = "https://github.com/ayanoby/hexanima#qwen-image-21-turbo";
const docling = "https://github.com/docling-project/docling/issues/3830";
const sumi = "https://github.com/hama-jp/sumi-os-claude-fable-5-2/blob/main/RESULTS.md";
const foley = "https://yjx-research.github.io/ControlFoley/#demos";

export const phoneCase = {
  id: "phone-edit",
  product: "HexAnima · Qwen-Image 2.1 Turbo",
  date: "2026-11-14",
  dateLabel: "11月14日核对",
  title: "手机离线改灯牌，把 OPEN 换成 CLOSED",
  summary: "开发者在手机上先生成咖啡馆，再把霓虹灯牌从 OPEN 改成 CLOSED。旁边的小黑板还写着 Fresh Coffee $3。",
  limit: "作者的设备是 12 GB 内存的小米 12T Pro。Qwen 权重需先下载约 14 GB，这类编辑耗时约 40–50 秒。",
  source: { label: "GitHub · 原图和设备条件", url: hexanima },
  images: [
    { src: "/community/phone-before.webp", width: 768, height: 512, alt: "原图中，咖啡馆霓虹灯牌显示 OPEN", label: "原图 · OPEN" },
    { src: "/community/phone-after.webp", width: 768, height: 512, alt: "手机编辑后，咖啡馆灯牌显示 CLOSED，小黑板仍写着 Fresh Coffee $3", label: "手机改图 · CLOSED" },
  ],
  caption: "作者发布的原图与改图，节选同一组店面",
};

export const worldCase = {
  id: "world-sound",
  product: "BennyDaBall · Hy-Nomas + LTX-2.5",
  date: "2026-11-04",
  title: "生成的火星场景可以接着驾驶和配音",
  summary: "创作者用键盘逐段改变火星车的路线，再用 LTX-2.5 给已生成的画面补声音。",
  limit: "演示是多段生成后的录制。作者报告在 RTX 5090 上生成约 1 秒的驾驶画面需要约 8 秒（832×480），操作和画面之间仍有等待。",
  source: { label: "X · 创作者原视频与工作流", url: "https://x.com/BennyDaBall_OG/status/2117675372024070250" },
  video: { src: "/community/world.mp4", poster: "/community/world.webp", label: "火星车沿键盘输入逐段改变路线的工作流片段", duration: "0:23" },
  caption: "作者录屏节选 · 右下角显示每轮按键与生成耗时",
};

export const foleyCase = {
  id: "foley-case",
  product: "Pallaidium · 小米 ControlFoley",
  date: "2026-11-08",
  title: "Blender 插件把生成音效放回时间线",
  summary: "独立插件 Pallaidium 接入小米的 ControlFoley，把视频和提示词生成的音效放回 Blender 时间线。",
  limit: "这段滑板声来自模型对无声画面的推测。插件维护者给出的本地条件为 CUDA 显卡、首次约 17 GB 下载，模型权重采用非商业许可。",
  source: { label: "GitHub · Pallaidium 集成记录", url: "https://github.com/tin2tin/Pallaidium" },
  video: { src: "/community/foley.mp4", poster: "/community/foley.webp", label: "ControlFoley 生成的滑板轮声与落地音效", duration: "0:08" },
  caption: "原始 ControlFoley 样片 · 静音输入，生成轮声与落地音",
  captionSource: { label: "原始样片", url: foley },
};

export const inflectCase = {
  id: "inflect-case",
  product: "Owen Song · Inflect v3 Mini",
  date: "2026-11-12",
  title: "独立开发者发布本地英文配音模型",
  summary: "Cassidy 是作者公开的六种英文声音之一。这段配音由原作者提供，可直接试听。",
  limit: "公开预设的样例范围是英语短句。这个片段无法验证中文发音或长篇旁白的一致性。",
  source: { label: "GitHub · Inflect 原始音频与说明", url: "https://github.com/owenawsong/Inflect" },
  audio: { src: "/community/cassidy.mp3", label: "Inflect v3 Mini Cassidy 英文音色" },
  audioTitle: "Cassidy",
  audioText: "Could you bring the smaller suitcase downstairs?",
  caption: "原作者样本 · Inflect Mini，24 kHz",
};

export const doclingCase = {
  id: "docling-case",
  product: "Docling · GitHub 用户复现",
  date: "2026-07-19",
  title: "PDF 转成 Markdown 后会丢失合并单元格",
  summary: "一份印尼语 PDF 的表格在 HTML 和 JSON 里保留了合并关系。导出 Markdown 时，跨行内容被摊到各行。",
  limit: "原文中的层级关系可能就在合并单元格里。逐行读取 Markdown 时，重复出现的内容容易被算作多条记录。",
  source: { label: "GitHub · 用户报告与维护者说明", url: docling },
  dataTable: true,
  caption: "按原报告重绘 · 原表编号 10 跨三行，Markdown 输出中会重复",
};

export const sumiCase = {
  id: "sumi-case",
  product: "hama-jp · Claude Fable 5.2",
  date: "2026-11-10",
  title: "Claude 写出的桌面系统在虚拟机启动",
  summary: "独立作者公布了 Sumi OS 的源码、提示词和检查记录。故意触发终端故障后，系统关闭了终端，五子棋窗口仍在。",
  limit: "模型累计运行 96 分钟，触及用量上限后由作者提供继续指令。验证环境是 QEMU，实机兼容性和长期稳定性仍缺证据。",
  source: { label: "GitHub · 运行记录与验证结果", url: sumi },
  images: [
    { src: "/community/sumi-gomoku-end.webp", width: 680, height: 594, alt: "Sumi OS 虚拟机里的五子棋应用已下了数步棋", label: "五子棋正常运行" },
    { src: "/community/sumi-crash-app.webp", width: 680, height: 594, alt: "系统弹出终端故障提示，后方五子棋窗口保持开启", label: "终端出错时" },
  ],
  caption: "原作者测试取帧 · 五子棋运行与终端故障检查",
};

export const saltlineCase = {
  id: "saltline-case",
  product: "Felix Rieseberg · Claude Fable 5.2",
  date: "2026-11-10",
  title: "Claude 生成了能操作的浏览器射击关卡",
  summary: "作者放出了港口关卡的实机录像和可运行版本，画面里可见移动、射击和换弹。",
  limit: "这是一个小关卡。作者自报运行约 8 小时，按 API 价格折算约 550 美元，这笔费用是估算。",
  source: { label: "X · 作者录像与用量", url: "https://x.com/felixrieseberg/status/2119925633564463609" },
  video: { src: "/community/saltline.mp4", poster: "/community/saltline.webp", label: "Saltline 浏览器游戏中的港口和射击操作", duration: "0:15", muted: true },
  caption: "作者实机录像节选",
  captionSource: { label: "浏览器版", url: "https://claude.ai/artifact/BGY1SztrAYcJQHSsnHHGmp" },
};

export const robotCase = {
  id: "robot-case",
  product: "NVIDIA GR00T N1.7 + SONIC · Unitree G1",
  title: "机器人抓起鞋子，掉落后重新抓取",
  summary: "真实试验中，机器人走到桌边抓鞋。画面记录了中途掉落后重新抓取的过程。",
  limit: "项目记录中鞋子抓取成功 14 次，共 27 次，重试后成功也计入。该数字只对应这组桌高和摆放位置。",
  source: { label: "GitHub · 实机视频与试验记录", url: "https://github.com/NVIDIA/Isaac-GR00T/tree/main/examples/GR00TWholeBodyControl#object-pickup-breakdown" },
  video: { src: "/community/robot.mp4", poster: "/community/robot.webp", label: "Unitree G1 真实实验中掉落鞋子后重新抓取", duration: "0:28", muted: true },
  caption: "GitHub 公开原始录像 · 真实机器人，包含重试",
};
