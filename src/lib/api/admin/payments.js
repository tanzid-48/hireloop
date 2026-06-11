const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

 export const getSubscriptions = async () => {
  try {
    const res = await fetch(`${baseUrl}/admin/subscriptions`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};
