import Link from 'next/link';

import "./globals.css";
import { ITINERARI_FULL } from './data/itinerari';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* SEZIONE SFONDO FISSO */}
      <div
        className="relative w-full h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/assets/homeImage.jpg')" }}
      >
        {/* Overlay per rendere il testo leggibile */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Testo sopra lo sfondo */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-black uppercase tracking-widest drop-shadow-[2px_2px_1.5px_rgba(0,0,0,0.4)]">Esplora</h1>
          <p className="text-lg opacity-90 drop-shadow-[2px_2px_1.5px_rgba(0,0,0,0.4)]">I migliori itinerari per il tuo viaggio</p>
        </div>
      </div>

      <div className="relative z-20 max-w-2xl mx-auto px-8 -mt-8">
        <div className="bg-white rounded-full shadow-xl flex items-center p-2 border border-slate-100">
          <input
            type="text"
            placeholder="Cerca la tua prossima meta..."
            className="flex-grow bg-transparent px-6 py-3 outline-none text-slate-600 placeholder:text-slate-400"
          />
          <button className="bg-rose-500 text-white p-3 rounded-full hover:bg-rose-600 transition shadow-md">
            {/* Icona Lente (SVG semplice) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-8 pt-12 pb-12 md:pt-20">
        <header className="mb-12">
          <h2 className="text-4xl font-bold">I nostri itinerari</h2>
          <p className="text-slate-500 mt-2">Alcuni percorsi selezionati per la tua prossima avventura.</p>
        </header>

        {/* CONTENITORE: Carosello su mobile, Grid da md in su */}
        <div className="-mx-8 px-8 -mt-7 relative z-10 flex overflow-x-auto gap-4 pb-8 -mb-8 snap-x snap-mandatory scrollbar-hide md:mx-0 md:px-0 md:mb-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">

          {ITINERARI_FULL.map((trip) => (
            <div
              key={trip.id}
              className="group min-w-[80vw] md:min-w-0 overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl snap-center"
            >
              {/* Immagine */}
              <div
                className="h-48 w-full bg-cover bg-center transition duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${trip.immagine})` }}
              />

              {/* Contenuto */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase text-rose-500">{trip.difficolta}</span>
                  <span className="text-xs text-slate-400">{trip.durata}</span>
                </div>
                <h3 className="text-xl font-bold capitalize">{trip.slug} - {trip.titolo}</h3>
                <Link
                  href={`/destinazioni/${trip.slug}`}
                  className="mt-4 block w-full py-2 border border-slate-200 rounded-lg text-sm font-semibold text-center hover:bg-slate-900 hover:text-white transition"
                >
                  Vedi Dettagli
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}