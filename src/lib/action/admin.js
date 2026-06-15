"use server";

import { getAuthHeaders } from "../auth-session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const updateUserRole = async (userId, role) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/admin/users/${userId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ role }),
    });
    if (!res.ok) return { success: false };
    return { success: true };
  } catch {
    return { success: false };
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/admin/users/${userId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) return { success: false };
    return { success: true };
  } catch {
    return { success: false };
  }
};

export const deleteUser = async (userId) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/admin/users/${userId}`, {
      method: "DELETE",
      headers: { ...headers },
    });
    if (!res.ok) return { success: false };
    return { success: true };
  } catch {
    return { success: false };
  }
};

export const updateCompanyStatus = async (companyId, status) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/api/companies/${companyId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};
