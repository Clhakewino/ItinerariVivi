import { Itinerario, PointOfInterest } from "../../data/itinerari";
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';
import { getItinerarioBySlug } from '../../sanity/queries';
import { PortableText } from "next-sanity";

import { draftMode } from 'next/headers'
import CustomPortableText from '../../components/CustomPortableText';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const draftModeEnabled = (await draftMode()).isEnabled

  const city = await getItinerarioBySlug(slug, draftModeEnabled);

  if (!city) {
    notFound();
  }

  return {
    title: `${city.slug.toUpperCase()}`,
    description: `Itinerario ${city.slug.charAt(0).toUpperCase()}${city.slug.slice(1).toLowerCase()}`,
    openGraph: {
      images: [city.immagine],
    },
    icons: {
      icon: "/favicon.ico", // Assicurati che il file sia in public/
      apple: "/favicon.png", // Opzionale, per dispositivi Apple
    },
  };
}

export default async function CityPage({ params }: { params: { slug: string } }) {

  const { slug } = await params; // ci vuole await

  const draftModeEnabled = (await draftMode()).isEnabled

  const city = await getItinerarioBySlug(slug, draftModeEnabled);

  if (!city) {
    notFound();
  }

  // Structured data JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": `Itinerario a ${city.slug}`,
    "description": `Scopri itinerari a ${city.slug}, dai luoghi culturali ai posti più nascosti.`,
    "image": city.immagine,
    "url": `https://itinerari-vivi.vercel.app/destinazioni/${city.slug}`,
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": city.pointsOfInterest?.map((poi, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": poi.titolo,
        "description": poi.descrizione
      })) || []
    }
  };

  return (
    <section>
      {/* Iniezione del JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-white">
        {/* HERO SECTION - Riprende lo stile cityStyle.css che hai caricato */}
        <div
          className="relative h-[40vh] w-full bg-cover bg-center flex items-center justify-center"
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
        <main className="max-w-7xl mx-auto px-2 -mt-14 relative z-10 pb-20">
          <div className="bg-white rounded-2xl shadow-2xl py-8 px-4 md:p-12">
            
            <header className="mb-8">
              <div className="flex gap-4 text-sm font-medium text-rose-500 uppercase tracking-wider mb-6">
                <span>⏱️ {city.durata}</span>
                <span>📊 Difficoltà: {city.difficolta}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg italic">
                Benvenuti a {city.titolo}. Questo itinerario ti porterà alla scoperta
                dei luoghi più iconici e dei segreti meglio custoditi della città.
              </p>
            </header>
            {/* AREA PORTABLE TEXT: Qui appaiono Testo e Immagini mixate */}
            <article className="text-black max-w-none mb-12">
              <CustomPortableText value={city.contenuto} />
            </article>

            {/* SEZIONE PUNTI DI INTERESSE (Lista tecnica) */}
            {city.pointsOfInterest && city.pointsOfInterest.length > 0 && (
              <div className="mt-12 pt-10 border-t border-slate-100">
                <h3 className="text-2xl font-bold mb-6 text-slate-800">Punti di interesse inclusi</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {city.pointsOfInterest.map((poi: any) => (
                    <div key={poi._key || poi.titolo} className="p-5 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                      <h4 className="font-bold text-rose-500 mb-2">{poi.titolo}</h4>
                      <p className="text-sm text-slate-600 leading-snug">{poi.descrizione}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}