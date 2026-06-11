import { CreditCard, Factory, Gear } from "@gravity-ui/icons";

export default function AdminSettingsPage() {
  const sections = [
    {
      title: "Platform",
      icon: Factory,
      items: [
        { label: "Site Name", value: "HireLoop" },
        { label: "Support Email", value: "support@hireloop.com" },
        { label: "Max Jobs/Recruiter", value: "50" },
      ],
    },
    {
      title: "Subscription Plans",
      icon: CreditCard,
      items: [
        { label: "Free Tier", value: "3 apps/month" },
        { label: "Pro Plan", value: "30 apps/month" },
        { label: "Premium", value: "Unlimited" },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Gear className="w-6 h-6 text-violet-500" />
          System Settings
        </h1>
        <p className="text-white/40 text-sm mt-2">
          Global platform configurations and business logic rules.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-[#0e0e14] border border-white/10 rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <section.icon className="w-5 h-5 text-violet-400" />
              <h2 className="font-semibold text-white">{section.title}</h2>
            </div>

            <div className="space-y-4">
              {section.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm text-white/50">{item.label}</span>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/5 text-violet-300 border border-white/5">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
