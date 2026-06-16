"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  OfficeBadge,
  ArrowUpFromSquare,
  Clock,
} from "@gravity-ui/icons";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { useSession } from "@/lib/auth-client";
import { getCompanyByUserId } from "@/lib/api/jobs";
import { createCompany, updateCompany } from "@/lib/action/company";

const CATEGORIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Media",
  "Manufacturing",
  "Consulting",
  "Real Estate",
  "Other",
];
const EMPLOYEE_RANGES = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
];

/* ─── Dropdown ─── */
const Dropdown = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
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
        className={`w-full border rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between outline-none transition-all ${open ? "border-violet-500/50" : "border-white/[0.07] hover:border-white/15"}`}
      >
        <span className={value ? "text-white" : "text-white/30"}>
          {value || placeholder}
        </span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform shrink-0 ${open ? "rotate-180 text-violet-400" : "text-white/20"}`}
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
          className="absolute top-full left-0 right-0 mt-1.5 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50"
          style={{
            backgroundColor: "#13131f",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="py-1.5 max-h-52 overflow-y-auto"
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
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${value === opt ? "text-violet-400 bg-violet-500/[0.08]" : "text-white/60 hover:text-white hover:bg-white/[0.04]"}`}
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
const Field = ({ label, children, error }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold text-white/40 tracking-widest uppercase">
      {label}
    </label>
    {children}
    {error && <span className="text-xs text-red-400">{error}</span>}
  </div>
);

const iBase = {
  backgroundColor: "rgba(255,255,255,0.03)",
  outline: "none",
  boxShadow: "none",
};
const inputCls =
  "w-full border border-white/[0.07] text-white text-sm rounded-xl px-4 py-3 placeholder:text-white/20 hover:border-white/15 focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)] transition-all";
const sectionCls = "rounded-2xl p-6 flex flex-col gap-4";
const sectionStyle = {
  backgroundColor: "rgba(255,255,255,0.018)",
  border: "1px solid rgba(255,255,255,0.06)",
};

const StepHeader = ({ step, title }) => (
  <div
    className="flex items-center gap-2 pb-3"
    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
  >
    <div
      className="w-7 h-7 rounded-lg flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))",
        border: "1px solid rgba(139,92,246,0.2)",
      }}
    >
      <OfficeBadge className="w-3.5 h-3.5 text-violet-400" />
    </div>
    <div>
      <p className="text-[10px] font-bold text-violet-400/60 tracking-[3px] uppercase">
        {step}
      </p>
      <p className="text-sm font-bold text-white leading-none">{title}</p>
    </div>
  </div>
);

export default function RegisterCompanyPage() {
  const { data: session } = useSession();
  const recruiterId = session?.user?.id;

  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";
  const companyId = searchParams.get("id");

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [logoName, setLogoName] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const [category, setCategory] = useState("");
  const [employeeRange, setEmployeeRange] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    website: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    if (!isEdit || !companyId) return;
    getCompanyByUserId(companyId).then((data) => {
      if (!data) return;
      setForm({
        name: data.name || "",
        website: data.website || "",
        location: data.location || "",
        description: data.description || "",
      });
      setCategory(data.industry || "");
      setEmployeeRange(data.employeeRange || "");
      setLogoPreview(data.logo || null);
      setLogoName(data.logoName || "");
    });
  }, [isEdit, companyId]);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Company name is required";
    if (!category) e.category = "Please select an industry";
    if (!form.location.trim()) e.location = "Location is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData },
      );
      const data = await res.json();
      if (data.success) {
        setLogoPreview(data.data.url);
        setLogoName(file.name);
        toast.success("Logo uploaded!");
      }
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (uploading) {
      toast.error("Logo is still uploading...");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        recruiterId,
        logo: logoPreview,
        logoName,
        industry: category,
        employeeRange,
        status: "pending",
      };

      const result = isEdit
        ? await updateCompany(companyId, payload)
        : await createCompany(payload);

      if (result) {
        toast.success(
          isEdit ? "Company updated!" : "Company submitted for review!",
        );
        router.push("/dashboard/recruiter/company");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => router.push("/dashboard/recruiter/company")}
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
            {isEdit ? "Update" : "New"}
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            {isEdit ? "Edit Company" : "Register Company"}
          </h1>
          <p className="text-sm text-white/30 mt-1">
            {isEdit
              ? "Update your company profile."
              : "Enter your business details to start hiring on HireLop."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Step 1 */}
        <div className={sectionCls} style={sectionStyle}>
          <StepHeader step="Step 01" title="Company Info" />

          {/* Logo */}
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden shrink-0"
              style={{
                backgroundColor: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.15)",
              }}
            >
              {logoPreview ? (
                <Image
                  width={64}
                  height={64}
                  src={logoPreview}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <OfficeBadge className="w-7 h-7 text-violet-400/40" />
              )}
            </div>
            <label
              className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-all"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {uploading ? (
                <div className="w-3 h-3 rounded-full border-2 border-violet-400/30 border-t-violet-400 animate-spin shrink-0" />
              ) : (
                <ArrowUpFromSquare className="w-4 h-4 text-white/30 shrink-0" />
              )}
              <div>
                <p className="text-xs text-white/50">
                  {uploading ? "Uploading…" : logoName || "Upload company logo"}
                </p>
                <p className="text-[10px] text-white/25">PNG, JPG up to 5MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
                disabled={uploading}
              />
            </label>
          </div>

          {/* Name + Industry */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Company Name" error={errors.name}>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                value={form.name}
                onChange={set("name")}
                className={`${inputCls} ${errors.name ? "border-red-400/40" : ""}`}
                style={iBase}
              />
            </Field>
            <Field label="Industry" error={errors.category}>
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
          </div>

          {/* Website + Location */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Website URL">
              <div
                className="flex rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span
                  className="text-white/25 text-xs px-3 flex items-center shrink-0 font-mono"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderRight: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  https://
                </span>
                <input
                  type="text"
                  placeholder="company.com"
                  value={form.website}
                  onChange={set("website")}
                  className="flex-1 text-white text-sm px-3 py-3 placeholder:text-white/20 outline-none"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    boxShadow: "none",
                  }}
                />
              </div>
            </Field>
            <Field label="Location" error={errors.location}>
              <input
                type="text"
                placeholder="City, Country"
                value={form.location}
                onChange={set("location")}
                className={`${inputCls} ${errors.location ? "border-red-400/40" : ""}`}
                style={iBase}
              />
            </Field>
          </div>

          {/* Team Size */}
          <Field label="Team Size">
            <Dropdown
              value={employeeRange}
              onChange={setEmployeeRange}
              options={EMPLOYEE_RANGES}
              placeholder="Select range…"
            />
          </Field>
        </div>

        {/* Step 2 */}
        <div className={sectionCls} style={sectionStyle}>
          <StepHeader step="Step 02" title="About" />
          <Field label="Short Description">
            <textarea
              placeholder="Tell candidates about your mission, culture, and values…"
              value={form.description}
              onChange={set("description")}
              rows={4}
              className="w-full border border-white/[0.07] text-white text-sm rounded-xl px-4 py-3 placeholder:text-white/20 hover:border-white/15 focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)] transition-all resize-none"
              style={iBase}
            />
          </Field>
        </div>

        {/* Pending Notice */}
        {!isEdit && (
          <div
            className="flex items-start gap-3 p-4 rounded-xl"
            style={{
              backgroundColor: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.15)",
            }}
          >
            <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-400/80 leading-relaxed">
              Your company will be submitted with <strong>Pending</strong>{" "}
              status. An admin must approve it before you can post jobs
              publicly.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => router.push("/dashboard/recruiter/company")}
            className="text-sm text-white/25 hover:text-white/50 transition-colors outline-none flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3 h-3" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || uploading}
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
                {isEdit ? "Saving…" : "Submitting…"}
              </span>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Register Company →"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
