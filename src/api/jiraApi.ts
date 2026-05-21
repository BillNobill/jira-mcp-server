import axios, { AxiosInstance } from "axios";
import { Buffer } from "node:buffer";
import { FormData } from "formdata-node";
import { fileFromPath } from "formdata-node/file-from-path";

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
    const response = await this.client.get(`/${version}${path}`, { params });
    return response.data;
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

  async postAttachment(path: string, filePath: string, version: string = "api/3") {
    const form = new FormData();
    const file = await fileFromPath(filePath);
    form.append("file", file as any);

    const response = await this.client.post(`/${version}${path}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Atlassian-Token": "no-check",
      },
    });
    return response.data;
  }
}
