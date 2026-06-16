import { getSession } from "@/lib/auth-session";
import SidebarNavLinks from "./SidebarNavLinks";

export default async function DashboardSidebar() {
  const session = await getSession();
  const role = session?.user?.role || "seeker";
  const name = session?.user?.name || "User";

  const roleLabel =
    {
      recruiter: "Recruiter Panel",
      admin: "Admin Panel",
      seeker: "Seeker Panel",
    }[role] || "Seeker Panel";

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden md:flex flex-col p-4 min-h-screen shrink-0"
        style={{
          width: "240px",
          minWidth: "240px",
          backgroundColor: "#0a0a12",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Role Badge */}
        <div
          className="mb-4 px-3 py-2.5 rounded-xl"
          style={{
            backgroundColor: "rgba(139,92,246,0.06)",
            border: "1px solid rgba(139,92,246,0.12)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            {roleLabel}
          </p>
          <p
            className="text-xs font-semibold mt-0.5 truncate"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {name}
          </p>
        </div>

        <SidebarNavLinks role={role} />
      </aside>

      {/* ── Mobile Top Nav ── */}
      <div
        className="md:hidden fixed top-16 left-0 right-0 z-40 overflow-x-auto scrollbar-none"
        style={{
          backgroundColor: "#0a0a12",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <SidebarNavLinks role={role} mobile />
      </div>
    </>
  );
}
