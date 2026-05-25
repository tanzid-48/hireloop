"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Jobs", href: "/browse-jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#1c1c28] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          <Link href="/" onClick={() => setMenuOpen(false)} className="shrink-0">
            <Image
              src="/assets/images/logo.png"
              alt="HireLoop Logo"
              width={120}
              height={36}
              className="object-contain h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">

            <div className="flex items-center gap-1 bg-[#2a2a3a] border border-white/10 px-2 py-1.5 rounded-2xl">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
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

            <Link
              href="/signin"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="/get-started"
              className="text-sm px-5 py-2 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>

          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#1c1c28]">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
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
            <Link
              href="/signin"
              onClick={() => setMenuOpen(false)}
              className="w-full py-2.5 text-sm text-center text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              onClick={() => setMenuOpen(false)}
              className="w-full py-2.5 bg-white text-black rounded-xl text-sm font-semibold text-center hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}