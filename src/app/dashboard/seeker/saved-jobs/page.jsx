import { getSession } from "@/lib/auth-session";
import { redirect } from "next/navigation";
import { getAllJobs } from "@/lib/api/jobs";
import { getAllCompanies } from "@/lib/api/company";
import { getSavedJobsByUser } from "@/lib/api/savedJobs";
import SavedJobsList from "@/components/dashboard/SavedJobsList";

export const metadata = {
  title: "Saved Jobs | HireLoop",
  description: "Your bookmarked job opportunities on HireLoop.",
};

export default async function SavedJobsPage() {
  const session = await getSession();
  if (!session) redirect("/signin?redirect=/dashboard/seeker/saved-jobs");

  const userId = session.user.id;

  const [savedRecords, jobs, companies] = await Promise.all([
    getSavedJobsByUser(userId),
    getAllJobs(),
    getAllCompanies(),
  ]);

  const companyMap = {};
  companies.forEach((c) => {
    companyMap[c._id?.$oid || c._id] = c;
  });

  const jobMap = {};
  jobs.forEach((j) => {
    jobMap[j._id?.$oid || j._id] = j;
  });

  const savedJobs = savedRecords
    .map((rec) => {
      const job = jobMap[rec.jobId];
      if (!job) return null;
      const companyId = job.companyId?.$oid || job.companyId;
      return { ...job, company: companyMap[companyId] || null };
    })
    .filter(Boolean);

  return <SavedJobsList initialJobs={savedJobs} />;
}
