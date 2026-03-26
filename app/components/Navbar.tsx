// components/Navbar.tsx
'use client'; // Necessario per usare gli hooks

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react'; // X serve per chiudere
import { ITINERARI_FULL } from '../data/itinerari';

export default function Navbar() {
  const pathname = usePathname();
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Stato per il pannello di ricerca
  // Definiamo lo stato per il termine di ricerca
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra i risultati in tempo reale
  const searchResults = useMemo(() => {
    if (searchTerm.length < 2) return [];
    return ITINERARI_FULL.filter(trip =>
      trip.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      // Logica: Mostra se non siamo in home OPPURE se abbiamo scrollato più di 250px
      if (pathname !== '/' || window.scrollY > 250) {
        setShowSearchIcon(true);
      } else {
        setShowSearchIcon(false);
        if (!isSearchOpen) setIsSearchOpen(false); // Chiudi la ricerca se scrolli su in Home
      }
    };
    // Esegui subito per controllare la rotta iniziale
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isSearchOpen]);

  // Chiudi l'overlay quando cambi pagina
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchTerm('');
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-8 py-4 pb-12 z-50 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] flex justify-between items-center">
        <Link href="/" className="text-2xl font-black text-rose-500 tracking-tighter drop-shadow-[2px_2px_1.5px_rgba(0,0,0,0.4)]">
          ItinerariVivi
        </Link>

        <div className={`transition-all duration-500 ${showSearchIcon ? 'opacity-90 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <button onClick={() => setIsSearchOpen(true)} className="bg-rose-600 text-white/80 p-2 rounded-full shadow-md active:scale-95 transition">
            <Search size={20} strokeWidth={3} />
          </button>
        </div>
      </nav>

      {/* OVERLAY DI RICERCA */}
      <div className={`fixed inset-0 z-[60] bg-slate-50/fb transition-all duration-100 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col h-full max-w-5xl mx-auto px-6 py-8 backdrop-blur-md">

          {/* Header Overlay */}
          <div className="flex justify-between items-center mb-12">
            <span className="text-rose-500 font-bold tracking-widest uppercase text-xs"></span>
            <button onClick={() => setIsSearchOpen(false)} className="p-1 bg-rose-600 shadow-sm text-white/80 rounded-full">
              <X size={30} />
            </button>
          </div>

          {/* Input di Ricerca */}
          <div className="relative mb-12">
            <input
              autoFocus={isSearchOpen}
              type="search"
              placeholder="Dove vuoi andare?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-4xl md:text-6xl font-bold bg-transparent border-b-4 border-rose-600 outline-none pb-4 transition-colors placeholder:text-slate-200/80 placeholder:drop-shadow-[2px_2px_1.5px_rgba(0,0,0,0.6)] text-slate-200 drop-shadow-[2px_2px_1.5px_rgba(0,0,0,0.6)]"
              autoComplete="off"
              inputMode="search"
            />
          </div>

          {/* AREA RISULTATI (Scrollabile) */}
          <div className="flex-grow overflow-y-auto pr-2 scrollbar-hide">
            {searchTerm.length > 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold mb-6 text-slate-400 uppercase tracking-tight">
                  {searchResults.length} Risultati per: <span className="text-slate-800">"{searchTerm}"</span>
                </h2>

                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((trip) => (
                      <Link
                        key={`search-${trip.id}`}
                        href={`/destinazioni/${trip.slug}`}
                        className="group flex items-center gap-4 bg-white p-0 rounded-xl shadow-sm hover:shadow-xl hover:ring-2 hover:ring-rose-500/20 transition-all border border-slate-100"
                      >
                        <div
                          className="w-24 h-24 rounded-xl bg-center"
                          style={{ backgroundImage: `url(${trip.immagine})`, backgroundSize: '220%' }}
                        />
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-slate-800 leading-tight text-2xl truncate capitalize">{trip.slug}</h4>
                          <p className="text-sm text-slate-500 pt-3 line-clamp-2 leading-snug">{trip.titolo}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-slate-300 text-2xl font-light italic">Nessun itinerario trovato per questa ricerca...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}