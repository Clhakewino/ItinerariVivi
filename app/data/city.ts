import { Itinerario } from "./itinerari";

export interface City {
  _id: string;
  name: string;
  listaItinerari: Itinerario[];
  sezioneInfoUtili: any; // Puoi definire un tipo specifico se hai una struttura fissa per questa sezione
}