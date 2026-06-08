"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const createApplication = async (payload) => {
  const res = await fetch(`${baseUrl}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};
