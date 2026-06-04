import React from 'react';
import CompanySection from '@/components/dashboard/company/CompanySection';

// TODO: Replace with actual API calls
async function getRecruiterCompany(recruiterId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/company?recruiterId=${recruiterId}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

const RecruiterCompanyPage = async () => {
  const recruiterId = 'recruiter_123'; // TODO: Replace with session user ID
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