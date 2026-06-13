"use client";
import { useState } from "react";
import Link from "next/link";

const pricingData = {
  seekers: [
    {
      icon: "🔍",
      name: "Free",
      planId: null,
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "Perfect for exploring opportunities",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs/month",
        "Basic profile",
        "Email alerts",
      ],
    },
    {
      icon: "⚡",
      name: "Pro",
      planId: "seeker_pro",
      monthlyPrice: 19,
      yearlyPrice: 14,
      featured: true,
      description: "For serious job seekers on the move",
      features: [
        "Apply up to 30 jobs/month",
        "Unlimited saved jobs",
        "Application tracking",
        "Salary insights",
      ],
    },
    {
      icon: "👑",
      name: "Premium",
      planId: "seeker_premium",
      monthlyPrice: 39,
      yearlyPrice: 29,
      description: "Maximum visibility, zero limits",
      features: [
        "Everything in Pro",
        "Unlimited applications",
        "Profile boost to recruiters",
        "Early access to new jobs",
        "Priority support",
      ],
    },
  ],
  recruiters: [
    {
      icon: "📋",
      name: "Free",
      planId: null,
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "Great for your first year of hiring",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard listing visibility",
      ],
    },
    {
      icon: "📈",
      name: "Growth",
      planId: "recruiters_growth",
      monthlyPrice: 49,
      yearlyPrice: 37,
      featured: true,
      description: "Scale your hiring with confidence",
      features: [
        "Up to 10 active job posts",
        "Applicant tracking system",
        "Basic analytics dashboard",
        "Email support",
      ],
    },
    {
      icon: "🏢",
      name: "Enterprise",
      planId: "recruiters_enterprise",
      monthlyPrice: 149,
      yearlyPrice: 112,
      description: "For teams that hire at scale",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics",
        "Featured job listings",
        "Team collaboration tools",
        "Custom branding",
        "Priority support",
      ],
    },
  ],
};

export default function LandingPricing() {
  const [yearly, setYearly] = useState(false);
  const [tab, setTab] = useState("seekers");

  const plans = pricingData[tab];

  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#08080f" }}>
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <p className="text-[11px] tracking-[3px] uppercase text-white/40 font-medium">
            Pricing
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white text-center leading-tight tracking-tight mb-8">
          Simple plans for every
          <br />
          stage of your career
        </h2>

        {/* Tab */}
        <div className="flex justify-center mb-6">
          <div
            className="flex items-center p-1 rounded-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              { key: "seekers", label: "For Job Seekers" },
              { key: "recruiters", label: "For Recruiters" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={
                  tab === t.key
                    ? { backgroundColor: "rgba(99,102,241,0.8)", color: "#fff" }
                    : { color: "rgba(255,255,255,0.35)" }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Monthly / Yearly Toggle */}
        <div className="flex items-center justify-center mb-10">
          <div
            className="flex items-center p-1 rounded-full"
            style={{
              backgroundColor: "#13131f",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <button
              onClick={() => setYearly(false)}
              className="px-5 py-1.5 rounded-full text-sm font-medium transition-all"
              style={
                !yearly
                  ? { backgroundColor: "#fff", color: "#000" }
                  : { color: "rgba(255,255,255,0.5)" }
              }
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className="px-5 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2"
              style={
                yearly
                  ? { backgroundColor: "#fff", color: "#000" }
                  : { color: "rgba(255,255,255,0.5)" }
              }
            >
              Yearly
              <span className="bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                25%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-2xl p-6 transition-all"
              style={{
                backgroundColor: plan.featured ? "#13131f" : "#0f0f1a",
                border: plan.featured
                  ? "1px solid rgba(99,102,241,0.4)"
                  : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{plan.icon}</span>
                  <span className="text-white font-semibold text-sm">
                    {plan.name}
                  </span>
                </div>
                <div>
                  <span className="text-white font-bold text-2xl">
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-white/30 text-xs"> /mo</span>
                </div>
              </div>

              <p
                className="text-xs mb-4"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {plan.description}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 shrink-0"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      <path
                        d="M3 8l3.5 3.5L13 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.planId ? (
                <form action="/api/checkout_sessions" method="POST">
                  <input type="hidden" name="plan_id" value={plan.planId} />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-between px-4 transition-all"
                    style={
                      plan.featured
                        ? {
                            backgroundColor: "rgba(255,255,255,0.1)",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }
                        : {
                            backgroundColor: "rgba(255,255,255,0.05)",
                            color: "rgba(255,255,255,0.6)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }
                    }
                  >
                    Get Started
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M8 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </form>
              ) : (
                <Link
                  href="/signup"
                  className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-between px-4 transition-all"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  Get Started Free
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M8 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
