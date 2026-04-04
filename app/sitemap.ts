import { MetadataRoute } from 'next'
import { client } from './sanity/sanityClient'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://itinerari-vivi.vercel.app'

  // Recuperiamo il nome della città e l'array degli itinerari
  const query = `*[_type == "city"]{
    name,
    listaItinerari[]{
      cityName,
      "_updatedAt": _updatedAt
    }
  }`

  const cities = await client.fetch(query)

  // Trasformiamo i nomi in segmenti URL validi (slugify)
  const itinerariUrls = cities.flatMap((city: any) => {
    const citySlug = city.name.toLowerCase()

    return {
        url: `${baseUrl}/${citySlug}`,
        lastModified: city._updatedAt ? new Date(city._updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...itinerariUrls,
  ]
}