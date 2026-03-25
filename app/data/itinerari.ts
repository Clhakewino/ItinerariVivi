interface PointOfInterest {
  id: string | number;
  titolo: string;
  descrizione: string;
}

interface Itinerario {
  id: number;
  slug: string;
  titolo: string;
  durata: string;
  difficolta: string;
  immagine: string;
  contenuto: [string];
  pointsOfInterest: PointOfInterest[];
}

export const ITINERARI_FULL: Itinerario[] = [
  {
    id: 1,
    slug: "roma",
    titolo: "La Città Eterna",
    durata: "3 giorni",
    difficolta: "Facile",
    immagine: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1600&auto=format&fit=crop",
    contenuto: ["Camminare per Roma è come sfogliare un libro di storia che non finisce mai. Ogni sampietrino, ogni fontana e ogni rovina racconta di un impero che ha plasmato il mondo occidentale. Dalla maestosità del Colosseo alla spiritualità di San Pietro, Roma accoglie i visitatori con la sua calda luce dorata e una bellezza che sfida il tempo da oltre duemila anni."],
    pointsOfInterest: [
      {
        id: 1,
        titolo: "Il Colosseo e i Fori Imperiali",
        descrizione: "Il cuore pulsante dell'Antica Roma, dove la storia del gladiatori prende vita."
      },
      {
        id: 2,
        titolo: "Il Pantheon",
        descrizione: "Un prodigio dell'architettura romana con la cupola in cemento più grande del mondo."
      },
      {
        id: 3,
        titolo: "Fontana di Trevi",
        descrizione: "Lancia una moneta nell'acqua per assicurarti il ritorno in questa città magica."
      },
      {
        id: 4,
        titolo: "I Musei Vaticani e la Sistina",
        descrizione: "Uno scrigno che custodisce i capolavori di Michelangelo e Raffaello."
      },
      {
        id: 5,
        titolo: "Trastevere",
        descrizione: "Il quartiere più autentico, perfetto per una cena tipica tra vicoli e storia."
      },
      {
        id: 6,
        titolo: "Piazza di Spagna",
        descrizione: "La scalinata più famosa del mondo, punto d'incontro tra arte e alta moda."
      }
    ]
  },
  {
    id: 2,
    slug: "tokyo",
    titolo: "Caos ordinato, metropoli infinita",
    durata: "5 giorni",
    difficolta: "Media",
    immagine: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop",
    contenuto: ["Tokyo non è solo una città, è un intero universo. È un luogo dove i grattacieli più alti del mondo convivono armoniosamente con templi buddisti silenziosi e giardini zen perfettamente curati. Dalla frenesia dell'incrocio di Shibuya alla pace del Santuario Meiji, Tokyo offre un contrasto unico che non smette mai di stupire chi la visita per la prima volta."],
    pointsOfInterest: [
      {
        id: 1,
        titolo: "Shibuya Crossing",
        descrizione: "L'incrocio pedonale più trafficato al mondo, simbolo della Tokyo moderna."
      },
      {
        id: 2,
        titolo: "Akihabara",
        descrizione: "La \"Electric Town\", il paradiso per gli amanti di anime, manga e tecnologia."
      },
      {
        id: 3,
        titolo: "TeamLab Borderless",
        descrizione: "Lancia una moneta nell'acqua per assicurarti il ritorno in questa città magica."
      },
      {
        id: 4,
        titolo: "Senso-ji (Asakusa)",
        descrizione: "Il tempio più antico e iconico di Tokyo, dedicato alla dea Kannon."
      },
      {
        id: 5,
        titolo: "Shinjuku Gyoen",
        descrizione: "Uno dei parchi più belli della città, perfetto durante la fioritura dei ciliegi."
      },
      {
        id: 6,
        titolo: "Harajuku (Takeshita St)",
        descrizione: "Il centro della moda giovanile più creativa e stravagante del mondo."
      }
    ]
  },
  {
    id: 3,
    slug: "parigi",
    titolo: "Parigi - Ville Lumière",
    durata: "4 giorni",
    difficolta: "Facile",
    immagine: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
    contenuto: ["Parigi, la capitale della Francia, è una delle città più iconiche e visitate al mondo. Situata sulle rive della Senna, è famosa per la sua storia millenaria, l'architettura straordinaria, l'arte senza tempo e la sua rinomata cucina.", "Conosciuta come la \"Ville Lumière\" (Città delle Luci), Parigi incanta i visitatori con i suoi ampi viali, i caffè storici e l'atmosfera romantica che si respira in ogni angolo, dal quartiere artistico di Montmartre alle eleganti strade del Marais."],
    pointsOfInterest: [
      {
        id: 1,
        titolo: "Torre Eiffel",
        descrizione: "Il simbolo indiscusso di Parigi, che offre viste mozzafiato sulla città."
      },
      {
        id: 2,
        titolo: "Museo del Louvre",
        descrizione: "Uno dei musei più grandi e importanti al mondo, casa della Gioconda."
      },
      {
        id: 3,
        titolo: "Cattedrale di Notre-Dame",
        descrizione: "Un capolavoro dell'architettura gotica francese (attualmente in fase di restauro)."
      },
      {
        id: 4,
        titolo: "Arco di Trionfo e Champs-Élysées",
        descrizione: "Un monumento imponente che domina il celebre viale dello shopping."
      },
      {
        id: 5,
        titolo: "Sacre-Cœur e Montmartre",
        descrizione: "La basilica bianca che domina la città dal punto più alto, nel cuore del quartiere degli artisti."
      },
      {
        id: 6,
        titolo: "Museo d'Orsay",
        descrizione: "Famoso per la sua straordinaria collezione di arte impressionista e post-impressionista.v"
      }
    ]
  },
  {
    id: 4,
    slug: "barcellona",
    titolo: "L'Anima Mediterranea",
    durata: "4 giorni",
    difficolta: "Facile",
    immagine: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1600&auto=format&fit=crop",
    contenuto: ["Barcellona è una città che danza tra il passato medievale del Barrio Gótico e le visioni oniriche di Antoni Gaudí. È una metropoli vibrante dove la creatività esplode in ogni facciata di mosaico e in ogni mercato affollato come la Boqueria.", "Dalle spiagge dorate della Barceloneta alle vette del Tibidabo, la capitale catalana offre un mix perfetto di relax balneare, eccellenza gastronomica e un patrimonio artistico unico al mondo che la rende indimenticabile."],
    pointsOfInterest: [
      {
        id: 1,
        titolo: "Sagrada Família",
        descrizione: "Il capolavoro incompiuto di Gaudí, una foresta di pietra e luce."
      },
      {
        id: 2,
        titolo: "Parco Güell",
        descrizione: "Un giardino fiabesco con viste mozzafiato sulla città e sul mare."
      },
      {
        id: 3,
        titolo: "Las Ramblas",
        descrizione: "Il viale più famoso, cuore pulsante della vita sociale cittadina."
      },
      {
        id: 4,
        titolo: "Casa Batlló",
        descrizione: "Un'esplosione di colori e forme organiche ispirate all'oceano."
      }
    ]
  },
  {
    id: 5,
    slug: "kyoto",
    titolo: "Il Cuore Spirituale del Giappone",
    durata: "5 giorni",
    difficolta: "Media",
    immagine: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop",
    contenuto: ["\"<em>A Kyoto, il tempo non scorre, ma respira tra le pareti di carta e i giardini di pietra.</em>\"", "", "Con oltre duemila templi e santuari, Kyoto è il custode millenario delle arti classiche giapponesi. Dalla cerimonia del tè alle silenziose strade di Gion dove camminano le Geisha, ogni angolo di questa città è un invito alla contemplazione e alla bellezza sobria (Wabi-sabi)."],
    pointsOfInterest: [
      {
        id: 1,
        titolo: "Kinkaku-ji",
        descrizione: "Il celebre Padiglione d'Oro che si specchia elegantemente nel laghetto circostante."
      },
      {
        id: 2,
        titolo: "Foresta di Bambù",
        descrizione: "Ad Arashiyama, un sentiero incantato dove il vento sussurra tra le alte canne di bambù."
      },
      {
        id: 3,
        titolo: "Fushimi Inari-taisha",
        descrizione: "Migliaia di portali Torii rossi che formano un tunnel infinito attraverso la foresta sacra."
      },
      {
        id: 4,
        titolo: "Kiyomizu-dera",
        descrizione: "Un maestoso tempio in legno costruito senza l'uso di chiodi, con vista panoramica sulla città."
      }
    ]
  },
  {
    id: 6,
    slug: "newyork",
    titolo: "Il Centro del Mondo",
    durata: "4 giorni",
    difficolta: "Facile",
    immagine: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1600&auto=format&fit=crop",
    contenuto: ["New York City è un'esplosione di energia, cultura e ambizione. Divisa in cinque distretti, Manhattan ne rappresenta il cuore pulsante, dove ogni strada sembra il set di un film famoso.", "Dallo skyline mozzafiato dominato dall'Empire State Building alla quiete inaspettata di Central Park, NYC offre un'esperienza sensoriale totale, tra i suoni dei taxi, le luci di Broadway e i profumi delle cucine di tutto il mondo."],
    pointsOfInterest: [
      {
        id: 1,
        titolo: "Statua della Libertà",
        descrizione: "Il simbolo universale di libertà e accoglienza."
      },
      {
        id: 2,
        titolo: "Times Square",
        descrizione: "L'incrocio di luci più famoso del pianeta."
      },
      {
        id: 3,
        titolo: "Central Park",
        descrizione: "843 acri di verde nel mezzo della foresta di cemento."
      },
      {
        id: 4,
        titolo: "Brooklyn Bridge",
        descrizione: "Una passeggiata iconica tra due mondi."
      },
      {
        id: 5,
        titolo: "Top of the Rock",
        descrizione: "La vista migliore sull'Empire e l'intera isola."
      }
    ]
  },
];