import { mcpServer } from "./handlers/MCPHandlers.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const start = async () => {
  try {
    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);
    console.error("Jira MCP Server connected and ready.");
  } catch (error) {
    console.error("Failed to start Jira MCP server:", error);
    process.exit(1);
  }
};

process.on("SIGINT", () => {
  process.exit(0);
});

process.on("SIGTERM", () => {
  process.exit(0);
});

start().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
