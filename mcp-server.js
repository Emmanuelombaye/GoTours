import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "fs";

const server = new McpServer({
  name: "My MCP Server",
  version: "1.0.0"
});

// Simple hello tool
server.tool(
  "hello",
  { name: { type: "string" } },
  async ({ name }) => {
    console.log(`hello tool called with: ${name}`);
    return {
      content: [{ type: "text", text: `Hello ${name}, MCP is running!` }]
    };
  }
);

// Read file tool
server.tool(
  "readFile",
  { path: { type: "string" } },
  async ({ path }) => {
    console.log(`readFile tool called with path: ${path}`);
    return {
      content: [{ type: "text", text: fs.readFileSync(path, "utf8") }]
    };
  }
);

// Wrap in async start function
async function startServer() {
  console.log("MCP server is starting...");
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP server is ready and waiting for connections...");
}

startServer();
