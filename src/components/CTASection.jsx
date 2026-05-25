import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="bg-[#08080f] w-full relative overflow-hidden">

      {/* Background Image — full width */}
      <div className="relative w-full h-90 md:h-[400px] lg:h-[400px]">
        <Image
          src="/assets/images/cta-bg.png"
          alt="CTA Background"
          width={520}
          height={400}
          className="w-full object-cover object-top"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-indigo-950/50" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-6">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-lg">
            Your next role is <br /> already looking for you
          </h2>

          <p className="text-sm sm:text-base text-white/50 max-w-md leading-relaxed">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link
              href="/get-started"
              className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-100 transition-all hover:scale-105"
            >
              Create a free account
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white/15 transition-all hover:scale-105"
            >
              View pricing
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
};

export default CTASection;