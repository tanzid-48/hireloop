import { getAllJobs } from "@/lib/api/jobs";
import { getAllCompanies } from "@/lib/api/company";
import Link from "next/link";
import Image from "next/image";
import { MapPin, PersonWorker } from "@gravity-ui/icons";

const formatSalary = (min, max, currency) => {
  if (!min && !max) return null;
  const fmt = (n) => `$${Number(n).toLocaleString()}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  return null;
};

export default async function FeaturedJobsSection() {
  const [jobs, companies] = await Promise.all([
    getAllJobs(),
    getAllCompanies(),
  ]);

  const companyMap = {};
  companies.forEach((c) => {
    companyMap[c._id?.$oid || c._id] = c;
  });

  const featured = jobs.filter((j) => j.status === "active").slice(0, 6);

  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#08080f" }}>
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <p className="text-[11px] tracking-[3px] uppercase text-white/40 font-medium">
            Smart Job Discovery
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white text-center leading-tight tracking-tight mb-14">
          The roles your id never
          <br />
          find by searching
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {featured.map((job) => {
            const id = job._id?.$oid || job._id;
            const companyId = job.companyId?.$oid || job.companyId;
            const company = companyMap[companyId];
            const salary = formatSalary(
              job.salaryMin,
              job.salaryMax,
              job.currency,
            );

            return (
              <div
                key={id}
                className="flex flex-col p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/30 group cursor-pointer"
                style={{
                  backgroundColor: "#0f0f1a",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Logo + Company */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {company?.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-sm font-bold text-violet-400">
                        {job.title?.[0]}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-xs font-medium"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {company?.name || "Company"}
                  </p>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2 leading-snug line-clamp-1">
                  {job.title}
                </h3>

                {/* Description */}
                <p
                  className="text-xs leading-relaxed mb-4 line-clamp-2"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {job.responsibilities?.split("\n")[0] ||
                    `Join ${company?.name || "us"} and work on exciting projects.`}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {!job.isRemote && job.city && (
                    <span
                      className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)",
                        color: "rgba(255,255,255,0.4)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <MapPin className="w-3 h-3" /> {job.city}
                    </span>
                  )}
                  {job.isRemote && (
                    <span
                      className="text-[11px] px-2.5 py-1 rounded-full"
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
                    className="text-[11px] px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(139,92,246,0.08)",
                      color: "rgba(167,139,250,0.8)",
                      border: "1px solid rgba(139,92,246,0.15)",
                    }}
                  >
                    {job.jobType}
                  </span>
                  {salary && (
                    <span
                      className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)",
                        color: "rgba(255,255,255,0.4)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <PersonWorker className="w-3 h-3" /> {salary}
                    </span>
                  )}
                </div>

                {/* Apply */}
                <Link
                  href={`/jobs/${id}`}
                  className="flex items-center gap-2 text-sm font-semibold text-white/60 group-hover:text-white transition-colors mt-auto"
                >
                  Apply Now
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M8 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/jobs"
            className="px-8 h-11 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 flex items-center gap-2"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            View all job open
          </Link>
        </div>
      </div>
    </section>
  );
}
