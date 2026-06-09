const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const saveSubscription = async (payload) => {
  try {
    const res = await fetch(`${baseUrl}/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

export const getUserSubscription = async (userId) => {
  try {
    const res = await fetch(`${baseUrl}/subscriptions/${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};
