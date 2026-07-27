import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      header: {
        nav_exclusividad: "Diseña tu Ruta",
        nav_itinerario: "Itinerarios",
        nav_destinos: "Destinos",
        nav_virtual: "Tour 360°",
        nav_mapa: "Mapa",
        nav_festivales: "Festivales",
        nav_planificador: "Planificador",
        nav_roadmap: "Hoja de Ruta",
        nav_recom: "Recomendaciones",
        nav_dashboard: "Destino Inteligente",
        lang_label: "Idioma"
      },
      hero: {
        subtitle: "El Origen del Altiplano Místico",
        desc: "Descubre la cuna de la cultura Pucará, donde nace el Torito tradicional de la suerte, el misticismo andino y la alfarería viva del altiplano peruano.",
        cta_plan: "Planifica tu Aventura",
        cta_explore: "Explorar Atractivos"
      },
      dashboard: {
        title: "Dashboard de Destino Inteligente",
        subtitle: "Monitoreo en Tiempo Real - Pucará 2030",
        desc: "Este panel de control integra datos en tiempo real de sensores IoT, un agregador de reputación online e indicadores de sostenibilidad y competitividad para la gestión eficiente del destino.",
        iot_cameras: "Cámaras IoT en Vivo (Flujo Turístico)",
        camera_plaza: "Cámara 1: Plaza de Armas & Iglesia Santa Isabel",
        camera_taller: "Cámara 2: Maestro Artesano en Taller Vivencial",
        iot_sensor_flow: "Monitoreo de Aforo (Sensores IoT)",
        state_low: "Aforo Bajo",
        state_med: "Aforo Moderado",
        state_high: "Aforo Alto / Congestión",
        sustainability: "Métricas de Sostenibilidad",
        competitiveness: "Métricas de Competitividad",
        water_usage: "Consumo de Agua por Turista (Litros/Día)",
        reputation: "Reputación Online en Tiempo Real",
        satisfaction: "Nivel de Satisfacción",
        sentiment: "Análisis de Sentimiento",
        sent_positive: "Positivo",
        sent_neutral: "Neutral",
        sent_negative: "Negativo",
        write_review: "Escribe tu Opinión",
        submit_review: "Enviar Reseña",
        name_placeholder: "Tu Nombre",
        comment_placeholder: "Tu opinión sobre Pucará...",
        reviews_feed: "Opiniones Recientes (TripAdvisor / Google Reviews / Booking)",
        reviews_empty: "No hay opiniones recientes. ¡Sé el primero en dejar una!",
        indicadores: {
          satisfaccion: "Satisfacción General",
          permanencia: "Permanencia Promedio",
          gasto: "Gasto Promedio Diario (USD)",
          arribos: "Llegadas Mensuales"
        }
      },
      tour: {
        subtitle: "Portal Interactivo",
        title: "Visita Virtual 360° y Videos Educativos",
        desc: "Explora la riqueza arqueológica del Museo Lítico a través del recorrido 360° o reproduce nuestros videos cinemáticos de la ruta, alfarería y paisajes locales.",
        tab_virtual: "Recorrido Virtual 360°",
        tab_video: "Videos de la Experiencia",
        btn_open: "Abrir Recorrido 360°",
        video_alrededores: "Paisajes y Alrededores de Pucará",
        video_artesanos: "Taller de Alfarería Tradicional",
        video_tour: "Documental Turístico Pucará 365"
      }
    }
  },
  en: {
    translation: {
      header: {
        nav_exclusividad: "Design Route",
        nav_itinerario: "Itineraries",
        nav_destinos: "Destinations",
        nav_virtual: "360° Tour",
        nav_mapa: "Map",
        nav_festivales: "Festivals",
        nav_planificador: "Planner",
        nav_roadmap: "Roadmap",
        nav_recom: "Recommendations",
        nav_dashboard: "Smart Destination",
        lang_label: "Language"
      },
      hero: {
        subtitle: "The Origin of the Mystic Altiplano",
        desc: "Discover the cradle of the Pucara culture, the birthplace of the traditional lucky Torito, Andean mysticism, and the living pottery of the Peruvian highlands.",
        cta_plan: "Plan Your Adventure",
        cta_explore: "Explore Attractions"
      },
      dashboard: {
        title: "Smart Destination Dashboard",
        subtitle: "Real-Time Monitoring - Pucará 2030",
        desc: "This control panel integrates real-time data from IoT sensors, an online reputation aggregator, and sustainability and competitiveness metrics for efficient destination management.",
        iot_cameras: "Live IoT Cameras (Tourist Flow)",
        camera_plaza: "Camera 1: Plaza de Armas & Santa Isabel Church",
        camera_taller: "Camera 2: Master Artisan in Experiential Workshop",
        iot_sensor_flow: "Capacity Monitoring (IoT Sensors)",
        state_low: "Low Capacity",
        state_med: "Moderate Capacity",
        state_high: "High Capacity / Congestion",
        sustainability: "Sustainability Metrics",
        competitiveness: "Competitiveness Metrics",
        water_usage: "Water Consumption per Tourist (Liters/Day)",
        reputation: "Real-Time Online Reputation",
        satisfaction: "Visitor Satisfaction Level",
        sentiment: "Sentiment Analysis",
        sent_positive: "Positive",
        sent_neutral: "Neutral",
        sent_negative: "Negative",
        write_review: "Write Your Review",
        submit_review: "Submit Review",
        name_placeholder: "Your Name",
        comment_placeholder: "Your opinion about Pucará...",
        reviews_feed: "Recent Reviews (TripAdvisor / Google Reviews / Booking)",
        reviews_empty: "No recent reviews. Be the first to leave one!",
        indicadores: {
          satisfaccion: "Overall Satisfaction",
          permanencia: "Average Stay",
          gasto: "Average Daily Spending (USD)",
          arribos: "Monthly Arrivals"
        }
      },
      tour: {
        subtitle: "Interactive Portal",
        title: "360° Virtual Tour & Educational Videos",
        desc: "Explore the archaeological wealth of the Lytic Museum through the 360° tour or play our cinematic videos of the route, pottery, and local landscapes.",
        tab_virtual: "360° Virtual Tour",
        tab_video: "Experience Videos",
        btn_open: "Open 360° Tour",
        video_alrededores: "Pucará Landscapes & Surroundings",
        video_artesanos: "Traditional Pottery Workshop",
        video_tour: "Pucará 365 Tourist Documentary"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Default language
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
