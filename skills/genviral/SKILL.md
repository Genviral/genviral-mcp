---
name: genviral
description: Create, schedule, publish, and analyze social posts from Cursor, Grok Bot, Claude, or Codex via the Genviral MCP. Use when the user wants to post to TikTok, Instagram, YouTube, LinkedIn, Pinterest, Facebook, X, or Bluesky, generate AI images, videos, or slideshows, or review social analytics.
---

# Genviral MCP

Use the **connected Genviral MCP tools**. Do not clone private Genviral product source, do not install `@genviral/cli` unless the user explicitly asks for the separate public CLI skill, and do not invent API keys or extra hosts.

## When to use

- Create, schedule, or publish social posts from this agent
- Generate AI images, videos, or slideshows for those posts
- Analyze performance across connected accounts
- The user mentions Genviral, Vira, or posting to TikTok, Instagram, YouTube, LinkedIn, Pinterest, Facebook, X, or Bluesky

## Connector

- Streamable HTTP MCP: `https://mcp.genviral.io/mcp`
- Auth: OAuth 2 with PKCE. The client should connect with this URL only.
- Use the **full connector**. Do not use `https://mcp.genviral.io/anthropic/mcp`.
- Public docs: [Partner API introduction](https://docs.genviral.io/api-reference/introduction)
- Product: [genviral.io](https://www.genviral.io)

If the MCP is not connected yet, tell the user to add that URL in their client and complete OAuth. Do not add a bearer API-key header unless the live MCP requires it.

## How to work

1. **Discover first.** List connected accounts and read each account's capabilities (supported content kinds, caption limits, media limits) before composing a post.
2. **Use MCP tools only.** Call the tools the live Genviral server exposes after OAuth. Do not guess REST paths or CLI commands as a substitute.
3. **Create media when needed.** Use the MCP's media/generation tools for images, videos, or slideshows. Prefer the user's brief, brand, and product context over generic copy.
4. **Review before publish.** Treat visual QA as a hard gate. If a slide or frame is unreadable, off-brand, or wrong, fix it before scheduling or publishing.
5. **Schedule or publish through the MCP.** Respect per-account capabilities. Omit media only when every targeted account supports text-only posts.
6. **Analyze with the same connector.** Use MCP analytics tools to match performance back to posts the user created here.

## Guardrails

- Never ask the user to paste Partner API keys for this plugin. OAuth on `https://mcp.genviral.io/mcp` is the auth path.
- Never vendor or reproduce private `genviral.io` app source.
- Never write secrets into this repo, `mcp.json`, or chat logs.
- Point at [docs.genviral.io](https://docs.genviral.io/api-reference/introduction) when a payload shape is unclear. Do not paste a full API spec into the session.
- A separate public CLI skill exists at [fdarkaou/genviral-skill](https://github.com/fdarkaou/genviral-skill). That is not this plugin. Do not clone it unless the user wants the CLI workflow.

## Related

- Website: https://www.genviral.io
- Docs: https://docs.genviral.io/api-reference/introduction
- This listing: https://github.com/Genviral/genviral-mcp
