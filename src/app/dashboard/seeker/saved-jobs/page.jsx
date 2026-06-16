import { getSession } from "@/lib/auth-session";
import { getAllJobs } from "@/lib/api/jobs";
import { getAllCompanies } from "@/lib/api/company";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, MapPin, PersonWorker } from "@gravity-ui/icons";

export const metadata = {
  title: "Saved Jobs | HireLoop",
  description: "Your bookmarked job opportunities on HireLoop.",
};

const formatSalary = (min, max) => {
  if (!min && !max) return null;
  const fmt = (n) => `$${Number(n).toLocaleString()}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  return min ? `From ${fmt(min)}` : `Up to ${fmt(max)}`;
};

export default async function SavedJobsPage() {
  const [jobs, companies] = await Promise.all([
    getAllJobs(),
    getAllCompanies(),
  ]);

  const companyMap = {};
  companies.forEach((c) => {
    companyMap[c._id?.$oid || c._id] = c;
  });

  // Placeholder: show latest 8 active jobs (saved jobs backend pending)
  const displayed = jobs.filter((j) => j.status === "active").slice(0, 8);

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
            Seeker
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            Saved Jobs
          </h1>
          <p className="text-sm text-white/30 mt-1">
            Manage and track your bookmarked opportunities.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="px-4 py-2 rounded-xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest">
              Total Saved
            </p>
            <p className="text-xl font-black text-white">{displayed.length}</p>
          </div>
        </div>
      </div>

      {/* Notice banner */}
      <div
        className="flex items-center gap-3 p-4 rounded-2xl"
        style={{
          backgroundColor: "rgba(245,158,11,0.05)",
          border: "1px solid rgba(245,158,11,0.12)",
        }}
      >
        <span className="text-base">📌</span>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          Bookmark feature coming soon. Showing latest active jobs you might
          like.
        </p>
      </div>

      {/* Jobs list */}
      {displayed.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-2xl text-center gap-3"
          style={{
            backgroundColor: "rgba(255,255,255,0.018)",
            border: "1px dashed rgba(255,255,255,0.1)",
          }}
        >
          <Bookmark className="w-10 h-10 text-white/10" />
          <p className="text-sm font-semibold text-white/40">
            No saved jobs yet
          </p>
          <Link
            href="/jobs"
            className="mt-2 px-5 h-9 rounded-xl text-xs font-bold text-white flex items-center"
            style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed)" }}
          >
            Browse Jobs →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {displayed.map((job) => {
            const id = job._id?.$oid || job._id;
            const companyId = job.companyId?.$oid || job.companyId;
            const company = companyMap[companyId];
            const salary = formatSalary(job.salaryMin, job.salaryMax);

            return (
              <div
                key={id}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {company?.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={44}
                        height={44}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-base font-bold text-violet-400">
                        {job.title?.[0]}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="text-sm font-semibold text-white truncate">
                        {job.title}
                      </p>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                        style={{
                          backgroundColor: "rgba(139,92,246,0.08)",
                          color: "rgba(167,139,250,0.8)",
                          border: "1px solid rgba(139,92,246,0.15)",
                        }}
                      >
                        {company?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {job.isRemote && (
                        <span className="text-xs text-emerald-400">
                          🌐 Remote
                        </span>
                      )}
                      {!job.isRemote && job.city && (
                        <span
                          className="text-xs flex items-center gap-1"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          <MapPin className="w-3 h-3" /> {job.city}
                        </span>
                      )}
                      {salary && (
                        <span
                          className="text-xs flex items-center gap-1"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          <PersonWorker className="w-3 h-3" /> {salary}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href={`/jobs/${id}`}
                    className="px-4 h-8 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 hover:opacity-90 transition-all"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,0.6), rgba(124,58,237,0.8))",
                      border: "1px solid rgba(139,92,246,0.3)",
                    }}
                  >
                    Apply →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
