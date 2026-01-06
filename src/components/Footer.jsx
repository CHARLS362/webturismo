import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--primary)', color: 'white', paddingTop: '4rem', paddingBottom: '2rem' }} id="contacto">
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                <div>
                    <h3 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Magia Andina</h3>
                    <p style={{ opacity: 0.8, lineHeight: 1.8, marginBottom: '1.5rem' }}>
                        Tu puerta de entrada a los misterios del Lago Titicaca. Viajes personalizados de larga estancia para el alma viajera.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {[Facebook, Instagram, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="hover:text-accent" style={{ color: 'white' }}>
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Contacto</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <Phone size={18} color="var(--accent)" /> +51 951 123 456
                        </li>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <Mail size={18} color="var(--accent)" /> reservas@magiaandina.com
                        </li>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <MapPin size={18} color="var(--accent)" /> Jr. Puno 123, Puno, Perú
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Enlaces Rápidos</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['Itinerario 30 Días', 'Tips de Altura', 'Blog de Viajes', 'Términos y Condiciones'].map((link) => (
                            <li key={link}>
                                <a href="#" className="hover:text-accent" style={{ opacity: 0.8, fontSize: '0.95rem' }}>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.6 }}>
                &copy; {new Date().getFullYear()} Magia Andina del Titicaca. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
