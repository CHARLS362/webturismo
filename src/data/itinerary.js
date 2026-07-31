export const itineraryPackages = {
    standard: {
        id: 'standard',
        title: {
            es: "Pucará Esencial (2 Días)",
            en: "Essential Pucará (2 Days)"
        },
        subtitle: {
            es: "La Esencia del Altiplano",
            en: "The Essence of the Altiplano"
        },
        description: {
            es: "El equilibrio perfecto entre cultura, tradición y descubrimiento. Recorre los templos sagrados de piedra roja y los talleres de alfarería viva.",
            en: "The perfect balance between culture, tradition, and discovery. Traverse the sacred red stone temples and the living pottery workshops."
        },
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/47/Pucara_kirche.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07wW4l6j6v64TOW36C-pB9tA5a16H7tq1uQ&s",
            "https://chijnayafoundation.org/wp-content/uploads/2022/05/Diadel-torito3-scaled.jpg"
        ],
        benefits: {
            accommodation: {
                es: "Posadas locales cómodas con encanto altiplánico.",
                en: "Cozy local inns with highland charm."
            },
            food: {
                es: "Desayuno tradicional y almuerzo de trucha andina y sopa de quinua.",
                en: "Traditional breakfast and Andean trout/quinoa soup lunch."
            },
            transport: {
                es: "Minibús turístico privado desde Puno o Juliaca.",
                en: "Private tourist minibus from Puno or Juliaca."
            },
            guide: {
                es: "Guía oficial acreditado experto en la cultura Pucará.",
                en: "Certified official guide expert in Pucará culture."
            }
        },
        weeks: [
            {
                id: 1,
                title: {
                    es: "Ruta de 2 Días",
                    en: "2-Day Route"
                },
                days: [
                    { 
                        day: 1, 
                        title: {
                            es: "Orígenes y Museo Lítico",
                            en: "Origins and Lytic Museum"
                        }, 
                        desc: {
                            es: "08:00 Recepción en Juliaca/Puno y traslado en movilidad privada a Pucará. 10:00 Visita guiada al Museo Lítico de Pucará para conocer la estela del 'Degollador' y esculturas zoomorfas. 13:00 Almuerzo tradicional. 15:00 Recorrido por el pintoresco Templo de Santa Isabel y su plaza colonial de piedra roja.",
                            en: "08:00 Pick up in Juliaca/Puno and private transfer to Pucará. 10:00 Guided tour of the Pucará Lytic Museum to discover the 'Degollador' stela and zoomorphic sculptures. 13:00 Traditional lunch. 15:00 Tour of the picturesque Santa Isabel Temple and its colonial red stone plaza."
                        }
                    },
                    { 
                        day: 2, 
                        title: {
                            es: "Complejo Kalasaya y Alfarería",
                            en: "Kalasaya Complex & Pottery"
                        }, 
                        desc: {
                            es: "08:30 Exploración arqueológica del Complejo Kalasaya, sus patios hundidos ceremoniales y terrazas sagradas. 12:00 Almuerzo típico. 14:00 Visita a un taller de alfarería tradicional para presenciar el moldeado de los Toritos de Pucará. 16:30 Retorno a Juliaca/Puno.",
                            en: "08:30 Archaeological exploration of the Kalasaya Complex, its ceremonial sunken courts, and sacred terraces. 12:00 Typical lunch. 14:00 Visit to a traditional pottery workshop to witness the molding of the Toritos de Pucará. 16:30 Return to Juliaca/Puno."
                        }
                    }
                ]
            }
        ]
    },
    adventure: {
        id: 'adventure',
        title: {
            es: "Aventura y Misticismo (3 Días)",
            en: "Adventure & Mysticism (3 Days)"
        },
        subtitle: {
            es: "Cumbres Sagradas y Tierra Roja",
            en: "Sacred Summits and Red Land"
        },
        description: {
            es: "Diseñado para espíritus exploradores. Trekking al gran Peñón de Pucará, ceremonias místicas de ofrenda a la Pachamama y campamento bajo el cielo estrellado.",
            en: "Designed for explorer spirits. Trekking to the great Pucará Lookout, mystical Pachamama offering ceremonies, and camping under the starry sky."
        },
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Xh0pB7-m-iP58Yd2p1s_l2Xy213l-X-f-w&s", // Peñón
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07wW4l6j6v64TOW36C-pB9tA5a16H7tq1uQ&s", // Kalasaya
            "https://chijnayafoundation.org/wp-content/uploads/2022/05/Diadel-torito3-scaled.jpg"
        ],
        benefits: {
            accommodation: {
                es: "1 noche en cabaña rústica local y 1 noche de camping de altura.",
                en: "1 night in a rustic local cabin and 1 night of high-altitude camping."
            },
            food: {
                es: "Cocina andina de campaña rústica y snacks energéticos locales.",
                en: "Rustic campaign Andean cuisine and local energy snacks."
            },
            transport: {
                es: "Vehículo 4x4 privado para acceso a caminos rurales.",
                en: "Private 4x4 vehicle to access rural roads."
            },
            guide: {
                es: "Guía de montaña y especialista en cosmovisión andina.",
                en: "Mountain guide and specialist in Andean worldview."
            }
        },
        weeks: [
            {
                id: 1,
                title: {
                    es: "Ruta de 3 Días",
                    en: "3-Day Route"
                },
                days: [
                    { 
                        day: 1, 
                        title: {
                            es: "Camino de los Apus y Campamento",
                            en: "Way of the Apus & Camping"
                        }, 
                        desc: {
                            es: "08:00 Salida en 4x4. 10:00 Inicio del trekking de aclimatación por las laderas del Peñón de Pucará. 13:00 Almuerzo ligero andino. 15:30 Montaje del campamento en la falda del peñón. 18:30 Fogata bajo las estrellas con relatos mitológicos locales.",
                            en: "08:00 Departure in 4x4. 10:00 Start of the acclimatization trek on the slopes of the Pucará Lookout. 13:00 Light Andean lunch. 15:30 Setting up camp on the lookout slopes. 18:30 Campfire under the stars with local mythological stories."
                        }
                    },
                    { 
                        day: 2, 
                        title: {
                            es: "Cumbre y Ritual de Pago a la Tierra",
                            en: "Summit & Pago a la Tierra Ritual"
                        }, 
                        desc: {
                            es: "05:00 Ascenso a la cima del Peñón para ver el amanecer andino sobre la pampa. 08:30 Desayuno caliente de campaña. 10:00 Ceremonia de ofrenda de coca a los Apus y la Pachamama. 14:00 Descenso al pueblo de Pucará. Noche en posada local.",
                            en: "05:00 Ascent to the summit of the Lookout to watch the Andean sunrise over the plains. 08:30 Hot campaign breakfast. 10:00 Coca leaves offering ceremony to the Apus and Pachamama. 14:00 Descent to Pucará town. Night in a local inn."
                        }
                    },
                    { 
                        day: 3, 
                        title: {
                            es: "Arqueología Sagrada y Barro Vivo",
                            en: "Sacred Archaeology & Living Clay"
                        }, 
                        desc: {
                            es: "09:00 Tour arqueológico profundo en Kalasaya, visitando las cámaras funerarias y templos escalonados. 12:30 Almuerzo de despedida. 14:00 Taller de moldeado de arcilla rústica en un horno de leña. 17:00 Retorno.",
                            en: "09:00 Deep archaeological tour in Kalasaya, visiting burial chambers and stepped temples. 12:30 Farewell lunch. 14:00 Rustic clay molding workshop using a wood-fired oven. 17:00 Return."
                        }
                    }
                ]
            }
        ]
    },
    luxury: {
        id: 'luxury',
        title: {
            es: "Inmersión Barroco-Alfarera (2 Días)",
            en: "Baroque-Pottery Immersion (2 Days)"
        },
        subtitle: {
            es: "Arte, Lujo y Legado Vivo",
            en: "Art, Luxury & Living Legacy"
        },
        description: {
            es: "Una experiencia de alta gama que combina la rica historia colonial y pre-inca con clases personalizadas de alfarería junto a maestros artesanos reconocidos.",
            en: "A high-end experience combining rich colonial and pre-Inca history with personalized pottery classes alongside renowned master artisans."
        },
        images: [
            "https://chijnayafoundation.org/wp-content/uploads/2022/05/Diadel-torito3-scaled.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/4/47/Pucara_kirche.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07wW4l6j6v64TOW36C-pB9tA5a16H7tq1uQ&s"
        ],
        benefits: {
            accommodation: {
                es: "Boutique Lodge con calefacción y todas las comodidades premium.",
                en: "Boutique Lodge with heating and all premium comforts."
            },
            food: {
                es: "Cenas gourmet de fusión andina diseñadas por chefs locales.",
                en: "Gourmet Andean fusion dinners designed by local chefs."
            },
            transport: {
                es: "Camioneta ejecutiva cerrada con conductor privado.",
                en: "Closed executive SUV with private driver."
            },
            guide: {
                es: "Guía privado historiador bilingüe para todo el recorrido.",
                en: "Bilingual private historian guide for the entire tour."
            }
        },
        weeks: [
            {
                id: 1,
                title: {
                    es: "Ruta de 2 Días Premium",
                    en: "2-Day Premium Route"
                },
                days: [
                    { 
                        day: 1, 
                        title: {
                            es: "Masterclass de Arcilla con Maestro Alfarero",
                            en: "Clay Masterclass with Master Artisan"
                        }, 
                        desc: {
                            es: "09:00 Traslado privado VIP a Pucará. 10:30 Sesión exclusiva en el taller de un reconocido maestro alfarero galardonado. Moldeado y pulido de tu propio Torito de Pucará de colección. 13:30 Almuerzo gourmet andino. 15:30 Tour privado e histórico de la Iglesia Barroco-Andina de Santa Isabel. Cena de degustación.",
                            en: "09:00 Private VIP transfer to Pucará. 10:30 Exclusive session in the workshop of a recognized, award-winning master potter. Molding and polishing your own collectible Torito de Pucará. 13:30 Gourmet Andean lunch. 15:30 Private historical tour of the Baroque-Andean Church of Santa Isabel. Tasting dinner."
                        }
                    },
                    { 
                        day: 2, 
                        title: {
                            es: "Monolitos Sagrados y Cata de Quesos",
                            en: "Sacred Monoliths & Cheese Tasting"
                        }, 
                        desc: {
                            es: "09:00 Visita VIP guiada por arqueólogo al Templo de Kalasaya y al Museo Lítico. 13:00 Almuerzo campestre premium. 15:00 Cata exclusiva de quesos andinos tradicionales elaborados en la zona altiplánica de Pucará. 17:00 Retorno final.",
                            en: "09:00 Archaeologist-led VIP tour of the Kalasaya Temple and Lytic Museum. 13:00 Premium countryside lunch. 15:00 Exclusive tasting of traditional Andean cheeses made in the Pucará highland region. 17:00 Final return."
                        }
                    }
                ]
            }
        ]
    }
};
