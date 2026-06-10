import { getSession } from "@/lib/auth-session";
import { getApplicationsByUser } from "@/lib/api/applications";
import { getUserPlan } from "@/lib/api/applications";
import Link from "next/link";
import {
  Briefcase,
  Bookmark,
  FileText,
  CircleCheck,
  Rocket,
  MapPin,
} from "@gravity-ui/icons";

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div
    className="flex items-center gap-4 p-5 rounded-2xl"
    style={{
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.07)",
    }}
  >
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
      style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
    >
      <Icon className="w-5 h-5" style={{ color }} />
    </div>
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
        {label}
      </p>
    </div>
  </div>
);

export default async function SeekerHomePage() {
  const session = await getSession();
  const userId = session?.user?.id;
  const name = session?.user?.name || "there";

  const [applications, planInfo] = await Promise.all([
    getApplicationsByUser(userId),
    getUserPlan(userId),
  ]);

  const totalApps = applications?.length || 0;
  const pendingApps =
    applications?.filter((a) => a.status === "pending")?.length || 0;
  const monthlyCount = planInfo?.monthlyCount ?? 0;
  const maxApplications = planInfo?.maxApplicationsPerMonth ?? 3;
  const planName = planInfo?.name ?? "Free Tier";
  const usagePercentage = Math.min((monthlyCount / maxApplications) * 100, 100);
  const hasReachedLimit = planInfo?.hasReachedLimit ?? false;

  const recentApps = applications?.slice(0, 3) || [];

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* ── Welcome ── */}
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Dashboard
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Welcome back, {name.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Track your applications and manage your job search.
        </p>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Applications"
          value={totalApps}
          icon={FileText}
          color="#a78bfa"
        />
        <StatCard
          label="Pending Review"
          value={pendingApps}
          icon={Briefcase}
          color="#60a5fa"
        />
        <StatCard
          label="This Month"
          value={monthlyCount}
          icon={CircleCheck}
          color="#34d399"
        />
      </div>

      {/* ── Plan Quota ── */}
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Monthly Quota
            </p>
            <p className="text-sm font-bold text-white">
              Applied to{" "}
              <span
                className={hasReachedLimit ? "text-red-400" : "text-violet-400"}
              >
                {monthlyCount}
              </span>{" "}
              / {maxApplications} positions
            </p>
          </div>
          <span
            className="text-[11px] font-semibold px-3 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(139,92,246,0.08)",
              color: "rgba(167,139,250,0.9)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            {planName}
          </span>
        </div>

        <div
          className="w-full h-2 rounded-full overflow-hidden mb-4"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${usagePercentage}%`,
              background: hasReachedLimit
                ? "linear-gradient(90deg, #f87171, #ef4444)"
                : "linear-gradient(90deg, #a78bfa, #7c3aed)",
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <Rocket className="w-4 h-4 text-violet-400" />
            {hasReachedLimit
              ? "You've reached your monthly limit."
              : `${maxApplications - monthlyCount} applications remaining this month.`}
          </div>
          {hasReachedLimit && (
            <Link
              href="/plans"
              className="text-xs font-bold px-3 h-8 rounded-lg flex items-center text-white"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              }}
            >
              Upgrade →
            </Link>
          )}
        </div>
      </div>

      {/* ── Recent Applications ── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Recent Applications</h2>
          <Link
            href="/dashboard/seeker/applications"
            className="text-xs text-violet-400 hover:underline"
          >
            View all →
          </Link>
        </div>

        {recentApps.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 rounded-2xl text-center gap-3"
            style={{
              backgroundColor: "rgba(255,255,255,0.018)",
              border: "1px dashed rgba(255,255,255,0.1)",
            }}
          >
            <Briefcase className="w-8 h-8 text-white/15" />
            <p className="text-sm font-semibold text-white/40">
              No applications yet
            </p>
            <p className="text-xs text-white/25">
              Start applying to jobs to track them here
            </p>
            <Link
              href="/jobs"
              className="mt-2 px-5 h-9 rounded-xl text-xs font-bold text-white flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
              }}
            >
              Browse Jobs →
            </Link>
          </div>
        ) : (
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {recentApps.map((app, i) => {
              const isLast = i === recentApps.length - 1;
              const statusColor = {
                pending: {
                  color: "#fbbf24",
                  bg: "rgba(245,158,11,0.08)",
                  border: "rgba(245,158,11,0.2)",
                },
                accepted: {
                  color: "#34d399",
                  bg: "rgba(52,211,153,0.08)",
                  border: "rgba(52,211,153,0.2)",
                },
                rejected: {
                  color: "#f87171",
                  bg: "rgba(248,113,113,0.08)",
                  border: "rgba(248,113,113,0.2)",
                },
              }[app.status] || {
                color: "#a78bfa",
                bg: "rgba(139,92,246,0.08)",
                border: "rgba(139,92,246,0.2)",
              };

              return (
                <div
                  key={app._id?.$oid || app._id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                  style={{
                    borderBottom: isLast
                      ? "none"
                      : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold text-violet-400"
                      style={{
                        backgroundColor: "rgba(139,92,246,0.08)",
                        border: "1px solid rgba(139,92,246,0.15)",
                      }}
                    >
                      {app.jobTitle?.[0] || "J"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {app.jobTitle || "—"}
                      </p>
                      <p
                        className="text-xs truncate"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {app.appliedAt
                          ? new Date(app.appliedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "—"}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize shrink-0"
                    style={{
                      backgroundColor: statusColor.bg,
                      color: statusColor.color,
                      border: `1px solid ${statusColor.border}`,
                    }}
                  >
                    {app.status || "pending"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/jobs"
          className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
          style={{
            backgroundColor: "rgba(139,92,246,0.06)",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          <MapPin className="w-5 h-5 text-violet-400" />
          <div>
            <p className="text-sm font-semibold text-white">Browse Jobs</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              Find new opportunities
            </p>
          </div>
        </Link>
        <Link
          href="/plans"
          className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
          style={{
            backgroundColor: "rgba(52,211,153,0.05)",
            border: "1px solid rgba(52,211,153,0.12)",
          }}
        >
          <Rocket className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-sm font-semibold text-white">Upgrade Plan</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              Apply to more jobs
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
