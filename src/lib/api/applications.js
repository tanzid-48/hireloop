const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const getApplicationsByJob = async (jobId) => {
  try {
    const res = await fetch(`${baseUrl}/applications?jobId=${jobId}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};

export const getApplicationsByUser = async (userId) => {
  try {
    const res = await fetch(`${baseUrl}/applications?userId=${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};
