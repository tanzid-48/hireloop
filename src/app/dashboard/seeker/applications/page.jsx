import { getApplicationsByUser } from "@/lib/api/applications";
import { getAllCompanies } from "@/lib/api/company";
import { getSession } from "@/lib/auth-session";
import Link from "next/link";
import { Briefcase, ArrowLeft, ArrowRight } from "@gravity-ui/icons";
import Image from "next/image";

const STATUS_CONFIG = {
  pending:     { label: "Applied",     color: "#a78bfa", bg: "rgba(139,92,246,0.1)",  border: "rgba(139,92,246,0.25)" },
  review:      { label: "Review",      color: "#fbbf24", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)" },
  shortlisted: { label: "Shortlisted", color: "#34d399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.25)" },
  rejected:    { label: "Rejected",    color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" },
  offered:     { label: "Offered",     color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.3)" },
};

const timeAgo = (dateStr) => {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  if (mins < 60)  return `${mins} min${mins !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 7)   return `${days} day${days !== 1 ? "s" : ""} ago`;
  return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
};

const ITEMS_PER_PAGE = 5;

export default async function ApplicationPage({ searchParams }) {
  const session = await getSession();
  const userId = session?.user?.id;

  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp?.page || "1"));

  const [applications, companies] = await Promise.all([
    getApplicationsByUser(userId),
    getAllCompanies(),
  ]);

  const companyMap = {};
  companies.forEach(c => {
    const id = c._id?.$oid || c._id;
    companyMap[id] = c;
  });

  const total = applications.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = applications.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-6 max-w-5xl">

      {/* Header */}
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          My Activity
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Applications
        </h1>
        <p className="text-sm text-white/30 mt-1">
          {total} application{total !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Table */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl text-center gap-3"
          style={{ backgroundColor: "rgba(255,255,255,0.018)", border: "1px dashed rgba(255,255,255,0.1)" }}>
          <Briefcase className="w-10 h-10 text-white/10" />
          <p className="text-sm font-semibold text-white/40">No applications yet</p>
          <p className="text-xs text-white/25">Start applying to jobs to track them here</p>
          <Link href="/jobs"
            className="mt-2 px-5 h-9 rounded-xl text-xs font-bold text-white flex items-center"
            style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed)" }}>
            Browse Jobs →
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.07)" }}>

          {/* Table Header */}
          <div className="grid px-5 py-3"
            style={{
              gridTemplateColumns: "2fr 1.2fr 1fr 1fr 100px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
            {["Job Title", "Company", "Applied", "Status", "Action"].map(h => (
              <p key={h} style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {h}
              </p>
            ))}
          </div>

          {/* Rows */}
          {paginated.map((app, i) => {
            const id = app._id?.$oid || app._id;
            const companyId = app.companyId?.$oid || app.companyId;
            const company = companyMap[companyId];
            const status = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
            const isLast = i === paginated.length - 1;

            return (
              <div key={id}
                className="grid items-center px-5 py-4 transition-colors hover:bg-white/[0.02]"
                style={{
                  gridTemplateColumns: "2fr 1.2fr 1fr 1fr 100px",
                  borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.04)",
                }}>

                {/* Job Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold text-violet-400 uppercase"
                    style={{ backgroundColor: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
                    {app.jobTitle?.[0] || "J"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{app.jobTitle || "—"}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {[app.jobType, app.isRemote ? "Remote" : app.city].filter(Boolean).join(" • ") || "Full-time"}
                    </p>
                  </div>
                </div>

                {/* Company */}
                <div className="flex items-center gap-2 min-w-0">
                  {company?.logo ? (
                    <Image
                    width={64}
                    height={64} src={company.logo} alt={company.name}
                      className="w-6 h-6 rounded-lg object-contain shrink-0"
                      style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
                  ) : (
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold text-violet-400"
                      style={{ backgroundColor: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)" }}>
                      {company?.name?.[0] || "C"}
                    </div>
                  )}
                  <span className="text-sm truncate" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {company?.name || "Company"}
                  </span>
                </div>

                {/* Applied */}
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {timeAgo(app.appliedAt || app.createdAt)}
                </p>

                {/* Status */}
                <div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: status.bg, color: status.color, border: `1px solid ${status.border}` }}>
                    {status.label}
                  </span>
                </div>

                {/* Action */}
                <Link href={`/jobs/${app.jobId}`}
                  className="text-xs font-semibold transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.45)" }}>
                  Details
                </Link>
              </div>
            );
          })}

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Showing {start + 1}–{Math.min(start + ITEMS_PER_PAGE, total)} of {total} application{total !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              {/* Prev */}
              <Link
                href={`?page=${page - 1}`}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${page === 1 ? "pointer-events-none opacity-20" : "hover:bg-white/[0.06]"}`}
                style={{ border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Link key={p} href={`?page=${p}`}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all"
                  style={p === page
                    ? { background: "linear-gradient(135deg, #a78bfa, #7c3aed)", color: "#fff" }
                    : { border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}>
                  {p}
                </Link>
              ))}

              {/* Next */}
              <Link
                href={`?page=${page + 1}`}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${page === totalPages ? "pointer-events-none opacity-20" : "hover:bg-white/[0.06]"}`}
                style={{ border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}