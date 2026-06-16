const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

export const getCompanyByUserId = async (userId) => {
  try {
    const res = await fetch(`${baseUrl}/companies?userId=${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const company = Array.isArray(data) ? data[0] : data;
    if (!company) return null;

    return {
      ...company,
      _id: company._id?.$oid || company._id?.toString() || company._id,
    };
  } catch (err) {
    console.error("getCompanyByUserId error:", err);
    return null;
  }
};

export const getCompanyJobs = async (companyId) => {
  try {
    const res = await fetch(`${baseUrl}/jobs?companyId=${companyId}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("getCompanyJobs error:", err);
    return [];
  }
};

export const getAllJobs = async () => {
  try {
    const res = await fetch(`${baseUrl}/jobs`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};

export const getJobById = async (jobId) => {
  const res = await fetch(`${baseUrl}/jobs/${jobId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch job");
  }

  return res.json();
};

// ← NEW: server-side paginated
export const getJobsPaginated = async ({
  page = 1,
  limit = 9,
  search = "",
  category = "",
  jobType = "",
  sort = "newest",
} = {}) => {
  try {
    const params = new URLSearchParams({ page, limit, sort });
    if (search) params.set("search", search);
    if (category && category !== "All") params.set("category", category);
    if (jobType && jobType !== "All Types") params.set("jobType", jobType);

    const res = await fetch(`${baseUrl}/jobs?${params}`, { cache: "no-store" });
    if (!res.ok) return { jobs: [], total: 0, totalPages: 1, page: 1 };
    return res.json();
  } catch {
    return { jobs: [], total: 0, totalPages: 1, page: 1 };
  }
};
