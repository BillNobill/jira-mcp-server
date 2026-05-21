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

### 3. Register with Gemini CLI (Global)
To use this server anywhere on your computer, register it with the user scope:
```powershell
gemini mcp add jira node "C:\FULL_PATH\TO\jira-mcp-server\dist\index.js" --scope user --trust
```

> [!IMPORTANT]
> Always use the **absolute path** to `dist/index.js` in the command above.

---

## ⚡ Available Tools

Your AI agent will automatically "learn" these advanced capabilities:

### 📋 Project & Issue Management
- `list_projects`: List all accessible Jira projects.
- `search_issues`: Find issues using JQL or text queries.
- `get_issue`: Fetch full details of a specific Jira issue.
- `create_issue`: Create new stories, tasks, or bugs.
- `assign_issue`: Assign teammates to issues.
- `add_comment`: Add comments to discuss issues.

### 🔄 Transitions & Workflow
- `get_transitions`: See available status changes for an issue.
- `transition_issue`: Move an issue through your workflow (e.g., "To Do" to "Done").

### 📊 Agile & Boards (Scrum/Kanban)
- `get_boards`: List all Scrum and Kanban boards.
- `get_sprints`: List sprints for a specific board.
- `get_backlog`: Fetch issues in the backlog.

### 👥 User Management
- `find_users`: Search for users to get their account IDs.
- `get_myself`: Get your own profile details.

---

## 🛠️ Troubleshooting

> [!WARNING]
> **Server shows as "Disconnected"?**
> 1. **Empty Command:** If `/mcp list` shows a red dot, ensure your `settings.json` (at `C:\Users\YourUser\.gemini\settings.json`) has `"command": "node"` correctly set.
> 2. **Environment Variables:** Run `node dist/index.js` manually. If it fails, check your `.env` or the environment variables in your client settings.
> 3. **SDK Compatibility:** This project uses `@modelcontextprotocol/sdk` v1.29.0.

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
