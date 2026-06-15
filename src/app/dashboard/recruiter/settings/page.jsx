import { getSession } from "@/lib/auth-session";
import RecruiterSettingsForm from "./RecruiterSettingsForm";

export default async function RecruiterSettingsPage() {
  const session = await getSession();
  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Recruiter
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Settings
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Manage your account preferences.
        </p>
      </div>
      <RecruiterSettingsForm user={session?.user} />
    </div>
  );
}
