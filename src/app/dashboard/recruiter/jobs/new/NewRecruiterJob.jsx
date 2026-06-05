"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Thunderbolt,
  OfficeBadge,
  FileText,
  PersonWorker,
  ArrowUpFromSquare,
} from "@gravity-ui/icons";
import { createJob } from "@/lib/action/jobs";
import { toast } from "sonner";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const CURRENCIES = ["USD", "EUR", "GBP", "BDT", "INR", "AED"];
const CATEGORIES = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Operations",
  "Product",
  "Data",
  "Legal",
  "Other",
];
const EMPLOYEE_RANGES = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
];

/* ─── Custom Toggle ─── */
const Toggle = ({ isOn, onToggle }) => (
  <button
    type="button"
    onClick={() => onToggle(!isOn)}
    className="relative outline-none shrink-0"
    style={{
      width: "44px",
      height: "24px",
      borderRadius: "99px",
      backgroundColor: isOn ? "rgba(139,92,246,0.8)" : "rgba(255,255,255,0.1)",
      border: isOn
        ? "1px solid rgba(139,92,246,0.6)"
        : "1px solid rgba(255,255,255,0.1)",
      transition: "background-color 0.2s, border-color 0.2s",
    }}
  >
    <span
      style={{
        position: "absolute",
        top: "3px",
        left: isOn ? "22px" : "3px",
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: "white",
        transition: "left 0.2s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
      }}
    />
  </button>
);

/* ─── Dropdown ─── */
const Dropdown = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
        className={`w-full border rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between transition-all outline-none ${open ? "border-violet-500/50 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]" : "border-white/[0.07] hover:border-white/20"}`}
      >
        <span className={value ? "text-white font-medium" : "text-white/30"}>
          {value || placeholder}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform duration-200 shrink-0 ${open ? "rotate-180 text-violet-400" : "text-white/20"}`}
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-1.5 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          style={{
            backgroundColor: "#13131f",
            border: "1px solid rgba(255,255,255,0.08)",
            zIndex: 9999,
          }}
        >
          <div
            className="py-1.5 max-h-56 overflow-y-auto"
            style={{ backgroundColor: "#13131f" }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                style={{ backgroundColor: "transparent" }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-3 ${value === opt ? "text-violet-400 bg-violet-500/[0.08]" : "text-white/60 hover:text-white hover:bg-white/[0.04]"}`}
              >
                {value === opt ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                ) : (
                  <span className="w-1.5 h-1.5 shrink-0" />
                )}
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Field ─── */
const Field = ({ label, required, hint, children, error }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <label className="text-xs font-semibold text-white/40 tracking-widest uppercase">
        {label}
        {required && <span className="text-violet-400 ml-1">*</span>}
      </label>
      {hint && <span className="text-[10px] text-white/20">{hint}</span>}
    </div>
    {children}
    {error && (
      <span className="text-xs text-red-400 flex items-center gap-1">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.3" />
          <path
            d="M6 3.5v3M6 8v.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
        {error}
      </span>
    )}
  </div>
);

const iBase = {
  backgroundColor: "rgba(255,255,255,0.03)",
  outline: "none",
  boxShadow: "none",
};
const inputCls =
  "w-full border border-white/[0.07] text-white text-sm rounded-xl px-4 py-3 placeholder:text-white/20 hover:border-white/15 focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)] transition-all";
const textCls =
  "w-full border border-white/[0.07] text-white text-sm rounded-xl px-4 py-3 placeholder:text-white/20 hover:border-white/15 focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)] transition-all resize-none";

/* ─── Section ─── */
const Section = ({ step, icon, title, subtitle, children }) => (
  <div className="relative">
    <div className="flex items-center gap-4 mb-5">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          <span className="text-violet-400">{icon}</span>
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
    {subtitle && <p className="text-xs text-white/25 mb-5 -mt-2">{subtitle}</p>}
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

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.49-2.01-4.5-4.5-4.5z"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export default function NewRecruiterJob({ companyId,userId }) {
  const router = useRouter();
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoName, setLogoName] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: "",
    website: "",
    city: "",
    salaryMin: "",
    salaryMax: "",
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    companyDescription: "",
  });
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [employeeRange, setEmployeeRange] = useState("");

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Job title is required";
    if (!category) e.category = "Please select a category";
    if (!jobType) e.jobType = "Please select a job type";
    if (!form.deadline) e.deadline = "Deadline is required";
    if (!form.responsibilities.trim())
      e.responsibilities = "This field is required";
    if (!form.requirements.trim()) e.requirements = "This field is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        userId,
        category,
        jobType,
        currency,
        employeeRange,
        isRemote,
        companyId,
        status: "active",
      };
      console.log(payload,'after');

      const result = await createJob(payload);

      if (result) {
        toast.success(`${form.title} created successfully!`);
        router.push("/dashboard/recruiter/jobs");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col  gap-8 max-w-2xl mx-auto pb-12">
      {/* ── Header ── */}
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-1 w-8 h-8 rounded-xl flex items-center justify-center text-white/30 hover:text-white/70 transition-all outline-none shrink-0"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        <div>
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
            New Listing
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            Post a Job
          </h1>
          <p className="text-sm text-white/30 mt-1">
            Fill in the details below to publish your listing.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        {/* ── STEP 1 ── */}
        <Section
          step="01"
          icon={<FileText className="w-3.5 h-3.5" />}
          title="Job Details"
          subtitle="Basic information about the position"
        >
          <Field label="Job Title" required error={errors.title}>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Engineer"
              value={form.title}
              onChange={set("title")}
              className={`${inputCls} ${errors.title ? "border-red-400/40" : ""}`}
              style={iBase}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Category" required error={errors.category}>
              <Dropdown
                value={category}
                onChange={(v) => {
                  setCategory(v);
                  setErrors((p) => ({ ...p, category: "" }));
                }}
                options={CATEGORIES}
                placeholder="Select…"
              />
            </Field>
            <Field label="Job Type" required error={errors.jobType}>
              <Dropdown
                value={jobType}
                onChange={(v) => {
                  setJobType(v);
                  setErrors((p) => ({ ...p, jobType: "" }));
                }}
                options={JOB_TYPES}
                placeholder="Select…"
              />
            </Field>
          </div>

          <Field label="Website URL" hint="Optional">
            <div
              className="flex rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span
                className="text-white/25 text-xs px-4 flex items-center shrink-0 font-mono"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderRight: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                https://
              </span>
              <input
                type="text"
                placeholder="www.company.com"
                value={form.website}
                onChange={set("website")}
                className="flex-1 text-white text-sm px-4 py-3 placeholder:text-white/20 outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  boxShadow: "none",
                }}
              />
            </div>
          </Field>

          {/* Remote toggle */}
          <div
            className="flex items-center justify-between p-4 rounded-xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div>
              <p className="text-sm text-white/70 font-medium">
                Remote Position
              </p>
              <p className="text-xs text-white/25 mt-0.5">
                Enable if this role is fully remote
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isRemote && (
                <span
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(52,211,153,0.1)",
                    color: "#34d399",
                    border: "1px solid rgba(52,211,153,0.2)",
                  }}
                >
                  Remote
                </span>
              )}
              <Toggle isOn={isRemote} onToggle={setIsRemote} />
            </div>
          </div>

          {/* Location — only when not remote */}
          {!isRemote && (
            <Field label="Location">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">
                  <PinIcon />
                </div>
                <input
                  type="text"
                  placeholder="City, Country"
                  value={form.city}
                  onChange={set("city")}
                  className={`${inputCls} pl-10`}
                  style={iBase}
                />
              </div>
            </Field>
          )}

          <div className="grid grid-cols-3 gap-3">
            <Field label="Min Salary">
              <input
                type="number"
                placeholder="50,000"
                value={form.salaryMin}
                onChange={set("salaryMin")}
                className={inputCls}
                style={iBase}
              />
            </Field>
            <Field label="Max Salary">
              <input
                type="number"
                placeholder="90,000"
                value={form.salaryMax}
                onChange={set("salaryMax")}
                className={inputCls}
                style={iBase}
              />
            </Field>
            <Field label="Currency">
              <Dropdown
                value={currency}
                onChange={setCurrency}
                options={CURRENCIES}
                placeholder="USD"
              />
            </Field>
          </div>

          <Field label="Application Deadline" required error={errors.deadline}>
            <input
              type="date"
              value={form.deadline}
              onChange={set("deadline")}
              className={`${inputCls} ${errors.deadline ? "border-red-400/40" : ""}`}
              style={iBase}
            />
          </Field>
        </Section>

        {/* ── STEP 2 ── */}
        <Section
          step="02"
          icon={<OfficeBadge className="w-3.5 h-3.5" />}
          title="Company Info"
          subtitle="Details about your organisation"
        >
          <div className="grid grid-cols-2 gap-3">
            <Field label="Team Size">
              <Dropdown
                value={employeeRange}
                onChange={setEmployeeRange}
                options={EMPLOYEE_RANGES}
                placeholder="Select…"
              />
            </Field>
            <Field label="Company Logo">
              <label
                className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-all"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white/30"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <ArrowUpFromSquare className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-white/50 truncate">
                    {logoName || "Upload image"}
                  </p>
                  <p className="text-[10px] text-white/20">PNG, JPG · 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setLogoName(e.target.files?.[0]?.name || "")}
                />
              </label>
            </Field>
          </div>

          <Field label="Company Bio" hint="Optional">
            <textarea
              placeholder="Tell candidates about your mission, culture, and values…"
              value={form.companyDescription}
              onChange={set("companyDescription")}
              rows={3}
              className={textCls}
              style={iBase}
            />
          </Field>

          <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{
              backgroundColor: "rgba(139,92,246,0.04)",
              border: "1px solid rgba(139,92,246,0.12)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{
                backgroundColor: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              <PersonWorker className="w-3.5 h-3.5 text-violet-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-white/70">
                Your Company
              </p>
              <p className="text-[10px] text-white/30">
                Auto-linked on publish
              </p>
            </div>
            <span
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(52,211,153,0.1)",
                color: "#34d399",
                border: "1px solid rgba(52,211,153,0.15)",
              }}
            >
              ✓ Approved
            </span>
          </div>
        </Section>

        {/* ── STEP 3 ── */}
        <Section
          step="03"
          icon={<Thunderbolt className="w-3.5 h-3.5" />}
          title="Job Description"
          subtitle="Help candidates understand what the role involves"
        >
          <Field
            label="Responsibilities"
            required
            error={errors.responsibilities}
            hint="Use bullet points"
          >
            <textarea
              placeholder={
                "• Lead architecture decisions\n• Collaborate with product & design\n• Mentor junior engineers..."
              }
              value={form.responsibilities}
              onChange={set("responsibilities")}
              rows={5}
              className={`${textCls} ${errors.responsibilities ? "border-red-400/40" : ""}`}
              style={iBase}
            />
          </Field>

          <Field
            label="Requirements"
            required
            error={errors.requirements}
            hint="Skills & experience"
          >
            <textarea
              placeholder={
                "• 4+ years with React & TypeScript\n• Strong system design skills\n• Experience with CI/CD pipelines..."
              }
              value={form.requirements}
              onChange={set("requirements")}
              rows={5}
              className={`${textCls} ${errors.requirements ? "border-red-400/40" : ""}`}
              style={iBase}
            />
          </Field>

          <Field label="Benefits & Perks" hint="Optional">
            <textarea
              placeholder={
                "• Competitive salary + equity\n• Full health & dental coverage\n• $2k annual learning budget..."
              }
              value={form.benefits}
              onChange={set("benefits")}
              rows={4}
              className={textCls}
              style={iBase}
            />
          </Field>
        </Section>

        {/* ── Actions ── */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-white/25 hover:text-white/50 transition-colors outline-none flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3 h-3" />
            Discard
          </button>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 h-10 rounded-xl text-sm font-bold transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                boxShadow: "0 4px 20px rgba(139,92,246,0.35)",
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2 text-white/80">
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
                  Publishing…
                </span>
              ) : (
                <span className="text-white">Publish Job →</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
