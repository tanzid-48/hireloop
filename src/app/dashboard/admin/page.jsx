import { getSession } from "@/lib/auth-session";
import {
  ArrowUpRightFromSquare,
  Briefcase,
  CreditCard,
  Factory,
  Person,
} from "@gravity-ui/icons";

const StatCard = ({ label, value, icon: Icon, color, trend }) => (
  <div
    className="flex flex-col gap-2 p-5 rounded-2xl"
    style={{
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.07)",
    }}
  >
    <div className="flex justify-between items-start">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          backgroundColor: `${color}15`,
          border: `1px solid ${color}25`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
        {trend}
      </span>
    </div>
    <div>
      <p className="text-2xl font-bold text-white mt-2">{value}</p>
      <p className="text-xs text-white/40">{label}</p>
    </div>
  </div>
);

export default async function AdminDashboardPage() {
  const session = await getSession();
  const name = session?.user?.name || "Admin";

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* ── Welcome Section ── */}
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-emerald-400/70">
          Admin Panel
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Welcome back, {name.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Manage platform users, companies, and monitor growth metrics.
        </p>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard
          label="Total Users"
          value="124,892"
          icon={Person}
          color="#a78bfa"
          trend="+12%"
        />
        <StatCard
          label="Total Recruiters"
          value="12,405"
          icon={Briefcase}
          color="#60a5fa"
          trend="+8%"
        />
        <StatCard
          label="Total Companies"
          value="4,281"
          icon={Factory}
          color="#fbbf24"
          trend="-0%"
        />
        <StatCard
          label="Jobs Posted"
          value="8,920"
          icon={ArrowUpRightFromSquare}
          color="#34d399"
          trend="+24%"
        />
        <StatCard
          label="Platform Revenue"
          value="$245,800"
          icon={CreditCard}
          color="#f472b6"
          trend="+18.5%"
        />
      </div>

      {/* ── Charts Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="p-6 rounded-2xl"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h3 className="text-white font-bold mb-4">Job Posts by Category</h3>
          <div className="h-48 flex items-center justify-center text-white/20 border-dashed border border-white/10 rounded-xl">
            Chart Placeholder
          </div>
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h3 className="text-white font-bold mb-4">New Users (30d)</h3>
          <div className="h-48 flex items-center justify-center text-white/20 border-dashed border border-white/10 rounded-xl">
            Graph Placeholder
          </div>
        </div>
      </div>

      {/* ── Transactions Section ── */}
      <div
        className="p-6 rounded-2xl"
        style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <h3 className="text-white font-bold mb-4">
          Recent Subscription Transactions
        </h3>
        <div className="w-full text-sm text-white/60">
          <div className="flex justify-between py-2 border-b border-white/5">
            <span>User/Recruiter</span>
            <span>Plan</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/5">
            <span>Marcus K.</span>
            <span>Enterprise Monthly</span>
            <span>$1,299.00</span>
            <span className="text-emerald-400">Success</span>
          </div>
        </div>
      </div>
    </div>
  );
}
