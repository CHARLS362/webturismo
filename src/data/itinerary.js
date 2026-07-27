export const itineraryPackages = {
    standard: {
        id: 'standard',
        title: "Pucará Esencial (2 Días)",
        subtitle: "La Esencia del Altiplano",
        description: "El equilibrio perfecto entre cultura, tradición y descubrimiento. Recorre los templos sagrados de piedra roja y los talleres de alfarería viva.",
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/47/Pucara_kirche.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07wW4l6j6v64TOW36C-pB9tA5a16H7tq1uQ&s",
            "https://chijnayafoundation.org/wp-content/uploads/2022/05/Diadel-torito3-scaled.jpg"
        ],
        benefits: {
            accommodation: "Posadas locales cómodas con encanto altiplánico.",
            food: "Desayuno tradicional y almuerzo de trucha andina y sopa de quinua.",
            transport: "Minibús turístico privado desde Puno o Juliaca.",
            guide: "Guía oficial acreditado experto en la cultura Pucará."
        },
        weeks: [
            {
                id: 1,
                title: "Ruta de 2 Días",
                days: [
                    { 
                        day: 1, 
                        title: "Orígenes y Museo Lítico", 
                        desc: "08:00 Recepción en Juliaca/Puno y traslado en movilidad privada a Pucará. 10:00 Visita guiada al Museo Lítico de Pucará para conocer la estela del 'Degollador' y esculturas zoomorfas. 13:00 Almuerzo tradicional. 15:00 Recorrido por el pintoresco Templo de Santa Isabel y su plaza colonial de piedra roja." 
                    },
                    { 
                        day: 2, 
                        title: "Complejo Kalasaya y Alfarería", 
                        desc: "08:30 Exploración arqueológica del Complejo Kalasaya, sus patios hundidos ceremoniales y terrazas sagradas. 12:00 Almuerzo típico. 14:00 Visita a un taller de alfarería tradicional para presenciar el moldeado de los Toritos de Pucará. 16:30 Retorno a Juliaca/Puno." 
                    }
                ]
            }
        ]
    },
    adventure: {
        id: 'adventure',
        title: "Aventura y Misticismo (3 Días)",
        subtitle: "Cumbres Sagradas y Tierra Roja",
        description: "Diseñado para espíritus exploradores. Trekking al gran Peñón de Pucará, ceremonias místicas de ofrenda a la Pachamama y campamento bajo el cielo estrellado.",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Xh0pB7-m-iP58Yd2p1s_l2Xy213l-X-f-w&s", // Peñón
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07wW4l6j6v64TOW36C-pB9tA5a16H7tq1uQ&s", // Kalasaya
            "https://chijnayafoundation.org/wp-content/uploads/2022/05/Diadel-torito3-scaled.jpg"
        ],
        benefits: {
            accommodation: "1 noche en cabaña rústica local y 1 noche de camping de altura.",
            food: "Cocina andina de campaña rústica y snacks energéticos locales.",
            transport: "Vehículo 4x4 privado para acceso a caminos rurales.",
            guide: "Guía de montaña y especialista en cosmovisión andina."
        },
        weeks: [
            {
                id: 1,
                title: "Ruta de 3 Días",
                days: [
                    { 
                        day: 1, 
                        title: "Camino de los Apus y Campamento", 
                        desc: "08:00 Salida en 4x4. 10:00 Inicio del trekking de aclimatación por las laderas del Peñón de Pucará. 13:00 Almuerzo ligero andino. 15:30 Montaje del campamento en la falda del peñón. 18:30 Fogata bajo las estrellas con relatos mitológicos locales." 
                    },
                    { 
                        day: 2, 
                        title: "Cumbre y Ritual de Pago a la Tierra", 
                        desc: "05:00 Ascenso a la cima del Peñón para ver el amanecer andino sobre la pampa. 08:30 Desayuno caliente de campaña. 10:00 Ceremonia de ofrenda de coca a los Apus y la Pachamama. 14:00 Descenso al pueblo de Pucará. Noche en posada local." 
                    },
                    { 
                        day: 3, 
                        title: "Arqueología Sagrada y Barro Vivo", 
                        desc: "09:00 Tour arqueológico profundo en Kalasaya, visitando las cámaras funerarias y templos escalonados. 12:30 Almuerzo de despedida. 14:00 Taller de moldeado de arcilla rústica en un horno de leña. 17:00 Retorno." 
                    }
                ]
            }
        ]
    },
    luxury: {
        id: 'luxury',
        title: "Inmersión Barroco-Alfarera (2 Días)",
        subtitle: "Arte, Lujo y Legado Vivo",
        description: "Una experiencia de alta gama que combina la rica historia colonial y pre-inca con clases personalizadas de alfarería junto a maestros artesanos reconocidos.",
        images: [
            "https://chijnayafoundation.org/wp-content/uploads/2022/05/Diadel-torito3-scaled.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/4/47/Pucara_kirche.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07wW4l6j6v64TOW36C-pB9tA5a16H7tq1uQ&s"
        ],
        benefits: {
            accommodation: "Boutique Lodge con calefacción y todas las comodidades premium.",
            food: "Cenas gourmet de fusión andina diseñadas por chefs locales.",
            transport: "Camioneta ejecutiva cerrada con conductor privado.",
            guide: "Guía privado historiador bilingüe para todo el recorrido."
        },
        weeks: [
            {
                id: 1,
                title: "Ruta de 2 Días Premium",
                days: [
                    { 
                        day: 1, 
                        title: "Masterclass de Arcilla con Maestro Alfarero", 
                        desc: "09:00 Traslado privado VIP a Pucará. 10:30 Sesión exclusiva en el taller de un reconocido maestro alfarero galardonado. Moldeado y pulido de tu propio Torito de Pucará de colección. 13:30 Almuerzo gourmet andino. 15:30 Tour privado e histórico de la Iglesia Barroco-Andina de Santa Isabel. Cena de degustación." 
                    },
                    { 
                        day: 2, 
                        title: "Monolitos Sagrados y Cata de Quesos", 
                        desc: "09:00 Visita VIP guiada por arqueólogo al Templo de Kalasaya y al Museo Lítico. 13:00 Almuerzo campestre premium. 15:00 Cata exclusiva de quesos andinos tradicionales elaborados en la zona altiplánica de Pucará. 17:00 Retorno final." 
                    }
                ]
            }
        ]
    }
};
