import assert from "node:assert/strict";
import test from "node:test";
import { getCommunityDiscovery } from "../lib/community-discovery.mjs";

const now = new Date("2026-11-14T16:00:00Z");
const recent = "2026-11-12T21:00:00Z";
const makeRelease = fields => ({ tag_name: "v1.2.3", published_at: recent, body: "Actual update", ...fields });

test("separates public releases and linked posts from validated editorial stories", async () => {
  const github = await getCommunityDiscovery(async (endpoint, options) => {
    assert.equal(options.redirect, "manual");
    if (endpoint.includes("ayanoby")) return Response.json([
      makeRelease({ html_url: "https://example.invalid/untrusted-release" }),
      makeRelease({ tag_name: "draft", draft: true }),
      makeRelease({ tag_name: "preview", prerelease: true }),
      makeRelease({ tag_name: "old", published_at: "2026-10-14T21:00:00Z" }),
    ]);
    if (endpoint.includes("Hy-Nomas")) return new Response(
      "Original: [post](https://x.com/BennyDaBall_OG/status/2117675372024070250?s=21) " +
      "https://x.com/BennyDaBall_OG/status/2117675372024070250 " +
      "https://x.com/someauthor/status/100000000000000001"
    );
    return new Response(null, { status: 503 });
  }, now);
  assert.deepEqual(github.candidates.map(x => x.url), [
    "https://github.com/ayanoby/hexanima/releases/tag/v1.2.3",
    "https://x.com/BennyDaBall_OG/status/2117675372024070250",
  ]);
  assert.equal(github.candidates[1].publishedAt, "2026-11-03T17:48:47.853Z");
  assert.equal(github.sources.filter(source => source.status === "ok").length, 2);
});

test("discovers newly created GitHub repositories without publishing candidates", async () => {
  const recent = { full_name: "author/fresh-world", name: "fresh-world", description: "Browser world", created_at: "2026-11-09T10:30:00Z", stargazers_count: 62 };
  let searches = 0;
  const result = await getCommunityDiscovery(async endpoint => {
    const url = new URL(endpoint);
    if (url.pathname === "/search/repositories") {
      searches++;
      assert.match(url.searchParams.get("q"), /created:>=2026-10-31 stars:>=15/);
      assert.equal(url.searchParams.get("sort"), "stars");
      return Response.json({ items: [
        recent,
        { ...recent, full_name: "fork/fresh-world", fork: true },
        { ...recent, full_name: "owner/older-world", created_at: "2026-09-08T10:30:00Z" },
        { ...recent, full_name: "owner/archived-world", archived: true },
        { ...recent, full_name: "owner/../mismatched" },
      ] });
    }
    if (url.hostname === "api.github.com") return Response.json([]);
    if (url.hostname === "hn.algolia.com") return Response.json({ hits: [] });
    return new Response("");
  }, now);
  assert.equal(searches, 2);
  assert.deepEqual(result.candidates.map(item => [item.url, item.stars]), [["https://github.com/author/fresh-world", 62]]);
  assert.ok(result.searchQueries.some(query => query.includes("site:facebook.com")));
});
