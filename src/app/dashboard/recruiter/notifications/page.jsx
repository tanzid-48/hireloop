import { Bell } from "@gravity-ui/icons";

export default async function RecruiterNotificationsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Recruiter
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Notifications
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Stay updated with candidate activity.
        </p>
      </div>
      <div
        className="flex flex-col items-center justify-center py-24 rounded-2xl text-center gap-4"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px dashed rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          <Bell className="w-7 h-7 text-violet-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white/50">
            No notifications
          </p>
          <p className="text-xs text-white/25 mt-1">You have all caught up!</p>
        </div>
        <span
          className="text-[11px] px-3 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(245,158,11,0.08)",
            color: "#fbbf24",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          Coming Soon
        </span>
      </div>
    </div>
  );
}
