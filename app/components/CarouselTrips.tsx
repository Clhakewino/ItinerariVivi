import Link from 'next/link';
import { Itinerario } from '../data/itinerari';

interface CarouselProps {
  title: string;
  subtitle: string;
  itinerari: Itinerario[];
}

export default function CarouselTrips({ title, subtitle, itinerari }: CarouselProps) {

    return (
        // CAROSELLO
        <section>
            <header className="mb-12">
                <h2 className="text-4xl font-bold">{title}</h2>
                <p className="text-slate-500 mt-2">{subtitle}</p>
            </header>

            {/*CONTENITORE: Carosello su mobile, Grid da md in su*/}
            <div className="-mx-8 px-8 -mt-7 relative z-10 flex overflow-x-auto gap-4 pb-8 -mb-8 snap-x snap-mandatory scrollbar-hide md:mx-0 md:px-0 md:mb-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                {itinerari.map((trip) => (
                    <div
                        key={trip._id}
                        className="group min-w-[80vw] md:min-w-0 overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl snap-center"
                    >
                        {/* Immagine */}
                        <div
                            className="h-48 w-full bg-cover bg-center transition duration-500 group-hover:scale-110"
                            style={{ backgroundImage: `url(${trip.immagine})` }}
                        />

                        {/* Contenuto */}
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold uppercase text-rose-500">{trip.difficolta}</span>
                                <span className="text-xs text-slate-400">{trip.durata}</span>
                            </div>
                            <h3 className="text-xl font-bold first-letter:uppercase">{trip.slug} - {trip.titolo}</h3>
                            <Link
                                href={`/destinazioni/${trip.slug}`}
                                className="mt-4 block w-full py-2 border border-slate-200 rounded-lg text-sm font-semibold text-center hover:bg-slate-900 hover:text-white transition"
                            >
                                Vedi Dettagli
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}