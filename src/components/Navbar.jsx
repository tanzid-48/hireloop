"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Jobs", href: "/browse-jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {

  const { data: session } = useSession();
  const user = session?.user;
  console.log("Current user:", user);


  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
      router.push("/signin");
      router.refresh();
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav className="w-full bg-[#1c1c28] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="shrink-0"
          >
            <Image
              src="/assets/images/logo.png"
              alt="HireLoop Logo"
              width={120}
              height={36}
              className="object-contain h-9 w-auto"
              priority
            />
          </Link>


          <div className="hidden md:flex items-center gap-4">
 
            <div className="flex items-center gap-1 bg-[#2a2a3a] border border-white/10 px-2 py-1.5 rounded-2xl">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "text-white bg-white/15"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="w-px h-5 bg-white/20" />

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">Hi, {user.name}</span>
                <Button size="sm" variant="danger" onPress={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-sm px-5 py-2 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>


          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
 
 >
            {menuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
           </button>
        </div>
      </div>


      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#1c1c28]">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "text-white bg-white/15"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-white/10 flex flex-col gap-2">
            {user ? (
              <Button className="w-full" color="danger" onPress={handleSignOut}>
                Sign Out
              </Button>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-2.5 text-sm text-center text-gray-400 hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-2.5 bg-white text-black rounded-xl text-sm font-semibold text-center hover:bg-gray-100"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
