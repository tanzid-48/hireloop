"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  FileArrowUp,
  Person,
  LogoLinkedin,
  Globe,
  Briefcase,
} from "@gravity-ui/icons";
import { createApplication } from "@/lib/action/applications";

const iBase = {
  backgroundColor: "rgba(255,255,255,0.03)",
  outline: "none",
  boxShadow: "none",
};
const inputCls =
  "w-full border border-white/[0.07] text-white text-sm rounded-xl px-4 py-3 placeholder:text-white/20 hover:border-white/15 focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)] transition-all";
const textareaCls =
  "w-full border border-white/[0.07] text-white text-sm rounded-xl px-4 py-3 placeholder:text-white/20 hover:border-white/15 focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)] transition-all resize-none";

const Field = ({ label, hint, required, children, error }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <label className="text-xs font-semibold text-white/40 tracking-widest uppercase">
        {label}
        {required && <span className="text-violet-400 ml-1">*</span>}
      </label>
      {hint && <span className="text-[10px] text-white/20">{hint}</span>}
    </div>
    {children}
    {error && <span className="text-xs text-red-400">{error}</span>}
  </div>
);

const Section = ({ step, title, subtitle, children }) => (
  <div>
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold text-violet-400"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          {step}
        </div>
        <div>
          <span className="text-[10px] font-bold text-violet-400/60 tracking-[3px] uppercase block">
            Step {step}
          </span>
          <h3 className="text-sm font-bold text-white leading-none mt-0.5">
            {title}
          </h3>
        </div>
      </div>
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, rgba(139,92,246,0.15), transparent)",
        }}
      />
    </div>
    {subtitle && <p className="text-xs text-white/25 mb-4 -mt-2">{subtitle}</p>}
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{
        backgroundColor: "rgba(255,255,255,0.018)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {children}
    </div>
  </div>
);

export default function ApplyForm({
  job,
  jobId,
  company,
  userId,
  userName,
  userEmail,
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: userName || "",
    email: userEmail || "",
    phone: "",
    experience: "",
    linkedin: "",
    portfolio: "",
    resumeUrl: "",
    coverLetter: "",
  });

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.resumeUrl.trim()) e.resumeUrl = "Resume link is required";
    if (!form.coverLetter.trim()) e.coverLetter = "Cover letter is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        jobId,
        jobTitle: job?.title,
        companyId: job?.companyId,
        userId,
        status: "pending",
        appliedAt: new Date().toISOString(),
      };
      const result = await createApplication(payload);
      if (result) {
        toast.success("Application submitted successfully!");
        router.push(`/jobs/${jobId}?applied=true`);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const logo = company?.logo || job?.logo;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-8 pb-16">
      {/* ── Header ── */}
      <div className="flex items-start gap-4">
        <Link
          href={`/jobs/${jobId}`}
          className="mt-1 w-8 h-8 rounded-xl flex items-center justify-center text-white/30 hover:text-white/70 transition-all outline-none shrink-0"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
        <div>
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
            Application
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            Apply for Position
          </h1>
          <p className="text-sm text-white/30 mt-1">
            Complete the form below to submit your application.
          </p>
        </div>
      </div>

      {/* ── Job Info Banner ── */}
      <div
        className="flex items-center gap-4 p-4 rounded-2xl"
        style={{
          backgroundColor: "rgba(139,92,246,0.05)",
          border: "1px solid rgba(139,92,246,0.15)",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {logo ? (
            <Image
              src={logo}
              alt={company?.name || "Company"}
              width={48}
              height={48}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <span className="text-lg font-bold text-violet-400">
              {job?.title?.[0] || "J"}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-white/35 truncate">
            {company?.name || "Company"}
          </p>
          <p className="text-sm font-semibold text-white mt-0.5 truncate">
            {job?.title}
          </p>
        </div>
        <div className="flex flex-col gap-1 items-end shrink-0">
          <span
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
            style={{
              backgroundColor: "rgba(139,92,246,0.08)",
              color: "rgba(167,139,250,0.9)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            {job?.jobType}
          </span>
          {job?.isRemote && (
            <span
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
              style={{
                backgroundColor: "rgba(52,211,153,0.08)",
                color: "#34d399",
                border: "1px solid rgba(52,211,153,0.15)",
              }}
            >
              🌐 Remote
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        {/* ── Step 1: Personal Info ── */}
        <Section
          step="01"
          title="Personal Information"
          subtitle="Your basic contact details"
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name" required error={errors.fullName}>
              <input
                type="text"
                placeholder="John Doe"
                value={form.fullName}
                onChange={set("fullName")}
                className={`${inputCls} ${errors.fullName ? "border-red-400/40" : ""}`}
                style={iBase}
              />
            </Field>
            <Field label="Email" required error={errors.email}>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
                className={`${inputCls} ${errors.email ? "border-red-400/40" : ""}`}
                style={iBase}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone Number" hint="Optional">
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={set("phone")}
                className={inputCls}
                style={iBase}
              />
            </Field>
            <Field label="Years of Experience" hint="Optional">
              <input
                type="number"
                placeholder="e.g. 3"
                min="0"
                max="50"
                value={form.experience}
                onChange={set("experience")}
                className={inputCls}
                style={iBase}
              />
            </Field>
          </div>
        </Section>

        {/* ── Step 2: Links ── */}
        <Section
          step="02"
          title="Links & Portfolio"
          subtitle="Share your professional presence"
        >
          <Field
            label="Resume / CV Link"
            required
            error={errors.resumeUrl}
            hint="Google Drive, Dropbox, etc."
          >
            <div
              className="flex rounded-xl overflow-hidden"
              style={{
                border: errors.resumeUrl
                  ? "1px solid rgba(248,113,113,0.4)"
                  : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span
                className="flex items-center px-3 shrink-0"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderRight: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <FileArrowUp className="w-4 h-4 text-white/25" />
              </span>
              <input
                type="url"
                placeholder="https://drive.google.com/..."
                value={form.resumeUrl}
                onChange={set("resumeUrl")}
                className="flex-1 text-white text-sm px-4 py-3 placeholder:text-white/20 outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  boxShadow: "none",
                }}
              />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="LinkedIn" hint="Optional">
              <div
                className="flex rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span
                  className="flex items-center px-3 shrink-0"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderRight: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <LogoLinkedin className="w-4 h-4 text-white/25" />
                </span>
                <input
                  type="url"
                  placeholder="linkedin.com/in/..."
                  value={form.linkedin}
                  onChange={set("linkedin")}
                  className="flex-1 text-white text-sm px-3 py-3 placeholder:text-white/20 outline-none"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    boxShadow: "none",
                  }}
                />
              </div>
            </Field>
            <Field label="Portfolio / Website" hint="Optional">
              <div
                className="flex rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span
                  className="flex items-center px-3 shrink-0"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderRight: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <Globe className="w-4 h-4 text-white/25" />
                </span>
                <input
                  type="url"
                  placeholder="yoursite.com"
                  value={form.portfolio}
                  onChange={set("portfolio")}
                  className="flex-1 text-white text-sm px-3 py-3 placeholder:text-white/20 outline-none"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    boxShadow: "none",
                  }}
                />
              </div>
            </Field>
          </div>
        </Section>

        {/* ── Step 3: Cover Letter ── */}
        <Section
          step="03"
          title="Cover Letter"
          subtitle="Tell us why you're a great fit"
        >
          <Field
            label="Cover Letter"
            required
            error={errors.coverLetter}
            hint="Min 100 characters"
          >
            <textarea
              placeholder={`Dear Hiring Manager,\n\nI am excited to apply for the ${job?.title} position at ${company?.name || "your company"}. With my background in...\n\nI believe I would be a great fit because...`}
              value={form.coverLetter}
              onChange={set("coverLetter")}
              rows={8}
              className={`${textareaCls} ${errors.coverLetter ? "border-red-400/40" : ""}`}
              style={iBase}
            />
            <div className="flex justify-end">
              <span
                className="text-[10px]"
                style={{
                  color:
                    form.coverLetter.length < 100
                      ? "rgba(248,113,113,0.7)"
                      : "rgba(255,255,255,0.2)",
                }}
              >
                {form.coverLetter.length} / 100 min
              </span>
            </div>
          </Field>
        </Section>

        {/* ── Actions ── */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/jobs/${jobId}`}
            className="text-sm text-white/25 hover:text-white/50 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3 h-3" />
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 h-10 rounded-xl text-sm font-bold text-white transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
            }}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeOpacity="0.3"
                  />
                  <path
                    d="M12 2a10 10 0 0 1 10 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                Submitting…
              </span>
            ) : (
              "Submit Application →"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
