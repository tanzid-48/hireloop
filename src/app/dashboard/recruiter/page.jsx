"use client";

import { useSession } from "@/lib/auth-client";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Link from "next/link";
import {
  FileText,
  PersonWorker,
  Thunderbolt,
  CircleXmark,
  SquarePlus,
  Briefcase,
} from "@gravity-ui/icons";

const RecruiterPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{
              borderColor: "rgba(139,92,246,0.4)",
              borderTopColor: "transparent",
            }}
          />
          <p className="text-sm text-white/30">Loading...</p>
        </div>
      </div>
    );
  }

  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || "there";

  const stats = [
    {
      icon: <FileText className="w-4 h-4" />,
      label: "Total Job Posts",
      value: "48",
    },
    {
      icon: <PersonWorker className="w-4 h-4" />,
      label: "Total Applicants",
      value: "1,284",
    },
    {
      icon: <Thunderbolt className="w-4 h-4" />,
      label: "Active Jobs",
      value: "18",
    },
    {
      icon: <CircleXmark className="w-4 h-4" />,
      label: "Jobs Closed",
      value: "32",
    },
  ];

  const quickActions = [
    {
      icon: <SquarePlus className="w-5 h-5 text-violet-400" />,
      label: "Post a Job",
      desc: "Create a new listing",
      href: "/dashboard/recruiter/jobs/new",
      color: "rgba(139,92,246,0.06)",
      border: "rgba(139,92,246,0.15)",
    },
    {
      icon: <PersonWorker className="w-5 h-5 text-blue-400" />,
      label: "View Applicants",
      desc: "Review candidates",
      href: "/dashboard/recruiter/jobs",
      color: "rgba(59,130,246,0.06)",
      border: "rgba(59,130,246,0.15)",
    },
    {
      icon: <Briefcase className="w-5 h-5 text-emerald-400" />,
      label: "Company Profile",
      desc: "Manage your company",
      href: "/dashboard/recruiter/company",
      color: "rgba(52,211,153,0.06)",
      border: "rgba(52,211,153,0.15)",
    },
    {
      icon: <FileText className="w-5 h-5 text-amber-400" />,
      label: "Manage Jobs",
      desc: "Edit or close listings",
      href: "/dashboard/recruiter/jobs",
      color: "rgba(245,158,11,0.06)",
      border: "rgba(245,158,11,0.15)",
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Dashboard
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Here is what news happening with your job listings today.
        </p>
      </div>

      {/* Stats */}
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

      {/* Quick Actions */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-white">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="flex flex-col gap-3 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: action.color,
                border: `1px solid ${action.border}`,
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                {action.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {action.label}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {action.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Company status banner */}
      <div
        className="flex items-center justify-between gap-4 p-4 rounded-2xl"
        style={{
          backgroundColor: "rgba(139,92,246,0.04)",
          border: "1px solid rgba(139,92,246,0.12)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <Briefcase className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Company Profile</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              Keep your company profile updated to attract top talent.
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/recruiter/company"
          className="px-4 h-8 rounded-xl text-xs font-bold text-white shrink-0 flex items-center"
          style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed)" }}
        >
          View →
        </Link>
      </div>
    </div>
  );
};

export default RecruiterPage;
