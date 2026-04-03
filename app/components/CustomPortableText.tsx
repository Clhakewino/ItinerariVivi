import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from '@/app/sanity/sanityClient';

// Configura il builder per le immagini (sostituisci con i tuoi dati o usa il tuo client Sanity)
const builder = createImageUrlBuilder(client);

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-10 -mx-4 md:-mx-10">
          <div className="max-w-4xl mx-auto">
            <Image
              src={builder.image(value).width(1200).url()}
              alt={value.alt || 'Immagine'}
              width={1200}
              height={675}
              sizes="100vw"
              className="rounded-2xl shadow-lg object-cover w-full h-auto"
            />
          </div>

          {value.caption && (
            <p className="text-center text-sm text-slate-500 mt-3 italic px-6 md:px-10">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },

  // 👇 AGGIUNGI QUESTE SEZIONI PER TITOLI E LISTE
  block: {
    h1: ({ children }) => <h1 className="text-5xl font-extrabold text-slate-900 mt-12 mb-6 tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-4xl font-bold text-slate-800 mt-10 mb-5 tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-3xl font-semibold text-slate-800 mt-8 mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-2xl font-semibold text-slate-800 mt-6 mb-3">{children}</h4>,
    h5: ({ children }) => <h5 className="text-xl font-semibold text-slate-800 mt-4 mb-2">{children}</h5>,
    h6: ({ children }) => <h6 className="text-lg font-semibold text-slate-800 mt-3 mb-1">{children}</h6>,
    normal: ({ children }) => <p className="text-base leading-relaxed text-slate-700 mb-6">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-rose-500 pl-4 italic my-8 text-slate-600 bg-slate-50 p-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },

  list: {
    // Gestisce <ul>
    bullet: ({ children }) => <ul className="list-disc list-inside ml-4 mb-6 space-y-2 text-slate-700">{children}</ul>,
    // Gestisce <ol>
    number: ({ children }) => <ol className="list-decimal list-inside ml-4 mb-6 space-y-2 text-slate-700">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li className="marker:text-rose-500">{children}</li>,
    number: ({ children }) => <li className="marker:font-bold">{children}</li>,
  },

  marks: {
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
    link: ({ children, value }) => (
      <a href={value.href} className="text-rose-600 underline hover:text-rose-700 transition-colors">
        {children}
      </a>
    ),
  },
};

export default function CustomPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}