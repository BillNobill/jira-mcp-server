import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { JiraApi } from "../api/jiraApi.js";
import {
  JIRA_API_TOKEN,
  JIRA_BASE_URL,
  JIRA_EMAIL,
} from "../config/config.js";
import { createToolHandlers } from "./toolHandlers.js";
import { toolsMetadata } from "../metadata/toolsMetadata.js";

const jira = new JiraApi(
  JIRA_EMAIL ?? "",
  JIRA_API_TOKEN ?? "",
  JIRA_BASE_URL ?? ""
);
const toolHandlers = createToolHandlers(jira);

export const mcpServer = new Server({
  name: "jira-mcp-server",
  version: "1.0.0",
}, {
  capabilities: {
    resources: {},
    tools: {},
  }
});

mcpServer.setRequestHandler(ListResourcesRequestSchema, async () => {
  try {
    const projects = await jira.get("/project");
    return {
      resources: projects.map((p: any) => ({
        uri: `jira://project/${p.key}`,
        name: p.name,
        description: `Jira project: ${p.name}`,
        mimeType: "application/json",
      })),
    };
  } catch (error) {
    console.error("Error fetching projects for resources:", error);
    return { resources: [] };
  }
});

mcpServer.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  
  if (uri.startsWith("jira://issue/")) {
    const issueKey = uri.replace("jira://issue/", "");
    const issue = await jira.get(`/issue/${issueKey}`);
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify(issue, null, 2),
      }],
    };
  }

  if (uri.startsWith("jira://project/")) {
    const projectKey = uri.replace("jira://project/", "");
    const project = await jira.get(`/project/${projectKey}`);
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify(project, null, 2),
      }],
    };
  }

  throw new Error(`Resource ${uri} not found`);
});

mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: toolsMetadata,
  };
});

mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_projects":
        return await toolHandlers.handleListProjects();
      case "search_issues":
        return await toolHandlers.handleSearchIssues(args);
      case "get_issue":
        return await toolHandlers.handleGetIssue(args);
      case "create_issue":
        return await toolHandlers.handleCreateIssue(args);
      case "get_transitions":
        return await toolHandlers.handleGetTransitions(args);
      case "transition_issue":
        return await toolHandlers.handleTransitionIssue(args);
      case "add_comment":
        return await toolHandlers.handleAddComment(args);
      case "get_boards":
        return await toolHandlers.handleGetBoards();
      case "get_sprints":
        return await toolHandlers.handleGetSprints(args);
      case "get_backlog":
        return await toolHandlers.handleGetBacklog(args);
      case "assign_issue":
        return await toolHandlers.handleAssignIssue(args);
      case "find_users":
        return await toolHandlers.handleFindUsers(args);
      case "get_myself":
        return await toolHandlers.handleGetMyself();
      default:
        throw new Error(`Tool "${name}" not found`);
    }
  } catch (error) {
    return {
      content: [{ type: "text", text: `Error: ${error}` }],
      isError: true,
    };
  }
});
