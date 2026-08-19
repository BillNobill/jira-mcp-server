# 🚀 Jira MCP Server: AI-Powered Issue Tracking

Transform your Jira projects into a living workspace for AI agents. This **Model Context Protocol (MCP)** server allows LLMs (like Gemini, Claude, and GPT-4) to see, organize, and manage your tasks and sprints with natural language.

---

## 🔍 Overview
This project bridges the gap between AI and your Jira workflow. Instead of manually navigating complex Jira screens, you can tell your AI: *"Find all open bugs in the project and assign them to me,"* or *"Create a new story for the login refactoring with high priority."*

**Global Usage:** You can save this project anywhere on your computer. Once registered, your AI will be able to start the server automatically whenever needed—no manual terminal execution required.

---

## 📋 Prerequisites
- **Node.js** (v20.0.0 or higher recommended) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Jira API Credentials**: [Get an API Token here](https://id.atlassian.com/manage-profile/security/api-tokens)

---

## 🛠️ Quick Start

### 1. Installation & Build
```powershell
# Clone the repository (or copy the files)
npm install
npm run build
```

### 2. Configuration
Create a `.env` file in the project root (use `.env.example` as a template):
```env
JIRA_EMAIL=your_email@example.com
JIRA_API_TOKEN=your_api_token
JIRA_BASE_URL=https://your-domain.atlassian.net
```

### 3. Register with your AI client

#### Claude Code (Recommended)
```powershell
claude mcp add --scope user jira node "C:\FULL_PATH\TO\jira-mcp-server\dist\index.js"
```
Env vars are read from the `.env` file or can be passed inline with `-e KEY=VALUE` flags.

#### VS Code (GitHub Copilot / Claude extension)
Add to your user `settings.json` (`Ctrl+Shift+P` → *Open User Settings JSON*):
```json
{
  "mcp": {
    "servers": {
      "jira": {
        "command": "node",
        "args": ["C:\\FULL_PATH\\TO\\jira-mcp-server\\dist\\index.js"],
        "env": {
          "JIRA_EMAIL": "your_email@example.com",
          "JIRA_API_TOKEN": "your_api_token",
          "JIRA_BASE_URL": "https://your-domain.atlassian.net"
        }
      }
    }
  }
}
```

#### Cursor
Add to `%USERPROFILE%\.cursor\mcp.json`:
```json
{
  "mcpServers": {
    "jira": {
      "command": "node",
      "args": ["C:\\FULL_PATH\\TO\\jira-mcp-server\\dist\\index.js"],
      "env": {
        "JIRA_EMAIL": "your_email@example.com",
        "JIRA_API_TOKEN": "your_api_token",
        "JIRA_BASE_URL": "https://your-domain.atlassian.net"
      }
    }
  }
}
```

> [!IMPORTANT]
> Always use the **absolute path** to `dist/index.js` in the configuration above.

---

## ⚡ Available Tools

Your AI agent will automatically "learn" these advanced capabilities:

### 📋 Project & Issue Management (Full CRUD)
- `list_projects`: List all accessible Jira projects.
- `search_issues`: Find issues using JQL or text queries.
- `get_issue`: Fetch full details of a specific Jira issue.
- `create_issue` / `update_issue`: Create or modify stories, tasks, or bugs.
- `delete_issues`: Bulk Action to remove multiple issues and their subtasks.
- `create_subtask`: Granular task breakdown for parent issues.
- `link_issues` / `delete_issue_link`: Manage relationships between issues.
- `get_all_labels`: List all labels used in the instance.
- `add_attachment` / `delete_attachment`: Manage file attachments.

### ⏱️ Time & Work Tracking
- `add_worklog` / `update_worklog`: Log and modify hours worked on a task.
- `delete_worklog`: Remove incorrect worklog entries.

### 🔄 Transitions & Workflow
- `get_transitions`: See available status changes for an issue.
- `transition_issue`: Move an issue through your workflow.

### 📊 Agile & Boards (Scrum/Kanban)
- `get_boards`: List all Scrum and Kanban boards.
- `get_sprints`: List sprints for a specific board.
- `get_backlog`: Fetch issues in the backlog.
- `create_sprint` / `update_sprint`: Manage sprint details and goals.
- `update_sprint_state`: Start (`active`) or Close (`closed`) a sprint.
- `delete_sprints`: Remove one or more sprints from a board.

### 📦 Releases & Versions
- `get_project_versions`: List all releases/versions for a project.
- `create_version` / `update_version`: Manage the release lifecycle.
- `delete_versions`: Remove project versions.

### 🚀 Bulk Operations (Granular & Optimized)
- `bulk_create_issues`: Create up to 50 issues in a single request.
- `bulk_transition_issues`: Move multiple issues to a new status at once.
- `delete_issues` / `delete_sprints`: Scalable deletion handling single or multiple IDs.

### 👥 Professional Features
- `assign_issue`: Assign teammates to tasks.
- `add_comment` / `update_comment`: Manage discussion threads.
- `delete_comment`: Remove irrelevant comments.
- `find_users`: Search for users to get their account IDs.
- `get_myself`: Get your own profile details.

---

## 🛠️ Troubleshooting

> [!WARNING]
> **Server shows as "Disconnected"?**
> 1. **Empty Command:** Check your client's MCP config and confirm `"command": "node"` and the absolute path to `dist/index.js` are correct.
> 2. **Environment Variables:** Run `node dist/index.js` manually in the terminal. If it fails, check your `.env` or the environment variables in your client settings.
> 3. **SDK Compatibility:** This project uses `@modelcontextprotocol/sdk` v1.29.0.
> 4. **Claude Code:** Run `/mcp` inside a Claude Code session to see the server status and any error output.

---

## 🐳 Docker Support

> [!TIP]
> Docker is perfect for keeping your local environment clean.

```powershell
# Build
docker build -t jira-mcp-server .

# Run
docker run --rm -i --env-file .env jira-mcp-server
```

---

## 🤝 Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

---

**Created by [Luiz Feltrin]**  
*Show some love! Give this repository a ⭐️ if it helped you!*
