import Image from "next/image";
import Link from "next/link"; // Fondamentale per far funzionare il tag <Link>

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-900 text-white">
      {/* Background Image Layer */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-black leading-tight sm:text-6xl">
          Itinerari che vivono nella memoria
        </h1>
        <p className="mt-4 max-w-lg text-sm text-slate-100">
          Trova il percorso perfetto, pronto per partire oggi.
        </p>
        
        <Link href="/home">
          <button className="mt-8 rounded-full bg-rose-500 px-8 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-rose-400">
            Inizia
          </button>
        </Link>
      </div>
    </div>
  );
}
