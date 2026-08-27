# Genviral MCP

Official public listing for the **Genviral remote MCP**. Point Cursor, Grok Bot, Claude, or Codex at the hosted connector to create, schedule, publish, and analyze social content across TikTok, Instagram, YouTube, LinkedIn, Pinterest, Facebook, X, and Bluesky, including AI image, video, and slideshow generation.

This repository is a **thin public wrapper**. It ships Cursor plugin manifests, a skill, the official logo, and this README. It does **not** contain Genviral product source, backend code, internal docs, or secrets.

- Product: [https://www.genviral.io](https://www.genviral.io)
- Docs: [https://docs.genviral.io/api-reference/introduction](https://docs.genviral.io/api-reference/introduction)
- Repository: [https://github.com/Genviral/genviral-mcp](https://github.com/Genviral/genviral-mcp)
- Author: Genviral (Fekri Darkaoui) · [github.com/Genviral](https://github.com/Genviral)

## Remote MCP

| | |
| --- | --- |
| URL | `https://mcp.genviral.io/mcp` |
| Transport | Streamable HTTP |
| Auth | OAuth 2 with PKCE |

Clients should connect with **only that URL**. Do not add an API-key variable or `Authorization` header unless the live MCP requires a bearer token (the production connector advertises OAuth, not a static key).

Use the **full connector**. Do not use the Anthropic-filtered URL `https://mcp.genviral.io/anthropic/mcp`.

### Cursor OAuth redirect URLs

If the MCP allowlist needs Cursor's callbacks, register both:

- `https://www.cursor.com/agents/mcp/oauth/callback`
- `http://localhost:8787/callback`

Claude and Codex use their own OAuth callback handling. Add those client redirects on the MCP side only if that client cannot complete login.

## Connect

### Cursor and Grok Bot

This repo is a Cursor Plugin (`name`: `genviral`). After it is listed on the [Cursor Marketplace](https://cursor.com/marketplace), install it from **Customize** and complete OAuth when prompted.

The plugin MCP config is `mcp.json`:

```json
{
  "mcpServers": {
    "genviral": {
      "url": "https://mcp.genviral.io/mcp"
    }
  }
}
```

#### Test the plugin locally

1. Clone this repo:

   ```bash
   git clone https://github.com/Genviral/genviral-mcp.git
   ```

2. Link or copy it into the local plugin folder (the folder name is `genviral`, not the repo name):

   ```bash
   mkdir -p ~/.cursor/plugins/local
   ln -s "$(pwd)/genviral-mcp" ~/.cursor/plugins/local/genviral
   ```

3. Restart Cursor or run **Developer: Reload Window**.
4. Open **Customize** and confirm the Genviral skill and MCP server.
5. Complete OAuth, then ask the agent to list connected social accounts.

On Teams and Enterprise, local plugin imports may need **Allow Local Plugin Imports** enabled.

### Claude

Add the same hosted URL as a remote HTTP MCP (Claude requires an explicit transport type):

```bash
claude mcp add --transport http genviral https://mcp.genviral.io/mcp
```

Equivalent JSON for `.mcp.json` or `~/.claude.json`:

```json
{
  "mcpServers": {
    "genviral": {
      "type": "http",
      "url": "https://mcp.genviral.io/mcp"
    }
  }
}
```

Then complete the OAuth prompt. Do not switch to `https://mcp.genviral.io/anthropic/mcp`.

### Codex

Add the Streamable HTTP URL (no bearer env var):

```bash
codex mcp add genviral --url https://mcp.genviral.io/mcp
```

Or in `~/.codex/config.toml`:

```toml
[mcp_servers.genviral]
url = "https://mcp.genviral.io/mcp"
```

If the client asks you to log in, run `codex mcp login genviral` and finish OAuth in the browser.

## What the skill does

`skills/genviral/SKILL.md` tells the agent when to use Genviral and to call the **live MCP tools** after OAuth. It does not vendor the Partner API CLI or private app source.

A separate public CLI skill lives at [fdarkaou/genviral-skill](https://github.com/fdarkaou/genviral-skill). That repo is optional and is not bundled here.

## Submit

After this listing is on `main`:

1. **Cursor Marketplace** — submit the public GitHub URL at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish).
2. **cursor.directory** — submit [https://github.com/Genviral/genviral-mcp](https://github.com/Genviral/genviral-mcp) from [cursor.directory](https://cursor.directory).

## Layout

```text
genviral-mcp/
├── .cursor-plugin/plugin.json   # Cursor plugin manifest (name: genviral)
├── mcp.json                     # Remote MCP URL for Cursor
├── skills/genviral/SKILL.md     # When and how to use the MCP
├── assets/logo.png              # Official Genviral mark
├── README.md
└── LICENSE                      # MIT
```

## License

[MIT](LICENSE). Logo and product marks are © Genviral.
