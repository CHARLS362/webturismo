import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { Clock, MapPin, Compass, Share2 } from 'lucide-react';
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share';
import { pucaraAttractions } from '../data/pucaraData';
import { useTranslation } from 'react-i18next';

const PucaraDestinations = () => {
    const { i18n } = useTranslation();
    const isEn = i18n.language === 'en';
    const langKey = isEn ? 'en' : 'es';

    return (
        <section id="pucara-destinos" className="section bg-blue-contrast" style={{ position: 'relative', overflow: 'hidden', padding: '6.5rem 0' }}>
            {/* Background ambient light */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '450px',
                height: '450px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(184, 92, 56, 0.08) 0%, rgba(255,255,255,0) 70%)',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-5%',
                width: '550px',
                height: '550px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(11, 34, 64, 0.06) 0%, rgba(255,255,255,0) 70%)',
                pointerEvents: 'none'
            }} />

            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                    <span className="script-subtitle">{isEn ? 'Land of Sacred Clay...' : 'Tierra del Barro Sagrado...'}</span>
                    <h2 className="bold-title">{isEn ? 'Must-See Attractions in Pucará' : 'Atractivos Imperdibles de Pucará'}</h2>
                    <div style={{ height: '4px', background: 'var(--accent)', margin: '0 auto 1.5rem auto', borderRadius: '2px', width: '80px' }} />
                    <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        {isEn 
                          ? 'Discover one of the oldest living and archaeological cultures in South America. From its imposing red stone pyramids to the magic of its pottery artisans.'
                          : 'Descubre una de las culturas vivas y arqueológicas más antiguas de Sudamérica. Desde sus imponentes pirámides de piedra roja hasta la magia de sus artesanos alfareros.'}
                    </p>
                </div>

                <div 
                    className="grid-attractions"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2.5rem',
                        padding: '1rem 0'
                    }}
                >
                    {pucaraAttractions.map((attraction, idx) => (
                        <Tilt
                            key={attraction.id}
                            tiltMaxAngleX={6}
                            tiltMaxAngleY={6}
                            glareEnable={true}
                            glareMaxOpacity={0.12}
                            glareColor="rgba(197, 155, 39, 0.3)"
                            glarePosition="all"
                            scale={1.02}
                            style={{ borderRadius: '36px 12px 36px 12px' }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className={`card ${idx % 3 === 0 ? 'card-terracotta' : idx % 3 === 1 ? 'card-primary' : 'card-green'}`}
                                style={{
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    padding: 0,
                                    border: '1px solid rgba(11, 34, 64, 0.08)'
                                }}
                            >
                                {/* Card Image Area */}
                                <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                                    <img 
                                        src={attraction.image} 
                                        alt={attraction.title[langKey]}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                    />
                                    {/* Gradient Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(11, 34, 64, 0.45) 0%, transparent 60%)',
                                        pointerEvents: 'none'
                                    }} />

                                    {/* Badges */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '1.25rem',
                                        left: '1.25rem',
                                        background: 'rgba(11, 34, 64, 0.85)',
                                        backdropFilter: 'blur(8px)',
                                        color: 'white',
                                        padding: '0.45rem 1.1rem',
                                        borderRadius: '30px',
                                        fontSize: '0.8rem',
                                        fontWeight: 800,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        boxShadow: 'var(--shadow-sm)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <Compass size={14} style={{ color: 'var(--accent)' }} />
                                        <span>{attraction.altitude[langKey]}</span>
                                    </div>
                                    
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '1.25rem',
                                        right: '1.25rem',
                                        background: 'rgba(184, 92, 56, 0.9)',
                                        backdropFilter: 'blur(8px)',
                                        color: 'white',
                                        padding: '0.45rem 1.1rem',
                                        borderRadius: '30px',
                                        fontSize: '0.8rem',
                                        fontWeight: 800,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <Clock size={14} style={{ color: 'var(--accent)' }} />
                                        <span>{attraction.duration[langKey]}</span>
                                    </div>
                                </div>

                                {/* Card Content Area */}
                                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '1.45rem',
                                        color: 'var(--primary)',
                                        marginBottom: '0.5rem',
                                        lineHeight: '1.25',
                                        fontWeight: 800
                                    }}>
                                        {attraction.title[langKey]}
                                    </h3>
                                    <p style={{
                                        color: 'var(--terracotta)',
                                        fontSize: '0.85rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        marginBottom: '1.25rem'
                                    }}>
                                        {attraction.subtitle[langKey]}
                                    </p>
                                    <p style={{
                                        color: 'var(--text-muted)',
                                        fontSize: '0.98rem',
                                        lineHeight: '1.6',
                                        marginBottom: '1.75rem',
                                        flexGrow: 1
                                    }}>
                                        {attraction.description[langKey]}
                                    </p>

                                    <div style={{ height: '1px', background: 'rgba(11, 34, 64, 0.1)', margin: '1rem 0' }} />

                                    {/* Footer Details & Social Sharing */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <MapPin size={16} style={{ color: 'var(--terracotta)' }} />
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                                                {attraction.highlight[langKey]}
                                            </span>
                                        </div>

                                        {/* Social Share Buttons */}
                                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                            <WhatsappShareButton 
                                                url="https://pucara365.com" 
                                                title={isEn ? `Check out ${attraction.title[langKey]} in Pucará! 🐂✨` : `¡Mira ${attraction.title[langKey]} en Pucará! 🐂✨`}
                                            >
                                                <WhatsappIcon size={28} round bgStyle={{ fill: 'var(--ichu-green)' }} />
                                            </WhatsappShareButton>
                                            <FacebookShareButton url="https://pucara365.com" hashtag="#PucaraTurismo">
                                                <FacebookIcon size={28} round />
                                            </FacebookShareButton>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Tilt>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PucaraDestinations;
