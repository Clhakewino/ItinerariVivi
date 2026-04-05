import { MetadataRoute } from 'next'
import { client } from './sanity/sanityClient'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://itinerari-vivi.vercel.app'

  const query = `*[_type == "city" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }`

  const cities = await client.fetch(query)

  // 2. Mappiamo l'array delle città in oggetti validi per la sitemap
  const itinerariUrls = cities.map((city: any) => {
    return {
      url: `${baseUrl}/${city.slug}`,
      lastModified: city._updatedAt ? new Date(city._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  })

  // Uniamo la home page con gli URL dinamici delle città
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    ...itinerariUrls,
  ]
}