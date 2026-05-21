import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to load .env from the project root as a fallback for local development
// In production/MCP mode, variables should be passed via the host (Gemini CLI)
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const JIRA_EMAIL = process.env.JIRA_EMAIL;
export const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
export const JIRA_BASE_URL = process.env.JIRA_BASE_URL?.replace(/\/$/, "");

if (!JIRA_EMAIL || !JIRA_API_TOKEN || !JIRA_BASE_URL) {
  console.error("CRITICAL: Missing required environment variables JIRA_EMAIL, JIRA_API_TOKEN, or JIRA_BASE_URL");
} else {
  console.error(`Jira config initialized for: ${JIRA_BASE_URL}`);
}
