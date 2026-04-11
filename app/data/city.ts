import { Itinerario } from "./itinerari";

export interface City {
  _id: string;
  name: string;
  slug: string;
  listaItinerari: Itinerario[];
}