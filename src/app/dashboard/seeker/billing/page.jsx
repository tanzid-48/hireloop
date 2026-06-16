import { getSession } from "@/lib/auth-session";
import { getUserPlan } from "@/lib/api/applications";
import Link from "next/link";
import { CreditCard, Rocket, CircleCheck } from "@gravity-ui/icons";

export const metadata = {
  title: "Billing & Subscription | HireLoop",
  description:
    "Manage your HireLoop subscription, view usage, and billing history.",
};

const PLAN_META = {
  seeker_free: {
    name: "Free Tier",
    price: "$0",
    period: "forever",
    color: "rgba(255,255,255,0.5)",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to 3 jobs/month",
      "Basic profile",
      "Email alerts",
    ],
  },
  seeker_pro: {
    name: "Pro",
    price: "$19",
    period: "mo",
    color: "#60a5fa",
    features: [
      "Apply up to 30 jobs/month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
  },
  seeker_premium: {
    name: "Premium",
    price: "$39",
    period: "mo",
    color: "#a78bfa",
    features: [
      "Everything in Pro",
      "Unlimited applications",
      "Profile boost",
      "Early access to new jobs",
      "Priority support",
    ],
  },
};

export default async function BillingPage() {
  const session = await getSession();
  const planInfo = await getUserPlan(session?.user?.id);

  const planKey = planInfo?.planKey || "seeker_free";
  const planMeta = PLAN_META[planKey] || PLAN_META.seeker_free;
  const monthly = planInfo?.monthlyCount ?? 0;
  const maxApps = planInfo?.maxApplicationsPerMonth ?? 3;
  const isFree = planKey === "seeker_free";
  const pct = Math.min(
    (monthly / (maxApps === 999 ? 100 : maxApps)) * 100,
    100,
  );

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Account
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Billing & Subscription
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Manage your plan, payments, and billing history.
        </p>
      </div>

      {/* Current Plan */}
      <div
        className="rounded-2xl p-6"
        style={{
          backgroundColor: "rgba(139,92,246,0.05)",
          border: "1px solid rgba(139,92,246,0.2)",
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
          <div>
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(139,92,246,0.1)",
                color: "#a78bfa",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              Current Plan
            </span>
            <div className="flex items-end gap-2 mt-3">
              <span className="text-4xl font-black text-white">
                {planMeta.price}
              </span>
              {!isFree && (
                <span className="text-white/40 text-sm mb-1">
                  /{planMeta.period}
                </span>
              )}
            </div>
            <p
              className="text-lg font-bold mt-0.5"
              style={{ color: planMeta.color }}
            >
              {planMeta.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/30 mb-1">Apps this month</p>
            <p className="text-2xl font-black text-white">
              {monthly}{" "}
              <span className="text-white/30 text-lg">
                / {maxApps === 999 ? "∞" : maxApps}
              </span>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
          {planMeta.features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <CircleCheck className="w-3.5 h-3.5 shrink-0 text-violet-400" />
              {f}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {isFree ? (
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-5 h-10 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
              }}
            >
              <Rocket className="w-3.5 h-3.5" /> Upgrade Plan
            </Link>
          ) : (
            <>
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-5 h-10 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                }}
              >
                Upgrade Plan
              </Link>
              <button
                className="px-5 h-10 rounded-xl text-sm text-white/40 hover:text-white/60 transition-all"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                Manage Plan
              </button>
            </>
          )}
        </div>
      </div>

      {/* Usage Bar */}
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Monthly Usage
          </p>
          <span className="text-xs text-white/40">
            {maxApps === 999 ? "Unlimited" : `${maxApps - monthly} remaining`}
          </span>
        </div>
        <div
          className="w-full h-2 rounded-full overflow-hidden mb-2"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background:
                pct >= 90
                  ? "linear-gradient(90deg, #f87171, #ef4444)"
                  : "linear-gradient(90deg, #a78bfa, #7c3aed)",
            }}
          />
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          {monthly} of {maxApps === 999 ? "unlimited" : maxApps} applications
          used this month
        </p>
      </div>

      {/* Billing History */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-sm font-bold text-white">Billing History</p>
          <CreditCard className="w-4 h-4 text-white/30" />
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
          <p className="text-sm text-white/30">No billing history yet</p>
          <p className="text-xs text-white/20">
            Your payment history will appear here after your first purchase.
          </p>
        </div>
      </div>

      {/* Help */}
      <div
        className="flex items-center justify-between gap-4 p-4 rounded-2xl flex-wrap"
        style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div>
          <p className="text-sm font-semibold text-white">
            Need help with your invoice?
          </p>
          <p className="text-xs text-white/35 mt-0.5">
            Our support team is available 24/7.
          </p>
        </div>
        <a
          href="mailto:support@hireloop.com"
          className="px-4 h-9 rounded-xl text-xs font-bold flex items-center whitespace-nowrap hover:opacity-80 transition-all"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
