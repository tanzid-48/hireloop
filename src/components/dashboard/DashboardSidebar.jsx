import React from "react";
import {
  Briefcase,
  Bell,
  Envelope,
  Gear,
  Bookmark,
  FileText,
  House,
  CreditCard,
  Magnifier,
  Person,
  SquarePlus,
  LayoutSideContentRight,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { getSession } from "@/lib/auth-session";

const DashboardSidebar = async () => {
  const session = await getSession();
  const role = session?.user?.role || "seeker";

  const recruiterNavLinks = [
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
  ];

  const seekerNavLinks = [
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
  ];

  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Person, href: "/dashboard/admin/users", label: "Users" },
    { icon: Briefcase, href: "/dashboard/admin/companies", label: "Companies" },
    { icon: Magnifier, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  const navLinkMap = {
    recruiter: recruiterNavLinks,
    seeker: seekerNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinkMap[role] || seekerNavLinks;

  const navContent = (
    <div className="flex flex-col gap-1">
      {/* Role Badge */}
      <div
        className="mb-3 px-3 py-2.5 rounded-xl"
        style={{
          backgroundColor: "rgba(139,92,246,0.06)",
          border: "1px solid rgba(139,92,246,0.12)",
        }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {role === "admin"
            ? "Admin Panel"
            : role === "recruiter"
              ? "Recruiter Panel"
              : "Seeker Panel"}
        </p>
        <p
          className="text-xs font-semibold mt-0.5 truncate"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {session?.user?.name || "User"}
        </p>
      </div>

      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <item.icon
              className="w-4 h-4 shrink-0"
              style={{ color: "rgba(255,255,255,0.35)" }}
            />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      <aside>
        <div
          className="hidden md:flex flex-col gap-1 p-4 bg-[#0a0a12] border-r border-white/[0.06] min-h-screen"
          style={{ width: "250px", minWidth: "250px" }}
        >
          {navContent}
        </div>
      </aside>

      <Drawer>
        <Button className="md:hidden" variant="secondary">
          <LayoutSideContentRight />
          Show Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};

export default DashboardSidebar;
