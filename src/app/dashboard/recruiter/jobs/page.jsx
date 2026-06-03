import { getCompanyJobs } from '@/lib/api/jobs';
import JobsTable from '@/components/dashboard/JobsTable';
import Link from 'next/link';

const RecruiterJobsPage = async () => {
  const companyId = 'company_123'; // TODO: Replace with actual company ID
  const jobs = await getCompanyJobs(companyId);

  return (
    <div className="flex flex-col gap-6 max-w-6xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
            Manage
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            Job Listings
          </h1>
          <p className="text-sm text-white/30 mt-1">
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} posted
          </p>
        </div>
        <Link
          href="/dashboard/recruiter/jobs/new"
          className="flex items-center gap-2 px-5 h-10 rounded-xl text-sm font-bold text-white transition-all outline-none"
          style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed)", boxShadow: "0 4px 20px rgba(139,92,246,0.3)" }}
        >
          + Post a Job
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <JobsTable jobs={jobs} />
      </div>

    </div>
  );
};

export default RecruiterJobsPage;