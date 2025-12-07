'use client';

import { useState } from 'react';
import { contentConfig } from '@/config/content.config';
import { FaStar } from 'react-icons/fa';
import styles from './Testimonials.module.css';

// Sample text testimonials (will be fetched from MongoDB in production)
const textTestimonials = [
    {
        id: 1,
        name: 'Anonymous',
        isAnonymous: true,
        rating: 5,
        text: 'The tarot reading was incredibly accurate and gave me the clarity I needed. Sharrvarri has a genuine gift for connecting with energy and providing meaningful guidance.',
        service: 'Tarot Reading',
        date: '2024-11-15',
    },
    {
        id: 2,
        name: 'Priya M.',
        isAnonymous: false,
        rating: 5,
        text: 'After just one energy healing session, I felt a profound shift in my emotional well-being. The experience was transformative and deeply healing.',
        service: 'Energy Healing',
        date: '2024-11-10',
    },
    {
        id: 3,
        name: 'Anonymous',
        isAnonymous: true,
        rating: 5,
        text: 'I was skeptical at first, but the crystal healing therapy exceeded all my expectations. I now feel more balanced and centered than ever before.',
        service: 'Crystal Healing',
        date: '2024-11-05',
    },
    {
        id: 4,
        name: 'Rahul K.',
        isAnonymous: false,
        rating: 5,
        text: 'The spiritual life coaching sessions helped me navigate a difficult career transition. Sharrvarri provided both practical wisdom and spiritual guidance.',
        service: 'Spiritual Coaching',
        date: '2024-10-28',
    },
    {
        id: 5,
        name: 'Anonymous',
        isAnonymous: true,
        rating: 5,
        text: 'Highly recommend! The tarot reading was spot-on and helped me make important decisions about my relationship. Thank you for your compassionate guidance.',
        service: 'Tarot Reading',
        date: '2024-10-20',
    },
    {
        id: 6,
        name: 'Anjali S.',
        isAnonymous: false,
        rating: 5,
        text: 'A truly gifted healer. The energy work released blockages I didn\'t even know I had. I feel lighter, happier, and more aligned with my purpose.',
        service: 'Energy Healing',
        date: '2024-10-15',
    },
];

export default function Testimonials() {
    const [activeVideo, setActiveVideo] = useState(0);

    const videoTestimonials = contentConfig.testimonials.videoTestimonials;

    return (
        <section id="testimonials" className={`${styles.testimonials} section`}>
            <div className="container">
                {/* Section Header */}
                <div className={styles.header}>
                    <h2 className="animate-fade-in-up">{contentConfig.testimonials.heading}</h2>
                    <p className={`${styles.subtitle} animate-fade-in-up`}>
                        {contentConfig.testimonials.subheading}
                    </p>
                </div>

                {/* Video Testimonials */}
                <div className={styles.videoSection}>
                    <h3 className="text-center">Video Testimonials</h3>
                    <div className={styles.videoCarousel}>
                        <div className={styles.videoPlayer}>
                            <iframe
                                width="100%"
                                height="100%"
                                src={videoTestimonials[activeVideo].videoUrl}
                                title={`Video testimonial from ${videoTestimonials[activeVideo].clientName}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className={styles.videoFrame}
                            ></iframe>
                            <div className={styles.videoInfo}>
                                <p className={styles.videoClient}>{videoTestimonials[activeVideo].clientName}</p>
                                <p className={styles.videoService}>{videoTestimonials[activeVideo].service}</p>
                            </div>
                        </div>

                        {/* Video Thumbnails */}
                        <div className={styles.videoThumbnails}>
                            {videoTestimonials.map((video, index) => (
                                <button
                                    key={video.id}
                                    onClick={() => setActiveVideo(index)}
                                    className={`${styles.thumbnail} ${activeVideo === index ? styles.activeThumbnail : ''}`}
                                >
                                    <div className={styles.thumbnailOverlay}>
                                        <span className={styles.playIcon}>▶</span>
                                    </div>
                                    <p>{video.clientName}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Text Testimonials */}
                <div className={styles.textSection}>
                    <h3 className="text-center">Client Reviews</h3>
                    <div className={styles.testimonialsGrid}>
                        {textTestimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`${styles.testimonialCard} card`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Stars */}
                                <div className={styles.rating}>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className={styles.star} />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className={styles.testimonialText}>"{testimonial.text}"</p>

                                {/* Client Info */}
                                <div className={styles.clientInfo}>
                                    <div>
                                        <p className={styles.clientName}>
                                            {testimonial.isAnonymous ? (
                                                <>
                                                    <span className={styles.anonBadge}>🔒</span> {testimonial.name}
                                                </>
                                            ) : (
                                                testimonial.name
                                            )}
                                        </p>
                                        <p className={styles.serviceType}>{testimonial.service}</p>
                                    </div>
                                    <p className={styles.date}>
                                        {new Date(testimonial.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
