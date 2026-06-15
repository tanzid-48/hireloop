"use server";
import { getAuthHeaders } from "@/lib/auth-session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

const handleStatus = async (res) => {
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (res.status === 403) throw new Error("FORBIDDEN");
  if (res.status === 404) throw new Error("NOT_FOUND");
  return res.json();
};

export const createJob = async (payload) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(payload),
    });
    return handleStatus(res);
  } catch {
    return null;
  }
};

export const updateJob = async (jobId, payload) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/jobs/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(payload),
    });
    return handleStatus(res);
  } catch {
    return null;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/jobs/${jobId}`, {
      method: "DELETE",
      headers: { ...headers },
    });
    return handleStatus(res);
  } catch {
    return null;
  }
};
