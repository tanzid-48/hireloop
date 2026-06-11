import { getAllCompanies } from "@/lib/api/company";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@gravity-ui/icons";
import Image from "next/image";
import CompanyActions from "./CompanyActions";

const ITEMS_PER_PAGE = 5;

const StatusDot = ({ status }) => {
  const config = {
    approved: { color: "#34d399", label: "Approved" },
    rejected: { color: "#f87171", label: "Rejected" },
    pending: { color: "#fbbf24", label: "Pending" },
  }[status] || { color: "#fbbf24", label: "Pending" };

  return (
    <div className="flex items-center gap-2">
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{
          backgroundColor: config.color,
          boxShadow: `0 0 6px ${config.color}`,
        }}
      />
      <span className="text-sm font-medium" style={{ color: config.color }}>
        {config.label}
      </span>
    </div>
  );
};

export default async function AdminCompaniesPage({ searchParams }) {
  const companies = await getAllCompanies();
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp?.page || "1"));

  const total = companies.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = companies.slice(start, start + ITEMS_PER_PAGE);

  const pending = companies.filter(
    (c) => c.status === "pending" || !c.status,
  ).length;
  const approved = companies.filter((c) => c.status === "approved").length;
  const rejected = companies.filter((c) => c.status === "rejected").length;

  const cols = "1.5fr 1.6fr 1.2fr 0.8fr 1fr 1.2fr 1.2fr";

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Admin
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Company Reviews
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Approve or reject company registrations.
        </p>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Table Header */}
        <div
          className="grid px-5 py-3.5"
          style={{
            gridTemplateColumns: cols,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {[
            "Company Name",
            "Recruiter Email",
            "Industry",
            "Job Count",
            "Status",
            "Date Submitted",
            "Actions",
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

        {/* Rows */}
        {paginated.map((company, i) => {
          const id = company._id?.$oid || company._id;
          const initials =
            company.name
              ?.split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase() || "CO";
          const isLast = i === paginated.length - 1;

          return (
            <div
              key={id}
              className="grid items-center px-5 py-4 transition-colors hover:bg-white/[0.02]"
              style={{
                gridTemplateColumns: cols,
                borderBottom: isLast
                  ? "none"
                  : "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {/* Company Name */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[11px] font-bold overflow-hidden"
                  style={{
                    backgroundColor: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    color: "#a78bfa",
                  }}
                >
                  {company.logo ? (
                    <Image
                      width={64}
                      height={64}
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    initials
                  )}
                </div>
                <span className="text-sm font-semibold text-white truncate">
                  {company.name}
                </span>
              </div>

              {/* Recruiter Email */}
              <p
                className="text-sm truncate"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {company.email || "—"}
              </p>

              {/* Industry */}
              <p
                className="text-xs truncate"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontStyle: company.industry ? "normal" : "italic",
                }}
              >
                {company.industry || "—"}
              </p>
              {/* Job Count */}
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">
                  {company.jobCount ?? 0}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  jobs
                </span>
              </div>

              {/* Status */}
              <StatusDot status={company.status} />

              {/* Date */}
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                {company.createdAt
                  ? new Date(company.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : "—"}
              </p>

              {/* Actions */}
              <CompanyActions
                companyId={id}
                currentStatus={company.status || "pending"}
              />
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
            of <strong className="text-white/60">{total}</strong> companies
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "PENDING REVIEW",
            value: pending,
            color: "#fbbf24",
            icon: "⏳",
          },
          {
            label: "APPROVED PARTNERS",
            value: approved,
            color: "#34d399",
            icon: "✅",
          },
          {
            label: "TOTAL REJECTIONS",
            value: rejected,
            color: "#f87171",
            icon: "🚫",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {stat.label}
              </span>
              <span className="text-base">{stat.icon}</span>
            </div>
            <p className="text-3xl font-black" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
