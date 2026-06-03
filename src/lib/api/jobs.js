
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const getCompanyJobs = async (companyId, status = 'active') => {
    const res = await fetch(`${baseUrl}/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}

