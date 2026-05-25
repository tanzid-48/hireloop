'use client';
import React, { useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

const plans = [
  {
    icon: '🎯',
    name: 'Starter',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Browse & apply to 5 jobs/month',
      'Basic job recommendations',
      'Public profile page',
      'Email job alerts',
    ],
  },
  {
    icon: '🚀',
    name: 'Pro',
    monthlyPrice: 17,
    yearlyPrice: 12,
    featured: true,
    features: [
      'Unlimited job applications',
      'AI-powered job matching',
      'Priority profile visibility',
      'Application tracker dashboard',
      'Salary insights & benchmarks',
    ],
  },
  {
    icon: '🏢',
    name: 'Business',
    monthlyPrice: 99,
    yearlyPrice: 75,
    features: [
      'Everything in Pro',
      'Post up to 10 job listings',
      'Recruiter toolkit & pipeline',
      'Candidate shortlist management',
      'Advanced hiring analytics',
    ],
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="bg-[#08080f] px-4 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <p className="text-[11px] tracking-[3px] uppercase text-white/40 font-medium">Pricing</p>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white text-center leading-tight tracking-tight mb-10">
          Simple plans for every <br /> stage of your career
        </h2>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="flex items-center bg-[#13131f] border border-white/10 rounded-full p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                !yearly ? 'bg-white text-black' : 'text-white/50 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                yearly ? 'bg-white text-black' : 'text-white/50 hover:text-white'
              }`}
            >
              Yearly
              <span className="bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                25%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-6 border transition-all ${
                plan.featured
                  ? 'bg-[#13131f] border-indigo-500/40'
                  : 'bg-[#0f0f1a] border-white/[0.07]'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{plan.icon}</span>
                  <span className="text-white font-semibold text-sm">{plan.name}</span>
                </div>
                <div>
                  <span className="text-white font-bold text-2xl tracking-tight">
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-white/30 text-xs"> /month</span>
                </div>
              </div>

              {/* Feature title */}
              <p className="text-xs text-white/50 font-medium mb-4">
                What you get:
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <FiPlus className="text-white/30 flex-shrink-0 mt-0.5" size={14} />
                    <span className="text-xs text-white/50">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`w-full py-3 rounded-xl text-sm font-medium flex items-center justify-between px-4 transition-all ${
                  plan.featured
                    ? 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                    : 'bg-white/[0.05] hover:bg-white/10 text-white/60 border border-white/[0.07]'
                }`}
              >
                Get Started
                <FiArrowRight size={16} />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;