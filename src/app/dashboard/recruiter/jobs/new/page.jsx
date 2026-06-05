import React from "react";
import NewRecruiterJob from "./NewRecruiterJob";
import { getSession } from "@/lib/auth-session";
import { getCompanyByUserId } from "@/lib/api/jobs";

const NewJobPage = async () => {
  const session = await getSession();
  const userId = session?.user?.id;
  const company = await getCompanyByUserId(userId);
  const companyId = company?._id?.toString() ?? company?._id ?? null; 

  return (
    <div>
      <NewRecruiterJob userId={userId} companyId={companyId} />
    </div>
  );
};

export default NewJobPage;