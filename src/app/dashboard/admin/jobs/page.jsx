import { getAllJobs } from "@/lib/api/jobs";
import { getAllCompanies } from "@/lib/api/company";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@gravity-ui/icons";
import Image from "next/image";

const ITEMS_PER_PAGE = 8;

const STATUS_CONFIG = {
  active: {
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.2)",
  },
  inactive: {
    color: "#9ca3af",
    bg: "rgba(156,163,175,0.1)",
    border: "rgba(156,163,175,0.2)",
  },
  closed: {
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.2)",
  },
  draft: {
    color: "#fbbf24",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
  },
};

export default async function AdminJobsPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp?.page || "1"));

  const [jobs, companies] = await Promise.all([
    getAllJobs(),
    getAllCompanies(),
  ]);

  const companyMap = {};
  companies.forEach((c) => {
    companyMap[c._id?.$oid || c._id] = c;
  });

  const total = jobs.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = jobs.slice(start, start + ITEMS_PER_PAGE);

  const active = jobs.filter((j) => j.status === "active").length;
  const closed = jobs.filter((j) => j.status === "closed").length;

  const cols = "2fr 1.5fr 1fr 1fr 1.2fr 0.8fr";

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Admin
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          All Jobs
        </h1>
        <p className="text-sm text-white/30 mt-1">{total} total job listings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Jobs", value: total, color: "#a78bfa", icon: "💼" },
          { label: "Active Jobs", value: active, color: "#34d399", icon: "✅" },
          { label: "Closed Jobs", value: closed, color: "#f87171", icon: "🔒" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {stat.label}
              </span>
              <span>{stat.icon}</span>
            </div>
            <p className="text-3xl font-black" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="grid px-5 py-3.5"
          style={{
            gridTemplateColumns: cols,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {[
            "Job Title",
            "Company",
            "Category",
            "Type",
            "Deadline",
            "Status",
          ].map((h) => (
            <p
              key={h}
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {h}
            </p>
          ))}
        </div>

        {paginated.map((job, i) => {
          const id = job._id?.$oid || job._id;
          const companyId = job.companyId?.$oid || job.companyId;
          const company = companyMap[companyId];
          const status = STATUS_CONFIG[job.status] || STATUS_CONFIG.active;
          const isLast = i === paginated.length - 1;

          return (
            <div
              key={id}
              className="grid items-center px-5 py-4 hover:bg-white/[0.02] transition-colors"
              style={{
                gridTemplateColumns: cols,
                borderBottom: isLast
                  ? "none"
                  : "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {/* Title */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold overflow-hidden"
                  style={{
                    backgroundColor: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    color: "#a78bfa",
                  }}
                >
                  {company?.logo ? (
                    <Image
                      width={64}
                      height={64}
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain p-0.5"
                    />
                  ) : (
                    job.title?.[0]
                  )}
                </div>
                <span className="text-sm font-semibold text-white truncate">
                  {job.title}
                </span>
              </div>

              {/* Company */}
              <p
                className="text-sm truncate"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {company?.name || "—"}
              </p>

              {/* Category */}
              <p
                className="text-xs truncate"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {job.category || "—"}
              </p>

              {/* Type */}
              <span
                className="text-[11px] font-medium px-2 py-1 rounded-lg w-fit"
                style={{
                  backgroundColor: "rgba(139,92,246,0.08)",
                  color: "rgba(167,139,250,0.9)",
                  border: "1px solid rgba(139,92,246,0.15)",
                }}
              >
                {job.jobType || "—"}
              </span>

              {/* Deadline */}
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                {job.deadline
                  ? new Date(job.deadline).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : "—"}
              </p>

              {/* Status */}
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit capitalize"
                style={{
                  backgroundColor: status.bg,
                  color: status.color,
                  border: `1px solid ${status.border}`,
                }}
              >
                {job.status || "active"}
              </span>
            </div>
          );
        })}

        {/* Pagination */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            Showing{" "}
            <strong className="text-white/60">
              {start + 1}–{Math.min(start + ITEMS_PER_PAGE, total)}
            </strong>{" "}
            of <strong className="text-white/60">{total}</strong> jobs
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`?page=${page - 1}`}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${page === 1 ? "pointer-events-none opacity-20" : "hover:bg-white/[0.06]"}`}
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`?page=${p}`}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all"
                style={
                  p === page
                    ? {
                        background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                        color: "#fff",
                      }
                    : {
                        border: "1px solid rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.4)",
                      }
                }
              >
                {p}
              </Link>
            ))}
            <Link
              href={`?page=${page + 1}`}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${page === totalPages ? "pointer-events-none opacity-20" : "hover:bg-white/[0.06]"}`}
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
