import { ITINERARI_FULL } from "../../data/itinerari";
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const city = ITINERARI_FULL.find(
    (item) => item.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!city) {
      notFound();
  }

  // Structured data JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": `Itinerario a ${city.slug}`,
    "description": `Scopri itinerari a ${city.slug}, dai luoghi culturali ai posti più nascosti.`,
    "url": `https://itinerari-vivi.vercel.app/destinazioni/${city.slug}`,
  };

  return {
    title: `${city.slug}`,
    description: `Itinerario ${city.slug}`,
    openGraph: {
      images: [city.immagine],
    },
  };
}

export default async function CityPage({ params }: { params: { slug: string } }) {

  const { slug } = await params;

  const city = ITINERARI_FULL.find((item) => item.slug.toLowerCase() === slug.toLowerCase());

  if (!city) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION - Riprende lo stile cityStyle.css che hai caricato */}
      <div
        className="relative h-[60vh] w-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${city.immagine})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative text-center text-white p-4">
          <h1 className="text-5xl md:text-7xl font-light uppercase tracking-[10px] drop-shadow-2xl">
            {city.slug}
          </h1>
          <p className="mt-4 text-lg uppercase tracking-[4px] border-t border-white/40 pt-4 inline-block">
            {city.titolo}
          </p>
        </div>
      </div>

      {/* CONTENUTO - Qui puoi mappare le descrizioni che avevi nei file HTML */}
      <main className="max-w-4xl mx-auto px-6 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">L'essenza di {city.slug}</h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">
            Benvenuti a {city.titolo}. Questo itinerario di {city.durata} ti porterà alla scoperta
            dei luoghi più iconici e dei segreti meglio custoditi della città.
          </p>

          {/* Griglia delle attrazioni (stile Roma/Tokyo che hai caricato) */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-slate-100 rounded-xl bg-slate-50/50">
              <h3 className="font-bold text-rose-500 mb-2">Punto di interesse 1</h3>
              <p className="text-sm text-slate-500">Descrizione dell'attrazione presa dal tuo file HTML.</p>
            </div>
            {/* ... altre card ... */}
          </div>
        </div>
      </main>
    </div>
  );
}