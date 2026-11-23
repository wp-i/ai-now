import { readEdition, publishEdition } from "../../../lib/editorial";
import { canManageEditorial } from "../../../lib/editorial-access";

export const dynamic = "force-dynamic";

function reply(value, status = 200) {
  return Response.json(value, { status, headers: { "Cache-Control": "private, no-store" } });
}

export async function GET(request) {
  if (!canManageEditorial(request)) return reply({ error: "需要编辑权限。" }, 403);
  const { revision, edition, storageUnavailable } = await readEdition();
  if (storageUnavailable) return reply({ error: "编辑存储暂时不可用。" }, 503);
  return reply({ revision, edition });
}

export async function POST(request) {
  if (!canManageEditorial(request)) return reply({ error: "需要编辑权限。" }, 403);
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply({ error: "不接受跨站写入。" }, 403);
  if (!/^application\/json\b/i.test(request.headers.get("content-type") ?? "")) return reply({ error: "需要 JSON 请求。" }, 415);
  if (Number(request.headers.get("content-length")) > 160_000) return reply({ error: "版次数据过大。" }, 413);

  let body;
  try {
    const raw = await request.text();
    if (raw.length > 160_000) return reply({ error: "版次数据过大。" }, 413);
    body = JSON.parse(raw);
  } catch {
    return reply({ error: "JSON 无效。" }, 400);
  }
  if (!Number.isSafeInteger(body?.expectedRevision) || body.expectedRevision < 0) {
    return reply({ error: "缺少有效的 expectedRevision。" }, 400);
  }

  try {
    return reply(await publishEdition(body.value, body.expectedRevision));
  } catch (error) {
    if (error.issues) return reply({ error: "版次数据校验失败。", issues: error.issues }, 400);
    const message = error.message;
    if (message === "版次已变更，请重新读取后合并。") return reply({ error: message }, 409);
    if (message === "版次日期应在当前版次与北京时间今天之间。") return reply({ error: message }, 400);
    console.error("Editorial publication failed", error);
    return reply({ error: "编辑存储暂时不可用。" }, 503);
  }
}
