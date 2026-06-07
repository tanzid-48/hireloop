import { getAllJobs } from "@/lib/api/jobs";
import { getAllCompanies } from "@/lib/api/company";
import JobsPage from "./JobsPage";

export default async function Page() {
  const [jobs, companies] = await Promise.all([
    getAllJobs(),
    getAllCompanies(),
  ]);

  const companyMap = {};
  companies.forEach((c) => {
    const id = c._id?.$oid || c._id;
    companyMap[id] = c;
  });

  return <JobsPage jobs={jobs} companyMap={companyMap} />;
}
