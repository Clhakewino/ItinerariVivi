import { ITINERARI_FULL } from "../../data/itinerari";
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const city = ITINERARI_FULL.find(
    (item) => item.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!city) {
    notFound();
  }

  return {
    title: `${city.slug.toUpperCase()}`,
    description: `Itinerario ${city.slug.charAt(0).toUpperCase()}${city.slug.slice(1).toLowerCase()}}`,
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
      "itemListElement": city.pointsOfInterest.map((poi, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": poi.titolo,
        "description": poi.descrizione
      }))
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
        <main className="max-w-4x1 mx-auto px-4 -mt-14 relative z-10 pb-20">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">L'essenza di {city.slug}</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-4">
              Benvenuti a {city.titolo}. Questo itinerario di {city.durata} ti porterà alla scoperta
              dei luoghi più iconici e dei segreti meglio custoditi della città.
            </p>
            <div className="space-y-4 mb-8">
              {city.contenuto.map((paragrafo, index) => (
                <p key={index} className="text-slate-600 leading-relaxed text-base">
                  {parse(paragrafo)}
                </p>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 -mx-4">
              <div className="p-2 border border-slate-150 rounded-xl bg-slate-50/50">
                {city.pointsOfInterest.map((poi) => (
                  <div key={poi.id} className="p-3 border-b">
                    <h3 className="font-bold text-rose-500 mb-2">{poi.titolo}</h3>
                    <p className="text-sm text-slate-500">{poi.descrizione}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}