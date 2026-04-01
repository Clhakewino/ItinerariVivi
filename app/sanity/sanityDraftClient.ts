// sanity/sanityDraftClient.ts
import { createClient } from 'next-sanity'

export const draftClient = createClient({
  projectId: '0cx8zpgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // sempre false per leggere draft
  token: process.env.SANITY_API_TOKEN, // questo dev'essere un token valido read draft
})