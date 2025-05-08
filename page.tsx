'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <header className="bg-purple-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">BeautyInn</h1>
            <span className="text-white/80 text-sm">Nail Studio</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder=""
                value={searchQuery}
                onChange={handleSearch}
                className="w-64 px-4 py-2 rounded-full bg-pink-400/50 text-white placeholder-white focus:outline-none"
                style={{ color: 'white' }}
              />
            </div>
            <button className="bg-pink-400/50 px-6 py-2 rounded-full text-white hover:bg-pink-400/70">
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Kecantikan Kuku Anda, Prioritas Kami</h2>
          <p className="text-gray-600 mb-6">Layanan nail art profesional dengan sentuhan personal</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="rounded-2xl overflow-hidden shadow-lg max-w-lg">
            <video 
              controls
              autoPlay 
              loop 
              className="w-full h-full object-cover"
            >
              <source src="/videos/beautyin-intro.mp4" type="video/mp4" />
              Browser Anda tidak mendukung pemutaran video.
            </video>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link href="/booking" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-pink-100 p-4 rounded-xl mb-4 w-16 h-16 flex items-center justify-center">
              <span role="img" aria-label="booking">💅</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Booking Treatment</h3>
          </Link>

          <Link href="/katalog" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-pink-100 p-4 rounded-xl mb-4 w-16 h-16 flex items-center justify-center">
              <span role="img" aria-label="katalog">❤️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Katalog Design</h3>
          </Link>

          <Link href="/promo" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-pink-100 p-4 rounded-xl mb-4 w-16 h-16 flex items-center justify-center">
              <span role="img" aria-label="promo">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Promo Spesial</h3>
          </Link>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 text-gray-600">
          <Link href="/about" className="hover:text-purple-600">Tentang Kami</Link>
          <Link href="/contact" className="hover:text-purple-600">Hubungi Kami</Link>
          <Link href="/faq" className="hover:text-purple-600">FAQ</Link>
        </div>
      </main>
    </div>
  );
}
