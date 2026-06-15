import { getUsers } from "@/lib/api/admin/user";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";
import UserActions from "./UserActions";

const ITEMS_PER_PAGE = 8;

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
  seeker_free: { label: "Free", color: "rgba(255,255,255,0.3)" },
  seeker_pro: { label: "Pro", color: "#60a5fa" },
  seeker_premium: { label: "Premium", color: "#a78bfa" },
  recruiter_free: { label: "Free", color: "rgba(255,255,255,0.3)" },
  recruiter_growth: { label: "Growth", color: "#34d399" },
  recruiter_enterprise: { label: "Enterprise", color: "#fbbf24" },
};

export default async function AdminUsersPage({ searchParams }) {
  const users = await getUsers();
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp?.page || "1"));

  const total = users.length;
  const seekers = users.filter((u) => u.role === "seeker").length;
  const recruiters = users.filter((u) => u.role === "recruiter").length;
  const suspended = users.filter((u) => u.status === "suspended").length;

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = users.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Admin
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          User Management
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Review, filter and manage platform access for all users.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Active Users",
            value: total - suspended,
            color: "#a78bfa",
            sub: "+12% vs last month",
            subColor: "#34d399",
          },
          {
            label: "Recruiter Growth",
            value: recruiters,
            color: "#60a5fa",
            sub: "High demand",
            subColor: "#34d399",
          },
          {
            label: "Suspended Accounts",
            value: suspended,
            color: "#f87171",
            sub: `${total ? ((suspended / total) * 100).toFixed(1) : 0}% of total`,
            subColor: "rgba(255,255,255,0.3)",
          },
          {
            label: "Job Seekers",
            value: seekers,
            color: "#fbbf24",
            sub: "Steady activity",
            subColor: "rgba(255,255,255,0.3)",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-[10px] font-semibold text-white/30 mb-2 uppercase tracking-widest">
              {stat.label}
            </p>
            <p className="text-2xl font-black" style={{ color: stat.color }}>
              {stat.value.toLocaleString()}
            </p>
            <p
              className="text-xs mt-1 font-medium"
              style={{ color: stat.subColor }}
            >
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Table — Desktop */}
      <div
        className="hidden md:block rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="grid px-5 py-3.5"
          style={{
            gridTemplateColumns: "1.6fr 2fr 0.8fr 0.8fr 1fr 1fr 2fr",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {[
            "User Name",
            "Email Address",
            "Role",
            "Plan",
            "Join Date",
            "Status",
            "Actions",
          ].map((h) => (
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

        {paginated.map((user, i) => {
          const id = user._id?.$oid || user._id?.toString();
          const role = ROLE_CONFIG[user.role] || ROLE_CONFIG.seeker;
          const plan = PLAN_CONFIG[user.plan] || PLAN_CONFIG.seeker_free;
          const isSuspended = user.status === "suspended";
          const isLast = i === paginated.length - 1;
          const initials =
            user.name
              ?.split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase() || "U";

          return (
            <div
              key={id}
              className="grid items-center px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
              style={{
                gridTemplateColumns: "1.6fr 2fr 0.8fr 0.8fr 1fr 1fr 2.2fr",
                borderBottom: isLast
                  ? "none"
                  : "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold overflow-hidden"
                  style={{
                    backgroundColor: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    color: "#a78bfa",
                  }}
                >
                  {user.image ? (
                    <Image
                      width={32}
                      height={32}
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
              <p
                className="text-sm truncate"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {user.email}
              </p>
              <span
                className="text-[11px] font-semibold px-2 py-1 rounded-full w-fit capitalize"
                style={{
                  backgroundColor: role.bg,
                  color: role.color,
                  border: `1px solid ${role.border}`,
                }}
              >
                {user.role || "seeker"}
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: plan.color }}
              >
                {plan.label}
              </span>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : "—"}
              </p>
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit"
                style={
                  isSuspended
                    ? {
                        backgroundColor: "rgba(248,113,113,0.1)",
                        color: "#f87171",
                        border: "1px solid rgba(248,113,113,0.2)",
                      }
                    : {
                        backgroundColor: "rgba(52,211,153,0.1)",
                        color: "#34d399",
                        border: "1px solid rgba(52,211,153,0.2)",
                      }
                }
              >
                {isSuspended ? "Suspended" : "Active"}
              </span>
              <UserActions userId={id} role={user.role} status={user.status} />
            </div>
          );
        })}

        {/* Pagination */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            Showing{" "}
            <strong className="text-white/60">
              {start + 1}–{Math.min(start + ITEMS_PER_PAGE, total)}
            </strong>{" "}
            of <strong className="text-white/60">{total}</strong> users
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`?page=${page - 1}`}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${page === 1 ? "pointer-events-none opacity-20" : "hover:bg-white/[0.06]"}`}
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            {Array.from(
              { length: Math.min(totalPages, 5) },
              (_, i) => i + 1,
            ).map((p) => (
              <Link
                key={p}
                href={`?page=${p}`}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all"
                style={
                  p === page
                    ? {
                        background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                        color: "#fff",
                      }
                    : {
                        border: "1px solid rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.4)",
                      }
                }
              >
                {p}
              </Link>
            ))}
            {totalPages > 5 && (
              <span className="text-white/30 text-xs">...</span>
            )}
            <Link
              href={`?page=${page + 1}`}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${page === totalPages ? "pointer-events-none opacity-20" : "hover:bg-white/[0.06]"}`}
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="flex flex-col gap-3 md:hidden">
        {paginated.map((user) => {
          const id = user._id?.$oid || user._id?.toString();
          const role = ROLE_CONFIG[user.role] || ROLE_CONFIG.seeker;
          const plan = PLAN_CONFIG[user.plan] || PLAN_CONFIG.seeker_free;
          const isSuspended = user.status === "suspended";
          const initials =
            user.name
              ?.split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase() || "U";

          return (
            <div
              key={id}
              className="flex flex-col gap-3 p-4 rounded-2xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.018)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{
                      backgroundColor: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.2)",
                      color: "#a78bfa",
                    }}
                  >
                    {user.image ? (
                      <Image
                        width={36}
                        height={36}
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {user.name || "—"}
                    </p>
                    <p
                      className="text-xs truncate max-w-[160px]"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {user.email}
                    </p>
                  </div>
                </div>
                <span
                  className="text-[11px] font-semibold px-2 py-1 rounded-full"
                  style={
                    isSuspended
                      ? {
                          backgroundColor: "rgba(248,113,113,0.1)",
                          color: "#f87171",
                          border: "1px solid rgba(248,113,113,0.2)",
                        }
                      : {
                          backgroundColor: "rgba(52,211,153,0.1)",
                          color: "#34d399",
                          border: "1px solid rgba(52,211,153,0.2)",
                        }
                  }
                >
                  {isSuspended ? "Suspended" : "Active"}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[11px] font-semibold px-2 py-1 rounded-full capitalize"
                  style={{
                    backgroundColor: role.bg,
                    color: role.color,
                    border: `1px solid ${role.border}`,
                  }}
                >
                  {user.role || "seeker"}
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: plan.color }}
                >
                  {plan.label}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </span>
              </div>
              <UserActions userId={id} role={user.role} status={user.status} />
            </div>
          );
        })}

        {/* Mobile Pagination */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            {start + 1}–{Math.min(start + ITEMS_PER_PAGE, total)} of {total}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`?page=${page - 1}`}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${page === 1 ? "pointer-events-none opacity-20" : ""}`}
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <span className="text-xs text-white/40">
              {page} / {totalPages}
            </span>
            <Link
              href={`?page=${page + 1}`}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${page === totalPages ? "pointer-events-none opacity-20" : ""}`}
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
