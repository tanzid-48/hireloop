import React from "react";
import Image from "next/image";
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiBarChart2,
  FiUsers,
  FiStar,
} from "react-icons/fi";

const stars = [
  { top: "8%", left: "12%", opacity: 0.5 },
  { top: "15%", left: "78%", opacity: 0.4 },
  { top: "30%", left: "22%", opacity: 0.6 },
  { top: "12%", left: "52%", opacity: 0.3 },
  { top: "55%", left: "8%", opacity: 0.4 },
  { top: "65%", left: "88%", opacity: 0.6 },
  { top: "75%", left: "35%", opacity: 0.3 },
  { top: "40%", left: "92%", opacity: 0.5 },
  { top: "85%", left: "18%", opacity: 0.4 },
  { top: "4%", left: "38%", opacity: 0.3 },
  { top: "22%", left: "62%", opacity: 0.5 },
  { top: "48%", left: "48%", opacity: 0.2 },
  { top: "70%", left: "72%", opacity: 0.6 },
  { top: "38%", left: "4%", opacity: 0.4 },
  { top: "92%", left: "58%", opacity: 0.3 },
  { top: "18%", left: "95%", opacity: 0.5 },
  { top: "58%", left: "28%", opacity: 0.3 },
  { top: "82%", left: "82%", opacity: 0.4 },
];

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

const stats = [
  { icon: <FiBriefcase size={20} />, value: "50K", label: "Active Jobs" },
  { icon: <FiBarChart2 size={20} />, value: "12K", label: "Companies" },
  { icon: <FiUsers size={20} />, value: "2M", label: "Job Seekers" },
  { icon: <FiStar size={20} />, value: "97%", label: "Satisfaction Rate" },
];

const HeroSection = () => {
  return (
    <div className="bg-[#08080f] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{ top: star.top, left: star.left, opacity: star.opacity }}
          />
        ))}
      </div>

      {/* ===== HERO ===== */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 pt-18 pb-10 gap-4">
        {/* Badge */}
        <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/[0.04]">
          <span>🏆</span>
          <p className="text-[11px] tracking-[2.5px] uppercase text-white/40 font-medium">
            <span className="text-white font-semibold">50,000+</span> New Jobs
            This Month
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl">
          Find Your Dream Job Today
        </h1>

        {/* Sub */}
        <p className="text-sm sm:text-base text-white/35 max-w-lg leading-relaxed">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search */}
        <div className="w-full max-w-2xl flex items-center bg-[#13131f] border border-white/10 rounded-2xl px-5 py-3.5 gap-3">
          <FiSearch className="text-white/30 flex-shrink-0" size={18} />
          <input
            type="text"
            placeholder="Job title, skill or company"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none min-w-0"
          />
          <div className="w-px h-5 bg-white/10 flex-shrink-0" />
          <FiMapPin className="text-white/30 flex-shrink-0" size={18} />
          <input
            type="text"
            placeholder="Location or Remote"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none min-w-0"
          />
          <button className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
            <FiSearch className="text-white" size={16} />
          </button>
        </div>

        {/* Trending */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span className="text-xs text-white/25">Trending Position</span>
          {trendingPositions.map((pos) => (
            <button
              key={pos}
              className="text-xs px-4 py-1.5 rounded-full border border-white/10 text-white/45 hover:text-white hover:border-white/25 transition-colors"
            >
              {pos}
            </button>
          ))}
        </div>
      </section>

      {/* ===== GLOBE + STATS ===== */}
      <section className="relative z-10 flex flex-col items-center">
        {/* Globe */}
        <div className="relative w-full max-w-4xl mx-auto">
          <Image
            src="/assets/images/globe.png"
            alt="Globe"
            width={1000}
            height={650}
            className="w-full object-contain"
            priority
          />

          {/* Text on Globe */}
          <div className="absolute inset-0 flex items-center justify-center pb-[18%] md:pb-[8%]">
            <p className="text-xl sm:text-2xl md:text-5xl font-medium text-white/80 text-center max-w-sm md:max-w-lg leading-snug px-4">
              Assisting over{" "}
              <span className="text-white font-bold">15,000 job seekers</span>{" "}
              find their dream positions.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-3 -mt-16 pb-20 relative z-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#0f0f1a] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-4"
            >
              <span className="text-white/30">{stat.icon}</span>
              <div>
                <p className="text-4xl font-bold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-white/35 mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
