"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const updateUserRole = async (userId, role) => {
  try {
    const res = await fetch(`${baseUrl}/admin/users/${userId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false };
    return { success: true, ...data };
  } catch {
    return { success: false };
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    const res = await fetch(`${baseUrl}/admin/users/${userId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false };
    return { success: true, ...data };
  } catch {
    return { success: false };
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await fetch(`${baseUrl}/admin/users/${userId}`, {
      method: "DELETE",
    });
    if (!res.ok) return { success: false };
    return { success: true };
  } catch {
    return { success: false };
  }
};
