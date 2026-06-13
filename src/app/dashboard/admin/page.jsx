import { getSession } from "@/lib/auth-session";
import { getUsers } from "@/lib/api/admin/user";
import { getAllJobs } from "@/lib/api/jobs";
import { getAllCompanies } from "@/lib/api/company";
import { getSubscriptions } from "@/lib/api/admin/payments";
import Link from "next/link";
import {
  Person,
  Briefcase,
  Factory,
  CreditCard,
  ArrowUpRightFromSquare,
} from "@gravity-ui/icons";

const StatCard = ({ label, value, icon: Icon, color, trend, href }) => (
  <Link
    href={href || "#"}
    className="flex flex-col gap-3 p-5 rounded-2xl transition-all hover:-translate-y-0.5"
    style={{
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.07)",
    }}
  >
    <div className="flex justify-between items-start">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          backgroundColor: `${color}15`,
          border: `1px solid ${color}25`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <span
        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
        style={{
          color: trend.startsWith("+") ? "#34d399" : "#f87171",
          backgroundColor: trend.startsWith("+")
            ? "rgba(52,211,153,0.1)"
            : "rgba(248,113,113,0.1)",
        }}
      >
        {trend}
      </span>
    </div>
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/40 mt-0.5">{label}</p>
    </div>
  </Link>
);

const PLAN_LABELS = {
  seeker_pro: "Seeker Pro",
  seeker_premium: "Seeker Premium",
  recruiters_growth: "Recruiter Growth",
  recruiters_enterprise: "Enterprise",
};

export default async function AdminDashboardPage() {
  const session = await getSession();
  const name = session?.user?.name || "Admin";

  const [users, jobs, companies, subscriptions] = await Promise.all([
    getUsers(),
    getAllJobs(),
    getAllCompanies(),
    getSubscriptions(),
  ]);

  const recruiters = users.filter((u) => u.role === "recruiter").length;
  const approvedCos = companies.filter((c) => c.status === "approved").length;
  const activeJobs = jobs.filter((j) => j.status === "active").length;
  const activeSubsRevenue = subscriptions.reduce((sum, s) => {
    if (s.status !== "active") return sum;
    const prices = {
      seeker_pro: 19,
      seeker_premium: 39,
      recruiters_growth: 49,
      recruiters_enterprise: 149,
    };
    return sum + (prices[s.planId] || 0);
  }, 0);

  const recentSubs = subscriptions.slice(0, 5);
  const categoryCount = {};
  jobs.forEach((j) => {
    if (j.category)
      categoryCount[j.category] = (categoryCount[j.category] || 0) + 1;
  });
  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxCat = topCategories[0]?.[1] || 1;

  const CATEGORY_COLORS = [
    "#818cf8",
    "#f472b6",
    "#fbbf24",
    "#34d399",
    "#60a5fa",
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-emerald-400/70">
            Admin Panel
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            Welcome back, {name.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-white/30 mt-1">
            Real-time platform performance and growth metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-3 py-1.5 rounded-lg"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Live Data
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard
          label="Total Users"
          value={users.length.toLocaleString()}
          icon={Person}
          color="#a78bfa"
          trend="+12%"
          href="/dashboard/admin/users"
        />
        <StatCard
          label="Recruiters"
          value={recruiters}
          icon={Briefcase}
          color="#60a5fa"
          trend="+8%"
          href="/dashboard/admin/users"
        />
        <StatCard
          label="Companies"
          value={approvedCos}
          icon={Factory}
          color="#fbbf24"
          trend="+5%"
          href="/dashboard/admin/companies"
        />
        <StatCard
          label="Active Jobs"
          value={activeJobs}
          icon={ArrowUpRightFromSquare}
          color="#34d399"
          trend="+24%"
          href="/dashboard/admin/jobs"
        />
        <StatCard
          label="Monthly Revenue"
          value={`$${activeSubsRevenue.toLocaleString()}`}
          icon={CreditCard}
          color="#f472b6"
          trend="+18%"
          href="/dashboard/admin/payments"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Job Posts by Category */}
        <div
          className="p-5 rounded-2xl flex flex-col gap-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              Job Posts by Category
            </h3>
            <Link
              href="/dashboard/admin/jobs"
              className="text-xs text-violet-400 hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {topCategories.map(([cat, count], i) => (
              <div key={cat} className="flex items-center gap-3">
                <p className="text-xs text-white/50 w-24 truncate shrink-0">
                  {cat}
                </p>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(count / maxCat) * 100}%`,
                      backgroundColor: CATEGORY_COLORS[i],
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-white/60 w-6 text-right">
                  {count}
                </span>
              </div>
            ))}
            {topCategories.length === 0 && (
              <p className="text-xs text-white/25 text-center py-6">
                No data yet
              </p>
            )}
          </div>
        </div>

        {/* Platform Overview */}
        <div
          className="p-5 rounded-2xl flex flex-col gap-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h3 className="text-sm font-bold text-white">Platform Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Jobs", value: jobs.length, color: "#a78bfa" },
              { label: "Active Jobs", value: activeJobs, color: "#34d399" },
              {
                label: "Pending Cos",
                value: companies.filter(
                  (c) => c.status === "pending" || !c.status,
                ).length,
                color: "#fbbf24",
              },
              {
                label: "Subscriptions",
                value: subscriptions.length,
                color: "#60a5fa",
              },
              {
                label: "Suspended",
                value: users.filter((u) => u.status === "suspended").length,
                color: "#f87171",
              },
              {
                label: "Seekers",
                value: users.filter((u) => u.role === "seeker").length,
                color: "#2dd4bf",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col p-3 rounded-xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <p className="text-xl font-black" style={{ color: item.color }}>
                  {item.value}
                </p>
                <p className="text-[10px] text-white/35 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h3 className="text-sm font-bold text-white">
            Recent Subscription Transactions
          </h3>
          <Link
            href="/dashboard/admin/payments"
            className="text-xs text-violet-400 hover:underline"
          >
            View all →
          </Link>
        </div>

        {recentSubs.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-white/25">No transactions yet</p>
          </div>
        ) : (
          <>
            {/* Desktop header */}
            <div
              className="hidden md:grid px-5 py-3"
              style={{
                gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {[
                "User/Recruiter",
                "Plan Type",
                "Transaction ID",
                "Amount",
                "Status",
              ].map((h) => (
                <p
                  key={h}
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.25)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {h}
                </p>
              ))}
            </div>

            {recentSubs.map((sub, i) => {
              const isLast = i === recentSubs.length - 1;
              const PRICES = {
                seeker_pro: 19,
                seeker_premium: 39,
                recruiters_growth: 49,
                recruiters_enterprise: 149,
              };
              const amount = PRICES[sub.planId] || 0;
              const isActive = sub.status === "active";

              return (
                <div
                  key={sub._id?.$oid || sub._id}
                  className="px-5 py-4 hover:bg-white/[0.02] transition-colors"
                  style={{
                    borderBottom: isLast
                      ? "none"
                      : "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Mobile view */}
                  <div className="flex items-center justify-between md:hidden">
                    <div>
                      <p className="text-sm font-semibold text-white truncate max-w-[160px]">
                        {sub.email || "—"}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {PLAN_LABELS[sub.planId] || sub.planId}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-white">${amount}</p>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={
                          isActive
                            ? {
                                backgroundColor: "rgba(52,211,153,0.1)",
                                color: "#34d399",
                              }
                            : {
                                backgroundColor: "rgba(248,113,113,0.1)",
                                color: "#f87171",
                              }
                        }
                      >
                        {isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Desktop view */}
                  <div
                    className="hidden md:grid items-center"
                    style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr" }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{
                          backgroundColor: "rgba(139,92,246,0.1)",
                          color: "#a78bfa",
                        }}
                      >
                        {sub.email?.[0]?.toUpperCase() || "U"}
                      </div>
                      <p className="text-sm text-white truncate">
                        {sub.email || "—"}
                      </p>
                    </div>
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit"
                      style={{
                        backgroundColor: "rgba(139,92,246,0.08)",
                        color: "#a78bfa",
                        border: "1px solid rgba(139,92,246,0.2)",
                      }}
                    >
                      {PLAN_LABELS[sub.planId] || sub.planId}
                    </span>
                    <p
                      className="text-xs font-mono truncate"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      {sub.stripeSubscriptionId?.slice(0, 12) || "—"}...
                    </p>
                    <p className="text-sm font-bold text-white">${amount}.00</p>
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit"
                      style={
                        isActive
                          ? {
                              backgroundColor: "rgba(52,211,153,0.1)",
                              color: "#34d399",
                              border: "1px solid rgba(52,211,153,0.2)",
                            }
                          : {
                              backgroundColor: "rgba(248,113,113,0.1)",
                              color: "#f87171",
                              border: "1px solid rgba(248,113,113,0.2)",
                            }
                      }
                    >
                      {isActive ? "● Active" : "● Inactive"}
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Manage Users",
            href: "/dashboard/admin/users",
            color: "#a78bfa",
            desc: `${users.length} total`,
          },
          {
            label: "Review Companies",
            href: "/dashboard/admin/companies",
            color: "#fbbf24",
            desc: `${companies.filter((c) => !c.status || c.status === "pending").length} pending`,
          },
          {
            label: "All Jobs",
            href: "/dashboard/admin/jobs",
            color: "#34d399",
            desc: `${activeJobs} active`,
          },
          {
            label: "Payments",
            href: "/dashboard/admin/payments",
            color: "#60a5fa",
            desc: `${subscriptions.length} subs`,
          },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col gap-2 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-sm font-bold text-white">{item.label}</p>
            <p className="text-xs" style={{ color: item.color }}>
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
