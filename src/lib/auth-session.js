import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const requireRole = async (role) => {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const userRole = session?.user?.role;

  if (userRole !== role) {
    redirect("/unauthorized");
  }

  return session;
};

// token
export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.session?.token || null;
};

//header 
export const getAuthHeaders = async () => {
  const token = await getUserToken();
  return {
    authorization: `Bearer ${token}`,
  };
};
