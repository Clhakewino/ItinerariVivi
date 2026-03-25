import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image con Next.js Image */}
      <Image
        src="/assets/startImage.jpg" // Percorso partendo dalla cartella public
        alt="Background Itinerari"
        fill // Fa sì che l'immagine riempia tutto il contenitore padre
        priority // La carica subito (essendo la Hero)
        className="object-cover" // Corrisponde a bg-cover
      />
      
      {/* Overlay Scuro */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content Layer */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-black leading-tight sm:text-6xl text-white">
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
