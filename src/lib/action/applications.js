"use server";

import { getAuthHeaders } from "../auth-session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const createApplication = async (payload) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };
    return { success: true, ...data };
  } catch {
    return { success: false, message: "Server unreachable" };
  }
};
