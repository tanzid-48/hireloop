import { getSession } from "@/lib/auth-session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const role = session?.user?.role;

  if (role === "recruiter") {
    redirect("/dashboard/recruiter");
  }

  redirect("/dashboard/seeker");
}
