import { getJobById } from "@/lib/api/jobs";
import { getAllCompanies } from "@/lib/api/company";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  PersonWorker,
  Briefcase,
  Globe,
  CircleCheck,
  ArrowUpRightFromSquare,
  MapPin,
} from "@gravity-ui/icons";
import ApplyButton from "@/components/ApplyButton";

const formatSalary = (min, max, currency) => {
  if (!min && !max) return null;
  const fmt = (n) => `$${Number(n).toLocaleString()}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)} ${currency}`;
  if (min) return `From ${fmt(min)} ${currency}`;
  return `Up to ${fmt(max)} ${currency}`;
};

const CATEGORY_COLORS = {
  Engineering: {
    bg: "rgba(99,102,241,0.1)",
    color: "#818cf8",
    border: "rgba(99,102,241,0.2)",
  },
  Design: {
    bg: "rgba(236,72,153,0.1)",
    color: "#f472b6",
    border: "rgba(236,72,153,0.2)",
  },
  Marketing: {
    bg: "rgba(245,158,11,0.1)",
    color: "#fbbf24",
    border: "rgba(245,158,11,0.2)",
  },
  Sales: {
    bg: "rgba(16,185,129,0.1)",
    color: "#34d399",
    border: "rgba(16,185,129,0.2)",
  },
  Finance: {
    bg: "rgba(14,165,233,0.1)",
    color: "#38bdf8",
    border: "rgba(14,165,233,0.2)",
  },
  HR: {
    bg: "rgba(168,85,247,0.1)",
    color: "#c084fc",
    border: "rgba(168,85,247,0.2)",
  },
  Product: {
    bg: "rgba(20,184,166,0.1)",
    color: "#2dd4bf",
    border: "rgba(20,184,166,0.2)",
  },
  Data: {
    bg: "rgba(59,130,246,0.1)",
    color: "#60a5fa",
    border: "rgba(59,130,246,0.2)",
  },
  Other: {
    bg: "rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.4)",
    border: "rgba(255,255,255,0.1)",
  },
};

const Section = ({ title, content }) => {
  if (!content) return null;
  const lines = content.split("\n").filter(Boolean);
  return (
    <div className="flex flex-col gap-3">
      <h3
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {lines.map((line, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            <CircleCheck className="w-4 h-4 shrink-0 mt-0.5 text-violet-400" />
            {line.replace(/^[•\-]\s*/, "")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  const job = await getJobById(id).catch(() => null);
  if (!job) notFound();

  const companies = await getAllCompanies();
  const companyId = job.companyId?.$oid || job.companyId;
  const company = companies.find((c) => {
    const cid = c._id?.$oid || c._id;
    return cid === companyId;
  });

  const salary = formatSalary(job.salaryMin, job.salaryMax, job.currency);
  const catColor = CATEGORY_COLORS[job.category] || CATEGORY_COLORS.Other;
  const logo = company?.logo || job.logo;
  const deadline = job.deadline
    ? new Date(job.deadline).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const infoItems = [
    { icon: Briefcase, label: "Job Type", value: job.jobType },
    {
      icon: MapPin,
      label: "Location",
      value: job.isRemote ? "Remote" : job.city,
    },
    { icon: PersonWorker, label: "Team Size", value: job.employeeRange },
    { icon: PersonWorker, label: "Salary", value: salary },
    { icon: Calendar, label: "Deadline", value: deadline },
    {
      icon: Globe,
      label: "Website",
      value: job.website,
      link: `https://${job.website}`,
    },
  ].filter((i) => i.value);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ── Left — Main Content ── */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Back */}
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-xs w-fit transition-colors outline-none text-[rgba(255,255,255,0.3)] hover:text-[rgba(255,255,255,0.7)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Jobs
          </Link>

          {/* Job Header Card */}
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-start gap-4">
              {/* Logo */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden shrink-0"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {logo ? (
                  <Image
                    src={logo}
                    alt={company?.name || "Company"}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-2xl font-bold text-violet-400 uppercase">
                    {job.title?.[0]}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="text-xs mb-1"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {company?.name || "Company"}
                </p>
                <h1 className="text-xl font-bold text-white leading-snug mb-3">
                  {job.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                    style={{
                      backgroundColor: catColor.bg,
                      color: catColor.color,
                      border: `1px solid ${catColor.border}`,
                    }}
                  >
                    {job.category}
                  </span>
                  <span
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
                    style={{
                      backgroundColor: "rgba(139,92,246,0.08)",
                      color: "rgba(167,139,250,0.85)",
                      border: "1px solid rgba(139,92,246,0.15)",
                    }}
                  >
                    {job.jobType}
                  </span>
                  {job.isRemote && (
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
                  <span
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(52,211,153,0.08)",
                      color: "#34d399",
                      border: "1px solid rgba(52,211,153,0.15)",
                    }}
                  >
                    ✓ Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Sections */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-6"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Section title="Responsibilities" content={job.responsibilities} />
            <div
              style={{
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            />
            <Section title="Requirements" content={job.requirements} />
            {job.benefits && (
              <>
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                />
                <Section title="Benefits & Perks" content={job.benefits} />
              </>
            )}
          </div>

          {/* Company About */}
          {(company?.description || job.companyDescription) && (
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                About the Company
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {company?.description || job.companyDescription}
              </p>
            </div>
          )}
        </div>

        {/* ── Right — Sidebar ── */}
        <div className="w-full lg:w-72 flex flex-col gap-4 lg:sticky lg:top-6">
          {/* Apply Card */}
          <div
            className="rounded-2xl p-5 flex flex-col gap-4"
            style={{
              backgroundColor: "rgba(139,92,246,0.06)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            {salary && (
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Salary
                </p>
                <p className="text-lg font-bold text-white">{salary}</p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  per year
                </p>
              </div>
            )}
            {deadline && (
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                Deadline: {deadline}
              </div>
            )}
           <ApplyButton jobId={id} />
          </div>

          {/* Job Info */}
          <div
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Job Info
            </p>
            {infoItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "rgba(139,92,246,0.08)",
                    border: "1px solid rgba(139,92,246,0.12)",
                  }}
                >
                  <item.icon className="w-3.5 h-3.5 text-violet-400/60" />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    {item.label}
                  </p>
                  {item.link ? (
                    <a
                      href={item.link}
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

          {/* Company Card */}
          {company && (
            <div
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Company
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <span className="text-sm font-bold text-violet-400">
                      {company.name?.[0]}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {company.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {company.industry}
                  </p>
                </div>
              </div>
              {company.location && (
                <div
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  < MapPin className="w-3.5 h-3.5 shrink-0" />
                  {company.location}
                </div>
              )}
              {company.employeeRange && (
                <div
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <PersonWorker className="w-3.5 h-3.5 shrink-0" />
                  {company.employeeRange}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
