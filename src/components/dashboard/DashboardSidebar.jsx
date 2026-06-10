
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

const DashboardSidebar = async() => {

 const user = await getSession()

  const recruiterNavLink = [
    {
      icon: House,
      href: "/dashboard/recruiter",
      label: "Home",
    },

    {
      icon: Magnifier,
      href: "/dashboard/recruiter/jobs",
      label: "Jobs",
    },

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

    {
      icon: Person,
      href: "/dashboard/recruiter/profile",
      label: "Profile",
    },

    {
      icon: Gear,
      href: "/dashboard/recruiter/settings",
      label: "Settings",
    },
  ];

  const seekerNavLinks = [
    {
      icon: House,
      href: "/dashboard/seeker",
      label: "Dashboard",
    },
    {
      icon: Magnifier,
      href: "/jobs",
      label: "Jobs",
    },
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
    {
      icon: CreditCard,
      href: "/dashboard/seeker/billing",
      label: "Billing",
    },
    {
      icon: Bell,
      href: "/dashboard/seeker/notifications",
      label: "Notifications",
    },
    {
      icon: Person,
      href: "/dashboard/seeker/profile",
      label: "Profile",
    },
    {
      icon: Gear,
      href: "/dashboard/seeker/settings",
      label: "Settings",
    },
  ];

  const navLinkMap = {
    seeker:seekerNavLinks,
    recruiter:recruiterNavLink

  }

  const navItems = navLinkMap[user?.role || 'seeker'];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside>
        <div
          className="hidden md:flex flex-col gap-1 p-4 bg-[#0a0a12] border-r border-white/10 min-h-screen"
          style={{ width: "250px", minWidth: "250px" }}
        >
          {navContent}
        </div>
      </aside>

      <Drawer>
        <Button className=" md:hidden" variant="secondary">
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
