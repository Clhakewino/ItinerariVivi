import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
  stega: {
    studioUrl: 'https://itinerari-vivi.sanity.studio', // your Studio URL
  },
  token: process.env.SANITY_API_TOKEN,
})