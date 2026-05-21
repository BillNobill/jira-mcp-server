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

    async handleAddWorklog(args: any) {
      try {
        const { issueKey, timeSpent, comment, started } = args;
        const data: any = { timeSpent };
        if (comment) {
          data.comment = {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: comment }],
              },
            ],
          };
        }
        if (started) data.started = started;

        const result = await jira.post(`/issue/${issueKey}/worklog`, data);
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

    async handleAddAttachment(args: any) {
      try {
        const { issueKey, filePath } = args;
        const result = await jira.postAttachment(`/issue/${issueKey}/attachments`, filePath);
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

    async handleCreateSprint(args: any) {
      try {
        const { name, originBoardId, goal, startDate, endDate } = args;
        const data: any = { name, originBoardId };
        if (goal) data.goal = goal;
        if (startDate) data.startDate = startDate;
        if (endDate) data.endDate = endDate;

        const result = await jira.post("/sprint", data, "agile/1.0");
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

    async handleUpdateSprintState(args: any) {
      try {
        const { sprintId, state } = args;
        const result = await jira.post(`/sprint/${sprintId}`, { state }, "agile/1.0");
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

    async handleGetProjectVersions(args: any) {
      try {
        const { projectKey } = args;
        const result = await jira.get(`/project/${projectKey}/versions`);
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

    async handleCreateVersion(args: any) {
      try {
        const { projectKey, name, description, releaseDate } = args;
        const data: any = { project: projectKey, name };
        if (description) data.description = description;
        if (releaseDate) data.releaseDate = releaseDate;

        const result = await jira.post("/version", data);
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

    async handleLinkIssues(args: any) {
      try {
        const { inwardIssueKey, outwardIssueKey, linkType } = args;
        const data = {
          type: { name: linkType },
          inwardIssue: { key: inwardIssueKey },
          outwardIssue: { key: outwardIssueKey },
        };

        await jira.post("/issueLink", data);
        return {
          content: [{ type: "text", text: `Issues ${inwardIssueKey} and ${outwardIssueKey} linked as '${linkType}'.` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleGetAllLabels() {
      try {
        const result = await jira.get("/label");
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

    async handleBulkCreateIssues(args: any) {
      try {
        const { issues } = args;
        const data = {
          issueUpdates: issues.map((issue: any) => ({
            fields: {
              project: { key: issue.projectKey },
              summary: issue.summary,
              description: issue.description ? {
                type: "doc",
                version: 1,
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: issue.description }],
                  },
                ],
              } : undefined,
              issuetype: { name: issue.issueType || "Task" },
            },
          })),
        };

        const result = await jira.post("/issue/bulk", data);
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

    async handleBulkTransitionIssues(args: any) {
      try {
        const { issueKeys, transitionId } = args;
        const data = {
          issueIdsOrKeys: issueKeys,
          transition: { id: transitionId },
        };

        const result = await jira.post("/bulk/issues/transition", data);
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

    async handleCreateSubtask(args: any) {
      try {
        const { parentIssueKey, summary, description, issueType } = args;
        const data: any = {
          fields: {
            project: { key: parentIssueKey.split("-")[0] },
            parent: { key: parentIssueKey },
            summary,
            description: description ? {
              type: "doc",
              version: 1,
              content: [{ type: "paragraph", content: [{ type: "text", text: description }] }],
            } : undefined,
            issuetype: { name: issueType || "Sub-task" },
          },
        };

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

    async handleUpdateIssue(args: any) {
      try {
        const { issueKey, fields } = args;
        // In v3, description must be ADF. If user provides string, convert it.
        if (fields.description && typeof fields.description === "string") {
          fields.description = {
            type: "doc",
            version: 1,
            content: [{ type: "paragraph", content: [{ type: "text", text: fields.description }] }],
          };
        }

        await jira.put(`/issue/${issueKey}`, { fields });
        return {
          content: [{ type: "text", text: `Issue ${issueKey} updated successfully.` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleDeleteIssues(args: any) {
      try {
        const { issueKeys, deleteSubtasks } = args;
        const results = await Promise.allSettled(
          issueKeys.map((key: string) => 
            jira.delete(`/issue/${key}${deleteSubtasks ? "?deleteSubtasks=true" : ""}`)
          )
        );
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleUpdateComment(args: any) {
      try {
        const { issueKey, commentId, comment } = args;
        const data = {
          body: {
            type: "doc",
            version: 1,
            content: [{ type: "paragraph", content: [{ type: "text", text: comment }] }],
          },
        };
        const result = await jira.put(`/issue/${issueKey}/comment/${commentId}`, data);
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

    async handleDeleteComment(args: any) {
      try {
        const { issueKey, commentId } = args;
        await jira.delete(`/issue/${issueKey}/comment/${commentId}`);
        return {
          content: [{ type: "text", text: `Comment ${commentId} deleted from ${issueKey}.` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleUpdateWorklog(args: any) {
      try {
        const { issueKey, worklogId, timeSpent, comment } = args;
        const data: any = {};
        if (timeSpent) data.timeSpent = timeSpent;
        if (comment) {
          data.comment = {
            type: "doc",
            version: 1,
            content: [{ type: "paragraph", content: [{ type: "text", text: comment }] }],
          };
        }
        const result = await jira.put(`/issue/${issueKey}/worklog/${worklogId}`, data);
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

    async handleDeleteWorklog(args: any) {
      try {
        const { issueKey, worklogId } = args;
        await jira.delete(`/issue/${issueKey}/worklog/${worklogId}`);
        return {
          content: [{ type: "text", text: `Worklog ${worklogId} deleted from ${issueKey}.` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleUpdateSprint(args: any) {
      try {
        const { sprintId, ...data } = args;
        const result = await jira.put(`/sprint/${sprintId}`, data, "agile/1.0");
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

    async handleDeleteSprints(args: any) {
      try {
        const { sprintIds } = args;
        const results = await Promise.allSettled(
          sprintIds.map((id: number) => jira.delete(`/sprint/${id}`, "agile/1.0"))
        );
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleUpdateVersion(args: any) {
      try {
        const { versionId, ...data } = args;
        const result = await jira.put(`/version/${versionId}`, data);
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

    async handleDeleteVersions(args: any) {
      try {
        const { versionIds } = args;
        const results = await Promise.allSettled(
          versionIds.map((id: string) => jira.delete(`/version/${id}`))
        );
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleDeleteIssueLink(args: any) {
      try {
        const { linkId } = args;
        await jira.delete(`/issueLink/${linkId}`);
        return {
          content: [{ type: "text", text: `Issue link ${linkId} deleted.` }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },

    async handleDeleteAttachment(args: any) {
      try {
        const { attachmentId } = args;
        await jira.delete(`/attachment/${attachmentId}`);
        return {
          content: [{ type: "text", text: `Attachment ${attachmentId} deleted.` }],
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
