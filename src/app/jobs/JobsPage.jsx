"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import JobCard from "@/components/JobCard";
import { MapPin, ArrowLeft, ArrowRight } from "@gravity-ui/icons";

const ITEMS_PER_PAGE = 9;
const CATEGORIES = [
  "All",
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Operations",
  "Product",
  "Data",
  "Legal",
  "Healthcare",
];
const JOB_TYPES = [
  "All Types",
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
];
const CATEGORY_COLORS = {
  Engineering: {
    bg: "rgba(99,102,241,0.12)",
    color: "#818cf8",
    border: "rgba(99,102,241,0.25)",
  },
  Design: {
    bg: "rgba(236,72,153,0.12)",
    color: "#f472b6",
    border: "rgba(236,72,153,0.25)",
  },
  Marketing: {
    bg: "rgba(245,158,11,0.12)",
    color: "#fbbf24",
    border: "rgba(245,158,11,0.25)",
  },
  Sales: {
    bg: "rgba(16,185,129,0.12)",
    color: "#34d399",
    border: "rgba(16,185,129,0.25)",
  },
  Finance: {
    bg: "rgba(14,165,233,0.12)",
    color: "#38bdf8",
    border: "rgba(14,165,233,0.25)",
  },
  HR: {
    bg: "rgba(168,85,247,0.12)",
    color: "#c084fc",
    border: "rgba(168,85,247,0.25)",
  },
  Operations: {
    bg: "rgba(234,88,12,0.12)",
    color: "#fb923c",
    border: "rgba(234,88,12,0.25)",
  },
  Product: {
    bg: "rgba(20,184,166,0.12)",
    color: "#2dd4bf",
    border: "rgba(20,184,166,0.25)",
  },
  Data: {
    bg: "rgba(59,130,246,0.12)",
    color: "#60a5fa",
    border: "rgba(59,130,246,0.25)",
  },
  Legal: {
    bg: "rgba(107,114,128,0.12)",
    color: "#9ca3af",
    border: "rgba(107,114,128,0.25)",
  },
  Healthcare: {
    bg: "rgba(239,68,68,0.1)",
    color: "#f87171",
    border: "rgba(239,68,68,0.2)",
  },
};

const CustomDropdown = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all outline-none"
        style={{
          backgroundColor: "rgba(255,255,255,0.03)",
          border: open
            ? "1px solid rgba(139,92,246,0.5)"
            : "1px solid rgba(255,255,255,0.08)",
          color:
            value !== placeholder
              ? "rgba(167,139,250,0.9)"
              : "rgba(255,255,255,0.4)",
          minWidth: "140px",
        }}
      >
        <span className="flex-1 text-left">{value || placeholder}</span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div
          className="absolute top-full right-0 mt-1.5 w-48 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50"
          style={{
            backgroundColor: "#13131f",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="py-1.5 max-h-64 overflow-y-auto"
            style={{ backgroundColor: "#13131f" }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                style={{
                  backgroundColor:
                    value === opt ? "rgba(139,92,246,0.08)" : "transparent",
                }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${value === opt ? "text-violet-400" : "text-white/60 hover:text-white hover:bg-white/[0.04]"}`}
              >
                {opt}
                {value === opt && (
                  <span className="text-violet-400 text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function JobsPage({ jobs, companyMap }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [jobType, setJobType] = useState("All Types");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...jobs];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title?.toLowerCase().includes(q) ||
          j.category?.toLowerCase().includes(q) ||
          j.city?.toLowerCase().includes(q) ||
          companyMap?.[j.companyId]?.name?.toLowerCase().includes(q),
      );
    }
    if (activeCategory !== "All")
      list = list.filter((j) => j.category === activeCategory);
    if (jobType !== "All Types") {
      if (jobType === "Remote") list = list.filter((j) => j.isRemote === true);
      else list = list.filter((j) => j.jobType === jobType);
    }
    if (sort === "newest")
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sort === "salary")
      list.sort((a, b) => Number(b.salaryMax || 0) - Number(a.salaryMax || 0));
    return list;
  }, [jobs, search, activeCategory, jobType, sort, companyMap]);

  // pagination reset
  const resetPage = () => setPage(1);
  const total = filtered.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const pageNumbers = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (page >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-6">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Explore
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Browse Jobs
        </h1>
        <p className="text-sm text-white/30 mt-1">
          {total} job{total !== 1 ? "s" : ""} found
          {total > 0 && ` · Page ${page} of ${totalPages}`}
        </p>
      </div>

      {/* Search + Type + Sort */}
      <div className="flex items-center gap-3 flex-wrap">
        <div
          className="flex items-center gap-3 flex-1 min-w-[200px] px-4 py-2.5 rounded-xl"
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <circle
              cx="7"
              cy="7"
              r="5"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.3"
            />
            <path
              d="M11 11l3 3"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search jobs, skills, company…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetPage();
            }}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none"
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                resetPage();
              }}
              className="text-white/20 hover:text-white/50 transition-colors text-xs"
            >
              ✕
            </button>
          )}
        </div>
        <CustomDropdown
          value={jobType}
          onChange={(v) => {
            setJobType(v);
            resetPage();
          }}
          options={JOB_TYPES}
          placeholder="All Types"
        />
        <div
          className="flex items-center gap-1 p-1 rounded-xl"
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {[
            { key: "newest", label: "Newest" },
            { key: "salary", label: "Top Salary" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                setSort(opt.key);
                resetPage();
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={
                sort === opt.key
                  ? {
                      backgroundColor: "rgba(139,92,246,0.2)",
                      color: "#a78bfa",
                      border: "1px solid rgba(139,92,246,0.25)",
                    }
                  : {
                      color: "rgba(255,255,255,0.3)",
                      border: "1px solid transparent",
                    }
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const color = CATEGORY_COLORS[cat];
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                resetPage();
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={
                isActive && cat === "All"
                  ? {
                      backgroundColor: "rgba(139,92,246,0.15)",
                      color: "#a78bfa",
                      border: "1px solid rgba(139,92,246,0.25)",
                    }
                  : isActive && color
                    ? {
                        backgroundColor: color.bg,
                        color: color.color,
                        border: `1px solid ${color.border}`,
                      }
                    : {
                        backgroundColor: "rgba(255,255,255,0.02)",
                        color: "rgba(255,255,255,0.3)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 rounded-2xl text-center gap-3"
          style={{
            backgroundColor: "rgba(255,255,255,0.018)",
            border: "1px dashed rgba(255,255,255,0.1)",
          }}
        >
          <MapPin className="w-8 h-8 text-white/15" />
          <p className="text-sm font-semibold text-white/50">No jobs found</p>
          <p className="text-xs text-white/25">
            Try a different search or category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map((job) => (
            <JobCard
              key={job._id?.$oid || job._id}
              job={job}
              company={companyMap?.[job.companyId]}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p
            className="text-xs order-2 sm:order-1"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Showing{" "}
            <strong className="text-white/60">
              {start + 1}–{Math.min(start + ITEMS_PER_PAGE, total)}
            </strong>{" "}
            of <strong className="text-white/60">{total}</strong> jobs
          </p>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-20"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            {pageNumbers().map((p, i) =>
              p === "..." ? (
                <span
                  key={`dots-${i}`}
                  className="w-8 h-8 flex items-center justify-center text-xs"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all"
                  style={
                    p === page
                      ? {
                          background:
                            "linear-gradient(135deg, #a78bfa, #7c3aed)",
                          color: "#fff",
                        }
                      : {
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.4)",
                        }
                  }
                >
                  {p}
                </button>
              ),
            )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-20"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
