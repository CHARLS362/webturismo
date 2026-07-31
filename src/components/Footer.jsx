import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Send, ExternalLink, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { i18n } = useTranslation();
    const isEn = i18n.language === 'en';

    const schema = z.object({
        nombre: z.string().min(2, isEn ? 'Name must be at least 2 characters' : 'El nombre debe tener al menos 2 caracteres'),
        email: z.string().email(isEn ? 'Enter a valid email address' : 'Ingresa un correo electrónico válido'),
        destino: z.string().min(1, isEn ? 'Select an attraction' : 'Selecciona un atractivo'),
        fecha: z.string().min(1, isEn ? 'Select an approximate date' : 'Selecciona una fecha aproximada'),
        mensaje: z.string().max(300, isEn ? 'Message cannot exceed 300 characters' : 'El mensaje no puede exceder 300 caracteres').optional()
    });

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data) => {
        toast.success(isEn ? `Thank you, ${data.nombre}! Query sent. We will contact you soon. 🐂✨` : `¡Gracias, ${data.nombre}! Consulta enviada. Te contactaremos pronto. 🐂✨`, {
            duration: 5000,
            style: { background: '#FAF6F0', color: 'var(--primary)', border: '1px solid var(--terracotta)' }
        });
        reset();
    };

    const socialLinks = [
        {
            name: 'Facebook Oficial',
            icon: Facebook,
            href: 'https://www.facebook.com/MunicipalidadDistritaldePucara',
            color: '#1877F2'
        },
        {
            name: 'Instagram DIRCETUR',
            icon: Instagram,
            href: 'https://www.instagram.com/dircetur_puno',
            color: '#E4405F'
        },
        {
            name: 'YouTube Puno',
            icon: Youtube,
            href: 'https://www.youtube.com/@DIRCETUR_PUNO',
            color: '#FF0000'
        },
        {
            name: 'PromPerú — Y tú qué planes?',
            icon: ExternalLink,
            href: 'https://www.ytuqueplanes.com/destinos/pucara-tierra-del-torito',
            color: 'var(--bronze-gold)'
        },
        {
            name: 'Museo Lítico Virtual',
            icon: Globe,
            href: 'https://visitavirtual.cultura.pe/recorridos/MLP/museo-litico-pukara/index.html',
            color: 'var(--terracotta)'
        }
    ];

    return (
        <footer style={{ backgroundColor: 'var(--primary)', color: 'white', paddingTop: '5rem', paddingBottom: '2.5rem', position: 'relative' }} id="contacto">
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '3.5rem',
                    marginBottom: '4rem'
                }}>

                    {/* Column 1 — Brand & Pucará Information */}
                    <div>
                        <h3 style={{
                            color: 'var(--accent)',
                            marginBottom: '1.25rem',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.8rem',
                            fontWeight: 900
                        }}>
                            PUCARÁ 365
                        </h3>
                        <p style={{ opacity: 0.85, lineHeight: 1.8, marginBottom: '1.8rem', fontSize: '0.95rem', fontWeight: 300 }}>
                            {isEn 
                              ? 'Official tourism platform of Pucará, Lampa, Puno. Connect with the mysticism of the high plateau, the Kalasaya Archaeological Complex, and the tradition of the Toritos de Pucará.' 
                              : 'Plataforma oficial de turismo de Pucará, Lampa, Puno. Conecta con el misticismo del altiplano, el Complejo Arqueológico de Kalasaya y la tradición de los Toritos de Pucará.'}
                        </p>
                        
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', fontWeight: 700 }}>
                            {isEn ? 'Social Media & Official Links' : 'Redes Sociales & Enlaces Oficiales'}
                        </h4>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {socialLinks.map((item, idx) => {
                                const IconComponent = item.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={item.name}
                                        style={{
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '50%',
                                            background: 'rgba(255, 255, 255, 0.08)',
                                            border: '1px solid rgba(255, 255, 255, 0.15)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = item.color;
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <IconComponent size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 2 — Official Contact */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                            {isEn ? 'Pucará Tourism Office' : 'Oficina de Turismo Pucará'}
                        </h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
                            <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', fontSize: '0.95rem', opacity: 0.9 }}>
                                <Phone size={20} color="var(--accent)" />
                                <span>{isEn ? '+51 916 598 012 (Tourist Support)' : '+51 916 598 012 (Atención Turística)'}</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', fontSize: '0.95rem', opacity: 0.9 }}>
                                <Mail size={20} color="var(--accent)" />
                                <span>turismo@pucara365.com</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', fontSize: '0.95rem', opacity: 0.9 }}>
                                <MapPin size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>Jr. San Román S/N, Plaza Bolívar, Pucará, Lampa, Puno, Perú</span>
                            </li>
                        </ul>

                        <div style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(197, 155, 39, 0.2)',
                            fontSize: '0.85rem',
                            opacity: 0.85
                        }}>
                            🏛️ <strong>{isEn ? 'District Municipality of Pucará' : 'Municipalidad Distrital de Pucará'}</strong><br />
                            {isEn ? 'Transparency portal and local management:' : 'Portal de transparencia y gestión local:'}<br />
                            <a href="https://www.gob.pe/munipucara" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                                www.gob.pe/munipucara <ExternalLink size={12} style={{ display: 'inline' }} />
                            </a>
                        </div>
                    </div>

                    {/* Column 3 — Formulario de Consulta / Reserva */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.25rem', fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                            {isEn ? 'Request a Travel Consultation' : 'Reserva tu Consulta de Viaje'}
                        </h4>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            <div>
                                <input
                                    {...register('nombre')}
                                    placeholder={isEn ? "Your Full Name *" : "Tu Nombre Completo *"}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        background: 'rgba(255,255,255,0.08)',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '0.9rem'
                                    }}
                                />
                                {errors.nombre && <span style={{ color: '#F87171', fontSize: '0.75rem', marginTop: '2px', display: 'block' }}>{errors.nombre.message}</span>}
                            </div>

                            <div>
                                <input
                                    {...register('email')}
                                    placeholder={isEn ? "Email Address *" : "Correo Electrónico *"}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        background: 'rgba(255,255,255,0.08)',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '0.9rem'
                                    }}
                                />
                                {errors.email && <span style={{ color: '#F87171', fontSize: '0.75rem', marginTop: '2px', display: 'block' }}>{errors.email.message}</span>}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <div>
                                    <select
                                        {...register('destino')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 0.6rem',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            background: '#0B2240',
                                            color: 'white',
                                            outline: 'none',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        <option value="">{isEn ? "Attraction..." : "Atractivo..."}</option>
                                        <option value="Kalasaya">{isEn ? "Kalasaya Temple" : "Templo Kalasaya"}</option>
                                        <option value="Torito">{isEn ? "Pottery Workshop" : "Taller Alfarero"}</option>
                                        <option value="Museo">{isEn ? "Lytic Museum" : "Museo Lítico"}</option>
                                        <option value="Penon">{isEn ? "Pucará Lookout" : "El Peñón"}</option>
                                    </select>
                                    {errors.destino && <span style={{ color: '#F87171', fontSize: '0.75rem', marginTop: '2px', display: 'block' }}>{errors.destino.message}</span>}
                                </div>

                                <div>
                                    <input
                                        type="date"
                                        {...register('fecha')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 0.6rem',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            background: '#0B2240',
                                            color: 'white',
                                            outline: 'none',
                                            fontSize: '0.85rem'
                                        }}
                                    />
                                    {errors.fecha && <span style={{ color: '#F87171', fontSize: '0.75rem', marginTop: '2px', display: 'block' }}>{errors.fecha.message}</span>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-accent"
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    padding: '0.85rem',
                                    borderRadius: '10px',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <Send size={16} />{isEn ? 'Send Booking Query' : 'Enviar Consulta de Reserva'}
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Rights */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '2rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '0.85rem',
                    opacity: 0.7
                }}>
                    <div>
                        &copy; {new Date().getFullYear()} {isEn ? 'PUCARÁ 365 — Sustainable Tourism Development Project Altiplano Puno.' : 'PUCARÁ 365 — Proyecto de Desarrollo Turístico Sostenible Altiplano Puno.'}
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <span>Pucará, Lampa, Puno, Perú</span>
                        <span>{isEn ? 'Pre-Inca Culture (200 B.C.)' : 'Cultura Pre-Inca (200 a.C.)'}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
