"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateCompanyStatus } from "@/lib/action/admin";

export default function CompanyActions({ companyId, currentStatus }) {
  const router = useRouter();
  const [loading, setLoading] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null); 

  const handleStatus = async (status) => {
    setShowConfirm(null);
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
    <>
      {/* Confirm Dialog */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowConfirm(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6 flex flex-col gap-4"
            style={{
              backgroundColor: "#13131f",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-white capitalize">
                {showConfirm === "approved" ? "Approve" : "Reject"} Company?
              </h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                {showConfirm === "approved"
                  ? "This company will be visible to all job seekers."
                  : "This company will be hidden from job seekers."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 h-9 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatus(showConfirm)}
                disabled={!!loading}
                className="flex-1 h-9 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
                style={
                  showConfirm === "approved"
                    ? {
                        backgroundColor: "rgba(52,211,153,0.15)",
                        border: "1px solid rgba(52,211,153,0.3)",
                        color: "#34d399",
                      }
                    : {
                        backgroundColor: "rgba(248,113,113,0.15)",
                        border: "1px solid rgba(248,113,113,0.3)",
                        color: "#f87171",
                      }
                }
              >
                {loading
                  ? "..."
                  : showConfirm === "approved"
                    ? "Approve"
                    : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons — ONE LINE */}
      <div className="flex items-center gap-1.5">
        {currentStatus !== "approved" && (
          <button
            onClick={() => setShowConfirm("approved")}
            disabled={!!loading}
            className="px-3 h-7 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 whitespace-nowrap"
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
            onClick={() => setShowConfirm("rejected")}
            disabled={!!loading}
            className="px-3 h-7 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 whitespace-nowrap"
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
    </>
  );
}
