import { defineConfig, isDev } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from '../app/sanity/schemaTypes' // Importa l'array

export default defineConfig({
  name: 'default',
  title: 'Mio Itinerario Studio',

  projectId: '0cx8zpgz',
  dataset: 'production',

  plugins: [

    structureTool(),    // Senza questo, non vedi l'icona "Structure"
    // sanity.config.ts

    presentationTool({
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : 'http://localhost:3000',
        draftMode: {
          enable: `/api/draft?secret=${process.env.SANITY_REVALIDATE_SECRET}`,
          disable: '/api/disable-draft',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes, // Qui carichiamo l'array con "itinerary"
  },

  vite: {
    optimizeDeps: {
      include: ['shallowequal', 'react-compiler-runtime', 'lodash/startCase.js'],
    }
  },
})