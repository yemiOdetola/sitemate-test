import { Issue } from "@/types";
import axios from "axios";
const API_URL = "http://localhost:3000";

export const getIssues = async (): Promise<Issue[]> => {
  const response = await axios.get(`${API_URL}/issues`);
  return response.data;
};

export const getIssue = async (id: string): Promise<Issue> => {
  const response = await axios.get(`${API_URL}/issues/${id}`);
  return response.data;
};

export const createIssue = async (issue: Partial<Issue>): Promise<Issue> => {
  const response = await axios.post(`${API_URL}/issues`, issue);
  return response.data;
};

export const editIssue = async (
  id: string,
  updatedIssue: Partial<Issue>
): Promise<Issue> => {
  const response = await axios.put(`${API_URL}/issues/${id}`, updatedIssue);
  return response.data;
};

export const deleteIssue = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/issues/${id}`);
};
