"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteUser, updateUserRole, updateUserStatus } from "@/lib/action/admin";


export default function UserActions({ userId, role, status }) {
  const router = useRouter();
  const [loading, setLoading] = useState(null);

  const handleRoleToggle = async () => {
    const newRole = role === "recruiter" ? "seeker" : "recruiter";
    const label = role === "recruiter" ? "Make Seeker" : "Make Recruiter";
    setLoading(label);
    try {
      const res = await updateUserRole(userId, newRole);
      if (res?.success) {
        toast.success(`User updated to ${newRole}`);
        router.refresh();
      } else {
        toast.error("Failed to update role");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  const handleStatusToggle = async () => {
    const newStatus = status === "suspended" ? "active" : "suspended";
    const label = newStatus === "active" ? "Activated" : "Suspended";
    setLoading(label);
    try {
      const res = await updateUserStatus(userId, newStatus);
      if (res?.success) {
        toast.success(`User ${label}`);
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

  const handleDelete = async () => {
    if (!confirm("Delete this user?")) return;
    setLoading("delete");
    try {
      const res = await deleteUser(userId);
      if (res?.success) {
        toast.success("User deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete user");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  const isSuspended = status === "suspended";

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {/* Role toggle */}
      {role !== "admin" && (
        <button
          onClick={handleRoleToggle}
          disabled={!!loading}
          className="px-2.5 h-6 rounded-lg text-[11px] font-semibold transition-all disabled:opacity-40"
          style={{
            backgroundColor: "rgba(96,165,250,0.08)",
            color: "#60a5fa",
            border: "1px solid rgba(96,165,250,0.2)",
          }}
        >
          {loading === "Make Seeker" || loading === "Make Recruiter"
            ? "..."
            : role === "recruiter"
              ? "Make Seeker"
              : "Make Recruiter"}
        </button>
      )}

      {/* Suspend / Activate */}
      {isSuspended ? (
        <button
          onClick={handleStatusToggle}
          disabled={!!loading}
          className="px-2.5 h-6 rounded-lg text-[11px] font-semibold transition-all disabled:opacity-40"
          style={{
            backgroundColor: "rgba(52,211,153,0.08)",
            color: "#34d399",
            border: "1px solid rgba(52,211,153,0.2)",
          }}
        >
          {loading === "Activated" ? "..." : "Activate"}
        </button>
      ) : (
        <button
          onClick={handleStatusToggle}
          disabled={!!loading}
          className="px-2.5 h-6 rounded-lg text-[11px] font-semibold transition-all disabled:opacity-40"
          style={{
            backgroundColor: "rgba(245,158,11,0.08)",
            color: "#fbbf24",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          {loading === "Suspended" ? "..." : "Suspend"}
        </button>
      )}

      {/* Delete */}
      <button
        onClick={handleDelete}
        disabled={!!loading}
        className="px-2.5 h-6 rounded-lg text-[11px] font-semibold transition-all disabled:opacity-40"
        style={{
          backgroundColor: "rgba(248,113,113,0.08)",
          color: "#f87171",
          border: "1px solid rgba(248,113,113,0.2)",
        }}
      >
        {loading === "delete" ? "..." : "Delete"}
      </button>
    </div>
  );
}
