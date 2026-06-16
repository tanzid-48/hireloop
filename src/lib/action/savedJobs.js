"use server";
import { getAuthHeaders } from "@/lib/auth-session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const saveJob = async (jobId) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/saved-jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ jobId }),
    });
    if (!res.ok) return { success: false };
    return { success: true };
  } catch {
    return { success: false };
  }
};

export const unsaveJob = async (jobId) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/saved-jobs?jobId=${jobId}`, {
      method: "DELETE",
      headers: { ...headers },
    });
    if (!res.ok) return { success: false };
    return { success: true };
  } catch {
    return { success: false };
  }
};
