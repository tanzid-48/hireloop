import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import React from "react";

const DashBoardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-6 bg-[#1c1c28]">
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;