"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Bookmark, MapPin, PersonWorker } from "@gravity-ui/icons";
import { unsaveJob } from "@/lib/action/savedJobs";

const formatSalary = (min, max) => {
  if (!min && !max) return null;
  const fmt = (n) => `$${Number(n).toLocaleString()}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  return min ? `From ${fmt(min)}` : `Up to ${fmt(max)}`;
};

export default function SavedJobsList({ initialJobs }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [removingId, setRemovingId] = useState(null);

  const handleUnsave = async (jobId) => {
    setRemovingId(jobId);
    try {
      const res = await unsaveJob(jobId);
      if (res?.success) {
        setJobs((prev) => prev.filter((j) => (j._id?.$oid || j._id) !== jobId));
        toast.success("Removed from saved jobs");
      } else toast.error("Failed to remove");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
            Seeker
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            Saved Jobs
          </h1>
          <p className="text-sm text-white/30 mt-1">
            Manage and track your bookmarked opportunities.
          </p>
        </div>
        <div
          className="px-4 py-2 rounded-xl"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest">
            Total Saved
          </p>
          <p className="text-xl font-black text-white">{jobs.length}</p>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-2xl text-center gap-3"
          style={{
            backgroundColor: "rgba(255,255,255,0.018)",
            border: "1px dashed rgba(255,255,255,0.1)",
          }}
        >
          <Bookmark className="w-10 h-10 text-white/10" />
          <p className="text-sm font-semibold text-white/40">
            No saved jobs yet
          </p>
          <p className="text-xs text-white/25 max-w-xs">
            Tap the bookmark icon on any job to save it here.
          </p>
          <Link
            href="/jobs"
            className="mt-2 px-5 h-9 rounded-xl text-xs font-bold text-white flex items-center"
            style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed)" }}
          >
            Browse Jobs →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {jobs.map((job) => {
            const id = job._id?.$oid || job._id;
            const company = job.company;
            const salary = formatSalary(job.salaryMin, job.salaryMax);

            return (
              <div
                key={id}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {company?.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={44}
                        height={44}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-base font-bold text-violet-400">
                        {job.title?.[0]}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="text-sm font-semibold text-white truncate">
                        {job.title}
                      </p>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                        style={{
                          backgroundColor: "rgba(139,92,246,0.08)",
                          color: "rgba(167,139,250,0.8)",
                          border: "1px solid rgba(139,92,246,0.15)",
                        }}
                      >
                        {company?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {job.isRemote && (
                        <span className="text-xs text-emerald-400">
                          🌐 Remote
                        </span>
                      )}
                      {!job.isRemote && job.city && (
                        <span
                          className="text-xs flex items-center gap-1"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          <MapPin className="w-3 h-3" /> {job.city}
                        </span>
                      )}
                      {salary && (
                        <span
                          className="text-xs flex items-center gap-1"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          <PersonWorker className="w-3 h-3" /> {salary}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleUnsave(id)}
                    disabled={removingId === id}
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                    style={{
                      backgroundColor: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.25)",
                      color: "#a78bfa",
                    }}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href={`/jobs/${id}`}
                    className="px-4 h-8 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 hover:opacity-90 transition-all"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,0.6), rgba(124,58,237,0.8))",
                      border: "1px solid rgba(139,92,246,0.3)",
                    }}
                  >
                    Apply →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
