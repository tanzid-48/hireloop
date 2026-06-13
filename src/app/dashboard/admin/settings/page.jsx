import { Gear, CreditCard } from "@gravity-ui/icons";

export default function AdminSettingsPage() {
  const sections = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M3 9h18M9 21V9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Platform",
      color: "#a78bfa",
      items: [
        { label: "Site Name", value: "HireLoop" },
        { label: "Support Email", value: "support@hireloop.com" },
        { label: "Max Jobs/Recruiter", value: "50" },
        { label: "Company Approval", value: "Manual Review" },
      ],
    },
    {
      icon: <CreditCard className="w-4.5 h-4.5" />,
      title: "Subscription Plans",
      color: "#60a5fa",
      items: [
        { label: "Free Tier", value: "3 apps/month" },
        { label: "Pro Plan", value: "30 apps/month" },
        { label: "Premium", value: "Unlimited" },
        { label: "Stripe", value: "Connected ✓" },
      ],
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 8v4l3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Recruiter Plans",
      color: "#fbbf24",
      items: [
        { label: "Free", value: "3 job posts" },
        { label: "Growth", value: "10 job posts" },
        { label: "Enterprise", value: "50 job posts" },
        { label: "Billing", value: "Monthly" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div>
        <span className="text-[10px] font-bold tracking-[3px] uppercase text-violet-400/70">
          Admin
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5 flex items-center gap-2">
          <Gear className="w-6 h-6 text-violet-400" /> System Settings
        </h1>
        <p className="text-sm text-white/30 mt-1">
          Global platform configurations and business logic rules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                backgroundColor: "rgba(255,255,255,0.01)",
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${section.color}15`,
                  border: `1px solid ${section.color}25`,
                  color: section.color,
                }}
              >
                {section.icon}
              </div>
              <p className="text-sm font-bold text-white">{section.title}</p>
            </div>
            <div className="flex flex-col">
              {section.items.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-5 py-3"
                  style={{
                    borderBottom:
                      i === section.items.length - 1
                        ? "none"
                        : "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span className="text-sm text-white/50">{item.label}</span>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div
        className="flex items-center gap-3 p-4 rounded-2xl"
        style={{
          backgroundColor: "rgba(139,92,246,0.05)",
          border: "1px solid rgba(139,92,246,0.12)",
        }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{
            backgroundColor: "rgba(139,92,246,0.1)",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#a78bfa" strokeWidth="1.5" />
            <path
              d="M12 8v4M12 16h.01"
              stroke="#a78bfa"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          Settings are currently static. Dynamic configuration panel coming
          soon.
        </p>
      </div>
    </div>
  );
}
