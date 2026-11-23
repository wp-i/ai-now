import { env } from "cloudflare:workers";

export function canManageEditorial(request) {
  const owner = env.EDITORIAL_OWNER_EMAIL?.trim().toLowerCase();
  const email = request.headers.get("oai-authenticated-user-email")?.trim().toLowerCase();
  return Boolean(owner && request.headers.get("oai-authenticated-user-id") && email === owner);
}
