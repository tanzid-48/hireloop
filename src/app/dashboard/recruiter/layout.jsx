import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { requireRole } from "@/lib/auth-session";
import React from "react";

const  RecruiterLayout = async({ children }) => {

  await requireRole('recruiter')
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-6 bg-[#1c1c28]">
        {children}
      </main>
    </div>
  );
};

export default RecruiterLayout;