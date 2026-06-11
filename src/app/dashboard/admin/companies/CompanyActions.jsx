"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateCompanyStatus } from "@/lib/api/company";

export default function CompanyActions({ companyId, currentStatus }) {
  const router = useRouter();
  const [loading, setLoading] = useState(null);

  const handleStatus = async (status) => {
    setLoading(status);
    try {
      const result = await updateCompanyStatus(companyId, status);
      if (result) {
        toast.success(`Company ${status} successfully`);
        router.refresh();
      } else {
        toast.error("Failed to update status");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {currentStatus !== "approved" && (
        <button
          onClick={() => handleStatus("approved")}
          disabled={!!loading}
          className="px-3 h-7 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
          style={{
            backgroundColor: "rgba(52,211,153,0.1)",
            color: "#34d399",
            border: "1px solid rgba(52,211,153,0.25)",
          }}
        >
          {loading === "approved" ? "..." : "Approve"}
        </button>
      )}
      {currentStatus !== "rejected" && (
        <button
          onClick={() => handleStatus("rejected")}
          disabled={!!loading}
          className="px-3 h-7 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
          style={{
            backgroundColor: "rgba(248,113,113,0.1)",
            color: "#f87171",
            border: "1px solid rgba(248,113,113,0.25)",
          }}
        >
          {loading === "rejected" ? "..." : "Reject"}
        </button>
      )}
    </div>
  );
}
