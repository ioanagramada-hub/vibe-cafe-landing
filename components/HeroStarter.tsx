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
            animation: 'fadeInUp 0.8s ease-out 1.0s forwards',
            opacity: 0,
          }}
        >
          O ceașcă, o poveste
        </h1>

        {/* SUBTITLU */}
        <p
          className="mb-[4.4rem] text-white/90 max-w-3xl mx-auto leading-relaxed"
          style={{
            fontFamily: 'var(--font-dancing)',
            fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
            textShadow: '0 2px 12px rgba(0,0,0,0.7)',
            animation: 'fadeInUp 0.8s ease-out 1.6s forwards',
            opacity: 0,
          }}
        >
          Pentru cei care știu diferența dintre o cafea bună și una memorabilă
        </p>

        {/* BUTOANE CTA */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animation: 'fadeInUp 0.8s ease-out 2.2s forwards', opacity: 0 }}
        >

          {/* BUTON 1 - Vezi Meniul */}
          <a
            href="#meniu"
            className="inline-block px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/10"
          >
            Vezi Meniul
          </a>

          {/* BUTON 2 - Vizitează-ne */}
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/10"
          >
            Vizitează-ne
          </a>

          {/* BUTON 3 - Comandă TO GO */}
          <a
            href="#comanda"
            className="inline-block px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/10"
          >
            Comandă TO GO
          </a>

        </div>
      </div>

      {/* SCROLL INDICATOR — 3 chevrons animate secvențial + ceașcă la hover */}
      <a
        href="#footer"
        className="group absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white"
        style={{ animation: 'fadeInUp 0.8s ease-out 3.0s forwards', opacity: 0 }}
        aria-label="Scroll în jos"
      >
        {/* Cele 3 chevron-uri — dispar la hover */}
        <div className="flex flex-col items-center group-hover:opacity-0 group-hover:scale-75 transition-all duration-300">
          {[{ w: 34, h: 22 }, { w: 26, h: 17 }, { w: 18, h: 12 }].map((size, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width={size.w}
              height={size.h}
              viewBox="0 0 24 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                animation: `chevronPulse 1.2s ease-in-out ${i * 0.3}s infinite`,
                opacity: 0.15,
              }}
            >
              <path d="M3 2l9 9 9-9" />
            </svg>
          ))}
        </div>

        {/* Ceașcă de cafea — apare la hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 3c0 0 1 1 0 2s-1 2 0 3" />
            <path d="M11 3c0 0 1 1 0 2s-1 2 0 3" />
            <path d="M5 9h11l-1.5 8H6.5L5 9z" />
            <path d="M16 11h2a2 2 0 0 1 0 4h-2" />
            <path d="M4 19h13" />
          </svg>
        </div>
      </a>

    </section>
  );
}
