import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getRecruiterCompany } from "@/lib/api/company";
import CompanySection from "@/components/dashboard/company/CompanySection";

const RecruiterCompanyPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const recruiterId = session?.user?.id;
  if (!recruiterId) return null;
  const company = await getRecruiterCompany(recruiterId);

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Settings
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          My Company
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Manage your company profile and hiring presence.
        </p>
      </div>
      <CompanySection company={company} />
    </div>
  );
};

export default RecruiterCompanyPage;
