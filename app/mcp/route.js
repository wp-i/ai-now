import { readEdition, publishEdition } from "../../lib/editorial";
import { readLive } from "../../lib/live-cache";
import { canManageEditorial } from "../../lib/editorial-access";

export const dynamic = "force-dynamic";

const version = "2026-07-28";
const tools = [
  { name: "read_editorial", description: "读取当前已发布的版次和工具，含 revision。用来核验或制作更新。", inputSchema: { type: "object", additionalProperties: false } },
  { name: "refresh_official_feed", description: "刷新官方动态。community 返回 GitHub 近期项目与版本、项目记录引用的 X 原帖及 Show HN 作者发布，并提供 X 和 Facebook 的进一步发现查询。请核对原作者的实际产出和边界。", inputSchema: { type: "object", additionalProperties: false } },
  {
    name: "publish_editorial",
    description: "发布核验完成的 AI 产出。先读取 read_editorial 和 refresh_official_feed。value 需包含 edition（北京时间 YYYY-MM-DD）、stories、tools，提供完整列表，不传 checkedAt，保留同一作品的 id。每项标题描述素材中可观察的结果，需有 output（images、video、worlds、motion、editing、music、audio、software 或 spatial）、boundary（170 字内，说明观察到的限制或适用条件）和 evidence。evidence 包含 type（image、video 或 audio）、匿名可访问的 HTTPS 直链 url、中文 description（170 字内），video 还需要 HTTPS 封面 poster。首个来源指向原作者的作品或实测记录。",
    inputSchema: { type: "object", properties: { expectedRevision: { type: "integer", minimum: 0 }, value: { type: "object" } }, required: ["expectedRevision", "value"], additionalProperties: false },
  },
];
const result = (value, isError = false) => ({
  content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value) }],
  isError,
});

async function invoke(name, args) {
  try {
    if (name === "read_editorial") {
      const { revision, edition, storageUnavailable } = await readEdition();
      if (storageUnavailable) return result("编辑存储暂时不可用。", true);
      return result({ revision, edition });
    }
    if (name === "refresh_official_feed") return result(await readLive({ force: true }));
    if (name === "publish_editorial" && Number.isSafeInteger(args?.expectedRevision) && args.expectedRevision >= 0) {
      return result(await publishEdition(args.value, args.expectedRevision));
    }
    return result("工具名或参数无效。", true);
  } catch (error) {
    return result(error.issues ? error.issues.map(issue => issue.path.join(".") + " " + issue.message).join("\n") : error.message, true);
  }
}

export async function POST(request) {
  const raw = await request.text();
  if (raw.length > 160_000) return new Response(null, { status: 413 });
  let message;
  try { message = JSON.parse(raw); } catch {
    return Response.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
  }
  const id = message?.id ?? null;
  if (message?.jsonrpc !== "2.0" || typeof message.method !== "string") {
    return Response.json({ jsonrpc: "2.0", id, error: { code: -32600, message: "Invalid request" } });
  }
  if (message.method.startsWith("notifications/")) return new Response(null, { status: 202 });
  const serverInfo = { name: "ai-now-cn", title: "资讯编辑", version: "1.0.0" };
  let payload;
  switch (message.method) {
    case "server/discover":
      payload = { supportedVersions: [version], capabilities: { tools: {} }, serverInfo };
      break;
    case "initialize":
      payload = { protocolVersion: message.params?.protocolVersion ?? version, capabilities: { tools: {} }, serverInfo };
      break;
    case "ping":
      payload = {};
      break;
    case "tools/list":
      payload = { tools };
      break;
    case "tools/call":
      payload = canManageEditorial(request)
        ? await invoke(message.params?.name, message.params?.arguments)
        : result("需要编辑权限。", true);
      break;
    default:
      return Response.json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } });
  }
  return Response.json({ jsonrpc: "2.0", id, result: payload }, { headers: { "Cache-Control": "no-store" } });
}
