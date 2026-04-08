import { notFound } from 'next/navigation';
import { getItinerarioBySlug, searchItinerari } from '../sanity/queries';

import CustomPortableText from '../components/CustomPortableText';
import CarouselTrips from '../components/CarouselTrips';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const city = await getItinerarioBySlug(slug);

  if (!city) {
    notFound();
  }

  return {
    title: `${city.name}`,
    description: `Itinerario di ${city.listaItinerari[0].durata} a ${city.name}`,
    openGraph: {
      title: `Itinerario a ${city.name}: Cosa vedere e come muoversi`,
      description: `Il miglior percorso per visitare ${city.name} in ${city.listaItinerari[0].durata}.`,
      images: [
        {
          // Usa l'URL fornito da Sanity. Next.js farà il resto se metadataBase è nel layout.
          url: city.listaItinerari[0].immagine,
          // Aggiungere width e height aiuta molto WhatsApp
          width: 1200,
          height: 630, 
          alt: `Immagine rappresentativa dell'itinerario a ${city.name}`,
        }
      ],
      type: 'article',
      url: `https://itinerari-vivi.vercel.app/${slug}`,
      siteName: "ItinerariVivi",
    },
    // Le icone sono già nel layout, non serve ripeterle qui a meno che non siano diverse
  };
}

export default async function CityPage({ params }: { params: { slug: string } }) {

  const { slug } = await params; // ci vuole await

  const city = await getItinerarioBySlug(slug);

  const itinerariCorrelati = await searchItinerari(city.name) // Cerca itinerari correlati usando il nome della città7
  const itinerariCorrelatiFiltrati = itinerariCorrelati.filter((it: any) => it._id !== city.listaItinerari[0]._id); // Escludi l'itinerario corrente

  if (!city) {
    notFound();
  }

  // Structured data JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": `Itinerario a ${city.name}`,
    "description": `Scopri itinerari a ${city.name}, dai luoghi culturali ai posti più nascosti.`,
    "image": city.listaItinerari[0].immagine,
    "url": `https://itinerari-vivi.vercel.app/${city.slug}`,
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": city.listaItinerari[0]?.pointsOfInterest?.map((poi, index) => ({
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
          style={{ backgroundImage: `url(${city.listaItinerari[0].immagine})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative text-center text-white p-4">
            <h1 className="text-[9vw] md:text-7xl font-light uppercase tracking-[0.2em] drop-shadow-2xl break-words max-w-full px-4">
              {city.name}
            </h1>
            <p className="mt-4 text-lg uppercase tracking-[4px] border-t border-white/40 pt-4 inline-block">
              {city.listaItinerari[0].sottotitolo}
            </p>
          </div>
        </div>

        {/* CONTENUTO - Qui puoi mappare le descrizioni che avevi nei file HTML */}
        <main className="max-w-7xl mx-auto px-2 -mt-14 relative z-10 pb-20">
          <div className="bg-white rounded-2xl shadow-2xl py-8 px-4 md:p-12">

            <header className="mb-8">
              <div className="flex gap-4 text-sm font-medium text-rose-500 uppercase tracking-wider mb-6">
                <span>⏱️ {city.listaItinerari[0].durata}</span>
                <span>📊 Difficoltà: {city.listaItinerari[0].difficolta}</span>
              </div>
            </header>
            {/* AREA PORTABLE TEXT: Qui appaiono Testo e Immagini mixate */}
            <article className="text-black max-w-none mb-12">
              <CustomPortableText value={city.listaItinerari[0].contenuto} />
            </article>

            {/* SEZIONE PUNTI DI INTERESSE (Lista tecnica) */}
            {city.listaItinerari[0]?.pointsOfInterest && city.listaItinerari[0].pointsOfInterest.length > 0 && (
              <div className="mt-12 pt-10 border-t border-slate-100">
                <h3 className="text-2xl font-bold mb-6 text-slate-800">Punti di interesse inclusi</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {city.listaItinerari[0].pointsOfInterest.map((poi: any) => (
                    <div key={poi._key || poi.titolo} className="p-5 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                      <h4 className="font-bold text-rose-500 mb-2">{poi.titolo}</h4>
                      <p className="text-sm text-slate-600 leading-snug">{poi.descrizione}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12">
              {itinerariCorrelatiFiltrati.length > 0 && (
                <CarouselTrips
                  title="Itinerari correlati"
                  subtitle=''
                  itinerari={itinerariCorrelatiFiltrati}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}