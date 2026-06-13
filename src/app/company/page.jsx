import { getAllCompanies, getRecruiterCompany } from "@/lib/api/company";
import { getAllJobs } from "@/lib/api/jobs";
import { getSession } from "@/lib/auth-session";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Globe,
  PersonWorker,
  Briefcase,
  CircleCheck,
  Pencil,
} from "@gravity-ui/icons";

const INDUSTRY_COLORS = {
  Technology: {
    color: "#818cf8",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
  },
  Software: {
    color: "#818cf8",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
  },
  Engineering: {
    color: "#818cf8",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
  },
  Design: {
    color: "#f472b6",
    bg: "rgba(236,72,153,0.08)",
    border: "rgba(236,72,153,0.2)",
  },
  Finance: {
    color: "#38bdf8",
    bg: "rgba(14,165,233,0.08)",
    border: "rgba(14,165,233,0.2)",
  },
  Healthcare: {
    color: "#f87171",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
  },
  "E-Commerce & Cloud": {
    color: "#fbbf24",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
  },
  Transportation: {
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
  "Automotive & Energy": {
    color: "#fb923c",
    bg: "rgba(234,88,12,0.08)",
    border: "rgba(234,88,12,0.2)",
  },
  "Travel & Hospitality": {
    color: "#2dd4bf",
    bg: "rgba(20,184,166,0.08)",
    border: "rgba(20,184,166,0.2)",
  },
  default: {
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
  },
};

// ── Recruiter View ─
async function RecruiterView({ userId }) {
  const [company, allJobs] = await Promise.all([
    getRecruiterCompany(userId),
    getAllJobs(),
  ]);

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          <Briefcase className="w-9 h-9 text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">
            No Company Registered
          </h2>
          <p className="text-sm text-white/40 max-w-sm">
            You have not registered a company yet. Register your company to start
            posting jobs.
          </p>
        </div>
        <Link
          href="/dashboard/recruiter/company/register"
          className="px-8 h-11 rounded-xl text-sm font-bold text-white flex items-center gap-2 transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
            boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
          }}
        >
          Register Company →
        </Link>
      </div>
    );
  }

  const companyId = company._id?.$oid || company._id;
  const myJobs = allJobs.filter(
    (j) => (j.companyId?.$oid || j.companyId) === companyId,
  );
  const activeJobs = myJobs.filter((j) => j.status === "active");
  const industryStyle =
    INDUSTRY_COLORS[company.industry] || INDUSTRY_COLORS.default;

  const STATUS_CONFIG = {
    approved: {
      label: "Approved",
      color: "#34d399",
      bg: "rgba(52,211,153,0.1)",
      border: "rgba(52,211,153,0.2)",
    },
    pending: {
      label: "Pending",
      color: "#fbbf24",
      bg: "rgba(245,158,11,0.1)",
      border: "rgba(245,158,11,0.2)",
    },
    rejected: {
      label: "Rejected",
      color: "#f87171",
      bg: "rgba(248,113,113,0.1)",
      border: "rgba(248,113,113,0.2)",
    },
  };
  const statusStyle = STATUS_CONFIG[company.status || "pending"];

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Your Company
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Company Profile
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Your public company listing on HireLoop.
        </p>
      </div>

      {/* Company Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Banner */}
        <div
          className="h-24 w-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.08), rgba(52,211,153,0.05))",
          }}
        />

        {/* Profile */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden shrink-0"
              style={{
                backgroundColor: "#0a0a12",
                border: "2px solid rgba(255,255,255,0.1)",
              }}
            >
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain p-1.5"
                />
              ) : (
                <span className="text-xl font-black text-violet-400">
                  {company.name
                    ?.split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: statusStyle.bg,
                  color: statusStyle.color,
                  border: `1px solid ${statusStyle.border}`,
                }}
              >
                ● {statusStyle.label}
              </span>
              <Link
                href="/dashboard/recruiter/company"
                className="flex items-center gap-1.5 px-3 h-8 rounded-xl text-xs font-semibold transition-all hover:text-white"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <Pencil className="w-3 h-3" /> Edit
              </Link>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-1">{company.name}</h2>
          {company.industry && (
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: industryStyle.bg,
                color: industryStyle.color,
                border: `1px solid ${industryStyle.border}`,
              }}
            >
              {company.industry}
            </span>
          )}

          {company.description && (
            <p
              className="text-sm leading-relaxed mt-4"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {company.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 mt-4">
            {company.location && (
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <MapPin className="w-3.5 h-3.5" /> {company.location}
              </div>
            )}
            {company.employeeRange && (
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <PersonWorker className="w-3.5 h-3.5" /> {company.employeeRange}
              </div>
            )}
            {company.website && (
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <Globe className="w-3.5 h-3.5" />
                <a
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-violet-400 hover:underline"
                >
                  {company.website}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Jobs", value: myJobs.length, color: "#a78bfa" },
          { label: "Active Jobs", value: activeJobs.length, color: "#34d399" },
          {
            label: "Status",
            value: statusStyle.label,
            color: statusStyle.color,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center py-5 rounded-2xl text-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p
              className="text-2xl font-black mb-1"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* My Jobs */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Your Job Listings</h2>
          <Link
            href="/dashboard/recruiter/jobs"
            className="text-xs text-violet-400 hover:underline"
          >
            Manage all →
          </Link>
        </div>

        {myJobs.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-14 rounded-2xl text-center gap-3"
            style={{
              backgroundColor: "rgba(255,255,255,0.018)",
              border: "1px dashed rgba(255,255,255,0.1)",
            }}
          >
            <p className="text-sm text-white/40">No jobs posted yet</p>
            <Link
              href="/dashboard/recruiter/jobs/new"
              className="px-5 h-9 rounded-xl text-xs font-bold text-white flex items-center"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              }}
            >
              + Post a Job
            </Link>
          </div>
        ) : (
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {myJobs.map((job, i) => {
              const id = job._id?.$oid || job._id;
              const isLast = i === myJobs.length - 1;
              return (
                <div
                  key={id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
                  style={{
                    borderBottom: isLast
                      ? "none"
                      : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold text-violet-400"
                      style={{
                        backgroundColor: "rgba(139,92,246,0.08)",
                        border: "1px solid rgba(139,92,246,0.15)",
                      }}
                    >
                      {job.title?.[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {job.title}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {job.jobType} •{" "}
                        {job.isRemote ? "Remote" : job.city || "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={
                        job.status === "active"
                          ? {
                              backgroundColor: "rgba(52,211,153,0.1)",
                              color: "#34d399",
                              border: "1px solid rgba(52,211,153,0.2)",
                            }
                          : {
                              backgroundColor: "rgba(255,255,255,0.04)",
                              color: "rgba(255,255,255,0.4)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }
                      }
                    >
                      {job.status || "active"}
                    </span>
                    <Link
                      href={`/dashboard/recruiter/jobs/${id}`}
                      className="text-xs font-semibold transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/recruiter/jobs/new"
          className="px-6 h-10 rounded-xl text-sm font-bold text-white flex items-center gap-2 transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
            boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
          }}
        >
          + Post a Job
        </Link>
        <Link
          href="/dashboard/recruiter/company"
          className="px-6 h-10 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:text-white"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <Pencil className="w-3.5 h-3.5" /> Edit Company
        </Link>
      </div>
    </div>
  );
}

// ── Seeker / Public View ─
async function PublicView({ session }) {
  const [companies, jobs] = await Promise.all([
    getAllCompanies(),
    getAllJobs(),
  ]);

  const approvedCompanies = companies.filter((c) => c.status === "approved");

  const jobCountMap = {};
  jobs.forEach((j) => {
    const cid = j.companyId?.$oid || j.companyId;
    jobCountMap[cid] = (jobCountMap[cid] || 0) + 1;
  });

  const user = session?.user;

  return (
    <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <p className="text-[11px] tracking-[3px] uppercase text-white/40 font-medium">
            Companies
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
          Top companies
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #818cf8, #a78bfa, #34d399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            actively hiring
          </span>
        </h1>
        <p
          className="text-sm max-w-md"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Browse {approvedCompanies.length} verified companies on HireLoop.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Verified Companies",
            value: approvedCompanies.length,
            color: "#818cf8",
          },
          {
            label: "Active Jobs",
            value: jobs.filter((j) => j.status === "active").length,
            color: "#34d399",
          },
          {
            label: "Industries",
            value: [
              ...new Set(
                approvedCompanies.map((c) => c.industry).filter(Boolean),
              ),
            ].length,
            color: "#fbbf24",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center py-5 rounded-2xl text-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {approvedCompanies.map((company) => {
          const id = company._id?.$oid || company._id;
          const jobCount = jobCountMap[id] || 0;
          const industryStyle =
            INDUSTRY_COLORS[company.industry] || INDUSTRY_COLORS.default;
          const initials =
            company.name
              ?.split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase() || "CO";

          return (
            <div
              key={id}
              className="group flex flex-col rounded-2xl p-5 gap-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden shrink-0"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain p-1.5"
                    />
                  ) : (
                    <span className="text-lg font-black text-violet-400">
                      {initials}
                    </span>
                  )}
                </div>
                {company.industry && (
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0"
                    style={{
                      backgroundColor: industryStyle.bg,
                      color: industryStyle.color,
                      border: `1px solid ${industryStyle.border}`,
                    }}
                  >
                    {company.industry}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  {company.name}
                </h3>
                <p
                  className="text-xs leading-relaxed line-clamp-2"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  {company.description ||
                    `A great place to work and grow your career.`}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                {company.location && (
                  <div
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    <MapPin
                      className="w-3.5 h-3.5 shrink-0"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    />
                    {company.location}
                  </div>
                )}
                {company.employeeRange && (
                  <div
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    <PersonWorker
                      className="w-3.5 h-3.5 shrink-0"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    />
                    {company.employeeRange}
                  </div>
                )}
              </div>

              <div
                style={{
                  height: "1px",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(52,211,153,0.08)",
                      border: "1px solid rgba(52,211,153,0.15)",
                    }}
                  >
                    <Briefcase
                      className="w-3 h-3"
                      style={{ color: "#34d399" }}
                    />
                  </div>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {jobCount} {jobCount === 1 ? "job" : "jobs"} open
                  </span>
                </div>
                <Link
                  href={`/jobs`}
                  className="text-xs font-bold px-3.5 h-8 rounded-xl flex items-center gap-1.5 transition-all hover:opacity-90 text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139,92,246,0.6), rgba(124,58,237,0.8))",
                    border: "1px solid rgba(139,92,246,0.3)",
                  }}
                >
                  View Jobs →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div
        className="flex flex-col items-center gap-4 py-12 rounded-2xl text-center"
        style={{
          backgroundColor: "rgba(139,92,246,0.04)",
          border: "1px solid rgba(139,92,246,0.12)",
        }}
      >
        {!user ? (
          <>
            <h3 className="text-xl font-bold text-white">Are you hiring?</h3>
            <p
              className="text-sm max-w-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Register your company and start reaching thousands of qualified
              candidates.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/signup"
                className="px-8 h-11 rounded-xl text-sm font-bold text-white flex items-center gap-2 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                  boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
                }}
              >
                Post a Job →
              </Link>
              <Link
                href="/signin"
                className="px-6 h-11 rounded-xl text-sm font-semibold flex items-center hover:text-white transition-colors"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Sign In
              </Link>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-white">
              Find your next role
            </h3>
            <p
              className="text-sm max-w-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Browse open positions from these companies and apply today.
            </p>
            <Link
              href="/jobs"
              className="px-8 h-11 rounded-xl text-sm font-bold text-white flex items-center gap-2 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
              }}
            >
              Browse Jobs →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─
export default async function CompanyPage() {
  const session = await getSession();
  const role = session?.user?.role;
  const userId = session?.user?.id;

  if (role === "recruiter") {
    return (
      <div
        className="min-h-screen px-6 py-10"
        style={{ backgroundColor: "#08080f" }}
      >
        <RecruiterView userId={userId} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#08080f" }}>
      <PublicView session={session} />
    </div>
  );
}
