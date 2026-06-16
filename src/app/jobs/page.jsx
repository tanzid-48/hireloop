import JobsPage from "./JobsPage";
import { getJobsPaginated } from "@/lib/api/jobs";
import { getAllCompanies } from "@/lib/api/company";
import { getSavedJobsByUser } from "@/lib/api/savedJobs";
import { getSession } from "@/lib/auth-session";

export const metadata = {
  title: "Browse Jobs | HireLoop",
  description:
    "Discover thousands of job opportunities from top-tier companies. Search, filter, and apply to your dream role on HireLoop.",
};

export default async function Page({ searchParams }) {
  const session = await getSession();
  const userId = session?.user?.id || null;

  const sp = await searchParams;

  const page = Math.max(1, parseInt(sp?.page || "1"));
  const search = sp?.search || "";
  const category = sp?.category || "";
  const jobType = sp?.jobType || "";
  const sort = sp?.sort || "newest";

  const [data, companies, savedJobs] = await Promise.all([
    getJobsPaginated({
      page,
      search,
      category,
      jobType,
      sort,
    }),
    getAllCompanies(),
    userId ? getSavedJobsByUser(userId) : Promise.resolve([]),
  ]);

  const companyMap = {};

  companies.forEach((c) => {
    companyMap[c._id?.$oid || c._id] = c;
  });

  const savedJobIds = savedJobs.map((s) => s.jobId);

  return (
    <JobsPage
      jobs={data.jobs || []}
      total={data.total || 0}
      totalPages={data.totalPages || 1}
      currentPage={page}
      companyMap={companyMap}
      filters={{ search, category, jobType, sort }}
      userId={userId}
      savedJobIds={savedJobIds}
    />
  );
}
