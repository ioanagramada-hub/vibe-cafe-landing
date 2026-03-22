'use client';

/**
 * 🎯 FEATURES SECTION - Bento Grid cu imagini + hover + scroll animations
 */

import { useRef, useEffect, useState } from 'react';

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const cards = [
  {
    title: 'Atmosferă gândită',
    description: 'Fiecare detaliu e acolo pentru confortul tău — lumină caldă, muzică la volum potrivit, colțuri pentru lucru sau conversație. Un spațiu în care o oră devine două fără să-ți dai seama.',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80',
    large: false,
  },
  {
    title: 'Echipă cu pasiune',
    description: 'Baristii noștri știu că o cafea bună începe cu o vorbă bună. Oameni care iubesc meseria și se bucură să o împărtășească cu tine, zi de zi.',
    image: '/barista_crew.jpg',
    objectPosition: 'center 20%',
    large: false,
  },
  {
    title: 'Ingrediente adevărate',
    description: 'Nu facem compromisuri — nici în ceașcă, nici în farfurie. Fiecare ingredient e ales cu grijă: boabe de specialitate din origini certificate, produse de patiserie făcute zilnic de la zero, lapte proaspăt de la furnizori locali. Credem că o cafea bună începe cu materii prime oneste.',
    image: '/coffee_bean2.jpg',
    large: true,
  },
];

function Card({ card, delay, height = 220 }: { card: typeof cards[0]; delay: number; height?: number }) {
  const { ref, visible } = useScrollAnimation();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="flex flex-col overflow-hidden"
      style={{
        backgroundColor: '#ffeddf',
        borderRadius: '16px',
        opacity: visible ? 1 : 0,
        transform: hovered ? 'scale(1.03)' : visible ? 'translateY(0)' : 'translateY(40px)',
        boxShadow: hovered
          ? '0 20px 40px rgba(0, 0, 0, 0.18)'
          : '0 2px 8px rgba(0, 0, 0, 0.06)',
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.3s ease, box-shadow 0.3s ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGINE - sus */}
      <div className="relative overflow-hidden" style={{ height: `${height}px` }}>
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
          style={{ objectPosition: card.objectPosition || 'center' }}
        />
      </div>

      {/* TEXT - jos */}
      <div className="flex flex-col justify-center p-6">
        <h3 className="font-bold text-xl mb-2" style={{ color: '#3b1f0e' }}>
          {card.title}
        </h3>
        <p className="leading-relaxed text-sm" style={{ color: '#3b1f0e', opacity: 0.75 }}>
          {card.description}
        </p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* TITLU SECȚIUNE */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            De ce <span style={{ color: '#d5996b' }}>Vibe Coffee</span>?
          </h2>
          <p className="text-gray-500" style={{ fontSize: '1.5rem' }}>
            Experiență unică, ingrediente premium, atmosferă perfectă
          </p>
        </div>

        {/* BENTO GRID — 2 mici stânga + 1 mare dreapta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ width: '1200px', maxWidth: '100%', margin: '0 auto' }}>

          {/* COLOANA STÂNGA - 2 carduri mici orizontale */}
          <div className="flex flex-col gap-6">
            <Card card={cards[0]} delay={0.1} height={220} />
            <Card card={cards[1]} delay={0.3} height={220} />
          </div>

          {/* CARD MARE DREAPTA - înălțimea celor 2 + gap */}
          <Card card={cards[2]} delay={0.5} height={464} />

        </div>
      </div>
    </section>
  );
}
