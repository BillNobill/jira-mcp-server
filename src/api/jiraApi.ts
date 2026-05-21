import axios, { AxiosInstance } from "axios";
import { Buffer } from "node:buffer";

export class JiraApi {
  private client: AxiosInstance;

  constructor(email: string, token: string, baseUrl: string) {
    const auth = Buffer.from(`${email}:${token}`).toString("base64");
    this.client = axios.create({
      baseURL: `${baseUrl}/rest`,
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  async get(path: string, params?: any, version: string = "api/3") {
    const cleanBaseUrl = this.client.defaults.baseURL?.replace(/\/+$/, "");
    const cleanPath = path.replace(/^\/+/, "");
    const urlString = `${cleanBaseUrl}/${version}/${cleanPath}`;
    
    let url: URL;
    try {
      url = new URL(urlString);
    } catch (e) {
      console.error(`FAILED TO PARSE URL: "${urlString}" from baseURL: "${this.client.defaults.baseURL}" and path: "${path}"`);
      throw new Error(`Invalid URL: ${urlString}`);
    }
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': this.client.defaults.headers.Authorization as string,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }
    
    return await response.json();
  }

  async post(path: string, data?: any, version: string = "api/3") {
    const response = await this.client.post(`/${version}${path}`, data);
    return response.data;
  }

  async put(path: string, data?: any, version: string = "api/3") {
    const response = await this.client.put(`/${version}${path}`, data);
    return response.data;
  }

  async delete(path: string, version: string = "api/3") {
    const response = await this.client.delete(`/${version}${path}`);
    return response.data;
  }
}
