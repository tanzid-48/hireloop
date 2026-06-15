import Link from "next/link";
import { ArrowLeft } from "@gravity-ui/icons";

export default function ForbiddenPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6 relative overflow-hidden"
      style={{ backgroundColor: "#08080f" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245,158,11,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-7 max-w-sm w-full">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))",
            border: "1px solid rgba(245,158,11,0.25)",
            boxShadow: "0 0 40px rgba(245,158,11,0.08)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8v4M12 16h.01"
              stroke="#fbbf24"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            <span
              className="text-7xl font-black leading-none"
              style={{
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              4
            </span>
            <span
              className="text-7xl font-black leading-none"
              style={{ color: "rgba(255,255,255,0.12)" }}
            >
              0
            </span>
            <span
              className="text-7xl font-black leading-none"
              style={{
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              3
            </span>
          </div>
          <h1 className="text-xl font-bold text-white">Access Forbidden</h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            You do not have permission to perform this action. This resource
            requires elevated privileges.
          </p>
        </div>

        <div
          className="w-full flex items-center gap-3 p-4 rounded-2xl text-left"
          style={{
            backgroundColor: "rgba(245,158,11,0.05)",
            border: "1px solid rgba(245,158,11,0.12)",
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#fbbf24"
                strokeWidth="1.5"
              />
              <path
                d="M12 8v4M12 16h.01"
                stroke="#fbbf24"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Your role does not have access to this resource. Contact an admin if
            you think this is a mistake.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-medium transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Go Home
          </Link>
          <Link
            href="/signin"
            className="flex-1 flex items-center justify-center h-11 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              boxShadow: "0 4px 20px rgba(245,158,11,0.25)",
            }}
          >
            Switch Account
          </Link>
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
          If you think this is a mistake, please contact support@hireloop.com
        </p>
      </div>
    </div>
  );
}
