import { MetadataRoute } from 'next'
import { ITINERARI_FULL } from './data/itinerari';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://itinerari-vivi.vercel.app';

  // rotte statiche (Home, Chi Siamo, ecc.)
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // Genera dinamicamente le rotte per le destinazioni
  
  const dynamicRoutes = ITINERARI_FULL.map((citta) => ({
    url: `${baseUrl}/destinazioni/${citta.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}