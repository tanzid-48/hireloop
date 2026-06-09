"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const createApplication = async (payload) => {
  try {
    const res = await fetch(`${baseUrl}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }
    return { success: true, ...data };
  } catch {
    return { success: false, message: "Server unreachable" };
  }
};
