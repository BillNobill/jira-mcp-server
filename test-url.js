
import { URL } from 'url';

const JIRA_BASE_URL = "https://billnobill.atlassian.net";
const baseUrl = `${JIRA_BASE_URL}/rest`;
const version = "api/3";
const path = "/project";

async function test() {
    const cleanBaseUrl = baseUrl.replace(/\/+$/, "");
    const cleanPath = path.replace(/^\/+/, "");
    const urlString = `${cleanBaseUrl}/${version}/${cleanPath}`;
    
    console.log(`urlString: "${urlString}"`);
    
    try {
        const url = new URL(urlString);
        console.log(`URL object created: ${url.toString()}`);
        
        // Simulating the fetch call logic
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        console.log(`Fetch status: ${response.status}`);
    } catch (e) {
        console.error("FAILED:", e);
    }
}

test();
