"use client";

import { useState } from "react";
import { Check } from "@gravity-ui/icons";

const pricingData = {
  seekers: [
    {
      name: "Free",
      id: "seeker_free",
      price: 0,
      tag: null,
      icon: "🔍",
      description: "Perfect for exploring opportunities",
      cta: "Get Started Free",
      ctaStyle: "ghost",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs/month",
        "Basic profile",
        "Email alerts",
      ],
    },
    {
      name: "Pro",
      id: "seeker_pro",
      price: 19,
      tag: "Most Popular",
      icon: "⚡",
      description: "For serious job seekers on the move",
      cta: "Start Pro Trial",
      ctaStyle: "primary",
      features: [
        "Apply up to 30 jobs/month",
        "Unlimited saved jobs",
        "Application tracking",
        "Salary insights",
      ],
    },
    {
      name: "Premium",
      id: "seeker_premium",
      price: 39,
      tag: "Best Value",
      icon: "👑",
      description: "Maximum visibility, zero limits",
      cta: "Go Premium",
      ctaStyle: "outline",
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
      name: "Free",
      id: "recruiters_free",
      price: 0,
      tag: null,
      icon: "📋",
      description: "Great for your first hire",
      cta: "Get Started Free",
      ctaStyle: "ghost",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard listing visibility",
      ],
    },
    {
      name: "Growth",
      id: "recruiters_growth",
      price: 49,
      tag: "Most Popular",
      icon: "📈",
      description: "Scale your hiring with confidence",
      cta: "Start Growth Trial",
      ctaStyle: "primary",
      features: [
        "Up to 10 active job posts",
        "Applicant tracking system",
        "Basic analytics dashboard",
        "Email support",
      ],
    },
    {
      name: "Enterprise",
      id: "recruiters_enterprise",
      price: 149,
      tag: "Full Power",
      icon: "🏢",
      description: "For teams that hire at scale",
      cta: "Contact Sales",
      ctaStyle: "outline",
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

const tagStyle = {
  "Most Popular": {
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.25)",
  },
  "Best Value": {
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.25)",
  },
  "Full Power": {
    color: "#fbbf24",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
  },
};

function PricingCard({ plan }) {
  const isPopular = plan.tag === "Most Popular";
  const tag = plan.tag ? tagStyle[plan.tag] : null;

  return (
    <div
      className="relative flex flex-col rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
      style={{
        backgroundColor: isPopular
          ? "rgba(59,130,246,0.05)"
          : "rgba(255,255,255,0.02)",
        border: isPopular
          ? "2px solid rgba(59,130,246,0.4)"
          : "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Tag */}
      {plan.tag && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap"
          style={{
            backgroundColor: tag.bg,
            color: tag.color,
            border: `1px solid ${tag.border}`,
          }}
        >
          {plan.tag}
        </div>
      )}

      {/* Icon + Name */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {plan.icon}
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">{plan.name}</h3>
          <p className="text-[11px] text-white/30 mt-0.5">{plan.description}</p>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        {plan.price === 0 ? (
          <span className="text-4xl font-bold text-white">Free</span>
        ) : (
          <div className="flex items-end gap-1">
            <span className="text-white/40 text-lg mb-1">$</span>
            <span className="text-4xl font-bold text-white leading-none">
              {plan.price}
            </span>
            <span className="text-white/30 text-sm mb-1">/mo</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div
        className="mb-5"
        style={{ height: "0.5px", backgroundColor: "rgba(255,255,255,0.07)" }}
      />

      {/* Features */}
      <ul className="flex flex-col gap-3 flex-1 mb-7">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className="mt-0.5 shrink-0"
              style={{ color: isPopular ? "#60a5fa" : "rgba(255,255,255,0.3)" }}
            >
              <Check className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs text-white/50 leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {/* CTA Section - Corrected */}
      <form
        action="/api/checkout_sessions"
        method="POST"
        className="w-full mt-auto"
      >
        <input type="hidden" name="plan_id" value={plan.id} />

        <button
          type="submit"
          className={`w-full py-3 rounded-xl text-center text-sm font-bold transition-all active:scale-[0.98] ${
            plan.name === "Premium"
              ? "bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] border border-white/10"
              : plan.ctaStyle === "primary"
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                : "border border-white/10 hover:border-white/20 text-white/70 hover:bg-white/5"
          }`}
        >
          {plan.name === "Premium" ? "Upgrade to Premium" : plan.cta}
        </button>
      </form>
    </div>
  );
}

export default function PricingPage() {
  const [tab, setTab] = useState("seekers");

  return (
    <div
      className="min-h-screen text-white py-20 px-6 relative overflow-hidden"
      style={{ background: "#09090b" }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Simple, transparent pricing
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Choose the plan that fits
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              your goals
            </span>
          </h1>
          <p className="text-zinc-500 text-base max-w-md mx-auto">
            No hidden fees. Cancel anytime. Upgrade or downgrade as your needs
            evolve.
          </p>
        </div>

        {/* Tab */}
        <div className="flex justify-center mb-12">
          <div
            className="p-1 rounded-full inline-flex"
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
                    ? { backgroundColor: "rgba(59,130,246,0.8)", color: "#fff" }
                    : { color: "rgba(255,255,255,0.35)" }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {pricingData[tab].map((plan) => (
            <PricingCard key={`${tab}-${plan.name}`} plan={plan} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-white/20 text-xs mt-10">
          All plans include a 14-day free trial. No credit card required for
          Free plan.
        </p>
      </div>
    </div>
  );
}
