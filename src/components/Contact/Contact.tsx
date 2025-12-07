'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { siteConfig } from '@/config/site.config';
import { contentConfig } from '@/config/content.config';
import { servicesConfig } from '@/config/services.config';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import styles from './Contact.module.css';

// Form validation schema
const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    service: z.string().min(1, 'Please select a service'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    preferredDate: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitStatus('success');
                reset();
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className={`${styles.contact} section`}>
            <div className="container">
                {/* Section Header */}
                <div className={styles.header}>
                    <h2 className="animate-fade-in-up">{contentConfig.contact.heading}</h2>
                    <p className={`${styles.subtitle} animate-fade-in-up`}>
                        {contentConfig.contact.subheading}
                    </p>
                </div>

                <div className={styles.contactContent}>
                    {/* Contact Form */}
                    <div className={styles.formSection}>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            {/* Name */}
                            <div className={styles.formGroup}>
                                <label htmlFor="name">{contentConfig.contact.formFields.name}</label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                    className={errors.name ? styles.inputError : ''}
                                    placeholder="Your full name"
                                />
                                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                            </div>

                            {/* Email */}
                            <div className={styles.formGroup}>
                                <label htmlFor="email">{contentConfig.contact.formFields.email}</label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className={errors.email ? styles.inputError : ''}
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                            </div>

                            {/* Phone */}
                            <div className={styles.formGroup}>
                                <label htmlFor="phone">{contentConfig.contact.formFields.phone}</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    {...register('phone')}
                                    className={errors.phone ? styles.inputError : ''}
                                    placeholder="+91 98765 43210"
                                />
                                {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                            </div>

                            {/* Service */}
                            <div className={styles.formGroup}>
                                <label htmlFor="service">{contentConfig.contact.formFields.service}</label>
                                <select
                                    id="service"
                                    {...register('service')}
                                    className={errors.service ? styles.inputError : ''}
                                >
                                    <option value="">-- Select a service --</option>
                                    {servicesConfig.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name} - {service.price}
                                        </option>
                                    ))}
                                </select>
                                {errors.service && <span className={styles.error}>{errors.service.message}</span>}
                            </div>

                            {/* Preferred Date */}
                            <div className={styles.formGroup}>
                                <label htmlFor="preferredDate">{contentConfig.contact.formFields.preferredDate}</label>
                                <input
                                    id="preferredDate"
                                    type="date"
                                    {...register('preferredDate')}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            {/* Message */}
                            <div className={styles.formGroup}>
                                <label htmlFor="message">{contentConfig.contact.formFields.message}</label>
                                <textarea
                                    id="message"
                                    {...register('message')}
                                    className={errors.message ? styles.inputError : ''}
                                    rows={5}
                                    placeholder="Tell me about what you're seeking guidance on..."
                                ></textarea>
                                {errors.message && <span className={styles.error}>{errors.message.message}</span>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-primary btn-large"
                                disabled={isSubmitting}
                                style={{ width: '100%' }}
                            >
                                {isSubmitting ? 'Sending...' : contentConfig.contact.submitText}
                            </button>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className={styles.successMessage}>{contentConfig.contact.successMessage}</div>
                            )}
                            {submitStatus === 'error' && (
                                <div className={styles.errorMessage}>{contentConfig.contact.errorMessage}</div>
                            )}
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.infoSection}>
                        <div className={`${styles.infoCard} card`}>
                            <h3>Get in Touch</h3>

                            <div className={styles.infoItem}>
                                <FaEnvelope className={styles.icon} />
                                <div>
                                    <p className={styles.infoLabel}>Email</p>
                                    <a href={`mailto:${siteConfig.contact.email}`} className={styles.infoValue}>
                                        {siteConfig.contact.email}
                                    </a>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <FaPhone className={styles.icon} />
                                <div>
                                    <p className={styles.infoLabel}>Phone</p>
                                    <a href={`tel:${siteConfig.contact.phone}`} className={styles.infoValue}>
                                        {siteConfig.contact.phone}
                                    </a>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <FaMapMarkerAlt className={styles.icon} />
                                <div>
                                    <p className={styles.infoLabel}>Location</p>
                                    <p className={styles.infoValue}>{siteConfig.contact.location}</p>
                                </div>
                            </div>

                            <div className={styles.socialMedia}>
                                <h4>Follow Me</h4>
                                <div className={styles.socialIcons}>
                                    <a href={siteConfig.contact.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                                        <FaInstagram />
                                    </a>
                                    <a href={siteConfig.contact.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                                        <FaFacebook />
                                    </a>
                                    <a href={siteConfig.contact.socialMedia.youtube} target="_blank" rel="noopener noreferrer">
                                        <FaYoutube />
                                    </a>
                                    <a href={siteConfig.contact.socialMedia.whatsapp} target="_blank" rel="noopener noreferrer">
                                        <FaWhatsapp />
                                    </a>
                                </div>
                            </div>

                            <div className={styles.responseTime}>
                                <p>⏱ <strong>Response Time:</strong> Within 24 hours</p>
                                <p>🔒 <strong>Privacy:</strong> Your information is kept confidential</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
