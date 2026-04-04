import { client } from './sanityClient'
import { Itinerario } from "../data/itinerari"
import { City } from "../data/city"


// Questa funzione sostituisce la costante ITINERARI_FULL
export async function getItinerari(): Promise<Itinerario[]> {
  const query = `*[_type == "city"]{
    name,
    listaItinerari,
    sezioneInfoUtili
  }`

  return await client.fetch(query)
}

// Se ti serve un singolo itinerario tramite lo slug
export async function getItinerarioByName(name: string): Promise<City> {
  const query = `*[_type == "city" && name == $name][0]{
  name,
  sezioneInfoUtili,
  listaItinerari[] {
    "_id": _key,
    "cityName": ^.name, // Risaliamo al nome della città padre
    sottotitolo,
    homeCarousel,
    durata,
    difficolta,
    "immagine": immagine.asset->url, // Trasformiamo l'asset in URL stringa
    contenuto,
    pointsOfInterest
  }
}`

  return await client.fetch(query, { name })
}

// Se ti servono itinerari di un preciso homeCarousel
export async function getItinerariWithId(idCarousel: number): Promise<any[]> {
  const query = `*[_type == "city"]{ "itinerari": listaItinerari[$idCarousel in homeCarousel] {
      "_id": _key,
      "cityName": ^.name,
      sottotitolo, // Assicurati che il campo si chiami 'titolo' nello schema
      homeCarousel,
      durata,
      difficolta,
      "immagine": immagine.asset->url,
      contenuto,
      pointsOfInterest
    }
  }.itinerari`;

  const results = await client.fetch(query, { idCarousel });

  return results ? results.flat().filter(Boolean) : [];
}

// Ricerca itinerari per titolo o contenuto
export async function searchItinerari(searchTerm: string): Promise<Itinerario[]> {
  const queryTerm = `${searchTerm}*`

  const query = `*[_type == "city"] {
  "itinerariTrovati": listaItinerari[
  ^.name match $queryTerm || // Cerca se il nome della città combacia
    sottotitolo match $queryTerm || 
    contenuto[].children[].text match $queryTerm
  ] {
    "_id": _key,
    "cityName": ^.name,
    sottotitolo, 
    homeCarousel,
    durata,
    difficolta,
    "immagine": immagine.asset->url,
    contenuto,
    pointsOfInterest
  }
}[count(itinerariTrovati) > 0].itinerariTrovati`

  const results = await client.fetch(query, { queryTerm })

  // Appiattiamo i risultati (flatMap gestisce meglio array di array potenzialmente nulli)
  return results ? results.flat() : []
}