const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const getSavedJobsByUser = async (userId) => {
  if (!userId) return [];
  try {
    const res = await fetch(`${baseUrl}/saved-jobs?userId=${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};
