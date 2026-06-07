const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const getRecruiterCompany = async (recruiterId) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/company?recruiterId=${recruiterId}`,
      { cache: "no-store" },
    );

    const text = await res.text();
    if (!text || text === "null") return null;

    return JSON.parse(text);
  } catch {
    return null;
  }
};

export const getAllCompanies = async () => {
  try {
    const res = await fetch(`${baseUrl}/companies`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};
