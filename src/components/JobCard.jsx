"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  MapPin,
  Calendar,
  PersonWorker,
  Bookmark,
  Briefcase,
} from "@gravity-ui/icons";
import { saveJob, unsaveJob } from "@/lib/action/savedJobs";

const formatSalary = (min, max, currency) => {
  if (!min && !max) return null;
  const fmt = (n) => `$${Number(n).toLocaleString()}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max)}`;
};

const formatDeadline = (date) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const CATEGORY_COLORS = {
  Engineering: {
    bg: "rgba(99,102,241,0.1)",
    color: "#818cf8",
    border: "rgba(99,102,241,0.2)",
  },
  Design: {
    bg: "rgba(236,72,153,0.1)",
    color: "#f472b6",
    border: "rgba(236,72,153,0.2)",
  },
  Marketing: {
    bg: "rgba(245,158,11,0.1)",
    color: "#fbbf24",
    border: "rgba(245,158,11,0.2)",
  },
  Sales: {
    bg: "rgba(16,185,129,0.1)",
    color: "#34d399",
    border: "rgba(16,185,129,0.2)",
  },
  Finance: {
    bg: "rgba(14,165,233,0.1)",
    color: "#38bdf8",
    border: "rgba(14,165,233,0.2)",
  },
  HR: {
    bg: "rgba(168,85,247,0.1)",
    color: "#c084fc",
    border: "rgba(168,85,247,0.2)",
  },
  Operations: {
    bg: "rgba(234,88,12,0.1)",
    color: "#fb923c",
    border: "rgba(234,88,12,0.2)",
  },
  Product: {
    bg: "rgba(20,184,166,0.1)",
    color: "#2dd4bf",
    border: "rgba(20,184,166,0.2)",
  },
  Data: {
    bg: "rgba(59,130,246,0.1)",
    color: "#60a5fa",
    border: "rgba(59,130,246,0.2)",
  },
  Legal: {
    bg: "rgba(107,114,128,0.1)",
    color: "#9ca3af",
    border: "rgba(107,114,128,0.2)",
  },
  Other: {
    bg: "rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.4)",
    border: "rgba(255,255,255,0.1)",
  },
  Healthcare: {
    bg: "rgba(239,68,68,0.1)",
    color: "#f87171",
    border: "rgba(239,68,68,0.2)",
  },
};

export default function JobCard({
  job,
  company,
  userId,
  isSavedInitially = false,
}) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(isSavedInitially);
  const [saving, setSaving] = useState(false);

  const id = job._id?.$oid || job._id;
  const salary = formatSalary(job.salaryMin, job.salaryMax, job.currency);
  const deadline = formatDeadline(job.deadline);
  const catColor = CATEGORY_COLORS[job.category] || CATEGORY_COLORS.Other;
  const logo = company?.logo || job.logo;
  const companyName = company?.name || "Company";

  const handleBookmark = async () => {
    if (!userId) {
      toast.error("Please sign in to save jobs");
      router.push("/signin?redirect=/jobs");
      return;
    }
    if (saving) return;
    setSaving(true);
    try {
      if (isSaved) {
        const res = await unsaveJob(id);
        if (res?.success) {
          setIsSaved(false);
          toast.success("Removed from saved jobs");
        } else toast.error("Failed to remove");
      } else {
        const res = await saveJob(id);
        if (res?.success) {
          setIsSaved(true);
          toast.success("Job saved!");
        } else toast.error("Failed to save");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="group flex flex-col rounded-2xl p-5 gap-4 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden shrink-0"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {logo ? (
              <Image
                src={logo}
                alt={companyName}
                width={64}
                height={64}
                className="w-full h-full object-contain p-1.5"
              />
            ) : (
              <span className="text-2xl font-bold text-violet-400 uppercase">
                {job.title?.[0] || "J"}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p
              className="text-xs font-medium truncate"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {companyName}
            </p>
            <p className="text-sm font-semibold text-white mt-0.5 leading-snug line-clamp-2">
              {job.title}
            </p>
          </div>
        </div>

        {/* Bookmark — now functional */}
        <button
          onClick={handleBookmark}
          disabled={saving}
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all outline-none disabled:opacity-50"
          style={
            isSaved
              ? {
                  color: "#a78bfa",
                  backgroundColor: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.3)",
                }
              : {
                  color: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }
          }
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
          style={{
            backgroundColor: catColor.bg,
            color: catColor.color,
            border: `1px solid ${catColor.border}`,
          }}
        >
          {job.category}
        </span>
        <span
          className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
          style={{
            backgroundColor: "rgba(139,92,246,0.08)",
            color: "rgba(167,139,250,0.85)",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          {job.jobType}
        </span>
        {job.isRemote && (
          <span
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
            style={{
              backgroundColor: "rgba(52,211,153,0.08)",
              color: "#34d399",
              border: "1px solid rgba(52,211,153,0.15)",
            }}
          >
            🌐 Remote
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {!job.isRemote && job.city && (
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <MapPin
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: "rgba(255,255,255,0.2)" }}
            />
            {job.city}
          </div>
        )}
        {salary && (
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <PersonWorker
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: "rgba(255,255,255,0.2)" }}
            />
            {salary} {job.currency}
          </div>
        )}
        {job.employeeRange && (
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <Briefcase
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: "rgba(255,255,255,0.2)" }}
            />
            {job.employeeRange}
          </div>
        )}
        {deadline && (
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <Calendar
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: "rgba(255,255,255,0.2)" }}
            />
            Deadline: {deadline}
          </div>
        )}
      </div>

      <div
        style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }}
      />

      <Link
        href={`/jobs/${id}`}
        className="w-full flex items-center justify-center h-9 rounded-xl text-sm font-semibold text-white transition-all outline-none hover:opacity-90"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.7), rgba(124,58,237,0.9))",
          border: "1px solid rgba(139,92,246,0.3)",
        }}
      >
        Browse job →
      </Link>
    </div>
  );
}
