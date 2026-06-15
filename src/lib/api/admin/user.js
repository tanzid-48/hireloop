import { getAuthHeaders } from "@/lib/auth-session";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const getUsers = async () => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/admin/users`, {
      cache: "no-store",
      headers,
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};
