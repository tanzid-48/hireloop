import Link from "next/link";
import { ArrowLeft } from "@gravity-ui/icons";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 relative overflow-hidden"
      style={{ backgroundColor: "#08080f" }}>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(248,113,113,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 flex flex-col items-center text-center gap-7 max-w-sm w-full">

        {/* Icon */}
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(248,113,113,0.15), rgba(248,113,113,0.05))",
            border: "1px solid rgba(248,113,113,0.25)",
            boxShadow: "0 0 40px rgba(248,113,113,0.1)",
          }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#f87171" strokeWidth="1.5"/>
            <path d="M12 8v4M12 16h.01" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>

        {/* 401 */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-7xl font-black leading-none"
              style={{ background: "linear-gradient(135deg, #f87171, #fca5a5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              4
            </span>
            <span className="text-7xl font-black leading-none"
              style={{ color: "rgba(255,255,255,0.12)" }}>
              0
            </span>
            <span className="text-7xl font-black leading-none"
              style={{ background: "linear-gradient(135deg, #f87171, #fca5a5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              1
            </span>
          </div>
          <h1 className="text-xl font-bold text-white">Unauthorized Access</h1>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
            You do not have permission to view this page.
            Please sign in with the correct account type.
          </p>
        </div>

        {/* Info Card */}
        <div className="w-full flex items-center gap-3 p-4 rounded-2xl text-left"
          style={{ backgroundColor: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.12)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="7" r="4" stroke="#f87171" strokeWidth="1.5"/>
            </svg>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            This page requires a different account role. Sign in with the correct account to continue.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full">
          <Link href="/"
            className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-medium transition-all hover:text-white/70"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}>
            <ArrowLeft className="w-3.5 h-3.5" />
            Go Home
          </Link>
          <Link href="/signin"
            className="flex-1 flex items-center justify-center h-11 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed)", boxShadow: "0 4px 20px rgba(139,92,246,0.35)" }}>
            Sign In →
          </Link>
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
          If you think this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
}