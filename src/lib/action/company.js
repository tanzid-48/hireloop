"use server";
import { getAuthHeaders } from "@/lib/auth-session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const createCompany = async (payload) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/api/companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch {
    return null;
  }
};

export const updateCompany = async (companyId, payload) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/api/companies/${companyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch {
    return null;
  }
};
