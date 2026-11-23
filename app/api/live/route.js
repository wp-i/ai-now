import { readLive } from "../../../lib/live-cache";
import { canManageEditorial } from "../../../lib/editorial-access";

export const dynamic = "force-dynamic";

export async function GET(request) {
  if (!canManageEditorial(request)) return Response.json({ error: "需要编辑权限。" }, { status: 403, headers: { "Cache-Control": "private, no-store" } });
  const data = await readLive({ force: new URL(request.url).searchParams.get("refresh") === "1" });
  return Response.json(data, { headers: { "Cache-Control": "private, no-store" } });
}
