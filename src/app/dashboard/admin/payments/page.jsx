import { getSubscriptions } from "@/lib/api/admin/payments";

const PLAN_CONFIG = {
  seeker_pro: {
    label: "Seeker Pro",
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
  },
  seeker_premium: {
    label: "Seeker Premium",
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.2)",
  },
  recruiters_growth: {
    label: "Recruiter Growth",
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.2)",
  },
  recruiters_enterprise: {
    label: "Recruiter Enterprise",
    color: "#fbbf24",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
  },
};

export default async function AdminPaymentsPage() {
  const subscriptions = await getSubscriptions();
  const total = subscriptions.length;
  const active = subscriptions.filter((s) => s.status === "active").length;

  const cols = "2fr 1.5fr 1.5fr 1fr 1.5fr";

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Admin
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Payments
        </h1>
        <p className="text-sm text-white/30 mt-1">
          All subscriptions and payments
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Subscriptions",
            value: total,
            color: "#a78bfa",
            icon: "💳",
          },
          { label: "Active", value: active, color: "#34d399", icon: "✅" },
          {
            label: "Inactive",
            value: total - active,
            color: "#f87171",
            icon: "⏸️",
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
          {["Email", "Plan", "Status", "Period End", "Subscription ID"].map(
            (h) => (
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
            ),
          )}
        </div>

        {subscriptions.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm text-white/30">No subscriptions yet</p>
          </div>
        ) : (
          subscriptions.map((sub, i) => {
            const plan = PLAN_CONFIG[sub.planId] || {
              label: sub.planId,
              color: "#a78bfa",
              bg: "rgba(139,92,246,0.1)",
              border: "rgba(139,92,246,0.2)",
            };
            const isLast = i === subscriptions.length - 1;
            const isActive = sub.status === "active";

            return (
              <div
                key={sub._id?.$oid || sub._id}
                className="grid items-center px-5 py-4 hover:bg-white/[0.02] transition-colors"
                style={{
                  gridTemplateColumns: cols,
                  borderBottom: isLast
                    ? "none"
                    : "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <p
                  className="text-sm truncate"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {sub.email || "—"}
                </p>
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit"
                  style={{
                    backgroundColor: plan.bg,
                    color: plan.color,
                    border: `1px solid ${plan.border}`,
                  }}
                >
                  {plan.label}
                </span>
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit capitalize"
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
                  {sub.status}
                </span>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {sub.currentPeriodEnd
                    ? new Date(sub.currentPeriodEnd).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "2-digit", year: "numeric" },
                      )
                    : "—"}
                </p>
                <p
                  className="text-xs font-mono truncate"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  {sub.stripeSubscriptionId || "—"}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
