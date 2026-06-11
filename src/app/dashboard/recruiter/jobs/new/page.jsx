import React from "react";
import NewRecruiterJob from "./NewRecruiterJob";
import { getSession } from "@/lib/auth-session";
import { getRecruiterCompany } from "@/lib/api/company";
import Link from "next/link";
import { ShieldExclamation, Clock } from "@gravity-ui/icons";
import { redirect } from "next/navigation";

const NewJobPage = async () => {
  const session = await getSession();
  const userId = session?.user?.id;

  const company = await getRecruiterCompany(userId);

  // No company
  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center gap-5 px-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          <ShieldExclamation className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white mb-2">
            No Company Registered
          </h2>
          <p className="text-sm text-white/40 leading-relaxed">
            You need to register a company before posting jobs.
          </p>
        </div>
        <Link
          href="/dashboard/recruiter/company/register"
          className="px-6 h-10 rounded-xl text-sm font-bold text-white flex items-center"
          style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed)" }}
        >
          Register Company →
        </Link>
      </div>
    );
  }

  // Pending or rejected
  if (company.status !== "approved") {
    const isPending = company.status === "pending";
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center gap-5 px-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: isPending
              ? "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))"
              : "linear-gradient(135deg, rgba(248,113,113,0.15), rgba(248,113,113,0.05))",
            border: isPending
              ? "1px solid rgba(245,158,11,0.2)"
              : "1px solid rgba(248,113,113,0.2)",
          }}
        >
          <Clock
            className="w-8 h-8"
            style={{ color: isPending ? "#f59e0b" : "#f87171" }}
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white mb-2">
            {isPending ? "Awaiting Admin Approval" : "Company Rejected"}
          </h2>
          <p className="text-sm text-white/40 leading-relaxed">
            {isPending
              ? "Your company is under review. You can post jobs once an admin approves your profile."
              : "Your company was rejected. Please update your details and resubmit."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/recruiter/company"
            className="px-5 h-9 rounded-xl text-sm flex items-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            View Company
          </Link>
          {!isPending && (
            <Link
              href={`/dashboard/recruiter/company/register?edit=true&id=${company._id}`}
              className="px-5 h-9 rounded-xl text-sm font-bold text-white flex items-center"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              }}
            >
              Resubmit →
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Approved — show form
  const companyId = company?._id?.toString() ?? company?._id ?? null;

  return (
    <div>
      <NewRecruiterJob userId={userId} companyId={companyId} />
    </div>
  );
};

export default NewJobPage;
