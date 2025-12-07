'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site.config';
import { contentConfig } from '@/config/content.config';
import styles from './Hero.module.css';

export default function Hero() {
    const [count, setCount] = useState(0);
    const targetCount = siteConfig.stats.clientsServed;

    // Animated counter effect
    useEffect(() => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetCount / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetCount) {
                setCount(targetCount);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [targetCount]);

    return (
        <section className={styles.hero}>
            <div className="container">
                <div className={styles.heroContent}>
                    {/* Left Side - Stats and CTA */}
                    <div className={styles.heroLeft}>
                        <h1 className={`${styles.headline} animate-fade-in-up`}>
                            {contentConfig.hero.headline}
                        </h1>
                        <p className={`${styles.subheadline} animate-fade-in-up`}>
                            {contentConfig.hero.subheadline}
                        </p>

                        {/* Stats Cards */}
                        <div className={styles.statsGrid}>
                            <div className={`${styles.statCard} card-glass animate-fade-in`}>
                                <div className={styles.statNumber}>{count}+</div>
                                <div className={styles.statLabel}>Happy Clients</div>
                            </div>
                            <div className={`${styles.statCard} card-glass animate-fade-in`} style={{ animationDelay: '0.1s' }}>
                                <div className={styles.statNumber}>{siteConfig.stats.yearsExperience}+</div>
                                <div className={styles.statLabel}>Years Experience</div>
                            </div>
                            <div className={`${styles.statCard} card-glass animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                                <div className={styles.statNumber}>{siteConfig.stats.sessionsCompleted}+</div>
                                <div className={styles.statLabel}>Sessions Completed</div>
                            </div>
                            <div className={`${styles.statCard} card-glass animate-fade-in`} style={{ animationDelay: '0.3s' }}>
                                <div className={styles.statNumber}>{siteConfig.stats.satisfactionRate}%</div>
                                <div className={styles.statLabel}>Satisfaction Rate</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className={styles.ctaButtons}>
                            <a href={contentConfig.hero.ctaLink} className="btn btn-primary btn-large">
                                {contentConfig.hero.ctaText}
                            </a>
                            <a href={contentConfig.hero.secondaryCtaLink} className="btn btn-secondary btn-large">
                                {contentConfig.hero.secondaryCtaText}
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Profile Image */}
                    <div className={styles.heroRight}>
                        <div className={styles.imageWrapper}>
                            <div className={styles.imageGlow}></div>
                            <Image
                                src="/images/profile/sharrvarri-profile.png"
                                alt={siteConfig.owner.name}
                                width={500}
                                height={600}
                                priority
                                className={styles.profileImage}
                            />
                            <div className={styles.floatingElements}>
                                <div className={`${styles.floatingCard} ${styles.float1}`}>✨</div>
                                <div className={`${styles.floatingCard} ${styles.float2}`}>🔮</div>
                                <div className={`${styles.floatingCard} ${styles.float3}`}>🌙</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className={styles.bgDecoration}>
                <div className={styles.bgCircle1}></div>
                <div className={styles.bgCircle2}></div>
                <div className={styles.bgCircle3}></div>
            </div>
        </section>
    );
}
