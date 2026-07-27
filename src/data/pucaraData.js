import kalasayaImg from '../assets/image/map/kalasaya.png';
import penonImg from '../assets/image/map/penon.png';
import temploImg from '../assets/image/map/templo.png';
import plazaImg from '../assets/image/map/plaza.png';
import museoImg from '../assets/image/map/museo.png';

export const pucaraAttractions = [
  {
    id: "kalasaya",
    title: "Complejo Arqueológico Kalasaya",
    subtitle: "Templo Sagrado de la Cultura Pucará (Lampa, Puno)",
    description: "Un impresionante centro ceremonial pre-inca caracterizado por sus plataformas escalonadas, patios hundidos e imponentes estructuras de piedra roja que datan del 200 a.C. Es el epicentro arqueológico del altiplano de Puno.",
    image: kalasayaImg,
    duration: "2.5 horas",
    altitude: "3,880 msnm",
    highlight: "Patio Hundido y monolitos grabados"
  },
  {
    id: "museo-litico",
    title: "Museo Lítico de Pucará",
    subtitle: "Guardianes de la Piedra y la Historia",
    description: "Alberga una magnífica colección de esculturas zoomorfas y antropomorfas en piedra de la cultura Pucará, incluyendo la famosa estela del 'Degollador' (Hatun Ñakaj) y estelas ceremoniales.",
    image: museoImg,
    duration: "1.5 horas",
    altitude: "3,860 msnm",
    highlight: "Estela del Degollador y Monolitos de Rayo"
  },
  {
    id: "talleres-alfareria",
    title: "Talleres de Alfarería Tradicional",
    subtitle: "El Alma de la Tierra en tus Manos",
    description: "Visita los talleres familiares donde los maestros artesanos de Pucará moldean el barro rojo del altiplano para dar vida al célebre Torito de Pucará. Participa en el moldeado y pintado manual.",
    image: plazaImg,
    duration: "2 horas",
    altitude: "3,860 msnm",
    highlight: "Taller vivencial y modelado manual"
  },
  {
    id: "templo-santa-isabel",
    title: "Templo de Santa Isabel de Pucará",
    subtitle: "Sincretismo Colonial y Piedra Roja",
    description: "Construido en el siglo XVIII por los jesuitas sobre cimientos incas en la provincia de Lampa. Destaca por su fachada de piedra rojiza tallada con motivos barrocos-andinos y su amplia plaza.",
    image: temploImg,
    duration: "1 hora",
    altitude: "3,860 msnm",
    highlight: "Fachada de piedra rojiza tallada"
  },
  {
    id: "penon-pucara",
    title: "El Peñón Mirador de Pucará",
    subtitle: "Mirador Natural del Altiplano Puneño",
    description: "Una gigantesca formación rocosa que domina el paisaje de Pucará. Un sendero de caminata ligera lleva a la cima, ofreciendo vistas panorámicas de 360° sobre las pampas andinas de Puno.",
    image: penonImg,
    duration: "2 horas (caminata)",
    altitude: "4,050 msnm (cima)",
    highlight: "Vistas de 360° y senderos místicos"
  }
];

export const suggestedRoutes = [
  {
    id: "express",
    name: "Pucará Express",
    duration: "Medio día (4 horas)",
    interest: "cultura",
    description: "Ideal para viajeros que transitan por la ruta Puno-Cusco que desean comprender la esencia histórica de Pucará y Lampa.",
    steps: [
      { time: "08:00", title: "Llegada a Pucará", desc: "Arribo a Pucará desde Puno o Juliaca. Desayuno rápido andino." },
      { time: "08:45", title: "Museo Lítico de Pucará", desc: "Exploración guiada de los monolitos y la estela del Degollador." },
      { time: "10:15", title: "Complejo Kalasaya", desc: "Visita al gran patio hundido y el templo ceremonial Pucará." },
      { time: "12:00", title: "Plaza de Armas y Templos", desc: "Paseo por el Templo de Santa Isabel y talleres alfareros." }
    ]
  },
  {
    id: "artesanal",
    name: "Sabores y Alfarería de Pucará",
    duration: "1 Día completo (8 horas)",
    interest: "artesania",
    description: "Una inmersión profunda en la tradición cerámica y la gastronomía local del altiplano de Puno.",
    steps: [
      { time: "09:00", title: "Arribo e Histórico", desc: "Visita al Templo colonial de Santa Isabel y plaza tradicional." },
      { time: "10:00", title: "Taller Vivencial de Cerámica", desc: "Pintado de tu propio Torito de Pucará guiado por un maestro alfarero." },
      { time: "12:30", title: "Almuerzo Típico Andino", desc: "Degustación de trucha frita, sopa de quinua y mates de hierbas locales." },
      { time: "14:00", title: "Complejo Kalasaya y Museo", desc: "Tour arqueológico completo por las terrazas del templo y la colección lítica." },
      { time: "16:30", title: "Degustación de Quesos", desc: "Parada en el mercado local para probar quesos tradicionales de Lampa." }
    ]
  },
  {
    id: "aventura",
    name: "Aventura Mística Kalasaya & Peñón",
    duration: "2 Días (Fin de Semana)",
    interest: "aventura",
    description: "Para exploradores que desean senderismo, rituales andinos y contemplar los cielos estrellados del altiplano puneño.",
    steps: [
      { time: "Día 1 - 09:00", title: "Ascenso al Peñón de Pucará", desc: "Trekking guiado hacia la cima del peñón con ritual de pago a la Pachamama." },
      { time: "Día 1 - 13:00", title: "Almuerzo de Campaña", desc: "Comida andina al aire libre con vista panorámica de la cordillera." },
      { time: "Día 1 - 15:30", title: "Visita Arqueológica Kalasaya", desc: "Recorrido al atardecer por el complejo místico." },
      { time: "Día 1 - 19:00", title: "Cena y Fogata Ancestral", desc: "Pernocte en homestay local con narración de leyendas quechuas y aymaras." },
      { time: "Día 2 - 08:30", title: "Taller de Alfarería", desc: "Moldeado directo de arcilla andina en horno de leña." },
      { time: "Día 2 - 11:30", title: "Museo Lítico y Despedida", desc: "Visita al museo de sitio y almuerzo de despedida." }
    ]
  }
];

export const toritoColors = [
  {
    color: "original",
    hex: "#e4ceb1",
    name: "Original / Arcilla Base",
    meaning: "Los acabados originales de tierra andina cruda de Pucará antes de pasar por los pigmentos decorativos.",
    symbolizes: ["Autenticidad", "Tierra", "Herencia"],
    story: "Representa el Torito en su estado primitivo de arcilla cocida, honrando la tierra de Puno."
  },
  {
    color: "rojo",
    hex: "#c85833",
    name: "Arcilla Terracota",
    meaning: "Fuerza vital, amor familiar y protección del hogar. Color sagrado que representa la tierra altiplánica.",
    symbolizes: ["Amor", "Protección", "Fuerza de la Tierra"],
    story: "Se coloca tradicionalmente en los tejados de las casas en Pucará y Lampa para resguardar a las familias."
  },
  {
    color: "amarillo",
    hex: "#cc9c56",
    name: "Oro Cenizo / Bronce",
    meaning: "Prosperidad, sabiduría y luz espiritual. Representa la energía madura del sol sobre el altiplano.",
    symbolizes: ["Sabiduría", "Abundancia", "Energía Solar"],
    story: "Llamado a atraer el éxito financiero, la buena cosecha y el optimismo espiritual."
  },
  {
    color: "verde",
    hex: "#6a7b51",
    name: "Verde Ichu / Musgo",
    meaning: "Salud, curación y equilibrio con la naturaleza del altiplano. Conexión directa con la Pachamama.",
    symbolizes: ["Salud", "Conexión Natural", "Esperanza"],
    story: "Vinculado a las hojas de coca ceremoniales, promueve la curación y la armonía ecológica."
  },
  {
    color: "blanco",
    hex: "#dfdcd4",
    name: "Piedra Tiza / Blanco",
    meaning: "Paz, reconciliación y claridad mental. Purifica las energías familiares.",
    symbolizes: ["Paz", "Pureza", "Claridad"],
    story: "Inspirado en la piedra de tiza y las cumbres nevadas de la cordillera de Puno."
  },
  {
    color: "negro",
    hex: "#1d1a1b",
    name: "Obsidiana / Negro",
    meaning: "Escudo protector impenetrable contra la envidia y energías negativas externas.",
    symbolizes: ["Protección Extrema", "Fuerza Interior", "Silencio"],
    story: "Actúa como un imán que absorbe y disuelve energías pesadas antes de que entren al hogar."
  },
  {
    color: "celeste",
    hex: "#6b8ea2",
    name: "Azul Titicaca / Celeste",
    meaning: "Lealtad, viajes protegidos y fluidez. Representa las aguas sagradas del Lago Titicaca en Puno.",
    symbolizes: ["Viajes Seguros", "Fluidez", "Lealtad"],
    story: "Asegura que la prosperidad fluya pacíficamente como los ríos altiplánicos."
  }
];

export const pucaraFestivals = [
  {
    id: "carnavales",
    name: "Carnavales de Pucará",
    date: "Febrero / Marzo (Movible)",
    description: "Una de las celebraciones más coloridas del altiplano puneño. Danzas folklóricas como la Wifala, trajes bordados a mano, desfiles de comparsas y el tradicional cortamonte en la plaza central de Pucará.",
    image: plazaImg,
    highlight: "Danza de las Wifalas y rituales de agradecimiento"
  },
  {
    id: "identidad",
    name: "Día de la Identidad Pucareña",
    date: "15 de Junio",
    description: "El día central que rinde homenaje a los artesanos y la historia de la cultura Pucará en la provincia de Lampa. Ferias nacionales de cerámica tradicional y pasacalles.",
    image: museoImg,
    highlight: "Feria Nacional de Cerámica y concursos de alfarería"
  },
  {
    id: "carmen",
    name: "Festividad de la Virgen del Carmen",
    date: "16 de Julio",
    description: "La festividad religiosa principal de Pucará. Combina el fervor católico colonial con las danzas nativas y la bendición masiva de los Toritos de Pucará en el Templo colonial de Santa Isabel.",
    image: temploImg,
    highlight: "Pasacalles folklóricos y bendición de Toritos"
  },
  {
    id: "capac-raymi",
    name: "Cápac Raymi & Solsticio Andino",
    date: "21 de Diciembre",
    description: "Una antigua celebración incaica que marca el solsticio de invierno. El Complejo Ceremonial de Kalasaya es el centro de rituales místicos de pago a la tierra.",
    image: kalasayaImg,
    highlight: "Ceremonias de Pago a la Tierra en Kalasaya al amanecer"
  }
];

export const combinedTours = [
  {
    id: "lampa-ayaviri",
    name: "Ruta del Norte: Pucará, Lampa y Ayaviri",
    duration: "1 Día Completo (12 horas)",
    route: "Puno/Juliaca ➔ Pucará ➔ Lampa ➔ Ayaviri ➔ Puno/Juliaca",
    description: "Explora la alfarería de Pucará por la mañana; luego visita Lampa, la 'Ciudad Rosada', famosa por su réplica de la Piedad de Miguel Ángel y sus catacumbas; y finaliza degustando el Cancacho en Ayaviri.",
    highlight: "Alfarería, Catacumbas coloniales y gastronomía de Cancacho."
  },
  {
    id: "titicaca-pucara",
    name: "Legado Andino: Uros, Titicaca y Pucará",
    duration: "2 Días / 1 Noche",
    route: "Día 1: Uros & Taquile ➔ Día 2: Pucará & Kalasaya",
    description: "Combina la magia acuática del Lago Titicaca en Puno con la historia arqueológica terrestre del Complejo Kalasaya y los museos de Pucará.",
    highlight: "Navegación en el Titicaca y tour arqueológico pre-inca."
  }
];

export const mainTourPackages = [
  {
    id: "full-day",
    badge: "Más Popular",
    name: "Paquete 1 Full Day: Pucará & Lampa Ancestral",
    duration: "1 Día (08:00 AM - 05:30 PM)",
    price: "S/ 120",
    unit: "por persona",
    image: temploImg,
    description: "Una jornada completa para conocer la historia, alfarería y patrimonio pre-inca e inca del norte de Puno.",
    includes: [
      "Transporte privado Puno / Juliaca ➔ Pucará ➔ Lampa ➔ Puno",
      "Guía oficial de turismo especializado en historia pre-inca",
      "Boleto de entrada al Complejo Arqueológico Kalasaya y Museo Lítico",
      "Taller vivencial de modelado de Torito en arcilla con maestro alfarero",
      "Almuerzo buffet andino (opciones vegetarianas disponibles)",
      "Recorrido histórico por la plaza y Templo de Santa Isabel"
    ],
    itinerary: [
      "08:00 AM — Partida desde Puno / Juliaca hacia Pucará",
      "09:30 AM — Visita guiada al Complejo Arqueológico Kalasaya y Pirámide de Piedra Roja",
      "11:30 AM — Recorrido por el Museo Lítico y estela del Hatun Ñakaj",
      "01:00 PM — Almuerzo buffet típico altiplánico",
      "02:30 PM — Taller vivencial alfarero: moldea tu propio Torito de Pucará",
      "04:00 PM — Breve visita a Lampa 'La Ciudad Rosada' y retorno"
    ]
  },
  {
    id: "dos-dias",
    badge: "Experiencia Completa",
    name: "Paquete 2 Días / 1 Noche: Altiplano Mágico & Estrellas",
    duration: "2 Días / 1 Noche",
    price: "S/ 260",
    unit: "por persona",
    image: kalasayaImg,
    description: "Sumérgete en la tranquilidad del altiplano, contempla el atardecer en el Peñón y acampa o hospédate bajo cielos estrellados.",
    includes: [
      "Todo lo incluido en el Paquete Full Day",
      "1 Noche de hospedaje tradicional o homestay vivencial en Pucará",
      "Trekking guiado al Peñón Mirador de Pucará para ver el atardecer",
      "Cena tradicional altiplánica con fogata y narración de mitos andinos",
      "Desayuno artesanal con pan de quinua, quesos locales y mates medicinales",
      "Visita exclusiva a talleres rurales de alfarería sin aglomeraciones"
    ],
    itinerary: [
      "DÍA 1 — Mañana: Kalasaya + Museo Lítico. Tarde: Taller alfarero + Trekking al Peñón Mirador al atardecer. Noche: Fogata y cena.",
      "DÍA 2 — Mañana: Desayuno artesanal + Paseo por la plaza colonial + Ruta a Lampa (Catacumbas y réplica de La Piedad). Tarde: Retorno a Puno."
    ]
  },
  {
    id: "paquete-mistico",
    badge: "Místico & Sagrado",
    name: "Paquete Místico: Ritual de Pago a la Pachamama & Energías",
    duration: "1 Día Especial / Experiencia Mística",
    price: "S/ 190",
    unit: "por persona",
    image: penonImg,
    description: "Una experiencia espiritual diseñada para conectar con las energías sagradas del agua, la tierra y la protección andina.",
    includes: [
      "Transporte místico privado desde Puno o Juliaca",
      "Chamán / Pacco / Yatiri andino para la ceremonia sagrada",
      "Mesa ritual completa de ofrenda a la Pachamama y Apus con hojas de coca selectas",
      "Limpieza energética ceremonial en el Patio Hundido de Kalasaya",
      "Lectura personalizada de hojas de coca para cada participante",
      "Torito de Pucará ritualizado y bendecido para la protección del hogar",
      "Almuerzo místico orgánico a base de quinua, kiwicha y productos de la tierra"
    ],
    itinerary: [
      "07:30 AM — Partida matutina hacia Pucará con meditación guiada",
      "09:00 AM — Ingreso ceremonial al Complejo Kalasaya",
      "10:00 AM — Ceremonia central de Pago a la Tierra en el Patio Hundido con Yatiri",
      "12:00 PM — Lectura individual de coca y bendición del Torito amuleto",
      "01:30 PM — Almuerzo místico orgánico",
      "03:30 PM — Meditación en el Peñón Mirador y retorno bendecido"
    ]
  }
];

