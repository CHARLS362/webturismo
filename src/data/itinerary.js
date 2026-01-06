export const itineraryPackages = {
    standard: {
        id: 'standard',
        title: "Gran Tour Magia Andina",
        subtitle: "La Experiencia Clásica Completa",
        description: "El equilibrio perfecto entre cultura, comodidad y descubrimiento. Un recorrido exhaustivo por los tesoros de Puno y el Altiplano.",
        image: "https://www.rutaverdebolivia.com/wp-content/uploads/lake-ticicaca-e1484658328183.jpg",
        benefits: {
            accommodation: "Hoteles 3 y 4 estrellas con encanto local (Casa Andina, Sonesta).",
            food: "Desayunos buffet y almuerzos en restaurantes turísticos tradicionales.",
            transport: "Transporte privado turístico y lancha rápida para el lago.",
            guide: "Guía oficial de turismo bilingüe (Español/Inglés)."
        },
        weeks: [
            {
                id: 1,
                title: "Semana 1: Ciudad de Puno y Lago Titicaca Conocido",
                days: [
                    { day: 1, title: "Llegada a Puno y Adaptación", desc: "08:00 Recepción y traslado a lodge. 10:00 Charla sobre cultura andina y adaptación. 18:00 Cena típica (chairo) y danzas folklóricas." },
                    { day: 2, title: "Centro Histórico y Miradores", desc: "09:00 Tour Plaza de Armas, Catedral y Museo Dreyer. 14:00 Almuerzo (pesque). 16:00 Mirador Huajsapata con vistas al lago." },
                    { day: 3, title: "Uros y Kayak en Totorales", desc: "07:00 Lancha a Uros. 15:00 Kayak especializado entre totoras (1h). 17:00 Traslado a Isla Taquile (homestay)." },
                    { day: 4, title: "Tradición en Taquile", desc: "08:00 Caminata y taller de tejido tradicional (Patrimonio UNESCO). 14:00 Regreso a la ciudad de Puno." },
                    { day: 5, title: "Isla Amantaní y Kayak Costero", desc: "06:30 Salida a Amantaní. 10:00 Visita restos prehispánicos. 16:00 Kayak costero (1.5h). 18:00 Ceremonia 'k'antu' con familia local." },
                    { day: 6, title: "Isla Esteves Arqueológica", desc: "09:00 Exploración de reliquias Colla y Tiahuanaco en Isla Esteves. Almuerzo insular. 16:00 Retorno." },
                    { day: 7, title: "Cocina Vivencial y Artesanías", desc: "09:00 Taller de cocina típica (preparación de chairo). 15:00 Tiempo libre en mercado de artesanías." }
                ]
            },
            {
                id: 2,
                title: "Semana 2: Sitios Arqueológicos Remotos",
                days: [
                    { day: 8, title: "Expedición Sillustani", desc: "07:00 Salida 4x4 a Sillustani (chullpas sagradas). 11:00 Excursión guiada. 18:00 Pernocte en lodge cercano." },
                    { day: 9, title: "Naturaleza en Sillustani", desc: "08:00 Caminata de flora andina alrededor de la laguna Umayo. 14:00 Regreso a Puno." },
                    { day: 10, title: "Ruta de la Fertilidad: Inca Uyo", desc: "06:30 Visita al templo Inca Uyo. Almuerzo en Juliaca. 16:00 Arribo a complejo de a Cutimbo." },
                    { day: 11, title: "Secretos de Cutimbo", desc: "08:00 Exploración arqueológica profunda en Cutimbo. 15:00 Regreso a la base en Puno." },
                    { day: 12, title: "Reserva Salinas y Aguada Blanca", desc: "07:00 Expedición a hábitat de vicuñas y flamencos. 18:00 Noche en refugio comunitario." },
                    { day: 13, title: "Lagunas Saladas", desc: "08:00 Trekking por las lagunas saladas y bofedales. 14:00 Retorno a Puno." },
                    { day: 14, title: "Gastronomía Local", desc: "10:00 Degustación de 'Cancacho' (lechón al horno) en mercado local. Tarde libre de descanso." }
                ]
            },
            {
                id: 3,
                title: "Semana 3: Pueblos Indígenas y Kayak",
                days: [
                    { day: 15, title: "Pukara y Arte Rupestre", desc: "08:00 Salida a Pukara (arte preincaico y museo). 18:00 Vivencia en homestay local." },
                    { day: 16, title: "Cerámica Torito de Pukara", desc: "09:00 Taller maestro de cerámica tradicional. 14:00 Regreso a Puno." },
                    { day: 17, title: "Lago Arapindi Oculto", desc: "07:00 Expedición 4x4. 11:00 Kayak y pesca de trucha artesanal (2h). 18:00 Cabaña rural." },
                    { day: 18, title: "Senderos de Arapindi", desc: "08:00 Caminata paisajística de altura. 15:00 Regreso a Puno." },
                    { day: 19, title: "Comunidad de Llachón", desc: "09:00 Lancha a pueblo pesquero. 16:00 Kayak costero a calas ocultas (1h). 18:00 Posible fiesta comunitaria." },
                    { day: 20, title: "Huertas Andinas", desc: "08:00 Actividad agrícola en huertas comunitarias. 14:00 Regreso a Puno." },
                    { day: 21, title: "Tejido Ancestral Uros", desc: "10:00 Masterclass de tejido con fibra de totora. 16:00 Presentación final de obras." }
                ]
            },
            {
                id: 4,
                title: "Semana 4: Festividades y Cierre",
                days: [
                    { day: 22, title: "Preparación Alasitas", desc: "09:00 Charla sobre ritualidad de miniaturas. 14:00 Compra de alasitas para la feria." },
                    { day: 23, title: "Feria de las Alasitas", desc: "08:00 Participación en feria y ofrenda a dioses andinos. 18:00 Cena de celebración." },
                    { day: 24, title: "Volcán Ampato Panorámico", desc: "06:30 Salida hacia vistas del Ampato. 11:00 Caminata en faldeos. 18:00 Noche en Macusani." },
                    { day: 25, title: "Termas de Macusani", desc: "08:00 Relax en aguas termales de altura. 15:00 Regreso a Puno." },
                    { day: 26, title: "Ruta de la Chicha", desc: "10:00 Tour y degustación en bodegas de chicha de jora. 16:00 Fotografía libre." },
                    { day: 27, title: "Reserva de Aves y Kayak", desc: "09:00 Visita reserva Titicaca. 14:00 Kayak de observación de flamencos (1h). Almuerzo de trucha." },
                    { day: 28, title: "Cierre Comunitario", desc: "10:00 Despedida con líderes locales y entrega de certificados de participación." },
                    { day: 29, title: "Despedida Fusión", desc: "09:00 Compras finales. 18:00 Cena despedida (Fusión Andino-Asiática)." },
                    { day: 30, title: "Partida", desc: "07:00 Traslado final al aeropuerto de Juliaca. Fin de servicios." }
                ]
            }
        ]
    },
    adventure: {
        id: 'adventure',
        title: "Expedición Andina Total",
        subtitle: "Adrenalina y Desafío",
        description: "Para los espíritus indomables. Trekking de altura, kayak extremo y camping en los lugares más remotos del Altiplano.",
        image: "https://www.ytuqueplanes.com/imagenes/fotos/novedades/b-lago-titicaca.webp",
        benefits: {
            accommodation: "Campamentos de lujo (Glamping) y refugios de montaña.",
            food: "Cocina de campaña energética y snacks proteicos.",
            transport: "4x4 para terrenos difíciles y kayaks profesionales.",
            guide: "Guía especializado en alta montaña y primeros auxilios."
        },
        weeks: [
            {
                id: 1,
                title: "Semana 1: Aclimatación Activa",
                days: [
                    { day: 1, title: "Llegada y Trekking Urbano", desc: "Caminata suave al mirador Kuntur Wasi." },
                    { day: 2, title: "Kayak en la Bahía", desc: "Entrenamiento de kayak en el lago interior de Puno." },
                    { day: 3, title: "Mountain Bike Chucuito", desc: "Ruta de descenso desde las partes altas de Chucuito." },
                    { day: 4, title: "Trekking a Molloco", desc: "Visita a restos arqueológicos pre-incas." },
                    { day: 5, title: "Escalada en Cutimbo", desc: "Rappel y exploración en las formaciones rocosas." },
                    { day: 6, title: "Trekking Sillustani", desc: "Caminata larga rodeando la laguna Umayo." },
                    { day: 7, title: "Descanso Activo", desc: "Yoga y estiramiento para montaña." }
                ]
            },
            {
                id: 2,
                title: "Semana 2: Desafío Cordillera",
                days: [
                    { day: 8, title: "Campamento Base Allincapac", desc: "Traslado a Macusani y ascenso al campo base." },
                    { day: 9, title: "Ascenso a Glaciares", desc: "Caminata sobre hielo y técnicas de crampones." },
                    { day: 10, title: "Cumbre (Opcional)", desc: "Intento de cumbre o trekking de altura panorámico." },
                    { day: 11, title: "Descenso a Lagunas", desc: "Ruta hacia lagunas de colores turquesa." },
                    { day: 12, title: "Regreso a Macusani", desc: "Baños termales reparadores en Ollachea." },
                    { day: 13, title: "Ruta de la Selva", desc: "Incursión a la ceja de selva de San Gabán." },
                    { day: 14, title: "Rafting San Gabán", desc: "Descenso de ríos clase III/IV." }
                ]
            },
            {
                id: 3,
                title: "Semana 3: Travesía Titicaca",
                days: [
                    { day: 15, title: "Expedición Kayak (Día 1)", desc: "Salida desde Capachica hacia Amantaní remando." },
                    { day: 16, title: "Camping en Amantaní", desc: "Noche en carpas en playa oculta." },
                    { day: 17, title: "Kayak a Taquile", desc: "Travesía exigente hacia la isla de Taquile." },
                    { day: 18, title: "Trekking Perimetral", desc: "Vuelta completa a la isla de Taquile caminando." },
                    { day: 19, title: "Kayak a Uros Titino", desc: "Ruta hacia las islas flotantes menos turísticas." },
                    { day: 20, title: "Pesca Vivencial", desc: "Pesca nocturna con habitantes locales." },
                    { day: 21, title: "Regreso a Puno", desc: "Retorno en lancha de apoyo." }
                ]
            },
            {
                id: 4,
                title: "Semana 4: Rutas Inexploradas",
                days: [
                    { day: 22, title: "Cañón de Tinajani Trek", desc: "Exploración profunda del cañón y bosque de piedras." },
                    { day: 23, title: "Bouldering en Tinajani", desc: "Escalada en bloque en formaciones naturales." },
                    { day: 24, title: "Ruta a Vilquechico", desc: "Caminata por zonas rurales poco conocidas." },
                    { day: 25, title: "Ciclismo Putina", desc: "Ruta de cross-country hacia aguas termales." },
                    { day: 26, title: "Desafío Final", desc: "Carrera de orientación en el Altiplano." },
                    { day: 27, title: "Cena de Celebración", desc: "Asado campestre de despedida." },
                    { day: 28, title: "Día de Recuperación", desc: "Masajes deportivos y relax." },
                    { day: 29, title: "Logística de Retorno", desc: "Limpieza de equipo y embalaje." },
                    { day: 30, title: "Despedida", desc: "Traslado al aeropuerto." }
                ]
            }
        ]
    },
    luxury: {
        id: 'luxury',
        title: "Andes Gourmet & Relax",
        subtitle: "Exclusividad y Placer",
        description: "Un viaje diseñado para los sentidos. Hoteles de 5 estrellas, gastronomía de autor y experiencias privadas sin prisas.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR61GBzYe9WsNQrlrQWfUFn0WKGi-a_E1Npc7j-B4LK6Q&s=10",
        benefits: {
            accommodation: "Hoteles 5 estrellas (GHL, Titilaka) y Glamping Premium.",
            food: "Experiencias gastronómicas, chef privado y maridaje de vinos.",
            transport: "Vans de lujo privadas y catamarán exclusivo.",
            guide: "Concierge personal disponible 24/7."
        },
        weeks: [
            {
                id: 1,
                title: "Semana 1: Bienvenida VIP",
                days: [
                    { day: 1, title: "Llegada Privada", desc: "Traslado en vehículo de lujo, check-in en suite con vista al lago." },
                    { day: 2, title: "Spa Andino", desc: "Masajes con piedras calientes y ritual de coca." },
                    { day: 3, title: "Cena de Autor", desc: "Menú degustación de 7 tiempos con ingredientes locales." },
                    { day: 4, title: "Yate Privado Uros", desc: "Visita a Uros lejos de las multitudes con champaña a bordo." },
                    { day: 5, title: "Atardecer en Taquile", desc: "Almuerzo privado en casa local renovada." },
                    { day: 6, title: "Cata de Vinos y Quesos", desc: "Selección de quesos andinos y vinos sudamericanos." },
                    { day: 7, title: "Día de Resort", desc: "Disfrute de las instalaciones del hotel, jacuzzi y sauna." }
                ]
            },
            {
                id: 2,
                title: "Semana 2: Titilaka Experience",
                days: [
                    { day: 8, title: "Traslado a Titilaka", desc: "Llegada al lodge más exclusivo del lago (Relais & Châteaux)." },
                    { day: 9, title: "Excursión Náutica", desc: "Navegación privada por humedales y observación de aves." },
                    { day: 10, title: "Picnic de Lujo", desc: "Picnic gourmet montado en una playa desierta." },
                    { day: 11, title: "Astronomía Privada", desc: "Observación de estrellas con telescopio y experto." },
                    { day: 12, title: "Clase de Cocina", desc: "Masterclass con el chef ejecutivo del lodge." },
                    { day: 13, title: "Visita a Comunidades", desc: "Interacción cultural curada y privada." },
                    { day: 14, title: "Cena Romántica", desc: "Cena a la luz de las velas en el muelle." }
                ]
            },
            {
                id: 3,
                title: "Semana 3: Historia y Confort",
                days: [
                    { day: 15, title: "Treno Andean Explorer", desc: "Ruta de lujo en tren (si disponible) o van privada a Cusco border." },
                    { day: 16, title: "Lampa Exclusiva", desc: "Visita privada a la Capilla Sixtina de los Andes." },
                    { day: 17, title: "Hacienda Colonial", desc: "Alojamiento en antigua hacienda restaurada." },
                    { day: 18, title: "Caballos de Paso", desc: "Exhibición y paseo suave en caballos peruanos." },
                    { day: 19, title: "Fotografía Profesional", desc: "Sesión de fotos personal en paisajes icónicos." },
                    { day: 20, title: "Medicina Tradicional", desc: "Consulta privada con chamán de renombre." },
                    { day: 21, title: "Retorno a Puno", desc: "Coctel de bienvenida en GHL Hotel." }
                ]
            },
            {
                id: 4,
                title: "Semana 4: Relax Final",
                days: [
                    { day: 22, title: "Día de Compras VIP", desc: "Personal shopper para textiles de alpaca premium." },
                    { day: 23, title: "Isla Suasi Privada", desc: "Traslado a la única isla privada del lago." },
                    { day: 24, title: "Suasi Relax", desc: "Masajes frente al lago y desconexión total." },
                    { day: 25, title: "Jardines de Suasi", desc: "Paseo por jardines botánicos nativos." },
                    { day: 26, title: "Retorno de Lujo", desc: "Vuelta a Puno en lancha rápida privada." },
                    { day: 27, title: "Cena de Despedida", desc: "Evento privado con músicos clásicos." },
                    { day: 28, title: "Late Check-out", desc: "Día libre sin horarios." },
                    { day: 29, title: "Souvenirs de Lujo", desc: "Entrega de regalos curados por la agencia." },
                    { day: 30, title: "Vuelo Privado/VIP", desc: "Traslado y asistencia VIP en aeropuerto." }
                ]
            }
        ]
    },
    mystic: {
        id: 'mystic',
        title: "Ruta Mística Ancestral",
        subtitle: "Conexión Espiritual Profunda",
        description: "Un viaje interior guiado por la cosmovisión andina. Ceremonias, lugares de poder y retiro espiritual en el lago sagrado.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR61GBzYe9WsNQrlrQWfUFn0WKGi-a_E1Npc7j-B4LK6Q&s=10",
        benefits: {
            accommodation: "Ecolodges, espacios de retiro y casas santuario.",
            food: "Alimentación vegetariana/vegana orgánica y desintoxicante.",
            transport: "Transporte privado silencioso y caminatas conscientes.",
            guide: "Guía espiritual (Paqo Andino) y facilitadores de meditación."
        },
        weeks: [
            {
                id: 1,
                title: "Semana 1: Purificación",
                days: [
                    { day: 1, title: "Llegada y Sahumado", desc: "Limpieza energética inicial con palo santo." },
                    { day: 2, title: "Ofrenda a la Cocha", desc: "Ceremonia de permiso al Lago Titicaca." },
                    { day: 3, title: "Aramu Muro", desc: "Meditación en el portal dimensional interdimensional." },
                    { day: 4, title: "Templo de la Fertilidad", desc: "Conexión con la energía creativa en Inca Uyo." },
                    { day: 5, title: "Silencio en Sillustani", desc: "Caminata de silencio entre las tumbas ancestrales." },
                    { day: 6, title: "Baños de Florecimiento", desc: "Ritual con hierbas andinas para limpieza." },
                    { day: 7, title: "Integración", desc: "Círculo de palabra y descanso." }
                ]
            },
            {
                id: 2,
                title: "Semana 2: Amantaní Sagrado",
                days: [
                    { day: 8, title: "Viaje a Amantaní", desc: "La isla del amor y la espiritualidad." },
                    { day: 9, title: "Pachatata", desc: "Ceremonia masculina al atardecer en el templo cimero." },
                    { day: 10, title: "Pachamama", desc: "Ceremonia femenina al amanecer." },
                    { day: 11, title: "Lectura de Coca", desc: "Consulta oracular personalizada." },
                    { day: 12, title: "Danza Medicina", desc: "Movimiento consciente y música andina." },
                    { day: 13, title: "Caminata Estelar", desc: "Observación de constelaciones andinas." },
                    { day: 14, title: "Retorno Consciente", desc: "Vuelta a Puno en estado meditativo." }
                ]
            },
            {
                id: 3,
                title: "Semana 3: Lugares de Poder",
                days: [
                    { day: 15, title: "Tinajani Místico", desc: "Conexión con los ancestros de piedra." },
                    { day: 16, title: "Pukara y el Rayo", desc: "Ritual al dios del rayo y la lluvia." },
                    { day: 17, title: "Copacabana - Isla del Sol", desc: "Peregrinaje a la fuente de la juventud." },
                    { day: 18, title: "Laberinto de la Chakana", desc: "Recorrido energético en la Isla del Sol." },
                    { day: 19, title: "Isla de la Luna", desc: "Ceremonia solo para mujeres/energía femenina." },
                    { day: 20, title: "Retiro de Silencio", desc: "24 horas de silencio en lodge aislado." },
                    { day: 21, title: "Retorno a Puno", desc: "Integración de la experiencia." }
                ]
            },
            {
                id: 4,
                title: "Semana 4: Renacimiento",
                days: [
                    { day: 22, title: "Taller de Tejido Sagrado", desc: "Aprendiendo la simbología espiritual en los textiles." },
                    { day: 23, title: "Ceremonia de Despacho", desc: "Gran ofrenda maestra a la Pachamama." },
                    { day: 24, title: "Visita a Curanderos", desc: "Intercambio de saberes con médicos kallawayas." },
                    { day: 25, title: "Temazcal Andino", desc: "Baño de vapor ritual." },
                    { day: 26, title: "Siembra de Intenciones", desc: "Ritual para proyectar el futuro." },
                    { day: 27, title: "Celebración de Vida", desc: "Música, danza y festividad espiritual." },
                    { day: 28, title: "Cierre de Ciclos", desc: "Despedida del grupo y el lago." },
                    { day: 29, title: "Descanso Final", desc: "Día libre para procesar." },
                    { day: 30, title: "Partida", desc: "Buen viaje (Tupananchiskama)." }
                ]
            }
        ]
    },
    nature: {
        id: 'nature',
        title: "Santuario Natural Titicaca",
        subtitle: "Biodiversidad y Paisajes",
        description: "Inmersión total en la flora y fauna del Altiplano. Fotografía, observación de aves y conservación en áreas protegidas.",
        image: "https://www.rutaverdebolivia.com/wp-content/uploads/lake-ticicaca-e1484658328183.jpg",
        benefits: {
            accommodation: "Ecolodges sostenibles y cabañas rurales.",
            food: "Comida kilómetro cero y trucha fresca del lago.",
            transport: "Lanchas a remo (sin motor) para avistamiento y caminatas.",
            guide: "Biólogo o guía naturalista especializado."
        },
        weeks: [
            {
                id: 1,
                title: "Semana 1: Reserva Nacional",
                days: [
                    { day: 1, title: "Llegada Ecológica", desc: "Charla de inducción sobre el ecosistema Titicaca." },
                    { day: 2, title: "Reserva del Titicaca", desc: "Navegación silenciosa para ver el Zambullidor del Titicaca." },
                    { day: 3, title: "Totora Viva", desc: "Aprendizaje sobre el manejo sostenible de la totora." },
                    { day: 4, title: "Aves de Chucuito", desc: "Avistamiento de aves migratorias en las orillas." },
                    { day: 5, title: "Llato y Capachica", desc: "Senderismo por ecosistemas de terrazas agrícolas." },
                    { day: 6, title: "Fotografía de Atardecer", desc: "Taller práctico de fotografía de paisaje." },
                    { day: 7, title: "Noche de Estrellas", desc: "Astrofotografía en zona sin contaminación lumínica." }
                ]
            },
            {
                id: 2,
                title: "Semana 2: Fauna Altoandina",
                days: [
                    { day: 8, title: "Salinas y Aguada Blanca", desc: "Expedición para ver vicuñas y flamencos." },
                    { day: 9, title: "Laguna Lagunillas", desc: "Avistamiento de parihuanas en altura." },
                    { day: 10, title: "Bosque de Queuñas", desc: "Caminata por uno de los árboles más altos del mundo." },
                    { day: 11, title: "Cañón de Tinajani", desc: "Observación de vizcachas y flora rupícola." },
                    { day: 12, title: "Rodales de Puyas", desc: "Visita al bosque de Puyas de Raimondi." },
                    { day: 13, title: "Cordillera Carabaya", desc: "Vistas de glaciares y ecosistema de puna." },
                    { day: 14, title: "Regreso a Base", desc: "Cena ligera y revisión de fotografías." }
                ]
            },
            {
                id: 3,
                title: "Semana 3: Vida Isleña",
                days: [
                    { day: 15, title: "Isla Taquile Norte", desc: "Senderos menos transitados y playas de piedra." },
                    { day: 16, title: "Buceo (Snorkel) de Altura", desc: "Exploración superficial de la flora subacuática (con traje seco)." },
                    { day: 17, title: "Isla Soto", desc: "Expedición a la isla más profunda y remota." },
                    { day: 18, title: "Comunidades Pesqueras", desc: "Jornada de pesca tradicional responsable." },
                    { day: 19, title: "Kayak de Travesía", desc: "Recorrido costero silencioso." },
                    { day: 20, title: "Huertos Andinos", desc: "Participación en cosecha de papas nativas." },
                    { day: 21, title: "Cocina Silvestre", desc: "Preparación de alimientos con insumos recolectados." }
                ]
            },
            {
                id: 4,
                title: "Semana 4: Conservación",
                days: [
                    { day: 22, title: "Voluntariado Express", desc: "Limpieza de playas o reforestación simbólica." },
                    { day: 23, title: "Visita a Proyecto", desc: "Conocer iniciativas locales de conservación." },
                    { day: 24, title: "Ruta del Agua", desc: "Seguimiento de cursos de agua y bofedales." },
                    { day: 25, title: "Miradores Naturales", desc: "Caminata a puntos panorámicos 360 grados." },
                    { day: 26, title: "Despedida del Lago", desc: "Última navegación al atardecer." },
                    { day: 27, title: "Cena Orgánica", desc: "Banquete con productos locales certificados." },
                    { day: 28, title: "Día Libre Natural", desc: "Caminata libre o descanso en naturaleza." },
                    { day: 29, title: "Compromiso Verde", desc: "Charla de cierre y entrega de certificado." },
                    { day: 30, title: "Partida", desc: "Traslado al aeropuerto con huella de carbono compensada." }
                ]
            }
        ]
    }
};

