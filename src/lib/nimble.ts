// Server-only. Calls Nimble's Extract API (docs.nimbleway.com) to fetch a
// live recipe page for Toquee's "paste a link" scraping mode. NIMBLE_API_KEY
// must never reach the browser — only import this from server code (Server
// Actions, Route Handlers).

const NIMBLE_EXTRACT_ENDPOINT = "https://sdk.nimbleway.com/v2/extract";

export function isNimbleConfigured(): boolean {
  return Boolean(process.env.NIMBLE_API_KEY);
}

// Fetches a URL through Nimble (bypasses anti-bot blocks most recipe sites
// have) and returns the page as markdown, which is far easier to pattern-
// match for ingredient/instruction sections than raw HTML.
export async function scrapeUrlAsMarkdown(url: string): Promise<string | null> {
  const apiKey = process.env.NIMBLE_API_KEY;
  if (!apiKey) return null;

  const res = await fetch(NIMBLE_EXTRACT_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      render: "auto",
      formats: ["markdown"],
    }),
  });

  if (!res.ok) {
    throw new Error(`Nimble request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const markdown = json?.data?.markdown;
  return typeof markdown === "string" && markdown.length > 0 ? markdown : null;
}
