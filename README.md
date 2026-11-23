# AI 资讯站

给想了解 AI 发展进度的中文读者看实际产出。直接看原图、拖拽比较照片编辑、播放原片和音轨，也可以到原作试玩游戏或网页。公开页面无需登录。

[打开网站](https://ai-now-cn-261113.wp9617.chatgpt.site/) · [产品目标与复盘](docs/PROJECT.md) · [选材规则](content/editorial-policy.md) · [展示审核记录](content/showcase-review.md)

## 浏览

首页以图像和视频开场，拓展到声音、游戏和网页创作。第 36 版的首页有 11 件作品，五个专区共 29 件。作品卡标注可核实的来源、日期和模型或创作工具，并说明 AI 真正完成的部分。

## 本地运行

需要 Node.js 22.13 或以上。

```sh
npm ci
npm run dev
```

打开命令行显示的地址。公开展示的目录自带数据和媒体，开发预览无需配置编辑账号。

```sh
node --test
npm run build
```

如需试用可持久保存版次的生产运行方式，构建后使用以下命令初始化本地数据库并启动。已有本地数据库只需应用尚未执行的迁移。

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_flaky_black_widow.sql
npm start
```

## 维护

- `lib/output-catalog.js` 管理已审作品与首页编排，`content/` 管理作品信息、来源、候选与审核记录。`app/` 维护浏览和媒体交互。
- 公开目录由已核验的源码版本更新。动态订阅和受保护的编辑接口保留在 `/api/live`、`/api/editorial` 和 `/mcp`，其中编辑版次使用 D1。编辑者由服务端的 `EDITORIAL_OWNER_EMAIL` 核对，写入需提供当前 revision。生产部署沿用 Sites。
- 提交前对照[产品目标与当前进度](docs/PROJECT.md)，记录新增作品的原作、可观察结果和同类对照。正文页面和重点交互以 PC 浏览器验证。

图像、视频和声音保留原作者的署名与来源。这些素材的权利和使用条件遵循原作者或发布平台的声明。

## 发布与回查

1. 在 [wp-i/ai-now](https://github.com/wp-i/ai-now) 记录源码提交与本轮选材记录。
2. 更新公开站时，使用 `.openai/hosting.json` 对应的现有 Sites 项目，从待发布的源码构建。发布后在 PC 打开正式站，检查首页、受影响的分类页，以及作品的媒体和来源入口。在审核记录中写下站点版本和验证结果。
3. 作品集的项目信息维护在 [wp-i/wp-homepage](https://github.com/wp-i/wp-homepage) 的 `src/content/site.ts`。作品集入口有变化时，等 GitHub Pages 发布完成，再检查公开条目能打开站点和源码。
