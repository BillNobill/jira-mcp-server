import dotenv from "dotenv";

dotenv.config();

export const JIRA_EMAIL = process.env.JIRA_EMAIL;
export const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
export const JIRA_BASE_URL = process.env.JIRA_BASE_URL?.replace(/\/$/, "");

if (!JIRA_EMAIL || !JIRA_API_TOKEN || !JIRA_BASE_URL) {
  console.error("Missing required environment variables JIRA_EMAIL, JIRA_API_TOKEN, or JIRA_BASE_URL");
}
