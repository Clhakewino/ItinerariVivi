'use client'; // Necessario per usare gli hook in Next.js (App Router)

import { useState, useEffect } from 'react';

import Link from 'next/link';

import "./globals.css";
import { ITINERARI_FULL } from './data/itinerari';

export default function HomePage() {
  // Definiamo lo stato per il termine di ricerca
  const [searchTerm, setSearchTerm] = useState('');

  // Filtriamo gli itinerari in base al termine inserito
  // Filtra per titolo o slug (puoi aggiungere altri campi se necessario)
  const searchResults = searchTerm.length > 1
    ? ITINERARI_FULL.filter((trip) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        trip.titolo.toLowerCase().includes(searchLower) ||
        trip.slug.toLowerCase().includes(searchLower))
    }) : [];

    const citiesToShowInFirstCarousel = [...ITINERARI_FULL].filter(trip => trip.homeCarousel.includes(1))

  const [randomTrips, setRandomTrips] = useState([]);

  useEffect(() => {
    // Questa logica viene eseguita SOLO sul client dopo il primo caricamento
    const shuffled = [...ITINERARI_FULL]
      .filter(trip => trip.homeCarousel.includes(2)) // prendo solo elementi mostrabili nel carousel 2
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    setRandomTrips(shuffled);
  }, []);

  // Se randomTrips è vuoto (durante il primo secondo di caricamento), 
  // puoi mostrare dei placeholder o i primi 6 statici per evitare il salto visivo
  const randomTripsToDisplay = randomTrips.length > 0 ? randomTrips : ITINERARI_FULL.slice(0, 6);

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

      {/* SEARCH BAR */}
      <div className="relative z-20 max-w-2xl mx-auto px-8 -mt-8">
        <div className="bg-white rounded-full shadow-xl flex items-center p-2 border border-slate-100">
          <input
            type="text"
            placeholder="Cerca la tua prossima meta..."
            className="flex-grow bg-transparent px-6 py-3 outline-none text-slate-600 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-rose-500 text-white p-3 rounded-full hover:bg-rose-600 transition shadow-md">
            {/* Icona Lente (SVG semplice) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* MESSAGGIO SE NON CI SONO RISULTATI */}
        {searchResults.length === 0 && searchTerm.length > 2 && (
          <div className="text-center pt-8 text-slate-400">
            Nessun itinerario trovato per la tua ricerca.
          </div>
        )}

      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-8 pt-8 pb-12 md:pt-20">

        {/*RISULTATI DI RICERCA (Appare solo se scrivi)*/}
        {searchTerm.length > 1 && (
          <section className="mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-2xl font-bold mb-4 text-rose-500">
              Risultati per: "{searchTerm}"
            </h2>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((trip) => (
                  <Link
                    key={`search-${trip.id}`}
                    href={`/destinazioni/${trip.slug}`}
                    className="flex items-center gap-4 bg-white p-0 rounded-xl shadow-sm hover:shadow-md transition border border-slate-100"
                  >
                    <div
                      className="w-20 h-20 rounded-lg bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${trip.immagine})`,
                        backgroundSize: '220%' // zoom immagine
                      }}
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 leading-tight capitalize">{trip.slug}</h4>
                      <span className="text-sm">{trip.titolo}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic">Nessun itinerario trovato...</p>
            )}
            <hr className="mt-12 border-slate-200" />
          </section>
        )}

        {/* CAROSELLO */}
        <header className="mb-12">
          <h2 className="text-4xl font-bold">Itinerari più amati</h2>
          <p className="text-slate-500 mt-2">Alcuni dei percorsi più ricercati</p>
        </header>

        {/* CONTENITORE: Carosello su mobile, Grid da md in su */}
        <div className="-mx-8 px-8 -mt-7 relative z-10 flex overflow-x-auto gap-4 pb-8 -mb-8 snap-x snap-mandatory scrollbar-hide md:mx-0 md:px-0 md:mb-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">

          {citiesToShowInFirstCarousel.map((trip) => (
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
                <h3 className="text-xl font-bold first-letter:uppercase">{trip.slug} - {trip.titolo}</h3>
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

        {/* CAROSELLO */}
        <header className="mb-12">
          <h2 className="text-4xl font-bold mt-12">Lasciati ispirare</h2>
          <p className="text-slate-500 mt-2">Il viaggio perfetto che non avevi ancora pianificato</p>
        </header>

        {/* CONTENITORE: Carosello su mobile, Grid da md in su */}
        <div className="-mx-8 px-8 -mt-7 relative z-10 flex overflow-x-auto gap-4 pb-8 -mb-8 snap-x snap-mandatory scrollbar-hide md:mx-0 md:px-0 md:mb-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">

          {randomTripsToDisplay.map((trip) => (
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
                <h3 className="text-xl font-bold first-letter:uppercase">{trip.slug} - {trip.titolo}</h3>
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