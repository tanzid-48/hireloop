import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const footerLinks = {
  Product: [
    { label: "Job Discovery", href: "/browse-jobs" },
    { label: "Companies", href: "/company" },
    { label: "Pricing", href: "/pricing" },
    { label: "Salary Data", href: "/salary" },
  ],
  Navigations: [
    { label: "Help Center", href: "/help" },
    { label: "Career Library", href: "/library" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Brand Guideline", href: "/brand" },
    { label: "Newsroom", href: "/news" },
    { label: "Blog", href: "/blog" },
  ],
};

const socialLinks = [
  { href: "https://facebook.com", icon: <FaFacebookF /> },
  { href: "https://twitter.com", icon: <FaXTwitter /> },
  { href: "https://linkedin.com", icon: <FaLinkedinIn /> },
];

const Footer = () => {
  return (
    <div>
      <footer className="w-full bg-[#0f0f17] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-6">

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="flex flex-col gap-4">
              <Link href="/">
                <Image
                  src="/assets/images/logo.png"
                  alt="HireLoop Logo"
                  width={120}
                  height={36}
                  className="object-contain h-9 w-auto"
                />
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed max-w-50">
                The smart job hunting platform. Built for people who take their career seriously.
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-purple-400">{category}</h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          {/* Bottom Section */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all text-sm"
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-gray-600">
              <span>Copyright 2025 — HireLoop</span>
              <div className="flex items-center gap-3">
                <Link href="/terms" className="hover:text-gray-400 transition-colors">
                  Terms & Policy
                </Link>
                <span>·</span>
                <Link href="/privacy" className="hover:text-gray-400 transition-colors">
                  Privacy Guideline
                </Link>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;