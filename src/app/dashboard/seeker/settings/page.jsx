import { getSession } from "@/lib/auth-session";
import SettingsForm from "./SettingsForm";

export const metadata = {
  title: "Settings | HireLoop",
  description:
    "Manage your HireLoop account settings, profile info, and preferences.",
};

export default async function SettingsPage() {
  const session = await getSession();
  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Account
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Settings
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Manage your account details and professional profile.
        </p>
      </div>
      <SettingsForm user={session?.user} />
    </div>
  );
}
