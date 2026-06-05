import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Pencil,
  Globe,
  PersonWorker,
  CircleCheck,
  Clock,
  CircleXmark,
  MapPin,
  OfficeBadge,
} from "@gravity-ui/icons";

const STATUS = {
  pending: {
    label: "Pending Review",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
    icon: CircleCheck,
  },
  rejected: {
    label: "Rejected",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
    icon: CircleXmark,
  },
};

export default function CompanyCard({ company }) {
  const status = STATUS[company.status] || STATUS.pending;
  const StatusIcon = status.icon;

  const infoItems = [
    {
      icon: Globe,
      label: "Website",
      value: company.website ? `https://${company.website}` : "—",
      link: company.website,
    },
    { icon: MapPin, label: "Location", value: company.location || "—" },
    {
      icon: PersonWorker,
      label: "Team Size",
      value: company.employeeRange || "—",
    },
    { icon: OfficeBadge, label: "Industry", value: company.industry || "—" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Status Banner */}
      {company.status !== "approved" && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            backgroundColor: status.bg,
            border: `1px solid ${status.border}`,
          }}
        >
          <StatusIcon
            className="w-4 h-4 shrink-0"
            style={{ color: status.color }}
          />
          <p
            className="text-xs font-semibold flex-1"
            style={{ color: status.color }}
          >
            {company.status === "pending"
              ? "Your company is under review. You'll be notified once approved."
              : "Your registration was rejected. Please update your details and resubmit."}
          </p>
          {company.status === "rejected" && (
            <Link
              href={`/dashboard/recruiter/company/register?edit=true&id=${company._id}`}
              className="text-xs font-bold px-3 py-1 rounded-lg shrink-0 transition-colors"
              style={{
                backgroundColor: "rgba(248,113,113,0.15)",
                color: "#f87171",
                border: "1px solid rgba(248,113,113,0.25)",
              }}
            >
              Resubmit
            </Link>
          )}
        </div>
      )}

      {/* Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-start  justify-between p-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden shrink-0"
              style={{
                backgroundColor: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.15)",
              }}
            >
              {company.logo ? (
                <Image
                  width={64}
                  height={64}
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <OfficeBadge className="w-7 h-7 text-violet-400/50" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-white">{company.name}</h2>
                <span
                  className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: status.bg,
                    color: status.color,
                    border: `1px solid ${status.border}`,
                  }}
                >
                  <StatusIcon className="w-2.5 h-2.5" />
                  {status.label}
                </span>
              </div>
              <p className="text-xs text-white/40">{company.industry}</p>
            </div>
          </div>

          <Link
            href={`/dashboard/recruiter/company/register?edit=true&id=${company._id}`}
            className="flex items-center gap-2 px-4 h-9 rounded-xl text-xs font-semibold text-white/60 hover:text-white transition-all outline-none"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </Link>
        </div>

        {/* Info Grid */}
        <div
          className="grid grid-cols-2"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          {infoItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4"
              style={{
                borderRight:
                  i % 2 === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                borderBottom:
                  i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "rgba(139,92,246,0.07)",
                  border: "1px solid rgba(139,92,246,0.12)",
                }}
              >
                <item.icon className="w-3.5 h-3.5 text-violet-400/60" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest">
                  {item.label}
                </p>
                {item.link ? (
                  <a
                    href={`https://${item.link}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-violet-400 hover:underline truncate block mt-0.5"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-xs text-white/70 mt-0.5 truncate">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        {company.description && (
          <div className="p-6">
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2">
              About
            </p>
            <p className="text-sm text-white/55 leading-relaxed">
              {company.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
