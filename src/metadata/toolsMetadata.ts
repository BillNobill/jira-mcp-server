export const toolsMetadata = [
  {
    name: "list_projects",
    description: "List all accessible Jira projects",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "search_issues",
    description: "Search for issues using a text query or JQL",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Text search query (searches summary and description)",
        },
        jql: {
          type: "string",
          description: "Advanced Jira Query Language (JQL) string",
        },
      },
    },
  },
  {
    name: "get_issue",
    description: "Get full details of a specific Jira issue",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: {
          type: "string",
          description: "The issue key (e.g., PROJ-123)",
        },
      },
      required: ["issueKey"],
    },
  },
  {
    name: "create_issue",
    description: "Create a new Jira issue",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: { type: "string", description: "Project key (e.g., PROJ)" },
        summary: { type: "string", description: "Short summary of the issue" },
        description: { type: "string", description: "Detailed description" },
        issueType: { type: "string", description: "Type of issue (e.g., Task, Bug, Story)", default: "Task" },
        priority: { type: "string", description: "Priority (e.g., High, Medium, Low)" },
      },
      required: ["projectKey", "summary"],
    },
  },
  {
    name: "get_transitions",
    description: "Get available status transitions for an issue",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: { type: "string", description: "Issue key (e.g., PROJ-123)" },
      },
      required: ["issueKey"],
    },
  },
  {
    name: "transition_issue",
    description: "Change the status of a Jira issue",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: { type: "string", description: "Issue key (e.g., PROJ-123)" },
        transitionId: { type: "string", description: "The ID of the transition to perform" },
      },
      required: ["issueKey", "transitionId"],
    },
  },
  {
    name: "add_comment",
    description: "Add a comment to a Jira issue",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: { type: "string", description: "Issue key (e.g., PROJ-123)" },
        comment: { type: "string", description: "The comment text" },
      },
      required: ["issueKey", "comment"],
    },
  },
  {
    name: "get_boards",
    description: "List all Scrum and Kanban boards",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_sprints",
    description: "List sprints for a specific board",
    inputSchema: {
      type: "object",
      properties: {
        boardId: { type: "string", description: "The ID of the board" },
        state: { type: "string", description: "Filter by state (active, future, closed)" },
      },
      required: ["boardId"],
    },
  },
  {
    name: "get_backlog",
    description: "Get issues in the backlog for a specific board",
    inputSchema: {
      type: "object",
      properties: {
        boardId: { type: "string", description: "The ID of the board" },
      },
      required: ["boardId"],
    },
  },
  {
    name: "assign_issue",
    description: "Assign a Jira issue to a user",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: { type: "string", description: "Issue key (e.g., PROJ-123)" },
        accountId: { type: "string", description: "The Atlassian account ID of the user" },
      },
      required: ["issueKey", "accountId"],
    },
  },
  {
    name: "find_users",
    description: "Search for Jira users by email or display name to get their accountId",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Email address or display name to search for" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_myself",
    description: "Get the profile details of the currently authenticated Jira user (the bot)",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];
