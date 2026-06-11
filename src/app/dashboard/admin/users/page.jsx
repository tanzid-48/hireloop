import { getUsers } from "@/lib/api/admin/user";
import Image from "next/image";

const ROLE_CONFIG = {
  admin: {
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.2)",
  },
  recruiter: {
    color: "#fbbf24",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
  },
  seeker: {
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.2)",
  },
};

const PLAN_CONFIG = {
  seeker_free: { label: "Free", color: "rgba(255,255,255,0.4)" },
  seeker_pro: { label: "Pro", color: "#60a5fa" },
  seeker_premium: { label: "Premium", color: "#a78bfa" },
  recruiter_free: { label: "Free", color: "rgba(255,255,255,0.4)" },
  recruiter_growth: { label: "Growth", color: "#34d399" },
  recruiter_enterprise: { label: "Enterprise", color: "#fbbf24" },
};

export default async function AdminUsersPage() {
  const users = await getUsers();
  const total = users.length;
  const seekers = users.filter((u) => u.role === "seeker").length;
  const recruiters = users.filter((u) => u.role === "recruiter").length;

  const cols = "1.8fr 2fr 1fr 1.2fr 1.5fr";

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Admin
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Users
        </h1>
        <p className="text-sm text-white/30 mt-1">{total} registered users</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: total, color: "#a78bfa", icon: "👥" },
          {
            label: "Job Seekers",
            value: seekers,
            color: "#60a5fa",
            icon: "🔍",
          },
          {
            label: "Recruiters",
            value: recruiters,
            color: "#fbbf24",
            icon: "🏢",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {stat.label}
              </span>
              <span>{stat.icon}</span>
            </div>
            <p className="text-3xl font-black" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="grid px-5 py-3.5"
          style={{
            gridTemplateColumns: cols,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {["Name", "Email", "Role", "Plan", "Joined"].map((h) => (
            <p
              key={h}
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {h}
            </p>
          ))}
        </div>

        {users.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm text-white/30">No users found</p>
          </div>
        ) : (
          users.map((user, i) => {
            const role = ROLE_CONFIG[user.role] || ROLE_CONFIG.seeker;
            const plan = PLAN_CONFIG[user.plan] || PLAN_CONFIG.seeker_free;
            const isLast = i === users.length - 1;
            const initials =
              user.name
                ?.split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase() || "U";

            return (
              <div
                key={user._id?.$oid || user._id}
                className="grid items-center px-5 py-4 hover:bg-white/[0.02] transition-colors"
                style={{
                  gridTemplateColumns: cols,
                  borderBottom: isLast
                    ? "none"
                    : "1px solid rgba(255,255,255,0.04)",
                }}
              >
                {/* Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{
                      backgroundColor: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.2)",
                      color: "#a78bfa",
                    }}
                  >
                    {user.image ? (
                      <Image
                        width={48}
                        height={48}
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white truncate">
                    {user.name || "—"}
                  </span>
                </div>

                {/* Email */}
                <p
                  className="text-sm truncate"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {user.email}
                </p>

                {/* Role */}
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit capitalize"
                  style={{
                    backgroundColor: role.bg,
                    color: role.color,
                    border: `1px solid ${role.border}`,
                  }}
                >
                  {user.role || "seeker"}
                </span>

                {/* Plan */}
                <span
                  className="text-xs font-medium"
                  style={{ color: plan.color }}
                >
                  {plan.label}
                </span>

                {/* Joined */}
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "—"}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
