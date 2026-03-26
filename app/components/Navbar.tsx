// components/Navbar.tsx
'use client'; // Necessario per usare gli hooks

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react'; // Installa lucide-react o usa un SVG

export default function Navbar() {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Logica: Mostra se non siamo in home OPPURE se abbiamo scrollato più di 100px
      if (pathname !== '/' || window.scrollY > 100) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };

    // Esegui subito per controllare la rotta iniziale
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full px-8 py-4 pb-12 z-50 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] flex justify-between">
      <Link
        href="/"
        className="text-2xl font-black text-rose-500 tracking-tighter drop-shadow-[2px_2px_1.5px_rgba(0,0,0,0.4)] "
      >
        ItinerariVivi
      </Link>

      <div className={`transition-all duration-300 ${showSearch ? 'opacity-90 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <button aria-label="Cerca" className="bg-rose-600 text-white/80 p-1.5 rounded-full shadow-md">
            <Search size={20} strokeWidth={3} />
          </button>
      </div>
    </nav>
  );
}