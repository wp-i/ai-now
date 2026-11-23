function photo(file, width, height, alt, label) {
  const src = "/stills/" + file + ".webp";
  const variants = [480, 900].filter(size => size < width)
    .map(size => "/stills/" + file + "-" + size + ".webp " + size + "w");
  return { src, width, height, alt, label, srcSet: [...variants, src + " " + width + "w"].join(", ") };
}

export const imageStories = [
  {
    id: "wind-street", topic: "images", dimension: "街头与人物", product: "Seedream 5.5", date: "2026-11-09",
    title: "风卷过镜片，她低着头看手机",
    summary: "一绺头发横过墨镜，街角和路灯一起倾斜，画面左边只来得及留下半个行人。",
    limit: "提示词指定了风向和倾斜约 25° 的机位。看人物、楼柱和街道是否处在同一个倾斜的画面里。",
    source: { label: "字节 Seed 样张", url: "https://seed.bytedance.com/en/seedream5_5" },
    images: [photo("wind-street", 1900, 1073, "倾斜的街口，一名戴墨镜的女子低头看手机，头发被风吹到脸前")],
  },
  {
    id: "tea-house", topic: "images", dimension: "街头与人物", product: "同一提示词", date: "2026-11-09",
    title: "一壶茶，三种窗光",
    summary: "三张图都画了倒茶的老人。看壶嘴下的茶流，再看后桌客人的脸从暗处显出来多少。",
    limit: "三张均为独立生成。按作者标注拆分原帖中的三联图，保留每张的取景。",
    source: { label: "@ozansihay", url: "https://x.com/ozansihay/status/2119803963738357803" },
    series: [
      photo("tea-gpt", 1900, 1068, "茶馆的老人从上下叠放的壶里倒出红茶，身后墙面贴着告示", "GPT Image 2.6"),
      photo("tea-seed", 1900, 1068, "老人站在窗户右边倾斜双层茶壶，侧光穿过屋里的薄雾", "Seedream 5.5"),
      photo("tea-nano", 1900, 1068, "格纹衬衫的老人低头倒茶，靠窗的三位客人围坐在桌边", "Nano Banana 2.1"),
    ],
  },
  {
    id: "road-snow", topic: "images", dimension: "编辑前后", product: "GPT Image 2.6 Sunburst",
    title: "雪落在同一块广告牌上",
    summary: "雪积在牌顶和路肩，车尾灯在湿路面上多了一道红色倒影。瓶身和广告字仍在原位。",
    limit: "左图是 AI 先生成的黄昏场景，右图在它的基础上加入了雪。",
    source: { label: "OpenAI 原始样张", url: "https://developers.openai.com/api/docs/guides/image-prompting?model=gpt-image-2.6#change-one-condition" },
    comparison: { before: "/stills/road-sunset.webp", after: "/stills/road-snow.webp",
      beforeSrcSet: photo("road-sunset", 1024, 1536).srcSet, afterSrcSet: photo("road-snow", 1024, 1536).srcSet,
      width: 1024, height: 1536, references: false, beforeLabel: "生成底图", afterLabel: "加雪后",
      beforeAlt: "落日下的公路，广告牌上写着 Fresh and clean，车辆驶过干燥路面",
      afterAlt: "同一块广告牌覆着积雪，车灯和天光映在湿滑路面上" },
  },
  {
    id: "circle-stair", topic: "images", dimension: "构图与媒介", product: "Nano Banana 2.1", date: "2026-10-07",
    title: "圆窗里的人，站在光与影的交界",
    summary: "圆洞把右侧楼梯框住，扶手、梯级和斜着落下的光穿过同一个圆。人物只占其中一角。",
    limit: "作者在提示词中指定了混凝土楼梯、圆形开口和黑白建筑人像。",
    source: { label: "@ChillaiKalan__", url: "https://x.com/ChillaiKalan__/status/2107688620081738000" },
    images: [photo("circle-stair", 1493, 2000, "大片黑色中露出圆形洞口，明暗交界的混凝土楼梯上站着一个人")],
  },
  {
    id: "market-lunch", topic: "images", dimension: "街头与人物", product: "Seedream 5.5", date: "2026-11-09",
    title: "筷子还没放下，她先笑了",
    summary: "桌沿切掉了半只碗，握筷子的手靠近镜头。棚下的人脸和身后曝亮的街道落在两档光里。",
    limit: "右上角的招牌还能认出“牛肉”。再往下看，几个红字已经难以辨认。",
    source: { label: "@DrSadek_", url: "https://x.com/DrSadek_/status/2119788316153507886" },
    images: [photo("market-lunch", 1500, 2000, "露天摊位上穿牛仔衬衫的女子手持筷子笑着说话，背景是亮处的街道")],
  },
  {
    id: "iris-study", topic: "images", dimension: "材质与光影", product: "Seedream 5.5 / GPT", date: "2026-11-09",
    title: "同一句提示词，两种眼部特写",
    summary: "留意眼睑边缘的水光、皮肤上的细汗，以及头发在眼角投下的阴影。两张图对高光和取景都有不同处理。",
    limit: "两张玻璃片上都有 Seedream 字样。模型按作者原帖标注，原帖没有写 GPT 的具体版本。",
    source: { label: "@Yuziyyaa", url: "https://x.com/Yuziyyaa/status/2119799602580955179" },
    images: [
      photo("iris-study-1", 1024, 1024, "Seedream 5.5 生成的湿润眼睑、睫毛和额前发丝特写", "Seedream 5.5"),
      photo("iris-study-2", 1024, 576, "GPT 生成的横幅眼部特写，眼下有泪滴", "GPT"),
    ],
  },
  {
    id: "rain-poster", topic: "images", dimension: "文字与版式", product: "Seedream 5.5", date: "2026-11-09",
    title: "片名清楚，侧栏小字开始出错",
    summary: "片名写进楼群上方的暗部。人物、店招和伞沿上的高光，共用同一组蓝紫色。",
    limit: "右侧小字写到“雨声，以声，及”就停了。这是一张生成的虚构电影海报。",
    source: { label: "@TqMiracle18260", url: "https://x.com/TqMiracle18260/status/2119765639825089008" },
    images: [
      photo("rain-poster", 634, 964, "中文标题雨夜之城下的蓝紫色街道与回首的动画角色"),
    ],
  },
  {
    id: "negative-leaf", topic: "images", dimension: "文字与版式", product: "Nano Banana 2.1", date: "2026-10-07",
    title: "叶片的空隙拼出 NANO BANANA",
    summary: "字母和叶片共用一道轮廓。把目光从绿色移到白色，就能读出藏在叶片里的两行字。",
    limit: "这个字形依赖特定的叶片、视角和背景。",
    source: { label: "@fofrAI", url: "https://x.com/fofrAI/status/2107509669514113058" },
    images: [
      photo("negative-leaf", 1493, 2000, "白色背景上的绿色龟背竹叶，镂空形状拼成 NANO BANANA"),
    ],
  },
  {
    id: "sport-covers", topic: "images", dimension: "文字与版式", product: "GPT Image 2.6", date: "2026-11-07",
    title: "滑雪板和船帆都能穿过刊名",
    summary: "运动员的身体挡住一部分红色大字，另一张用船帆切开白色标题。字体和主体共享前后层次。",
    limit: "两张是作者公开的封面试作，边缘的小号文字需要放大核读。",
    source: { label: "@Goodmanprotocol", url: "https://x.com/Goodmanprotocol/status/2119083132691615772" },
    images: [
      photo("sport-covers-1", 1122, 1402, "单板滑雪运动员腾空，红色 SNOWBOARDING 大标题横穿画面"),
      photo("sport-covers-2", 1122, 1402, "俯视海面中的蓝色帆船，白色 SAILING 标题穿过帆影"),
    ],
  },
  {
    id: "ink-winter", topic: "images", dimension: "构图与媒介", product: "GPT Image 2.6", date: "2026-11-07",
    title: "立冬画面只用了几颗柿子和一枝残荷",
    summary: "细枝从纸面右上斜入，橙色集中在柿子上。淡墨和大块留白把视线留给下方的枯荷。",
    limit: "取自作者同一主题的两幅输出，此处为其中一幅。",
    source: { label: "@DeepBlueX0", url: "https://x.com/DeepBlueX0/status/2118893793797914959" },
    images: [
      photo("ink-winter", 941, 1672, "浅米色立冬节气画，柿子、残荷和竖排题字占据不同位置"),
    ],
  },
  {
    id: "diorama-room", topic: "images", dimension: "构图与媒介", product: "GPT Image 2", date: "2026-10-15",
    title: "把一间卧室折成桌上的立体纸片",
    summary: "床、盆栽和窗户从上方的房间场景转到下方的纸片模型里。纸边、折痕和投影让它看起来可以拿在手上。",
    limit: "上下是作者发布的一张合成构图，两个场景中的家具细节有所变化。",
    source: { label: "@Taaruk_", url: "https://x.com/Taaruk_/status/2110655754927772000" },
    images: [
      photo("diorama-room", 768, 1024, "上半是日照下的卧室，下半是以同一房间为主题的浮起纸片"),
    ],
  },
];
