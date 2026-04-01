'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { searchItinerari } from '../sanity/queries'
import { Itinerario } from '../data/itinerari'

type Props = {
  draftModeEnabled: boolean
}

export default function SearchBar({ draftModeEnabled }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Itinerario[]>([])

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 1) {
        const data = await searchItinerari(searchTerm, draftModeEnabled)
        setResults(data)
      } else {
        setResults([])
      }
    }, 300)
    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, draftModeEnabled])

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