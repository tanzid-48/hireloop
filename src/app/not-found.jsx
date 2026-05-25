import React from 'react';
import Link from 'next/link';
import { MdSearchOff } from 'react-icons/md';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-52 h-52 bg-violet-600/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-7 text-center">

        {/* Icon */}
        <div className="animate-bounce">
          <div className="w-24 h-24 rounded-3xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center relative">
            <MdSearchOff className="text-5xl text-white/40" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">!</span>
            </span>
          </div>
        </div>

        {/* Label */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-[11px] tracking-[3px] text-white/20 uppercase">
            Error 404
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Page not found
          </h1>
          <p className="text-sm text-white/40 max-w-xs leading-relaxed">
            Looks like this page took a wrong turn. It may have been moved or no longer exists.
          </p>
        </div>

        {/* Button */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link
            href="/"
            className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105"
          >
            Go back home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;