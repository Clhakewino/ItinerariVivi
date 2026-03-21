import Link from 'next/link';

// Definiamo un tipo per i nostri itinerari (visto che usiamo TS!)
interface Itinerario {
  id: number;
  titolo: string;
  durata: string;
  difficolta: string;
  immagine: string;
}

const ITINERARI_SAMPLE: Itinerario[] = [
  { id: 1, titolo: "Sentieri delle Dolomiti", durata: "3 giorni", difficolta: "Media", immagine: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { id: 2, titolo: "Costiera Amalfitana", durata: "5 giorni", difficolta: "Facile", immagine: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80" },
  { id: 3, titolo: "Misteri d'Islanda", durata: "7 giorni", difficolta: "Difficile", immagine: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=400&q=80" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <Link href="/" className="text-2xl font-black text-rose-500 tracking-tighter">
          ItinerariVivi
        </Link>
        <div className="space-x-6 font-medium text-sm uppercase tracking-wide">
          <button className="hover:text-rose-500 transition">Esplora</button>
          <button className="hover:text-rose-500 transition">I miei viaggi</button>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs">Profilo</button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <header className="mb-12">
          <h2 className="text-4xl font-bold">Bentornato, Esploratore</h2>
          <p className="text-slate-500 mt-2">Ecco i percorsi selezionati per la tua prossima avventura.</p>
        </header>

        {/* GRID DEGLI ITINERARI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ITINERARI_SAMPLE.map((trip) => (
            <div key={trip.id} className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
              <div 
                className="h-48 w-full bg-cover bg-center transition group-hover:scale-105"
                style={{ backgroundImage: `url(${trip.immagine})` }}
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase text-rose-500">{trip.difficolta}</span>
                  <span className="text-xs text-slate-400">{trip.durata}</span>
                </div>
                <h3 className="text-xl font-bold">{trip.titolo}</h3>
                <button className="mt-4 w-full py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-900 hover:text-white transition">
                  Vedi Dettagli
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}