import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { ArrowRight, CircleCheckFill, Sparkles } from "@gravity-ui/icons";
import Link from "next/link";
import { getSession } from "@/lib/auth-session";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) throw new Error("Invalid session");

  const stripeSession = await stripe.checkout.sessions.retrieve(session_id);

  const { status, customer_details } = stripeSession;

  if (status === "open") return redirect("/");

  const sessionData = await getSession();

  const user = sessionData?.user;

  return (
    <div className="min-h-screen bg-[#09090b] text-white relative overflow-hidden flex items-center justify-center px-6 py-16">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[-120px] left-[-120px] w-[380px] h-[380px] bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[380px] h-[380px] bg-violet-500/20 blur-[120px] rounded-full" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-10 shadow-[0_0_80px_rgba(0,0,0,0.45)]">
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300">
            <Sparkles size={14} />
            Payment Successful
          </div>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/30 blur-3xl rounded-full" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/10">
              <CircleCheckFill size={58} className="text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight mb-3">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Pro
            </span>
          </h1>

          <p className="text-sm leading-relaxed text-white/55 max-w-sm mx-auto">
            Your subscription is now active. Enjoy premium tools, unlimited
            access, and advanced features instantly.
          </p>
        </div>

        {/* User Info */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-1">
                Account
              </p>

              <p className="text-sm font-semibold text-white">
                {user?.name || "Premium User"}
              </p>

              <p className="text-xs text-white/45 mt-1">
                {customer_details?.email}
              </p>
            </div>

            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold">
              PRO
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="group flex items-center justify-center gap-2 w-full rounded-2xl bg-white py-4 text-sm font-bold text-black transition-all hover:scale-[1.01] hover:bg-white/90 active:scale-[0.98]"
        >
          Go to Dashboard
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>

        {/* Footer */}
        <p className="text-center text-[11px] text-white/25 mt-6">
          Thank you for choosing our platform.
        </p>
      </div>
    </div>
  );
}
