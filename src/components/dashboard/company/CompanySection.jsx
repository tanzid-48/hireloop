"use client";
import React, { useState } from "react";
import {
  Pencil,
  Globe,
  PersonWorker,
  CircleCheck,
  Clock,
  CircleXmark,
  OfficeBadge,
  ArrowUpFromSquare,
  Xmark,
} from "@gravity-ui/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/* ─── Status config ─── */
const STATUS = {
  pending: {
    label: "Pending Review",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
    icon: CircleCheck,
  },
  rejected: {
    label: "Rejected",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
    icon: CircleXmark,
  },
};

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

/* ─── Custom Toggle Dropdown ─── */
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

/* ─── Register/Edit Modal ─── */
const CompanyModal = ({ company, onClose, onSuccess }) => {
  const isEdit = !!company;
  const [submitting, setSubmitting] = useState(false);
  const [logoName, setLogoName] = useState(company?.logoName || "");
  const [logoPreview, setLogoPreview] = useState(company?.logo || null);
  const [category, setCategory] = useState(company?.industry || "");
  const [employeeRange, setEmployeeRange] = useState(
    company?.employeeRange || "",
  );
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: company?.name || "",
    website: company?.website || "",
    location: company?.location || "",
    description: company?.description || "",
  });

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Company name is required";
    if (!category) e.category = "Please select an industry";
    if (!form.location.trim()) e.location = "Location is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        industry: category,
        employeeRange,
        status: "pending",
      };
      const res = await fetch(
        isEdit ? `/api/company/${company._id}` : "/api/company/register",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (res.ok) {
        toast.success(
          isEdit
            ? "Company updated successfully"
            : "Company submitted for review",
        );

        onSuccess?.();
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(6px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          backgroundColor: "#13131f",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Modal Header */}
        <div
          className="flex items-start justify-between px-6 pt-6 pb-5 sticky top-0 z-10"
          style={{
            backgroundColor: "#13131f",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <p className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
              {isEdit ? "Update" : "New"}
            </p>
            <h2 className="text-base font-bold text-white mt-0.5">
              {isEdit ? "Edit Company" : "Register New Company"}
            </h2>
            <p className="text-xs text-white/30 mt-0.5">
              {isEdit
                ? "Update your company profile details."
                : "Enter your business details to start hiring."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all outline-none"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <Xmark className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="px-6 py-5 flex flex-col gap-4">
            {/* Logo Upload */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
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
                  <OfficeBadge className="w-6 h-6 text-violet-400/50" />
                )}
              </div>
              <label
                className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-all"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <ArrowUpFromSquare className="w-4 h-4 text-white/30 shrink-0" />
                <div>
                  <p className="text-xs text-white/50">
                    {logoName || "Upload company logo"}
                  </p>
                  <p className="text-[10px] text-white/25">
                    PNG, JPG up to 5MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
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

            {/* Employee Range */}
            <Field label="Team Size">
              <Dropdown
                value={employeeRange}
                onChange={setEmployeeRange}
                options={EMPLOYEE_RANGES}
                placeholder="Select range…"
              />
            </Field>

            {/* Description */}
            <Field label="Short Description">
              <textarea
                placeholder="Tell candidates about your mission, culture, and values…"
                value={form.description}
                onChange={set("description")}
                rows={3}
                className="w-full border border-white/[0.07] text-white text-sm rounded-xl px-4 py-3 placeholder:text-white/20 hover:border-white/15 focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)] transition-all resize-none"
                style={iBase}
              />
            </Field>

            {/* Pending notice */}
            {!isEdit && (
              <div
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{
                  backgroundColor: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.15)",
                }}
              >
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-400/80 leading-relaxed">
                  Your company will be submitted for review. An admin must
                  approve it before it appears publicly or you can post jobs.
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div
            className="flex items-center justify-end gap-3 px-6 py-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <button
              type="button"
              onClick={onClose}
              className="px-5 h-10 rounded-xl text-sm text-white/40 transition-colors outline-none hover:text-white/60"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 h-10 rounded-xl text-sm font-bold text-white transition-all outline-none disabled:opacity-50"
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
                  Saving…
                </span>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Register Company"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
export default function CompanySection({ company }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [localCompany, setLocalCompany] = useState(company);

  const handleSuccess = async () => {
    setShowModal(false);
    router.refresh();
  };

  const status = STATUS[localCompany?.status] || STATUS.pending;
  const StatusIcon = status.icon;

  /* ── No Company State ── */
  if (!localCompany) {
    return (
      <>
        <div
          className="flex flex-col items-center justify-center py-20 rounded-2xl text-center"
          style={{
            backgroundColor: "rgba(255,255,255,0.018)",
            border: "1px dashed rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <OfficeBadge className="w-7 h-7 text-violet-400/70" />
          </div>
          <h3 className="text-base font-bold text-white/80 mb-1">
            No company registered yet
          </h3>
          <p className="text-sm text-white/30 max-w-xs mb-6 leading-relaxed">
            Register your company to start posting jobs and attracting top
            talent on HireLop.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 h-10 rounded-xl text-sm font-bold text-white transition-all outline-none"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
            }}
          >
            + Register Company
          </button>
        </div>

        {showModal && (
          <CompanyModal
            onClose={() => setShowModal(false)}
            onSuccess={handleSuccess}
          />
        )}
      </>
    );
  }

  /* ── Company Profile ── */
  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Status Banner */}
        {localCompany.status !== "approved" && (
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{
              backgroundColor: status.bg,
              border: `1px solid ${status.border}`,
            }}
          >
            <StatusIcon
              className="w-4 h-4 shrink-0"
              style={{ color: status.color }}
            />
            <div className="flex-1">
              <p
                className="text-xs font-semibold"
                style={{ color: status.color }}
              >
                {localCompany.status === "pending"
                  ? "Your company is under review by our team."
                  : "Your company registration was rejected. Please update your details and resubmit."}
              </p>
            </div>
          </div>
        )}

        {/* Company Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "rgba(255,255,255,0.018)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Card Header */}
          <div
            className="flex items-start justify-between p-6"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden shrink-0"
                style={{
                  backgroundColor: "rgba(139,92,246,0.08)",
                  border: "1px solid rgba(139,92,246,0.15)",
                }}
              >
                {localCompany.logo ? (
                  <Image
                    width={64}
                    height={64}
                    src={localCompany.logo}
                    alt={localCompany.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <OfficeBadge className="w-7 h-7 text-violet-400/50" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-white">
                    {localCompany.name}
                  </h2>
                  {/* Status badge */}
                  <span
                    className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: status.bg,
                      color: status.color,
                      border: `1px solid ${status.border}`,
                    }}
                  >
                    <StatusIcon className="w-2.5 h-2.5" />
                    {status.label}
                  </span>
                </div>
                <p className="text-xs text-white/40">{localCompany.industry}</p>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 h-9 rounded-xl text-xs font-semibold text-white/60 hover:text-white transition-all outline-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>

          {/* Info Grid */}
          <div
            className="grid grid-cols-2 gap-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            {[
              {
                icon: Globe,
                label: "Website",
                value: localCompany.website
                  ? `https://${localCompany.website}`
                  : "—",
                link: localCompany.website,
              },
              {
                icon: OfficeBadge,
                label: "Location",
                value: localCompany.location || "—",
              },
              {
                icon: PersonWorker,
                label: "Team Size",
                value: localCompany.employeeRange || "—",
              },
              {
                icon: OfficeBadge,
                label: "Industry",
                value: localCompany.industry || "—",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4"
                style={{
                  borderRight:
                    i % 2 === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  borderBottom:
                    i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "rgba(139,92,246,0.07)",
                    border: "1px solid rgba(139,92,246,0.12)",
                  }}
                >
                  <item.icon className="w-3.5 h-3.5 text-violet-400/60" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest">
                    {item.label}
                  </p>
                  {item.link ? (
                    <a
                      href={`https://${item.link}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-violet-400 hover:underline truncate block mt-0.5"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-xs text-white/70 mt-0.5 truncate">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          {localCompany.description && (
            <div className="p-6">
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2">
                About
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                {localCompany.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <CompanyModal
          company={localCompany}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
