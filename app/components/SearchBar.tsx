'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { searchItinerari } from '../sanity/queries'
import { Itinerario } from '../data/itinerari'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Itinerario[]>([])

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 1) {
        const data = await searchItinerari(searchTerm)
        setResults(data)
      } else {
        setResults([])
      }
    }, 300)
    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  return (
    <div className="relative">
      {/* Input e dropdown */}
      <div className="bg-white rounded-full shadow-xl flex items-center p-2 border border-slate-100">
        <input
          type="search"
          placeholder="Cerca la tua prossima meta..."
          className="flex-grow bg-transparent px-6 py-3 outline-none text-slate-600"
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

      {searchTerm.length > 1 && (
        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
          {results.length > 0 ? (
            results.map((trip) => (
              <Link key={trip._id} href={`/destinazioni/${trip.slug}`} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition">
                <img src={trip.immagine} alt={trip.titolo} className="w-12 h-12 rounded-md object-cover" />
                <div>
                  <p className="font-bold text-slate-800 capitalize">{trip.slug}</p>
                  <p className="text-xs text-slate-400">{trip.titolo}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-slate-400 italic">Nessun risultato...</p>
          )}
        </div>
      )}
    </div>
  )
}