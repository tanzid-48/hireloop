"use client";
import { useState } from "react";
import Link from "next/link";

const seekerSteps = [
  {
    number: "01",
    color: "#818cf8",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="m21 21-4.35-4.35"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Create your profile",
    desc: "Sign up in seconds. Add your skills, experience, and the kind of role you're looking for.",
  },
  {
    number: "02",
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M14 17.5h7M17.5 14v7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Browse & filter jobs",
    desc: "Search thousands of verified listings. Filter by role, salary, location, or work type.",
  },
  {
    number: "03",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.82 16v.92z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Apply & get hired",
    desc: "Submit your application in one click. Track status and hear back from top employers fast.",
  },
];

const recruiterSteps = [
  {
    number: "01",
    color: "#fbbf24",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Register your company",
    desc: "Create a company profile and get verified by our team. Approved companies get priority visibility.",
  },
  {
    number: "02",
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Post job listings",
    desc: "Create detailed job posts with salary, requirements, and perks. Reach thousands of qualified seekers.",
  },
  {
    number: "03",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.2)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Review & hire",
    desc: "Manage applicants from your dashboard. Shortlist, message, and hire the best candidates.",
  },
];

const stats = [
  { value: "50K+", label: "Active Jobs", color: "#818cf8" },
  { value: "12K+", label: "Companies Hiring", color: "#34d399" },
  { value: "200K+", label: "Job Seekers", color: "#60a5fa" },
  { value: "94%", label: "Hire Rate", color: "#f472b6" },
];

export default function HowItWorksSection() {
  const [active, setActive] = useState("seeker");
  const steps = active === "seeker" ? seekerSteps : recruiterSteps;

  return (
    <section
      className="px-6 py-[15px] relative overflow-hidden"
      style={{ backgroundColor: "#08080f" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <p className="text-[11px] tracking-[3px] uppercase text-white/40 font-medium">
            How It Works
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white text-center leading-tight tracking-tight mb-4">
          Your path to the
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #818cf8, #a78bfa, #34d399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            perfect match
          </span>
        </h2>
        <p
          className="text-center text-sm max-w-md mx-auto mb-12"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Whether you are finding your dream job or building your dream team —
          HireLoop makes it simple.
        </p>

        {/* Toggle */}
        <div className="flex justify-center mb-14">
          <div
            className="flex items-center p-1 rounded-2xl gap-1"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              { key: "seeker", label: "I'm looking for a job" },
              { key: "recruiter", label: "I'm hiring talent" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={
                  active === t.key
                    ? {
                        background: "linear-gradient(135deg, #818cf8, #6366f1)",
                        color: "#fff",
                        boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                      }
                    : { color: "rgba(255,255,255,0.35)" }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative flex flex-col gap-4 p-6 rounded-2xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-9 right-[-13px] w-6 h-px z-10"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                />
              )}

              {/* Number */}
              <div className="flex items-center justify-between">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: step.bg,
                    border: `1px solid ${step.border}`,
                    color: step.color,
                  }}
                >
                  {step.icon}
                </div>
                <span
                  className="text-4xl font-black leading-none"
                  style={{ color: "rgba(255,255,255,0.06)" }}
                >
                  {step.number}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {step.desc}
                </p>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-1.5 mt-auto pt-2">
                {steps.map((_, j) => (
                  <div
                    key={j}
                    className="h-1 rounded-full transition-all"
                    style={{
                      width: j === i ? "20px" : "6px",
                      backgroundColor:
                        j === i ? step.color : "rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-5 rounded-2xl text-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="text-3xl font-black mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="px-8 h-12 rounded-xl text-sm font-bold text-white flex items-center gap-2 transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #818cf8, #6366f1)",
              boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
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
          <Link
            href="/jobs"
            className="px-8 h-12 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:text-white"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </section>
  );
}
