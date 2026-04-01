import { createClient } from 'next-sanity'

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
}

// Client pubblico — usato nei Client Components e sitemap
export const sanityClient = createClient(config)

// Client server con draft mode — usato solo nei Server Components e Route Handlers
export async function getSanityClient() {
  const { draftMode } = await import('next/headers')
  const { isEnabled } = await draftMode()

  return createClient({
    ...config,
    useCdn: !isEnabled,
    token: isEnabled ? process.env.SANITY_API_READ_TOKEN : undefined,
    perspective: isEnabled ? 'previewDrafts' : 'published',
  })
}