// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-6 bg-transparent z-50">
      <Link href="/" className="text-2xl font-black text-rose-500 tracking-tighter drop-shadow-[2px_2px_1.5px_rgba(0,0,0,0.4)]">
        ItinerariVivi
      </Link>

      {/*<div className="space-x-6 font-medium text-sm uppercase tracking-wide text-white">
        {/* Ho aggiunto 'text-white' assumendo che sotto ci sia un'immagine scura. 
            Puoi cambiarlo in 'text-slate-900' se lo sfondo è chiaro. */}
      {/*<Link href="/itinerari" className="hover:text-rose-400 transition">Itinerari</Link>
        {/*<Link href="/chi-siamo" className="hover:text-rose-400 transition">Chi Siamo</Link>
      {/*</div>*/}
    </nav>
  );
}