# Genviral MCP

[Genviral](https://www.genviral.io) is the agentic social media scheduler that creates, schedules, publishes, and analyzes posts across TikTok, Instagram, YouTube, LinkedIn, Pinterest, Facebook, X, Bluesky, and more. This repository documents the live remote MCP server and ships Cursor / Grok Bot plugin files.

Use it when you want an assistant to run social from the tools you already open — Cursor, Grok Bot, Claude, ChatGPT, or Codex — without installing a local process or pasting an API key into a config file.

**Start here:** [Genviral](https://www.genviral.io) · [Genviral MCP](https://www.genviral.io/mcp) · [Docs](https://docs.genviral.io) · [Partner API](https://docs.genviral.io/api-reference/introduction)

## What it is

Genviral MCP is a **remote Streamable HTTP** server. You add one URL to your client, sign in with **OAuth**, and the assistant can:

- **Create** captions, drafts, and AI images, videos, and slideshows
- **Schedule** posts onto a content calendar
- **Publish** to connected social accounts
- **Analyze** what already ran, then plan the next batch from real performance

This GitHub repo is a thin public wrapper (manifests, skill, logo, MIT license). It does **not** contain Genviral product source, backend code, internal docs, or secrets. The product lives at [www.genviral.io](https://www.genviral.io). The protocol page is [www.genviral.io/mcp](https://www.genviral.io/mcp).

## Who it is for

- Founders and marketers who want a week of posts from a sentence, not a dashboard tour
- Teams that already work in Cursor, Claude, ChatGPT, or Codex and need a real social backend
- Agencies that bind each connection to one [Genviral](https://www.genviral.io) workspace
- Developers who want the assistant path (MCP) next to the [Partner API](https://docs.genviral.io/api-reference/introduction) and CLI

## What you can do

Ask for work in plain language. The assistant calls the live MCP tools; [Genviral](https://www.genviral.io) executes against your connected accounts.

- Draft and queue TikTok slideshows, Instagram Reels, YouTube Shorts, LinkedIn posts, Pinterest pins, Facebook posts, X posts, and Bluesky posts
- Generate AI images, videos, and slideshows in Genviral Studio, then attach them to a post
- Read the calendar, move a scheduled batch, or hold a draft for review
- Pull analytics and trend context before the next run
- Keep publishing behind an explicit publish-or-schedule decision (the `posts:publish` scope is separate from draft and generate)

Examples people actually type:

- “What did I post last week, and which one did best?”
- “Generate three TikTok slideshows about morning routines and schedule them for this week.”
- “Draft a LinkedIn post from this changelog, but don't publish it.”
- “Make a 9:16 video from this image and queue it as an Instagram Reel.”

Read the longer product walkthrough on [The social media MCP server](https://www.genviral.io/mcp).

## Live endpoints

Two production URLs. Both are remote Streamable HTTP. Neither belongs in this repo as source — they are hosted on `mcp.genviral.io`.

| Connector | URL | Use |
| --- | --- | --- |
| **Full MCP** | [https://mcp.genviral.io/mcp](https://mcp.genviral.io/mcp) | Cursor, Grok Bot, and any client that should see the complete tool set (including AI media generation) |
| **Anthropic-filtered MCP** | [https://mcp.genviral.io/anthropic/mcp](https://mcp.genviral.io/anthropic/mcp) | Claude custom connectors and the Anthropic directory |

Discovery document (full server): [https://www.genviral.io/.well-known/mcp/server-card.json](https://www.genviral.io/.well-known/mcp/server-card.json)

This repo's Cursor plugin (`mcp.json`) points at the **full** URL. The Claude
plugin (`.mcp.json`) points at the **Anthropic-filtered** URL.

## Auth

**OAuth 2 with PKCE.** The client opens a Genviral consent screen. You pick a workspace and grant scopes. There is **no API key in this repository**, no `${API_KEY}` plugin variable, and no bearer header to paste.

Scopes (full connector): `context:read`, `content:write`, `posts:publish`, `media:generate`.

You can create a free account at [www.genviral.io](https://www.genviral.io), connect social accounts in the dashboard, then approve only the scopes that client should have. Revoke a connection later without rotating a shared secret.

### Cursor OAuth redirect URLs

If the MCP allowlist needs Cursor's callbacks, register both:

- `https://www.cursor.com/agents/mcp/oauth/callback`
- `http://localhost:8787/callback`

## Install by host

### Cursor and Grok Bot

Plugin files in **this repo** (`name`: `genviral`):

- `.cursor-plugin/plugin.json`
- `mcp.json` → `https://mcp.genviral.io/mcp`
- `skills/genviral/SKILL.md`
- `assets/logo.png`

After the listing is on the [Cursor Marketplace](https://cursor.com/marketplace), install from **Customize** and finish OAuth. Submit the public repo at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish) and [cursor.directory](https://cursor.directory).

#### Test locally in Cursor

```bash
git clone https://github.com/Genviral/genviral-mcp.git
mkdir -p ~/.cursor/plugins/local
ln -s "$(pwd)/genviral-mcp" ~/.cursor/plugins/local/genviral
```

The local folder name is `genviral` (plugin `name`), not `genviral-mcp` (this repo). Reload the window (**Developer: Reload Window**), open **Customize**, confirm the skill and MCP server, then complete OAuth.

On Teams and Enterprise, local imports may need **Allow Local Plugin Imports**.

### Claude

Claude custom connectors and the Anthropic directory use the **Anthropic-filtered** URL:

```text
https://mcp.genviral.io/anthropic/mcp
```

In Claude apps: **Settings → Connectors → Add custom connector**, paste that URL, connect, then approve scopes.

Claude Code can add a remote HTTP server the same way (explicit `type` / `--transport http`). Prefer the Anthropic URL for Claude surfaces:

```bash
claude mcp add --transport http genviral https://mcp.genviral.io/anthropic/mcp
```

#### Claude Code and Cowork plugin

This repository also ships a Claude plugin:

- `.claude-plugin/plugin.json` contains the marketplace metadata
- `.mcp.json` connects the Anthropic-filtered remote MCP server
- `skills/genviral/SKILL.md` teaches Claude when and how to use Genviral

The plugin uses OAuth and does not ask users to paste an API key. Because it
connects an external service with publishing and generation capabilities, it is
disabled by default until the user explicitly enables it.

Test the public repository locally before the community listing is approved:

```bash
git clone https://github.com/Genviral/genviral-mcp.git
claude plugin validate ./genviral-mcp --strict
claude --plugin-dir ./genviral-mcp
```

### ChatGPT and Codex

Use **OpenAI's plugin directory** when the Genviral listing is live there. Until then, do not invent a second host. The production MCP remains:

- Full: [https://mcp.genviral.io/mcp](https://mcp.genviral.io/mcp)
- Product page: [https://www.genviral.io/mcp](https://www.genviral.io/mcp)

## Links

- [Genviral](https://www.genviral.io) — create, schedule, publish, and analyze social content
- [Genviral MCP](https://www.genviral.io/mcp) — the social media MCP server
- [Genviral documentation](https://docs.genviral.io)
- [Partner API introduction](https://docs.genviral.io/api-reference/introduction)
- [This repository](https://github.com/Genviral/genviral-mcp)

Related public skill (CLI, not vendored here): [fdarkaou/genviral-skill](https://github.com/fdarkaou/genviral-skill)

## Repo layout

```text
genviral-mcp/
├── .claude-plugin/plugin.json   # Claude Code / Cowork plugin metadata
├── .mcp.json                    # Anthropic-filtered remote MCP for Claude
├── .cursor-plugin/plugin.json   # Cursor plugin (name: genviral)
├── mcp.json                     # Full remote MCP for Cursor / Grok Bot
├── skills/genviral/SKILL.md     # When to use the live MCP tools
├── assets/logo.png              # Official Genviral mark
├── tests/validate-claude-plugin.mjs
├── README.md
└── LICENSE                      # MIT
```

Author: Genviral (Fekri) · [github.com/Genviral](https://github.com/Genviral). GitHub About homepage for this repo is [https://www.genviral.io](https://www.genviral.io).

## License

[MIT](LICENSE). Logo and product marks are © Genviral.
