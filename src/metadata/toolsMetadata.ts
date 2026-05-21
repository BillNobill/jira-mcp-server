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
  {
    name: "add_worklog",
    description: "Add a worklog to an issue (log hours worked)",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: { type: "string", description: "Issue key (e.g., PROJ-123)" },
        timeSpent: { type: "string", description: "Time spent (e.g., '2h 30m')" },
        comment: { type: "string", description: "Optional comment for the worklog" },
        started: { type: "string", description: "ISO 8601 date time (optional)" },
      },
      required: ["issueKey", "timeSpent"],
    },
  },
  {
    name: "add_attachment",
    description: "Add a local file as an attachment to a Jira issue",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: { type: "string", description: "Issue key (e.g., PROJ-123)" },
        filePath: { type: "string", description: "Full local path to the file" },
      },
      required: ["issueKey", "filePath"],
    },
  },
  {
    name: "create_sprint",
    description: "Create a new sprint on a board",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Sprint name" },
        originBoardId: { type: "integer", description: "ID of the board where the sprint originates" },
        goal: { type: "string", description: "Sprint goal" },
        startDate: { type: "string", description: "ISO 8601 date time" },
        endDate: { type: "string", description: "ISO 8601 date time" },
      },
      required: ["name", "originBoardId"],
    },
  },
  {
    name: "update_sprint_state",
    description: "Change the state of a sprint (e.g., start or complete)",
    inputSchema: {
      type: "object",
      properties: {
        sprintId: { type: "integer", description: "The ID of the sprint" },
        state: { type: "string", enum: ["active", "closed"], description: "The new state" },
      },
      required: ["sprintId", "state"],
    },
  },
  {
    name: "get_project_versions",
    description: "List all versions (releases) for a project",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: { type: "string", description: "Project key" },
      },
      required: ["projectKey"],
    },
  },
  {
    name: "create_version",
    description: "Create a new project version (release)",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: { type: "string", description: "Project key" },
        name: { type: "string", description: "Version name" },
        description: { type: "string", description: "Version description" },
        releaseDate: { type: "string", description: "Release date (YYYY-MM-DD)" },
      },
      required: ["projectKey", "name"],
    },
  },
  {
    name: "link_issues",
    description: "Link two Jira issues (e.g., Blocks, Relates)",
    inputSchema: {
      type: "object",
      properties: {
        inwardIssueKey: { type: "string", description: "The key of the issue that is linked from" },
        outwardIssueKey: { type: "string", description: "The key of the issue that is linked to" },
        linkType: { type: "string", description: "The type of link (e.g., 'Blocks', 'Relates')" },
      },
      required: ["inwardIssueKey", "outwardIssueKey", "linkType"],
    },
  },
  {
    name: "get_all_labels",
    description: "Get all labels used in Jira",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "bulk_create_issues",
    description: "Create multiple issues in a single request (max 50)",
    inputSchema: {
      type: "object",
      properties: {
        issues: {
          type: "array",
          items: {
            type: "object",
            properties: {
              projectKey: { type: "string" },
              summary: { type: "string" },
              description: { type: "string" },
              issueType: { type: "string" },
            },
            required: ["projectKey", "summary"],
          },
        },
      },
      required: ["issues"],
    },
  },
  {
    name: "bulk_transition_issues",
    description: "Transition multiple issues to a new status",
    inputSchema: {
      type: "object",
      properties: {
        issueKeys: { type: "array", items: { type: "string" } },
        transitionId: { type: "string" },
      },
      required: ["issueKeys", "transitionId"],
    },
  },
  {
    name: "create_subtask",
    description: "Create a subtask for a parent issue",
    inputSchema: {
      type: "object",
      properties: {
        parentIssueKey: { type: "string", description: "The key of the parent issue" },
        summary: { type: "string", description: "Short summary of the subtask" },
        description: { type: "string", description: "Detailed description" },
        issueType: { type: "string", description: "Subtask issue type name", default: "Sub-task" },
      },
      required: ["parentIssueKey", "summary"],
    },
  },
  {
    name: "update_issue",
    description: "Update fields of an existing Jira issue",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: { type: "string", description: "The issue key (e.g., PROJ-123)" },
        fields: {
          type: "object",
          description: "Field values to update (e.g., { summary: 'New Title', priority: { name: 'High' } })",
        },
      },
      required: ["issueKey", "fields"],
    },
  },
  {
    name: "delete_issues",
    description: "Delete one or more Jira issues",
    inputSchema: {
      type: "object",
      properties: {
        issueKeys: {
          type: "array",
          items: { type: "string" },
          description: "List of issue keys or IDs to delete",
        },
        deleteSubtasks: {
          type: "boolean",
          description: "Whether to delete subtasks. Must be true if issue has subtasks.",
          default: true,
        },
      },
      required: ["issueKeys"],
    },
  },
  {
    name: "update_comment",
    description: "Update an existing comment on an issue",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: { type: "string" },
        commentId: { type: "string" },
        comment: { type: "string", description: "The new comment text" },
      },
      required: ["issueKey", "commentId", "comment"],
    },
  },
  {
    name: "delete_comment",
    description: "Delete a comment from an issue",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: { type: "string" },
        commentId: { type: "string" },
      },
      required: ["issueKey", "commentId"],
    },
  },
  {
    name: "update_worklog",
    description: "Update an existing worklog entry",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: { type: "string" },
        worklogId: { type: "string" },
        timeSpent: { type: "string", description: "e.g., '1h 30m'" },
        comment: { type: "string" },
      },
      required: ["issueKey", "worklogId"],
    },
  },
  {
    name: "delete_worklog",
    description: "Delete a worklog entry",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: { type: "string" },
        worklogId: { type: "string" },
      },
      required: ["issueKey", "worklogId"],
    },
  },
  {
    name: "update_sprint",
    description: "Update sprint details (name, goal, dates)",
    inputSchema: {
      type: "object",
      properties: {
        sprintId: { type: "integer" },
        name: { type: "string" },
        goal: { type: "string" },
        startDate: { type: "string" },
        endDate: { type: "string" },
      },
      required: ["sprintId"],
    },
  },
  {
    name: "delete_sprints",
    description: "Delete one or more sprints",
    inputSchema: {
      type: "object",
      properties: {
        sprintIds: { type: "array", items: { type: "integer" } },
      },
      required: ["sprintIds"],
    },
  },
  {
    name: "update_version",
    description: "Update a project version/release",
    inputSchema: {
      type: "object",
      properties: {
        versionId: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        releaseDate: { type: "string" },
        released: { type: "boolean" },
        archived: { type: "boolean" },
      },
      required: ["versionId"],
    },
  },
  {
    name: "delete_versions",
    description: "Delete one or more project versions",
    inputSchema: {
      type: "object",
      properties: {
        versionIds: { type: "array", items: { type: "string" } },
      },
      required: ["versionIds"],
    },
  },
  {
    name: "delete_issue_link",
    description: "Remove a link between two issues",
    inputSchema: {
      type: "object",
      properties: {
        linkId: { type: "string", description: "The ID of the link to delete" },
      },
      required: ["linkId"],
    },
  },
  {
    name: "delete_attachment",
    description: "Remove an attachment from an issue",
    inputSchema: {
      type: "object",
      properties: {
        attachmentId: { type: "string", description: "The ID of the attachment to delete" },
      },
      required: ["attachmentId"],
    },
  },
];
