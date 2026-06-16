import { Bell } from "@gravity-ui/icons";
import Link from "next/link";

export const metadata = {
  title: "Notifications | HireLoop",
  description:
    "Stay updated with your job search activity and application status changes.",
};

const MOCK = [
  {
    id: 1,
    type: "application",
    title: "Application Viewed",
    body: "A recruiter at TechCorp viewed your application for Senior Frontend Engineer.",
    time: "2 hours ago",
    color: "#a78bfa",
    dot: "rgba(139,92,246,0.2)",
  },
  {
    id: 2,
    type: "alert",
    title: "New Job Match",
    body: "3 new Engineering jobs match your profile. Don't miss out!",
    time: "5 hours ago",
    color: "#60a5fa",
    dot: "rgba(59,130,246,0.2)",
  },
  {
    id: 3,
    type: "plan",
    title: "Monthly Quota Refreshed",
    body: "Your application quota has been reset for this month. You have 3 applications left.",
    time: "1 day ago",
    color: "#34d399",
    dot: "rgba(52,211,153,0.2)",
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
            Seeker
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            Notifications
          </h1>
          <p className="text-sm text-white/30 mt-1">
            Stay updated with your job search activity.
          </p>
        </div>
        <span
          className="text-[11px] font-semibold px-3 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(139,92,246,0.08)",
            color: "#a78bfa",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          {MOCK.length} new
        </span>
      </div>

      {/* Notification List */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {MOCK.map((n, i) => (
          <div
            key={n.id}
            className="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
            style={{
              borderBottom:
                i < MOCK.length - 1
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{
                backgroundColor: n.dot,
                border: `1px solid ${n.color}30`,
              }}
            >
              <Bell className="w-4 h-4" style={{ color: n.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{n.title}</p>
              <p
                className="text-xs mt-0.5 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {n.body}
              </p>
              <p
                className="text-[10px] mt-1.5"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {n.time}
              </p>
            </div>
            <div
              className="w-2 h-2 rounded-full shrink-0 mt-2"
              style={{ backgroundColor: n.color }}
            />
          </div>
        ))}
      </div>

      {/* Coming Soon note */}
      <div
        className="flex items-center gap-3 p-4 rounded-2xl"
        style={{
          backgroundColor: "rgba(245,158,11,0.05)",
          border: "1px solid rgba(245,158,11,0.12)",
        }}
      >
        <span className="text-base">⚡</span>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          Real-time notifications are coming soon. Currently showing sample
          notifications.
        </p>
      </div>
    </div>
  );
}
