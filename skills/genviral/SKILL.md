---
name: genviral
description: Create, schedule, publish, and analyze social posts via the Genviral MCP. Use when the user wants to post to TikTok, Instagram, YouTube, LinkedIn, Pinterest, Facebook, X, or Bluesky, generate AI images, videos, or slideshows, or review social analytics from Cursor, Grok Bot, Claude, ChatGPT, or Codex.
---

# Genviral MCP

Use the **connected Genviral MCP tools**. Do not clone private Genviral product source, do not install `@genviral/cli` unless the user explicitly asks for the separate public CLI skill, and do not invent API keys or extra hosts.

Product: [Genviral](https://www.genviral.io) · MCP page: [www.genviral.io/mcp](https://www.genviral.io/mcp) · Docs: [docs.genviral.io](https://docs.genviral.io) · [Partner API](https://docs.genviral.io/api-reference/introduction)

## When to use

- Create, schedule, or publish social posts from this agent
- Generate AI images, videos, or slideshows for those posts
- Analyze performance across connected accounts
- The user mentions Genviral, Vira, or posting to TikTok, Instagram, YouTube, LinkedIn, Pinterest, Facebook, X, or Bluesky

## Endpoints

| Host | URL |
| --- | --- |
| Cursor, Grok Bot, full connector | `https://mcp.genviral.io/mcp` |
| Claude custom connector / Anthropic directory | `https://mcp.genviral.io/anthropic/mcp` |

Auth is **OAuth 2 (PKCE)** on both URLs. Do not add a bearer API-key header or a plugin variable. ChatGPT and Codex should use OpenAI's plugin directory when that listing is available; do not invent another host.

This Cursor plugin's `mcp.json` uses the full connector. If the MCP is not connected yet, tell the user to add the URL for their host and complete OAuth.

## How to work

1. **Discover first.** List connected accounts and read each account's capabilities (supported content kinds, caption limits, media limits) before composing a post.
2. **Use MCP tools only.** Call the tools the live Genviral server exposes after OAuth. Do not guess REST paths or CLI commands as a substitute.
3. **Create media when needed.** Use the MCP's media/generation tools when they are available (full connector). Prefer the user's brief, brand, and product context over generic copy.
4. **Review before publish.** Treat visual QA as a hard gate. If a slide or frame is unreadable, off-brand, or wrong, fix it before scheduling or publishing.
5. **Schedule or publish through the MCP.** Respect per-account capabilities. Omit media only when every targeted account supports text-only posts.
6. **Analyze with the same connector.** Use MCP analytics tools to match performance back to posts the user created here.

## Guardrails

- Never ask the user to paste Partner API keys for this plugin. OAuth is the auth path.
- Never vendor or reproduce private `genviral.io` app source.
- Never write secrets into this repo, `mcp.json`, or chat logs.
- Point at [docs.genviral.io](https://docs.genviral.io/api-reference/introduction) when a payload shape is unclear. Do not paste a full API spec into the session.
- A separate public CLI skill exists at [fdarkaou/genviral-skill](https://github.com/fdarkaou/genviral-skill). That is not this plugin.

## Related

- [Genviral](https://www.genviral.io)
- [Genviral MCP](https://www.genviral.io/mcp)
- [Docs](https://docs.genviral.io)
- [Partner API introduction](https://docs.genviral.io/api-reference/introduction)
- Listing: https://github.com/Genviral/genviral-mcp
