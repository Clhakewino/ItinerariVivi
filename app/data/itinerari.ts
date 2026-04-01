export interface PointOfInterest {
  _key?: string; 
  titolo: string;
  descrizione: string;
}

export interface Itinerario {
  _id: string; 
  slug: string;
  titolo: string;
  homeCarousel: number[];
  durata: string;
  difficolta: string;
  immagine: string; // URL dell'immagine trasformato da Sanity
  contenuto: any;   // Se usi Portable Text (il builder di Sanity), usa 'any' o il tipo specifico di Sanity
  pointsOfInterest: PointOfInterest[]; 
}