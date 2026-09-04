import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));

const manifest = await readJson(
  new URL("../.claude-plugin/plugin.json", import.meta.url),
);
const mcpConfig = await readJson(new URL("../.mcp.json", import.meta.url));

assert.equal(manifest.name, "genviral");
assert.equal(manifest.displayName, "Genviral");
assert.equal(manifest.repository, "https://github.com/Genviral/genviral-mcp");
assert.equal(manifest.homepage, "https://www.genviral.io/mcp");
assert.equal(manifest.defaultEnabled, false);

assert.deepEqual(mcpConfig, {
  mcpServers: {
    genviral: {
      type: "http",
      url: "https://mcp.genviral.io/anthropic/mcp",
    },
  },
});

console.log("Claude plugin manifest and MCP endpoint are valid.");
