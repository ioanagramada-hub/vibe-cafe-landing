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
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        {/* TITLU PRINCIPAL */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          O ceașcă, o poveste
        </h1>

        {/* SUBTITLU */}
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          Pentru cei care știu diferența dintre o cafea bună și una memorabilă
        </p>

        {/* BUTON CTA */}
        <a
          href="#contact"
          className="inline-block px-8 py-4 bg-white text-amber-900 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
        >
          Începe acum
        </a>
      </div>

    </section>
  );
}
