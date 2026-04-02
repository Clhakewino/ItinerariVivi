import { createClient } from 'next-sanity'

export function getClient(preview: boolean) {
  return createClient({
    projectId: '0cx8zpgz',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    stega: {
    studioUrl: 'https://itinerari-vivi.sanity.studio', // your Studio URL
  },
  })
}