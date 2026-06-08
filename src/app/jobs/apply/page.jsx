import { getSession } from "@/lib/auth-session";
import { redirect } from "next/navigation";
import { getJobById } from "@/lib/api/jobs";
import Link from "next/link";

export default async function ApplyPage({ params }) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  // role check — recruiter apply
  if (session.user?.role !== "seeker") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center gap-5 px-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white mb-2">
            Recruiters Can not Apply
          </h2>
          <p className="text-sm text-white/40 leading-relaxed">
            You are logged in as a{" "}
            <span className="text-amber-400 font-semibold">Recruiter</span>.
            Only job seekers can apply for positions. Switch to a seeker account
            to apply.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/jobs"
            className="px-5 h-10 rounded-xl text-sm text-white/40 flex items-center transition-colors hover:text-white/60"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            Browse Jobs
          </Link>
          <Link
            href="/dashboard/recruiter"
            className="px-5 h-10 rounded-xl text-sm font-bold text-white flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
            }}
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const job = await getJobById(id).catch(() => null);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-2">
        Apply for {job?.title}
      </h1>
      <p className="text-sm text-white/40 mb-8">
        Complete the form below to submit your application.
      </p>
      {/* application form */}
    </div>
  );
}
