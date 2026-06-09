import { getSession } from "@/lib/auth-session";
import { redirect } from "next/navigation";
import { getJobById } from "@/lib/api/jobs";
import { getAllCompanies } from "@/lib/api/company";
import { getUserPlan } from "@/lib/api/applications";
import ApplyForm from "./ApplyForm";
import Link from "next/link";
import { ShieldExclamation, CircleInfo, Rocket } from "@gravity-ui/icons";

export default async function ApplyPage({ params }) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

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
          <ShieldExclamation className="w-8 h-8 text-amber-500" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white mb-2">
            Recruiters Cannot Apply
          </h2>
          <p className="text-sm text-white/40">
            You are logged in as a{" "}
            <span className="text-amber-400 font-semibold">Recruiter</span>.
            Only job seekers can apply for positions.
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

  const [job, companies, planInfo] = await Promise.all([
    getJobById(id).catch(() => null),
    getAllCompanies(),
    getUserPlan(session.user.id),
  ]);

  const companyId = job?.companyId?.$oid || job?.companyId;
  const company = companies.find((c) => (c._id?.$oid || c._id) === companyId);

  const monthlyCount = planInfo?.monthlyCount ?? 0;
  const maxApplications = planInfo?.maxApplicationsPerMonth ?? 3;
  const planName = planInfo?.name ?? "Free Tier";
  const hasReachedLimit = planInfo?.hasReachedLimit ?? false;
  const usagePercentage = Math.min((monthlyCount / maxApplications) * 100, 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-6">
      {/* ── Quota Card ── */}
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Monthly Quota
            </p>
            <h2 className="text-base font-bold text-white">
              Applied to{" "}
              <span
                className={hasReachedLimit ? "text-red-400" : "text-violet-400"}
              >
                {monthlyCount}
              </span>{" "}
              / {maxApplications} positions
            </h2>
          </div>
          <span
            className="text-[11px] font-semibold px-3 py-1 rounded-full shrink-0"
            style={{
              backgroundColor: "rgba(139,92,246,0.08)",
              color: "rgba(167,139,250,0.9)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            {planName}
          </span>
        </div>

        {/* Progress Bar */}
        <div
          className="w-full h-2 rounded-full overflow-hidden mb-4"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${usagePercentage}%`,
              background: hasReachedLimit
                ? "linear-gradient(90deg, #f87171, #ef4444)"
                : "linear-gradient(90deg, #a78bfa, #7c3aed)",
              boxShadow: hasReachedLimit
                ? "0 0 10px rgba(248,113,113,0.4)"
                : "0 0 10px rgba(139,92,246,0.4)",
            }}
          />
        </div>

        {/* Upsell */}
        {!hasReachedLimit && (
          <div
            className="flex items-center gap-3 p-3 rounded-xl text-sm"
            style={{
              backgroundColor: "rgba(139,92,246,0.05)",
              border: "1px solid rgba(139,92,246,0.12)",
            }}
          >
            <Rocket className="w-4 h-4 text-violet-400 shrink-0" />
            <p style={{ color: "rgba(255,255,255,0.45)" }}>
              Need more applications?{" "}
              <Link
                href="/pricing"
                className="text-violet-400 font-semibold hover:underline"
              >
                Upgrade your plan
              </Link>{" "}
              for unlimited submissions.
            </p>
          </div>
        )}
      </div>

      {/* ── Limit Reached ── */}
      {hasReachedLimit ? (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-2xl text-center gap-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.018)",
            border: "1px dashed rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(248,113,113,0.12), rgba(248,113,113,0.05))",
              border: "1px solid rgba(248,113,113,0.2)",
            }}
          >
            <CircleInfo className="w-7 h-7 text-red-400" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">
              Application Limit Reached
            </h4>
            <p className="text-sm text-white/35 max-w-xs">
              You have used all {maxApplications} applications for this month on
              the {planName} plan.
            </p>
          </div>
          <Link
            href="/plans"
            className="px-6 h-10 rounded-xl text-sm font-bold text-white flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
            }}
          >
            Upgrade Plan →
          </Link>
        </div>
      ) : (
        <ApplyForm
          job={job}
          jobId={id}
          company={company}
          userId={session.user.id}
          userName={session.user.name}
          userEmail={session.user.email}
        />
      )}
    </div>
  );
}
