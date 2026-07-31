import kalasayaImg from '../assets/image/map/kalasaya.png';
import penonImg from '../assets/image/map/penon.png';
import temploImg from '../assets/image/map/templo.png';
import plazaImg from '../assets/image/map/plaza.png';
import museoImg from '../assets/image/map/museo.png';

export const pucaraAttractions = [
  {
    id: "kalasaya",
    title: {
      es: "Complejo Arqueológico Kalasaya",
      en: "Kalasaya Archaeological Complex"
    },
    subtitle: {
      es: "Templo Sagrado de la Cultura Pucará (Lampa, Puno)",
      en: "Sacred Temple of the Pucará Culture (Lampa, Puno)"
    },
    description: {
      es: "Un impresionante centro ceremonial pre-inca caracterizado por sus plataformas escalonadas, patios hundidos e imponentes estructuras de piedra roja que datan del 200 a.C. Es el epicentro arqueológico del altiplano de Puno.",
      en: "An impressive pre-Inca ceremonial center characterized by its stepped platforms, sunken courtyards, and imposing red stone structures dating back to 200 B.C. It is the archaeological epicenter of the Puno highlands."
    },
    image: kalasayaImg,
    duration: {
      es: "2.5 horas",
      en: "2.5 hours"
    },
    altitude: {
      es: "3,880 msnm",
      en: "3,880 masl"
    },
    highlight: {
      es: "Patio Hundido y monolitos grabados",
      en: "Sunken Court and engraved monoliths"
    }
  },
  {
    id: "museo-litico",
    title: {
      es: "Museo Lítico de Pucará",
      en: "Pucará Lytic Museum"
    },
    subtitle: {
      es: "Guardianes de la Piedra y la Historia",
      en: "Guardians of Stone and History"
    },
    description: {
      es: "Alberga una magnífica colección de esculturas zoomorfas y antropomorfas en piedra de la cultura Pucará, incluyendo la famosa estela del 'Degollador' (Hatun Ñakaj) y estelas ceremoniales.",
      en: "It houses a magnificent collection of zoomorphic and anthropomorphic stone sculptures from the Pucará culture, including the famous 'Degollador' (Hatun Ñakaj) stela and ceremonial stelas."
    },
    image: museoImg,
    duration: {
      es: "1.5 horas",
      en: "1.5 hours"
    },
    altitude: {
      es: "3,860 msnm",
      en: "3,860 masl"
    },
    highlight: {
      es: "Estela del Degollador y Monolitos de Rayo",
      en: "Decapitator Stela and Lightning Monoliths"
    }
  },
  {
    id: "talleres-alfareria",
    title: {
      es: "Talleres de Alfarería Tradicional",
      en: "Traditional Pottery Workshops"
    },
    subtitle: {
      es: "El Alma de la Tierra en tus Manos",
      en: "The Soul of the Earth in Your Hands"
    },
    description: {
      es: "Visita los talleres familiares donde los maestros artesanos de Pucará moldean el barro rojo del altiplano para dar vida al célebre Torito de Pucará. Participa en el moldeado y pintado manual.",
      en: "Visit the family workshops where the master artisans of Pucará mold the red clay of the highlands to give life to the famous Torito de Pucará. Participate in manual molding and painting."
    },
    image: plazaImg,
    duration: {
      es: "2 horas",
      en: "2 hours"
    },
    altitude: {
      es: "3,860 msnm",
      en: "3,860 masl"
    },
    highlight: {
      es: "Taller vivencial y modelado manual",
      en: "Hands-on workshop and manual modeling"
    }
  },
  {
    id: "templo-santa-isabel",
    title: {
      es: "Templo de Santa Isabel de Pucará",
      en: "Santa Isabel Temple of Pucará"
    },
    subtitle: {
      es: "Sincretismo Colonial y Piedra Roja",
      en: "Colonial Syncretism and Red Stone"
    },
    description: {
      es: "Construido en el siglo XVIII por los jesuitas sobre cimientos incas en la provincia de Lampa. Destaca por su fachada de piedra rojiza tallada con motivos barrocos-andinos y su amplia plaza.",
      en: "Built in the 18th century by the Jesuits on Inca foundations in the province of Lampa. It stands out for its reddish stone facade carved with Baroque-Andean motifs and its wide square."
    },
    image: temploImg,
    duration: {
      es: "1 hora",
      en: "1 hour"
    },
    altitude: {
      es: "3,860 msnm",
      en: "3,860 masl"
    },
    highlight: {
      es: "Fachada de piedra rojiza tallada",
      en: "Carved reddish stone facade"
    }
  },
  {
    id: "penon-pucara",
    title: {
      es: "El Peñón Mirador de Pucará",
      en: "The Pucará Lookout"
    },
    subtitle: {
      es: "Mirador Natural del Altiplano Puneño",
      en: "Natural Lookout of the Puno Altiplano"
    },
    description: {
      es: "Una gigantesca formación rocosa que domina el paisaje de Pucará. Un sendero de caminata ligera lleva a la cima, ofreciendo vistas panorámicas de 360° sobre las pampas andinas de Puno.",
      en: "A gigantic rock formation that dominates the landscape of Pucará. A light hiking trail leads to the summit, offering 360° panoramic views over the Andean plains of Puno."
    },
    image: penonImg,
    duration: {
      es: "2 horas (caminata)",
      en: "2 hours (hike)"
    },
    altitude: {
      es: "4,050 msnm (cima)",
      en: "4,050 masl (summit)"
    },
    highlight: {
      es: "Vistas de 360° y senderos místicos",
      en: "360° views and mystical trails"
    }
  }
];

export const suggestedRoutes = [
  {
    id: "express",
    name: {
      es: "Pucará Express",
      en: "Pucará Express"
    },
    duration: {
      es: "Medio día (4 horas)",
      en: "Half day (4 hours)"
    },
    interest: "cultura",
    description: {
      es: "Ideal para viajeros que transitan por la ruta Puno-Cusco que desean comprender la esencia histórica de Pucará y Lampa.",
      en: "Ideal for travelers on the Puno-Cusco route who wish to understand the historical essence of Pucará and Lampa."
    },
    steps: [
      { time: "08:00", title: { es: "Llegada a Pucará", en: "Arrival in Pucará" }, desc: { es: "Arribo a Pucará desde Puno o Juliaca. Desayuno rápido andino.", en: "Arrive in Pucará from Puno or Juliaca. Quick Andean breakfast." } },
      { time: "08:45", title: { es: "Museo Lítico de Pucará", en: "Pucará Lytic Museum" }, desc: { es: "Exploración guiada de los monolitos y la estela del Degollador.", en: "Guided exploration of the monoliths and the Decapitator stela." } },
      { time: "10:15", title: { es: "Complejo Kalasaya", en: "Kalasaya Complex" }, desc: { es: "Visita al gran patio hundido y el templo ceremonial Pucará.", en: "Visit the large sunken court and the Pucará ceremonial temple." } },
      { time: "12:00", title: { es: "Plaza de Armas y Templos", en: "Main Square and Temples" }, desc: { es: "Paseo por el Templo de Santa Isabel y talleres alfareros.", en: "Walk around the Santa Isabel Temple and pottery workshops." } }
    ]
  },
  {
    id: "artesanal",
    name: {
      es: "Sabores y Alfarería de Pucará",
      en: "Flavors and Pottery of Pucará"
    },
    duration: {
      es: "1 Día completo (8 horas)",
      en: "1 Full Day (8 hours)"
    },
    interest: "artesania",
    description: {
      es: "Una inmersión profunda en la tradición cerámica y la gastronomía local del altiplano de Puno.",
      en: "A deep immersion in the ceramic tradition and local gastronomy of the Puno highlands."
    },
    steps: [
      { time: "09:00", title: { es: "Arribo e Histórico", en: "Arrival and History" }, desc: { es: "Visita al Templo colonial de Santa Isabel y plaza tradicional.", en: "Visit the colonial Santa Isabel Temple and traditional square." } },
      { time: "10:00", title: { es: "Taller Vivencial de Cerámica", en: "Experiential Ceramics Workshop" }, desc: { es: "Pintado de tu propio Torito de Pucará guiado por un maestro alfarero.", en: "Paint your own Torito de Pucará guided by a master potter." } },
      { time: "12:30", title: { es: "Almuerzo Típico Andino", en: "Typical Andean Lunch" }, desc: { es: "Degustación de trucha frita, sopa de quinua y mates de hierbas locales.", en: "Tasting of fried trout, quinoa soup, and local herb teas." } },
      { time: "14:00", title: { es: "Complejo Kalasaya y Museo", en: "Kalasaya Complex and Museum" }, desc: { es: "Tour arqueológico completo por las terrazas del templo y la colección lítica.", en: "Complete archaeological tour of the temple terraces and lytic collection." } },
      { time: "16:30", title: { es: "Degustación de Quesos", en: "Cheese Tasting" }, desc: { es: "Parada en el mercado local para probar quesos tradicionales de Lampa.", en: "Stop at the local market to taste traditional Lampa cheeses." } }
    ]
  },
  {
    id: "aventura",
    name: {
      es: "Aventura Mística Kalasaya & Peñón",
      en: "Mystical Adventure Kalasaya & Lookout"
    },
    duration: {
      es: "2 Días (Fin de Semana)",
      en: "2 Days (Weekend)"
    },
    interest: "aventura",
    description: {
      es: "Para exploradores que desean senderismo, rituales andinos y contemplar los cielos estrellados del altiplano puneño.",
      en: "For explorers who want hiking, Andean rituals, and to contemplate the starry skies of the Puno highlands."
    },
    steps: [
      { time: "Día 1 - 09:00", title: { es: "Ascenso al Peñón de Pucará", en: "Ascent to the Pucará Lookout" }, desc: { es: "Trekking guiado hacia la cima del peñón con ritual de pago a la Pachamama.", en: "Guided trek to the summit of the lookout with a payment ritual to Pachamama." } },
      { time: "Día 1 - 13:00", title: { es: "Almuerzo de Campaña", en: "Campaign Lunch" }, desc: { es: "Comida andina al aire libre con vista panorámica de la cordillera.", en: "Andean meal outdoors with a panoramic view of the mountain range." } },
      { time: "Día 1 - 15:30", title: { es: "Visita Arqueológica Kalasaya", en: "Kalasaya Archaeological Visit" }, desc: { es: "Recorrido al atardecer por el complejo místico.", en: "Sunset tour of the mystical complex." } },
      { time: "Día 1 - 19:00", title: { es: "Cena y Fogata Ancestral", en: "Dinner and Ancestral Campfire" }, desc: { es: "Pernocte en homestay local con narración de leyendas quechuas y aymaras.", en: "Overnight stay in a local homestay with storytelling of Quechua and Aymara legends." } },
      { time: "Día 2 - 08:30", title: { es: "Taller de Alfarería", en: "Pottery Workshop" }, desc: { es: "Moldeado directo de arcilla andina en horno de leña.", en: "Direct molding of Andean clay in a wood-fired oven." } },
      { time: "Día 2 - 11:30", title: { es: "Museo Lítico y Despedida", en: "Lytic Museum and Farewell" }, desc: { es: "Visita al museo de sitio y almuerzo de despedida.", en: "Visit the site museum and farewell lunch." } }
    ]
  }
];

export const toritoColors = [
  {
    color: "original",
    hex: "#e4ceb1",
    name: { es: "Original / Arcilla Base", en: "Original / Raw Clay" },
    meaning: { es: "Los acabados originales de tierra andina cruda de Pucará antes de pasar por los pigmentos decorativos.", en: "The original finishes of raw Andean earth of Pucará before going through decorative pigments." },
    symbolizes: { es: ["Autenticidad", "Tierra", "Herencia"], en: ["Authenticity", "Earth", "Heritage"] },
    story: { es: "Representa el Torito en su estado primitivo de arcilla cocida, honrando la tierra de Puno.", en: "Represents the Torito in its primitive baked clay state, honoring the land of Puno." }
  },
  {
    color: "rojo",
    hex: "#c85833",
    name: { es: "Arcilla Terracota", en: "Terracotta Clay" },
    meaning: { es: "Fuerza vital, amor familiar y protección del hogar. Color sagrado que representa la tierra altiplánica.", en: "Vital strength, family love, and protection of the home. Sacred color representing the highland land." },
    symbolizes: { es: ["Amor", "Protección", "Fuerza de la Tierra"], en: ["Love", "Protection", "Earth Power"] },
    story: { es: "Se coloca tradicionalmente en los tejados de las casas en Pucará y Lampa para resguardar a las familias.", en: "It is traditionally placed on the rooftops of houses in Pucará and Lampa to protect families." }
  },
  {
    color: "amarillo",
    hex: "#cc9c56",
    name: { es: "Oro Cenizo / Bronce", en: "Ash Gold / Bronze" },
    meaning: { es: "Prosperidad, sabiduría y luz espiritual. Representa la energía madura del sol sobre el altiplano.", en: "Prosperity, wisdom, and spiritual light. Represents the mature energy of the sun over the high plateau." },
    symbolizes: { es: ["Sabiduría", "Abundancia", "Energía Solar"], en: ["Wisdom", "Abundance", "Solar Energy"] },
    story: { es: "Llamado a atraer el éxito financiero, la buena cosecha y el optimismo espiritual.", en: "A call to attract financial success, good harvests, and spiritual optimism." }
  },
  {
    color: "verde",
    hex: "#6a7b51",
    name: { es: "Verde Ichu / Musgo", en: "Ichu Green / Moss" },
    meaning: { es: "Salud, curación y equilibrio con la naturaleza del altiplano. Conexión directa con la Pachamama.", en: "Health, healing, and balance with the nature of the high plateau. Direct connection with Pachamama." },
    symbolizes: { es: ["Salud", "Conexión Natural", "Esperanza"], en: ["Health", "Natural Connection", "Hope"] },
    story: { es: "Vinculado a las hojas de coca ceremoniales, promueve la curación y la armonía ecológica.", en: "Linked to ceremonial coca leaves, it promotes healing and ecological harmony." }
  },
  {
    color: "blanco",
    hex: "#dfdcd4",
    name: { es: "Piedra Tiza / Blanco", en: "Chalk Stone / White" },
    meaning: { es: "Paz, reconciliación y claridad mental. Purifica las energías familiares.", en: "Peace, reconciliation, and mental clarity. Purifies family energies." },
    symbolizes: { es: ["Paz", "Pureza", "Claridad"], en: ["Peace", "Purity", "Clarity"] },
    story: { es: "Inspirado en la piedra de tiza y las cumbres nevadas de la cordillera de Puno.", en: "Inspired by chalk stone and the snowy peaks of the Puno mountain range." }
  },
  {
    color: "negro",
    hex: "#1d1a1b",
    name: { es: "Obsidiana / Negro", en: "Obsidian / Black" },
    meaning: { es: "Escudo protector impenetrable contra la envidia y energías negativas externas.", en: "Impenetrable protective shield against envy and external negative energies." },
    symbolizes: { es: ["Protección Extrema", "Fuerza Interior", "Silencio"], en: ["Extreme Protection", "Inner Strength", "Silence"] },
    story: { es: "Actúa como un imán que absorbe y disuelve energías pesadas antes de que entren al hogar.", en: "Acts as a magnet that absorbs and dissolves heavy energies before they enter the home." }
  },
  {
    color: "celeste",
    hex: "#6b8ea2",
    name: { es: "Azul Titicaca / Celeste", en: "Titicaca Blue / Light Blue" },
    meaning: { es: "Lealtad, viajes protegidos y fluidez. Representa las aguas sagradas del Lago Titicaca en Puno.", en: "Loyalty, protected travels, and fluidity. Represents the sacred waters of Lake Titicaca in Puno." },
    symbolizes: { es: ["Viajes Seguros", "Fluidez", "Lealtad"], en: ["Safe Travels", "Fluidity", "Loyalty"] },
    story: { es: "Asegura que la prosperidad fluya pacíficamente como los ríos altiplánicos.", en: "Ensures that prosperity flows peacefully like highland rivers." }
  }
];

export const pucaraFestivals = [
  {
    id: "carnavales",
    name: { es: "Carnavales de Pucará", en: "Carnivals of Pucará" },
    date: { es: "Febrero / Marzo (Movible)", en: "February / March (Movable)" },
    description: { es: "Una de las celebraciones más coloridas del altiplano puneño. Danzas folklóricas como la Wifala, trajes bordados a mano, desfiles de comparsas y el tradicional cortamonte en la plaza central de Pucará.", en: "One of the most colorful celebrations of the Puno high plateau. Folk dances like the Wifala, hand-embroidered costumes, parades, and the traditional cortamonte in the main square of Pucará." },
    image: plazaImg,
    highlight: { es: "Danza de las Wifalas y rituales de agradecimiento", en: "Wifalas dance and gratitude rituals" }
  },
  {
    id: "identidad",
    name: { es: "Día de la Identidad Pucareña", en: "Pucará Identity Day" },
    date: { es: "15 de Junio", en: "June 15" },
    description: { es: "El día central que rinde homenaje a los artesanos y la historia de la cultura Pucará en la provincia de Lampa. Ferias nacionales de cerámica tradicional y pasacalles.", en: "The main day that pays tribute to the artisans and history of the Pucará culture in the province of Lampa. National traditional ceramics fairs and parades." },
    image: museoImg,
    highlight: { es: "Feria Nacional de Cerámica y concursos de alfarería", en: "National Ceramics Fair and pottery contests" }
  },
  {
    id: "carmen",
    name: { es: "Festividad de la Virgen del Carmen", en: "Feast of the Virgin of Carmen" },
    date: { es: "16 de Julio", en: "July 16" },
    description: { es: "La festividad religiosa principal de Pucará. Combina el fervor católico colonial con las danzas nativas y la bendición masiva de los Toritos de Pucará en el Templo colonial de Santa Isabel.", en: "The main religious festival of Pucará. It combines colonial Catholic fervor with native dances and the massive blessing of the Toritos de Pucará at the colonial Santa Isabel Temple." },
    image: temploImg,
    highlight: { es: "Pasacalles folklóricos y bendición de Toritos", en: "Folk parades and blessing of Toritos" }
  },
  {
    id: "capac-raymi",
    name: { es: "Cápac Raymi & Solsticio Andino", en: "Cápac Raymi & Andean Solstice" },
    date: { es: "21 de Diciembre", en: "December 21" },
    description: { es: "Una antigua celebración incaica que marca el solsticio de invierno. El Complejo Ceremonial de Kalasaya es el centro de rituales místicos de pago a la tierra.", en: "An ancient Inca celebration marking the winter solstice. The Kalasaya Ceremonial Complex is the center of mystical earth payment rituals." },
    image: kalasayaImg,
    highlight: { es: "Ceremonias de Pago a la Tierra en Kalasaya al amanecer", en: "Earth payment ceremonies at Kalasaya at dawn" }
  }
];

export const combinedTours = [
  {
    id: "lampa-ayaviri",
    name: { es: "Ruta del Norte: Pucará, Lampa y Ayaviri", en: "Northern Route: Pucará, Lampa, and Ayaviri" },
    duration: { es: "1 Día Completo (12 horas)", en: "1 Full Day (12 hours)" },
    route: { es: "Puno/Juliaca ➔ Pucará ➔ Lampa ➔ Ayaviri ➔ Puno/Juliaca", en: "Puno/Juliaca ➔ Pucará ➔ Lampa ➔ Ayaviri ➔ Puno/Juliaca" },
    description: { es: "Explora la alfarería de Pucará por la mañana; luego visita Lampa, la 'Ciudad Rosada', famosa por su réplica de la Piedad de Miguel Ángel y sus catacumbas; y finaliza degustando el Cancacho en Ayaviri.", en: "Explore the pottery of Pucará in the morning; then visit Lampa, the 'Pink City', famous for its replica of Michelangelo's Pieta and catacombs; and end by tasting Cancacho in Ayaviri." },
    highlight: { es: "Alfarería, Catacumbas coloniales y gastronomía de Cancacho.", en: "Pottery, colonial catacombs, and Cancacho gastronomy." }
  },
  {
    id: "titicaca-pucara",
    name: { es: "Legado Andino: Uros, Titicaca y Pucará", en: "Andean Legacy: Uros, Titicaca, and Pucará" },
    duration: { es: "2 Días / 1 Noche", en: "2 Days / 1 Night" },
    route: { es: "Día 1: Uros & Taquile ➔ Día 2: Pucará & Kalasaya", en: "Day 1: Uros & Taquile ➔ Day 2: Pucará & Kalasaya" },
    description: { es: "Combina la magia acuática del Lago Titicaca en Puno con la historia arqueológica terrestre del Complejo Kalasaya y los museos de Pucará.", en: "Combines the aquatic magic of Lake Titicaca in Puno with the terrestrial archaeological history of the Kalasaya Complex and the museums of Pucará." },
    highlight: { es: "Navegación en el Titicaca y tour arqueológico pre-inca.", en: "Titicaca navigation and pre-Inca archaeological tour." }
  }
];

export const mainTourPackages = [
  {
    id: "full-day",
    badge: { es: "Más Popular", en: "Most Popular" },
    name: { es: "Paquete 1 Full Day: Pucará & Lampa Ancestral", en: "Package 1 Full Day: Pucará & Ancestral Lampa" },
    duration: { es: "1 Día (08:00 AM - 05:30 PM)", en: "1 Day (08:00 AM - 05:30 PM)" },
    price: "S/ 120",
    unit: { es: "por persona", en: "per person" },
    image: temploImg,
    description: { es: "Una jornada completa para conocer la historia, alfarería y patrimonio pre-inca e inca del norte de Puno.", en: "A full day to learn about the history, pottery, and pre-Inca and Inca heritage of northern Puno." },
    includes: {
      es: [
        "Transporte privado Puno / Juliaca ➔ Pucará ➔ Lampa ➔ Puno",
        "Guía oficial de turismo especializado en historia pre-inca",
        "Boleto de entrada al Complejo Arqueológico Kalasaya y Museo Lítico",
        "Taller vivencial de modelado de Torito en arcilla con maestro alfarero",
        "Almuerzo buffet andino (opciones vegetarianas disponibles)",
        "Recorrido histórico por la plaza y Templo de Santa Isabel"
      ],
      en: [
        "Private transport Puno / Juliaca ➔ Pucará ➔ Lampa ➔ Puno",
        "Certified official tour guide specialized in pre-Inca history",
        "Entry ticket to the Kalasaya Archaeological Complex and Lytic Museum",
        "Hands-on Torito clay molding workshop with a master potter",
        "Andean buffet lunch (vegetarian options available)",
        "Historical tour of the main square and Santa Isabel Temple"
      ]
    },
    itinerary: {
      es: [
        "08:00 AM — Partida desde Puno / Juliaca hacia Pucará",
        "09:30 AM — Visita guiada al Complejo Arqueológico Kalasaya y Pirámide de Piedra Roja",
        "11:30 AM — Recorrido por el Museo Lítico y estela del Hatun Ñakaj",
        "01:00 PM — Almuerzo buffet típico altiplánico",
        "02:30 PM — Taller vivencial alfarero: moldea tu propio Torito de Pucará",
        "04:00 PM — Breve visita a Lampa 'La Ciudad Rosada' y retorno"
      ],
      en: [
        "08:00 AM — Departure from Puno / Juliaca to Pucará",
        "09:30 AM — Guided visit to the Kalasaya Archaeological Complex and Red Stone Pyramid",
        "11:30 AM — Tour of the Lytic Museum and Hatun Ñakaj stela",
        "01:00 PM — Typical highland buffet lunch",
        "02:30 PM — Experiential pottery workshop: mold your own Torito de Pucará",
        "04:00 PM — Brief visit to Lampa 'The Pink City' and return"
      ]
    }
  },
  {
    id: "dos-dias",
    badge: { es: "Experiencia Completa", en: "Complete Experience" },
    name: { es: "Paquete 2 Días / 1 Noche: Altiplano Mágico & Estrellas", en: "Package 2 Days / 1 Night: Magical Altiplano & Stars" },
    duration: { es: "2 Días / 1 Noche", en: "2 Days / 1 Night" },
    price: "S/ 260",
    unit: { es: "por persona", en: "per person" },
    image: kalasayaImg,
    description: { es: "Sumérgete en la tranquilidad del altiplano, contempla el atardecer en el Peñón y acampa o hospédate bajo cielos estrellados.", en: "Immerse yourself in the tranquility of the high plateau, watch the sunset at the Lookout, and camp or stay under starry skies." },
    includes: {
      es: [
        "Todo lo incluido en el Paquete Full Day",
        "1 Noche de hospedaje tradicional o homestay vivencial en Pucará",
        "Trekking guiado al Peñón Mirador de Pucará para ver el atardecer",
        "Cena tradicional altiplánica con fogata y narración de mitos andinos",
        "Desayuno artesanal con pan de quinua, quesos locales y mates medicinales",
        "Visita exclusiva a talleres rurales de alfarería sin aglomeraciones"
      ],
      en: [
        "Everything included in the Full Day Package",
        "1 Night of traditional lodging or experiential homestay in Pucará",
        "Guided trek to the Pucará Lookout to watch the sunset",
        "Traditional highland dinner with a campfire and Andean myths storytelling",
        "Artisanal breakfast with quinoa bread, local cheeses, and medicinal teas",
        "Exclusive visit to rural pottery workshops without crowds"
      ]
    },
    itinerary: {
      es: [
        "DÍA 1 — Mañana: Kalasaya + Museo Lítico. Tarde: Taller alfarero + Trekking al Peñón Mirador al atardecer. Noche: Fogata y cena.",
        "DÍA 2 — Mañana: Desayuno artesanal + Paseo por la plaza colonial + Ruta a Lampa (Catacumbas y réplica de La Piedad). Tarde: Retorno a Puno."
      ],
      en: [
        "DAY 1 — Morning: Kalasaya + Lytic Museum. Afternoon: Pottery workshop + Trek to the Lookout for sunset. Night: Campfire and dinner.",
        "DAY 2 — Morning: Artisanal breakfast + Walk through the colonial square + Route to Lampa (Catacombs & replica of Pieta). Afternoon: Return to Puno."
      ]
    }
  },
  {
    id: "paquete-mistico",
    badge: { es: "Místico & Sagrado", en: "Mystical & Sacred" },
    name: { es: "Paquete Místico: Ritual de Pago a la Pachamama & Energías", en: "Mystical Package: Pago a la Pachamama Ritual & Energies" },
    duration: { es: "1 Día Especial / Experiencia Mística", en: "1 Special Day / Mystical Experience" },
    price: "S/ 190",
    unit: { es: "por persona", en: "per person" },
    image: penonImg,
    description: { es: "Una experiencia espiritual diseñada para conectar con las energías sagradas del agua, la tierra y la protección andina.", en: "A spiritual experience designed to connect with the sacred energies of water, earth, and Andean protection." },
    includes: {
      es: [
        "Transporte místico privado desde Puno o Juliaca",
        "Chamán / Pacco / Yatiri andino para la ceremonia sagrada",
        "Mesa ritual completa de ofrenda a la Pachamama y Apus con hojas de coca selectas",
        "Limpieza energética ceremonial en el Patio Hundido de Kalasaya",
        "Lectura personalizada de hojas de coca para cada participante",
        "Torito de Pucará ritualizado y bendecido para la protección del hogar",
        "Almuerzo místico orgánico a base de quinua, kiwicha y productos de la tierra"
      ],
      en: [
        "Private mystical transport from Puno or Juliaca",
        "Andean Shaman / Pacco / Yatiri for the sacred ceremony",
        "Complete ritual offering table to Pachamama and Apus with select coca leaves",
        "Ceremonial energy cleansing in the Sunken Court of Kalasaya",
        "Personalized coca leaves reading for each participant",
        "Ritualized and blessed Torito de Pucará for home protection",
        "Mystical organic lunch based on quinoa, kiwicha, and products of the land"
      ]
    },
    itinerary: {
      es: [
        "07:30 AM — Partida matutina hacia Pucará con meditación guiada",
        "09:00 AM — Ingreso ceremonial al Complejo Kalasaya",
        "10:00 AM — Ceremonia central de Pago a la Tierra en el Patio Hundido con Yatiri",
        "12:00 PM — Lectura individual de coca y bendición del Torito amuleto",
        "01:30 PM — Almuerzo místico orgánico",
        "03:30 PM — Meditación en el Peñón Mirador y retorno bendecido"
      ],
      en: [
        "07:30 AM — Morning departure to Pucará with guided meditation",
        "09:00 AM — Ceremonial entry to Kalasaya Complex",
        "10:00 AM — Central Pago a la Tierra ceremony in the Sunken Court with Yatiri",
        "12:00 PM — Individual coca reading and blessing of the Torito amulet",
        "01:30 PM — Mystical organic lunch",
        "03:30 PM — Meditation at the Lookout and return blessed"
      ]
    }
  }
];

export const lockedToritoSkins = [
  {
    color: "kalasaya_stone",
    hex: "#8b5a2b",
    name: { es: "Piedra Ancestral Kalasaya", en: "Kalasaya Ancestral Stone" },
    meaning: { es: "Sabiduría ancestral y conexión con los templos pre-incas de piedra roja.", en: "Ancestral wisdom and connection with pre-Inca red stone temples." },
    symbolizes: { es: ["Historia", "Permanencia", "Conexión Espiritual"], en: ["History", "Permanence", "Spiritual Connection"] },
    story: { es: "Un material místico inspirado en los bloques tallados del Complejo Ceremonial Kalasaya.", en: "A mystical material inspired by the carved blocks of the Kalasaya Ceremonial Complex." },
    locked: true,
    monumentId: "kalasaya",
    pointIdx: 0
  },
  {
    color: "penon_lava",
    hex: "#ff4500",
    name: { es: "Fuego del Apu Peñón", en: "Fire of the Apu Lookout" },
    meaning: { es: "Vitalidad, fuerza telúrica y energía purificadora del mirador natural.", en: "Vitality, telluric strength, and purifying energy of the natural lookout." },
    symbolizes: { es: ["Fuerza", "Energía", "Coraje"], en: ["Strength", "Energy", "Courage"] },
    story: { es: "Inspirado en los atardeceres rojizos ardientes sobre la cima del Peñón de Pucará.", en: "Inspired by the burning reddish sunsets over the summit of the Pucará Lookout." },
    locked: true,
    monumentId: "penon",
    pointIdx: 1
  },
  {
    color: "templo_gold",
    hex: "#ffd700",
    name: { es: "Pan de Oro Barroco", en: "Baroque Gold Leaf" },
    meaning: { es: "Luz divina, abundancia y herencia cultural jesuita.", en: "Divine light, abundance, and Jesuit cultural heritage." },
    symbolizes: { es: ["Esplendor", "Abundancia", "Devoción"], en: ["Splendor", "Abundance", "Devotion"] },
    story: { es: "Inspirado en los altares cubiertos en pan de oro del Templo de Santa Isabel.", en: "Inspired by the gold leaf covered altars of the Santa Isabel Temple." },
    locked: true,
    monumentId: "templo",
    pointIdx: 2
  },
  {
    color: "plaza_multicolor",
    hex: "#ff007f",
    name: { es: "Cerámica Policromada", en: "Polychrome Ceramics" },
    meaning: { es: "Alegría, diversidad cultural y tradición viva.", en: "Joy, cultural diversity, and living tradition." },
    symbolizes: { es: ["Celebración", "Arte", "Tradición"], en: ["Celebration", "Art", "Tradition"] },
    story: { es: "Inspirado en las coloridas comparsas de los carnavales en la Plaza de Armas.", en: "Inspired by the colorful parades of the carnivals in the Main Square." },
    locked: true,
    monumentId: "plaza",
    pointIdx: 3
  },
  {
    color: "museo_granite",
    hex: "#5c5c5c",
    name: { es: "Monolito de Granito", en: "Granite Monolith" },
    meaning: { es: "Firmeza, resistencia al tiempo y protección sagrada.", en: "Firmness, resistance to time, and sacred protection." },
    symbolizes: { es: ["Resiliencia", "Firmeza", "Protección"], en: ["Resilience", "Firmness", "Protection"] },
    story: { es: "Evoca a las estelas líticas sagradas grabadas hace miles de años expuestas en el Museo Lítico.", en: "Evokes the sacred lithic stelas engraved thousands of years ago on display in the Lytic Museum." },
    locked: true,
    monumentId: "museo",
    pointIdx: 4
  }
];
