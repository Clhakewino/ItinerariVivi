import { getClient } from './sanityClient'
import { Itinerario } from "../data/itinerari"
import { getSanityClient } from '@/sanity/lib/sanity'


// Questa funzione sostituisce la costante ITINERARI_FULL
export async function getItinerari(isDraft: boolean): Promise<Itinerario[]> {
  const client = await getSanityClient() 
  const query = `*[_type == "itinerary"]{
    _id,
    "slug": slug.current,
    titolo,
    homeCarousel,
    durata,
    difficolta,
    "immagine": immagine.asset->url,
    contenuto,
    pointsOfInterest
  }`

  return await client.fetch(query, {}, { perspective: isDraft ? 'previewDrafts' : 'published' })
}

// Se ti serve un singolo itinerario tramite lo slug
export async function getItinerarioBySlug(slug: string, isDraft: boolean): Promise<Itinerario> {
  const client = await getSanityClient() 
  const query = `*[_type == "itinerary" && slug.current == $slug][0]{
    _id,
    "slug": slug.current,
    titolo,
    homeCarousel,
    durata,
    difficolta,
    "immagine": immagine.asset->url,
    contenuto,
    pointsOfInterest
  }`

  return await client.fetch(query, { slug: slug }, { perspective: isDraft ? 'previewDrafts' : 'published' })
}

// Se ti servono itinerari di un preciso homeCarousel
export async function getItinerariWithId(idCarousel: number, isDraft: boolean): Promise<Itinerario[]> {
  const client = await getSanityClient()
  const query = `*[_type == "itinerary" && $idCarousel in homeCarousel]{
    _id,
    "slug": slug.current,
    titolo,
    homeCarousel,
    durata,
    difficolta,
    "immagine": immagine.asset->url,
    contenuto,
    pointsOfInterest
  }`

  return await client.fetch(query, { idCarousel }, { perspective: isDraft ? 'previewDrafts' : 'published' })
}

// Ricerca itinerari per titolo o contenuto
export async function searchItinerari(searchTerm: string, isDraft: boolean): Promise<Itinerario[]> {
  const client = await getSanityClient()
  // Aggiungiamo un asterisco alla fine del termine per cercare "inizia con" (es. "rom" trova "roma")
  const query = `*[_type == "itinerary" && (slug.current match $searchTerm + "*" || titolo match $searchTerm + "*" || contenuto match $searchTerm + "*")]{
    _id,
    "slug": slug.current,
    titolo,
    homeCarousel,
    durata,
    difficolta,
    "immagine": immagine.asset->url,
    contenuto,
    pointsOfInterest
  }`

  return await client.fetch(query, { searchTerm }, { perspective: isDraft ? 'previewDrafts' : 'published' })
}