import CarouselTrips from './components/CarouselTrips';
import SearchBar from './components/SearchBar';
import { getItinerariWithId } from './sanity/queries';

export default async function HomePage() {
  // Questi fetch avvengono sul server all'avvio della pagina
  const itineraryFirstCarousel = await getItinerariWithId(1);
  const itinerarySecondCarousel = await getItinerariWithId(2);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER E BACKGROUND */}
      <div className="relative w-full h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/assets/homeImage.jpg')" }}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-black uppercase tracking-widest">Esplora</h1>
          <p className="text-lg opacity-90">I migliori itinerari per il tuo viaggio</p>
        </div>
      </div>

      {/* BARRA DI RICERCA (Client Component) */}
      <div className="relative z-20 max-w-2xl mx-auto px-8 -mt-8">
        <SearchBar />
      </div>

      <main className="max-w-7xl mx-auto px-8 pt-8 pb-12 md:pt-20">
        {itineraryFirstCarousel.length > 0 && (
          <CarouselTrips
            title="Itinerari più amati"
            subtitle='Alcuni dei percorsi più ricercati'
            itinerari={itineraryFirstCarousel}
          />
        )}

        {itinerarySecondCarousel.length > 0 && (
          <div className="my-12">
            <CarouselTrips
              title="Lasciati ispirare"
              subtitle='Il viaggio perfetto che non avevi ancora pianificato'
              itinerari={itinerarySecondCarousel}
            />
          </div>
        )}
      </main>
    </div>
  );
}