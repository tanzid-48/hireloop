import React from 'react';
import { Card } from "@heroui/react";

const DashboardCard = ({ icon, label, value }) => {
  return (
    <Card className="w-full bg-[#0f0f1a] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-4 hover:border-white/15 transition-all duration-200">
      <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-white/40">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-white/35">{label}</p>
        <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </Card>
  );
};

export default DashboardCard;