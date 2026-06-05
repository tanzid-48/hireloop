'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

 export const createCompany = async (newCompanyData) => {
    const res = await fetch(`${baseUrl}/api/companies`, {
        method: "POST",
        headers: {
             "Content-Type": "application/json" 
            },
        body: JSON.stringify(newCompanyData),
    });
    return res.json();
};

export const updateCompany = async (companyId, updatedData) => {
  const res = await fetch(`${baseUrl}/api/companies/${companyId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export const getCompanyById = async (companyId) => {
  const res = await fetch(`${baseUrl}/api/companies/${companyId}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
};