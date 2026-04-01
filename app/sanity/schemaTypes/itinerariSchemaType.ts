import { defineType, defineField } from 'sanity'

export const itinerary = defineType({
  name: 'itinerary',
  title: 'Itinerary',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
    }),
    defineField({
      name: 'homeCarousel',
      title: 'Home Carousel',
      type: 'array',
      of: [{ type: 'number' }],
    }),
    defineField({
      name: 'durata',
      title: 'Durata',
      type: 'string',
    }),
    defineField({
      name: 'difficolta',
      title: 'Difficoltà',
      type: 'string',
      options: {
        list: ['Facile', 'Media', 'Difficile'],
      },
    }),
    defineField({
      name: 'immagine',
      title: 'Immagine principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // 👇 contenuto (paragrafi tipo il tuo string[])
    defineField({
      name: 'contenuto',
      title: 'Contenuto',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // 👇 punti di interesse (array di oggetti)
    defineField({
      name: 'pointsOfInterest',
      title: 'Punti di Interesse',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'titolo',
              title: 'Titolo',
              type: 'string',
            }),
            defineField({
              name: 'descrizione',
              title: 'Descrizione',
              type: 'text',
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'slug.current',
      subtitle: 'titolo',
      media: 'immagine',
    },
  }
})