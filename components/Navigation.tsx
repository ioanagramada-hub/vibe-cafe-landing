'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <a href="/" className={`text-xl font-bold transition-colors duration-300 ${scrolled ? 'text-gray-800' : 'text-white'}`}
          style={{ fontFamily: 'var(--font-heading)' }}>
          Vibe Caffè
        </a>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#menu"
            className={`text-sm font-medium transition-colors duration-300 hover:text-teal-500 ${scrolled ? 'text-gray-600' : 'text-white/90'}`}
          >
            Meniu
          </a>
          <a
            href="#features"
            className={`text-sm font-medium transition-colors duration-300 hover:text-teal-500 ${scrolled ? 'text-gray-600' : 'text-white/90'}`}
          >
            De ce noi
          </a>
          <a
            href="/rezervari"
            className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            Rezervă Masă
          </a>
        </div>

        {/* Burger mobil */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-gray-800' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-gray-800' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-gray-800' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Meniu mobil */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <a href="#menu" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Meniu</a>
          <a href="#features" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>De ce noi</a>
          <a
            href="/rezervari"
            className="px-5 py-2.5 bg-teal-500 text-white text-sm font-semibold rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Rezervă Masă
          </a>
        </div>
      )}
    </nav>
  );
}
