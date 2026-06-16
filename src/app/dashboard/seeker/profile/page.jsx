import { getSession } from "@/lib/auth-session";
import { getApplicationsByUser } from "@/lib/api/applications";
import {
  Person,
  Calendar,
  Briefcase,
  CreditCard,
  CircleCheck,
} from "@gravity-ui/icons";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "My Profile | HireLoop",
  description: "Your public job seeker profile on HireLoop.",
};

const PLAN_LABELS = {
  seeker_free: { label: "Free Tier", color: "rgba(255,255,255,0.4)" },
  seeker_pro: { label: "Pro", color: "#60a5fa" },
  seeker_premium: { label: "Premium", color: "#a78bfa" },
};

export default async function SeekerProfilePage() {
  const session = await getSession();
  const user = session?.user;
  const applications = await getApplicationsByUser(user?.id);

  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";
  const plan = PLAN_LABELS[user?.plan] || PLAN_LABELS.seeker_free;
  const totalApps = applications?.length || 0;
  const pending =
    applications?.filter((a) => a.status === "pending").length || 0;
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Seeker
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          My Profile
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Your public profile on HireLoop.
        </p>
      </div>

      {/* Profile Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Banner */}
        <div
          className="h-24 w-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.08), rgba(52,211,153,0.06))",
          }}
        />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-5 flex-wrap gap-3">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-violet-400 overflow-hidden"
              style={{
                backgroundColor: "#0a0a12",
                border: "2px solid rgba(255,255,255,0.1)",
              }}
            >
              {user?.image ? (
                <Image
                width={64}
                height={64}
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(139,92,246,0.08)",
                  color: "#a78bfa",
                  border: "1px solid rgba(139,92,246,0.2)",
                }}
              >
                Job Seeker
              </span>
              <span
                className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{
                  color: plan.color,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {plan.label}
              </span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white">{user?.name || "—"}</h2>
          <p
            className="text-sm mt-0.5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {user?.email}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <Calendar className="w-3.5 h-3.5" /> Joined {joinDate}
            </div>
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <CreditCard className="w-3.5 h-3.5" /> {plan.label} Plan
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Applied", value: totalApps, color: "#a78bfa" },
          { label: "Pending Review", value: pending, color: "#fbbf24" },
          { label: "Profile Score", value: "72%", color: "#34d399" },
        ].map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center py-5 rounded-2xl text-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-2xl font-black mb-1" style={{ color: s.color }}>
              {s.value}
            </p>
            <p
              className="text-[10px] font-semibold"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Profile Completion */}
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Profile Completion
        </p>
        {[
          { label: "Basic Info", done: true },
          { label: "Profile Photo", done: !!user?.image },
          { label: "Professional Bio", done: false },
          { label: "Skills Added", done: false },
          { label: "Resume Uploaded", done: false },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2.5"
            style={{
              borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}
          >
            <span
              className="text-sm"
              style={{
                color: item.done
                  ? "rgba(255,255,255,0.7)"
                  : "rgba(255,255,255,0.3)",
              }}
            >
              {item.label}
            </span>
            {item.done ? (
              <CircleCheck className="w-4 h-4 text-emerald-400" />
            ) : (
              <span className="text-xs text-white/25">Pending</span>
            )}
          </div>
        ))}
      </div>

      {/* Edit CTA */}
      <Link
        href="/dashboard/seeker/settings"
        className="w-full flex items-center justify-center h-11 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
        style={{
          background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
          boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
        }}
      >
        Edit Profile →
      </Link>
    </div>
  );
}
