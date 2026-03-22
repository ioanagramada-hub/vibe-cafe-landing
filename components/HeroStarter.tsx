'use client';

/**
 * 🎯 HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea MINIMALISTĂ de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

import { useRef, useEffect } from 'react';

export default function HeroStarter() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.5) {
        video.currentTime = 0;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black">

      {/* VIDEO FUNDAL - barista */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{ backgroundColor: 'black' }}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Video_fundal_barista.webm" type="video/webm" />
      </video>

      {/* OVERLAY semi-transparent */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONȚINUT - deasupra imaginii și overlay-ului */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        {/* TITLU PRINCIPAL */}
        <h1
          className="text-7xl md:text-8xl lg:text-9xl font-bold mb-4 leading-tight"
          style={{
            textShadow: '0 4px 24px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)',
            animation: 'fadeInUp 0.8s ease-out 0.5s forwards',
            opacity: 0,
          }}
        >
          O ceașcă, o poveste
        </h1>

        {/* SUBTITLU */}
        <p
          className="mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed"
          style={{
            fontFamily: 'var(--font-dancing)',
            fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
            textShadow: '0 2px 12px rgba(0,0,0,0.7)',
            animation: 'fadeInUp 0.8s ease-out 0.8s forwards',
            opacity: 0,
          }}
        >
          Pentru cei care știu diferența dintre o cafea bună și una memorabilă
        </p>

        {/* BUTOANE CTA */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animation: 'fadeInUp 0.8s ease-out 1.1s forwards', opacity: 0 }}
        >

          {/* BUTON 1 - Primary: Vezi Meniul */}
          <a
            href="#meniu"
            className="inline-block px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Vezi Meniul
          </a>

          {/* BUTON 2 - Secondary: Vizitează-ne */}
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/10"
          >
            Vizitează-ne
          </a>

        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <a
        href="#footer"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/75 hover:text-orange-500 transition-colors duration-300"
        style={{ animation: 'fadeInUp 0.8s ease-out 1.5s forwards', opacity: 0 }}
        aria-label="Scroll în jos"
      >
        <div className="animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        </div>
      </a>

    </section>
  );
}
