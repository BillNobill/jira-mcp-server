import { JiraApi } from "../api/jiraApi.js";

export function createToolHandlers(jira: JiraApi) {
  return {
    async handleListProjects() {
      try {
        console.error("DEBUG: Starting handleListProjects");
        const projects = await jira.get("/project");
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                projects.map((p: any) => ({
                  id: p.id,
                  key: p.key,
                  name: p.name,
                })),
                null,
                2
              ),
            },
          ],
        };
      } catch (error: any) {
        console.error(`DEBUG: handleListProjects caught error: ${error.stack || error}`);
        return {
          content: [{ type: "text", text: `Error: ${error.message || error}` }],
          isError: true,
        };
      }
    },

    async handleSearchIssues(args: any) {
      try {
        const { query, jql } = args;
        let finalJql = jql;

        if (!finalJql && query) {
          finalJql = `summary ~ "${query}" OR description ~ "${query}"`;
        }

        const results = await jira.get("/search", { jql: finalJql });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                results.issues.map((issue: any) => ({
                  id: issue.id,
                  key: issue.key,
                  summary: issue.fields.summary,
                  status: issue.fields.status.name,
                  assignee: issue.fields.assignee?.displayName || "Unassigned",
                })),
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleGetIssue(args: any) {
      try {
        const { issueKey } = args;
        const issue = await jira.get(`/issue/${issueKey}`);
        return {
          content: [{ type: "text", text: JSON.stringify(issue, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleCreateIssue(args: any) {
      try {
        const { projectKey, summary, description, issueType, priority } = args;
        const data: any = {
          fields: {
            project: { key: projectKey },
            summary,
            description: {
              type: "doc",
              version: 1,
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: description || "" }],
                },
              ],
            },
            issuetype: { name: issueType || "Task" },
          },
        };
        if (priority) data.fields.priority = { name: priority };

        const result = await jira.post("/issue", data);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleGetTransitions(args: any) {
      try {
        const { issueKey } = args;
        const result = await jira.get(`/issue/${issueKey}/transitions`);
        return {
          content: [{ type: "text", text: JSON.stringify(result.transitions, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleTransitionIssue(args: any) {
      try {
        const { issueKey, transitionId } = args;
        await jira.post(`/issue/${issueKey}/transitions`, {
          transition: { id: transitionId },
        });
        return {
          content: [{ type: "text", text: `Issue ${issueKey} transitioned successfully.` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleAddComment(args: any) {
      try {
        const { issueKey, comment } = args;
        const data = {
          body: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: comment }],
              },
            ],
          },
        };
        const result = await jira.post(`/issue/${issueKey}/comment`, data);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleGetBoards() {
      try {
        const result = await jira.get("/board", {}, "agile/1.0");
        return {
          content: [{ type: "text", text: JSON.stringify(result.values, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleGetSprints(args: any) {
      try {
        const { boardId, state } = args;
        const result = await jira.get(`/board/${boardId}/sprint`, { state }, "agile/1.0");
        return {
          content: [{ type: "text", text: JSON.stringify(result.values, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleGetBacklog(args: any) {
      try {
        const { boardId } = args;
        const result = await jira.get(`/board/${boardId}/backlog`, {}, "agile/1.0");
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                result.issues.map((issue: any) => ({
                  id: issue.id,
                  key: issue.key,
                  summary: issue.fields.summary,
                  status: issue.fields.status.name,
                })),
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleAssignIssue(args: any) {
      try {
        const { issueKey, accountId } = args;
        await jira.put(`/issue/${issueKey}/assignee`, {
          accountId: accountId,
        });
        return {
          content: [{ type: "text", text: `Issue ${issueKey} assigned to user ${accountId}.` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleFindUsers(args: any) {
      try {
        const { query } = args;
        const result = await jira.get("/user/search", { query });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                result.map((user: any) => ({
                  accountId: user.accountId,
                  displayName: user.displayName,
                  emailAddress: user.emailAddress,
                  active: user.active,
                })),
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleGetMyself() {
      try {
        const result = await jira.get("/myself");
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },
  };
}
