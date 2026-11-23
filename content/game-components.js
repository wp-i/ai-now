export const uthanaMotion = {
  id: "uthana-motion-fingers",
  topic: "software",
  product: "Uthana · Video-to-Motion 3.0",
  date: "2026-11-10",
  title: "把真人手势变成游戏角色的手指动作",
  summary: "跟着最左侧的真人看手指。蓝色角色比红色角色更接近手指的张合和交叠，最右侧还能看到每个关节的运动。",
  limit: "输入是真人表演，AI 提取的是可以继续编辑的骨骼动作。样片固定了角色位置，并以半速播放手势。",
  source: { label: "Uthana 的原始动作对照", url: "https://uthana.com/blog/introducing-video-to-motion-3-0" },
  video: {
    src: "/originals/uthana-motion-fingers.mp4",
    poster: "/originals/uthana-motion-fingers.jpg",
    duration: "0:04",
    aspect: "8 / 3",
    previewSeconds: 3.6,
    muted: true,
    label: "真人表演、两代角色动画和可编辑骨架的逐帧动作对照",
  },
};

export const redScarfGameAsset = {
  id: "red-scarf-game-asset",
  topic: "software",
  product: "The Red Scarf · Tripo",
  date: "2026-10-21",
  title: "商店屋顶成了跳台",
  summary: "《The Red Scarf》的实机画面里，红围巾角色从街面跃上商店屋顶，再跨向相邻楼顶。首领战中，浮空的店铺组成一段攀爬路线。",
  limit: "AI 做出了店铺外形。作者把店铺放进关卡，调好屋顶的间距和落脚点。",
  source: {
    label: "Tripo 原始演示与制作记录",
    url: "https://www.tripo3d.ai/tutorials/the-red-scarf-claude-code-tripo-godot",
  },
  video: {
    src: "/originals/red-scarf-gameplay.mp4",
    poster: "/originals/red-scarf-gameplay.webp",
    duration: "0:30",
    previewStart: 3.6,
    previewSeconds: 4,
    label: "红围巾角色在生成的商店屋顶之间移动的 Godot 实机原片",
  },
};
