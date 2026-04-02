import { MetadataRoute } from 'next'
import { client } from './sanity/sanityClient'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://itinerari-vivi.vercel.app'

  const itinerari = await client.fetch(`*[_type == "itinerary"]{ "slug": slug.current }`)

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...itinerari.map((i: any) => ({
      url: `${baseUrl}/destinazioni/${i.slug}`,
      lastModified: new Date(),
    })),
  ]
}