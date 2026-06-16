"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Magnifier,
  SquarePlus,
  Briefcase,
  Envelope,
  Bell,
  Person,
  Gear,
  FileText,
  CreditCard,
  Bookmark,
  ChartBar,
} from "@gravity-ui/icons";

const NAV_MAP = {
  seeker: [
    { icon: House, href: "/dashboard/seeker", label: "Dashboard" },
    { icon: Magnifier, href: "/jobs", label: "Browse Jobs" },
    {
      icon: Bookmark,
      href: "/dashboard/seeker/saved-jobs",
      label: "Saved Jobs",
    },
    {
      icon: FileText,
      href: "/dashboard/seeker/applications",
      label: "Applications",
    },
    { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
    {
      icon: Bell,
      href: "/dashboard/seeker/notifications",
      label: "Notifications",
    },
    { icon: Person, href: "/dashboard/seeker/profile", label: "Profile" },
    { icon: Gear, href: "/dashboard/seeker/settings", label: "Settings" },
  ],
  recruiter: [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    {
      icon: SquarePlus,
      href: "/dashboard/recruiter/jobs/new",
      label: "Post A Job",
    },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    {
      icon: Envelope,
      href: "/dashboard/recruiter/messages",
      label: "Messages",
    },
    {
      icon: Bell,
      href: "/dashboard/recruiter/notifications",
      label: "Notifications",
    },
    { icon: Person, href: "/dashboard/recruiter/profile", label: "Profile" },
    { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
  ],
  admin: [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Person, href: "/dashboard/admin/users", label: "Users" },
    { icon: Briefcase, href: "/dashboard/admin/companies", label: "Companies" },
    { icon: Magnifier, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
  ],
};

// Exact match for root pages, prefix match for sub-pages
const isActive = (pathname, href) => {
  if (href === "/jobs" || href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
};

export default function SidebarNavLinks({ role, mobile = false }) {
  const pathname = usePathname();
  const items = NAV_MAP[role] || NAV_MAP.seeker;

  if (mobile) {
    return (
      <div className="flex items-center gap-1 px-3 py-2 min-w-max">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all"
              style={
                active
                  ? {
                      backgroundColor: "rgba(139,92,246,0.12)",
                      color: "#a78bfa",
                      border: "1px solid rgba(139,92,246,0.2)",
                    }
                  : { color: "rgba(255,255,255,0.4)" }
              }
            >
              <item.icon className="w-3.5 h-3.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all"
            style={
              active
                ? {
                    backgroundColor: "rgba(139,92,246,0.1)",
                    color: "#a78bfa",
                    border: "1px solid rgba(139,92,246,0.15)",
                  }
                : {
                    color: "rgba(255,255,255,0.45)",
                    border: "1px solid transparent",
                  }
            }
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
