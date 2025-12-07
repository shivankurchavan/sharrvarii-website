'use client';

import { siteConfig } from '@/config/site.config';
import { contentConfig } from '@/config/content.config';
import { servicesConfig } from '@/config/services.config';
import { FaHeart, FaStar, FaGem, FaHandHoldingHeart } from 'react-icons/fa';
import styles from './About.module.css';

const iconMap: { [key: string]: any } = {
    'tarot-cards': FaStar,
    'healing-hands': FaHandHoldingHeart,
    'crystal': FaGem,
    'lotus': FaHeart,
};

export default function About() {
    return (
        <section id="about" className={`${styles.about} section`}>
            <div className="container">
                {/* Section Header */}
                <div className={styles.header}>
                    <h2 className="animate-fade-in-up">About {siteConfig.owner.name}</h2>
                    <p className={`${styles.subtitle} animate-fade-in-up`}>
                        {siteConfig.owner.title}
                    </p>
                </div>

                {/* Bio Section */}
                <div className={styles.bioSection}>
                    <div className={styles.bioContent}>
                        <p className={styles.bio}>{contentConfig.about.bio}</p>

                        {/* Mission Statement */}
                        <div className={styles.missionCard}>
                            <h4>My Mission</h4>
                            <p>{contentConfig.about.mission}</p>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className={styles.highlights}>
                        {contentConfig.about.highlights.map((highlight, index) => (
                            <div
                                key={index}
                                className={`${styles.highlightCard} card animate-fade-in`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={styles.checkIcon}>✓</div>
                                <p>{highlight}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className={styles.servicesSection}>
                    <h3 className="text-center">Services Offered</h3>
                    <div className={styles.servicesGrid}>
                        {servicesConfig.map((service, index) => {
                            const IconComponent = iconMap[service.icon] || FaStar;
                            return (
                                <div
                                    key={service.id}
                                    className={`${styles.serviceCard} card`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={styles.serviceIcon}>
                                        <IconComponent />
                                    </div>
                                    <h4>{service.name}</h4>
                                    <p className={styles.serviceDesc}>{service.description}</p>
                                    <div className={styles.serviceDetails}>
                                        <span className={styles.duration}>⏱ {service.duration}</span>
                                        <span className={styles.price}>{service.price}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Certifications */}
                <div className={styles.certifications}>
                    <h4>Certifications & Training</h4>
                    <div className={styles.certList}>
                        {siteConfig.owner.certifications.map((cert, index) => (
                            <div key={index} className={styles.certBadge}>
                                <FaStar className={styles.certIcon} />
                                <span>{cert}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
