"use client";
import React, { useState } from "react";
import { Table, Chip } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { deleteJob } from "@/lib/action/jobs";
import { toast } from "sonner";

const statusConfig = {
  active: { color: "success", label: "Active" },
  inactive: { color: "default", label: "Inactive" },
  closed: { color: "danger", label: "Closed" },
  draft: { color: "warning", label: "Draft" },
};

const ActionBtn = ({ onClick, children, variant = "default" }) => {
  const colors = {
    default: "text-white/30 hover:text-white/70 hover:bg-white/[0.06]",
    danger: "text-white/30 hover:text-red-400 hover:bg-red-400/[0.08]",
    primary: "text-white/30 hover:text-violet-400 hover:bg-violet-400/[0.08]",
  };
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all outline-none ${colors[variant]}`}
    >
      {children}
    </button>
  );
};

export default function JobsTable({ jobs = [] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    setDeletingId(id);
    try {
      const result = await deleteJob(id); 
      if (result) {
        toast.success("Job deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete job");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  const formatSalary = (min, max, currency) => {
    if (!min && !max) return "—";
    const fmt = (n) => Number(n).toLocaleString();
    if (min && max) return `${fmt(min)} – ${fmt(max)} ${currency}`;
    if (min) return `From ${fmt(min)} ${currency}`;
    return `Up to ${fmt(max)} ${currency}`;
  };

  if (jobs.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 rounded-2xl"
        style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
          style={{
            backgroundColor: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-violet-400"
          >
            <rect
              x="3"
              y="7"
              width="18"
              height="13"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <p className="text-sm font-semibold text-white/50">
          No jobs posted yet
        </p>
        <p className="text-xs text-white/25 mt-1">
          Create your first listing to get started
        </p>
      </div>
    );
  }

  return (
    <Table>
      <Table.ResizableContainer>
        <Table.Content
          aria-label="Company jobs table"
          className="min-w-[700px]"
          style={{ backgroundColor: "transparent" }}
        >
          <Table.Header>
            <Table.Column
              isRowHeader
              defaultWidth="2fr"
              id="title"
              minWidth={200}
            >
              Job Title
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="type" minWidth={120}>
              Type
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1.5fr" id="salary" minWidth={180}>
              Salary
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="deadline" minWidth={130}>
              Deadline
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="100px" id="status" minWidth={100}>
              Status
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="120px" id="actions" minWidth={120}>
              Actions
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {jobs.map((job) => {
              const id = job._id?.$oid || job._id;
              const status = statusConfig[job.status] || statusConfig.active;
              const isDeleting = deletingId === id;

              return (
                <Table.Row key={id} className={isDeleting ? "opacity-50" : ""}>
                  {/* Job Title */}
                  <Table.Cell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-white leading-snug">
                        {job.title}
                      </span>
                      <span className="text-xs text-white/35 capitalize">
                        {job.isRemote ? "🌐 Remote" : `📍 ${job.city || "—"}`}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Type */}
                  <Table.Cell>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-lg capitalize"
                      style={{
                        backgroundColor: "rgba(139,92,246,0.08)",
                        color: "rgba(167,139,250,0.9)",
                        border: "1px solid rgba(139,92,246,0.15)",
                      }}
                    >
                      {job.jobType?.replace("-", " ") || "—"}
                    </span>
                  </Table.Cell>

                  {/* Salary */}
                  <Table.Cell>
                    <span className="text-sm text-white/60 font-mono">
                      {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                    </span>
                  </Table.Cell>

                  {/* Deadline */}
                  <Table.Cell>
                    <span className="text-sm text-white/50">
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </span>
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell>
                    <Chip color={status.color} size="sm" variant="soft">
                      {status.label}
                    </Chip>
                  </Table.Cell>

                  {/* Actions */}
                  <Table.Cell>
                    <div className="flex items-center gap-1">
                      <ActionBtn
                        variant="primary"
                        onClick={() =>
                          router.push(`/dashboard/recruiter/jobs/${id}`)
                        }
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </ActionBtn>
                      <ActionBtn
                        variant="default"
                        onClick={() =>
                          router.push(`/dashboard/recruiter/jobs/${id}/edit`)
                        }
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </ActionBtn>
                      <ActionBtn
                        variant="danger"
                        onClick={() => handleDelete(id)}
                      >
                        <TrashBin className="w-3.5 h-3.5" />
                      </ActionBtn>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ResizableContainer>
    </Table>
  );
}
