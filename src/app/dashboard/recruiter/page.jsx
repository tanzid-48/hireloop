'use client';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useSession } from '@/lib/auth-client';
import {
  FileText,
  PersonWorker,
  Thunderbolt,
  CircleXmark,
} from "@gravity-ui/icons";

const stats = [
  { icon: <FileText className="w-4 h-4" />, label: "Total Job Posts", value: "48" },
  { icon: <PersonWorker className="w-4 h-4" />, label: "Total Applicants", value: "1,284" },
  { icon: <Thunderbolt className="w-4 h-4" />, label: "Active Jobs", value: "18" },
  { icon: <CircleXmark className="w-4 h-4" />, label: "Jobs Closed", value: "32" },
];

const RecruiterPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) return <p>Loading...</p>;
  
  const user = session?.user;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Welcome back, {user?.name}!</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <DashboardCard
            key={i}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
    </div>
  );
};

export default RecruiterPage;