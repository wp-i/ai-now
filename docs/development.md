# 开发与发布

## 从哪里改

| 改动 | 入口 |
| --- | --- |
| 首页编排与公共目录 | [`lib/output-catalog.js`](../lib/output-catalog.js) |
| 单件作品、媒体地址和出处 | [`content/showcase/`](../content/showcase/) |
| 浏览、分类和媒体交互 | [`app/`](../app/) |
| 编辑版次、候选采集与测试 | [`lib/`](../lib/)、[`content/editorial.json`](../content/editorial.json)、[`tests/`](../tests/) |
| 运行环境、托管与迁移 | [`worker/`](../worker/)、[`drizzle/`](../drizzle/)、[`.openai/hosting.json`](../.openai/hosting.json) |

公开目录只收录已核验作品，随源码版本更新。编辑接口管理候选、版次和采集结果，通过部署环境核对编辑身份。`/api/editorial` 读取或写入版次，写入提交当前 revision。`/api/live` 读取采集结果，`/mcp` 提供相应的编辑工具。

## 本地与验证

```sh
npm ci
npm run dev
npm test
npm run build
```

首页和分类页可以直接用仓库自带的数据与素材预览。要使用可持久保存的本地 D1，在构建后应用 [现有迁移](../drizzle/)，再启动生产预览。已有本地数据库只需应用尚未执行的迁移。

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_flaky_black_widow.sql
npm start
```

新增作品时，把会实际展示的文件与来源一并提交。移除素材前同时核对公共目录、样式和当前编辑版次。构建成功后，从 PC 浏览器验证受影响的页面和交互。

## 发布

1. 在 [AI Now 源码仓库](https://github.com/wp-i/ai-now) 提交代码和本轮版本记录。
2. 更新线上站点时，使用 `.openai/hosting.json` 对应的现有 Sites 项目，从要发布的提交构建。发布后检查正式站，在版本记录中注明线上版本和实测结果。
3. 作品集入口维护在 [WP Homepage](https://github.com/wp-i/wp-homepage) 的 `src/content/site.ts`。入口变化时，等 GitHub Pages 更新后实测公开条目能访问站点与源码。
