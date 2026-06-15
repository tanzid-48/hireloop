import { getSession } from "@/lib/auth-session";
import { Person, MapPin, Globe, Briefcase } from "@gravity-ui/icons";
import Image from "next/image";

export default async function RecruiterProfilePage() {
  const session = await getSession();
  const user = session?.user;
  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "R";

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Recruiter
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Profile
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Your public recruiter profile.
        </p>
      </div>

      {/* Profile Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="h-20 w-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.1))",
          }}
        />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-violet-400 overflow-hidden"
              style={{
                backgroundColor: "#0a0a12",
                border: "2px solid rgba(255,255,255,0.1)",
              }}
            >
              {user?.image ? (
                <Image
                width={64}
                height={64}
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <span
              className="text-[11px] font-semibold px-3 py-1 rounded-full mb-1"
              style={{
                backgroundColor: "rgba(245,158,11,0.1)",
                color: "#fbbf24",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
            >
              Recruiter
            </span>
          </div>
          <h2 className="text-lg font-bold text-white">{user?.name || "—"}</h2>
          <p
            className="text-sm mt-0.5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {user?.email}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Recruiter Account
            </div>
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <Person className="w-3.5 h-3.5" />
              {user?.plan || "recruiter_free"}
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div
        className="flex flex-col items-center justify-center py-12 rounded-2xl text-center gap-3"
        style={{
          backgroundColor: "rgba(255,255,255,0.018)",
          border: "1px dashed rgba(255,255,255,0.08)",
        }}
      >
        <p className="text-sm text-white/40">
          Full profile editing coming soon
        </p>
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
