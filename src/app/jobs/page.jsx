import { getAllCompanies } from "@/lib/api/company";
import { getJobsPaginated } from "@/lib/api/jobs";
import JobsPage from "./JobsPage";


export const metadata = {
  title: "Browse Jobs | HireLoop",
  description:
    "Discover thousands of job opportunities from top-tier companies. Search, filter, and apply to your dream role on HireLoop.",
  openGraph: {
    title: "Browse Jobs | HireLoop",
    description: "Find your next opportunity at the world's best companies.",
    url: "https://hireloop-ruby.vercel.app/jobs",
  },
};

export default async function Page({ searchParams }) {
  const sp = await searchParams;

  const page = Math.max(1, parseInt(sp?.page || "1"));
  const search = sp?.search || "";
  const category = sp?.category || "";
  const jobType = sp?.jobType || "";
  const sort = sp?.sort || "newest";

  const [data, companies] = await Promise.all([
    getJobsPaginated({ page, search, category, jobType, sort }),
    getAllCompanies(),
  ]);

  const companyMap = {};
  companies.forEach((c) => {
    companyMap[c._id?.$oid || c._id] = c;
  });

  return (
    <JobsPage
      jobs={data.jobs || []}
      total={data.total || 0}
      totalPages={data.totalPages || 1}
      currentPage={page}
      companyMap={companyMap}
      filters={{ search, category, jobType, sort }}
    />
  );
}
