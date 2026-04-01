import { draftMode } from 'next/headers'
import { createClient } from 'next-sanity'

export async function getSanityClient() {
  const { isEnabled } = await draftMode()

  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: !isEnabled,
    token: isEnabled ? process.env.SANITY_API_READ_TOKEN : undefined,
    perspective: isEnabled ? 'previewDrafts' : 'published',
  })
}