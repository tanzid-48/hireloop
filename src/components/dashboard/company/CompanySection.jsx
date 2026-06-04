"use client";
import React from "react";
import Link from "next/link";
import { OfficeBadge } from "@gravity-ui/icons";
import CompanyCard from "./CompanyCard";

export default function CompanySection({ company }) {
  if (!company) {
    return (
      <div
        className="flex  flex-col items-center justify-center py-24 rounded-2xl text-center"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px dashed rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          <OfficeBadge className="w-7 h-7 text-violet-400/70" />
        </div>
        <h3 className="text-base font-bold text-white/80 mb-1">
          No company registered yet
        </h3>
        <p className="text-sm text-white/30 max-w-xs mb-6 leading-relaxed">
          Register your company to start posting jobs and attracting top talent
          on HireLop.
        </p>
        <Link
          href="/dashboard/recruiter/company/register"
          className="flex items-center gap-2 px-6 h-10 rounded-xl text-sm font-bold text-white transition-all outline-none mb-10"
          style={{
            background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
            boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
          }}
        >
          + Register Company
        </Link>
      </div>
    );
  }

  return <CompanyCard company={company} />;
}
