import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById } from '../../data/servicesData';
import Navbar from '../../components/common/Navbar';
import './ServiceDetail.css';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const serviceData = getServiceById(serviceId);
        if (serviceData) {
            setService(serviceData);
            window.scrollTo(0, 0);
        } else {
            // Service not found, redirect to home
            navigate('/');
        }
    }, [serviceId, navigate]);

    const handleContactClick = () => {
        navigate('/', { state: { scrollTo: 'contact' } });
    };

    if (!service) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading service details...</p>
            </div>
        );
    }

    return (
        <div className="service-detail-page">
            <Navbar />

            {/* Hero Section */}
            <section className="service-hero" style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, #0d2818 100%)',
                padding: 'clamp(60px, 10vw, 100px) 0 clamp(40px, 8vw, 60px)',
                color: 'white'
            }}>
                <div className="container">
                    <div className="service-hero-content">
                        <div className="breadcrumb">
                            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
                            <span> / </span>
                            <a href="/#services" onClick={(e) => { e.preventDefault(); navigate('/', { state: { scrollTo: 'services' } }); }}>Services</a>
                            <span> / </span>
                            <span>{service.title}</span>
                        </div>
                        <div className="service-icon-large">{service.icon}</div>
                        <h1 className="service-title">{service.title}</h1>
                        <p className="service-category">{service.category}</p>
                        <p className="service-short-desc">{service.shortDesc}</p>
                        <div className="hero-actions">
                            <button className="btn btn-primary" onClick={handleContactClick}>
                                Get Started
                            </button>
                            <a href="tel:8928895195" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                                📞 Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Navigation */}
            <section className="service-tabs-section">
                <div className="container">
                    <div className="service-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                            onClick={() => setActiveTab('features')}
                        >
                            Key Features
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'process' ? 'active' : ''}`}
                            onClick={() => setActiveTab('process')}
                        >
                            Our Process
                        </button>

                        <button
                            className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
                            onClick={() => setActiveTab('faq')}
                        >
                            FAQ
                        </button>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="service-content-section section">
                <div className="container">
                    <div className="service-content-grid">
                        {/* Main Content */}
                        <div className="service-main-content">
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <div className="tab-content animate-fade-up">
                                    <h2>Overview</h2>
                                    <p className="overview-text">{service.overview}</p>

                                    <div className="detailed-description"
                                        dangerouslySetInnerHTML={{ __html: service.detailedDescription }}>
                                    </div>

                                    <div className="benefits-section">
                                        <h3>Benefits</h3>
                                        <div className="benefits-grid">
                                            {service.benefits.map((benefit, index) => (
                                                <div key={index} className="benefit-item">
                                                    <span className="benefit-icon">✓</span>
                                                    <span>{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="ideal-for-section">
                                        <h3>Ideal For</h3>
                                        <ul className="ideal-for-list">
                                            {service.idealFor.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Features Tab */}
                            {activeTab === 'features' && (
                                <div className="tab-content animate-fade-up">
                                    <h2>Key Features</h2>
                                    <div className="features-grid">
                                        {service.keyFeatures.map((feature, index) => (
                                            <div key={index} className="feature-card glass-card">
                                                <div className="feature-number">{index + 1}</div>
                                                <h3>{feature.title}</h3>
                                                <p>{feature.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Process Tab */}
                            {activeTab === 'process' && (
                                <div className="tab-content animate-fade-up">
                                    <h2>Our Process</h2>
                                    <p className="process-intro">We follow a systematic approach to ensure the best results for our clients.</p>
                                    <div className="process-timeline">
                                        {service.process.map((step, index) => (
                                            <div key={index} className="process-step">
                                                <div className="step-marker">
                                                    <div className="step-number">{step.step}</div>
                                                    {index < service.process.length - 1 && <div className="step-line"></div>}
                                                </div>
                                                <div className="step-content">
                                                    <h3>{step.title}</h3>
                                                    <p>{step.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}



                            {/* FAQ Tab */}
                            {activeTab === 'faq' && (
                                <div className="tab-content animate-fade-up">
                                    <h2>Frequently Asked Questions</h2>
                                    <div className="faq-list">
                                        {service.faq.map((item, index) => (
                                            <div key={index} className="faq-item glass-card">
                                                <h3 className="faq-question">
                                                    <span className="faq-icon">Q.</span>
                                                    {item.question}
                                                </h3>
                                                <p className="faq-answer">
                                                    <span className="faq-icon">A.</span>
                                                    {item.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="faq-cta">
                                        <h3>Still have questions?</h3>
                                        <p>Our team is here to help. Contact us for personalized assistance.</p>
                                        <button className="btn btn-primary" onClick={handleContactClick}>
                                            Contact Us
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="service-sidebar">
                            {/* Contact Card */}
                            <div className="sidebar-card glass-card">
                                <h3>Need Help?</h3>
                                <p>Get in touch with our expert team</p>
                                <div className="contact-info">
                                    <a href="tel:8928895195" className="contact-item">
                                        <span className="contact-icon">📞</span>
                                        <div>
                                            <div className="contact-label">Call Us</div>
                                            <div className="contact-value">8928895195</div>
                                        </div>
                                    </a>
                                    <a href="mailto:contact@fintaxvers.com" className="contact-item">
                                        <span className="contact-icon">📧</span>
                                        <div>
                                            <div className="contact-label">Email Us</div>
                                            <div className="contact-value">contact@fintaxvers.com</div>
                                        </div>
                                    </a>
                                    <a href="https://wa.me/918928895195" target="_blank" rel="noreferrer" className="contact-item">
                                        <span className="contact-icon">💬</span>
                                        <div>
                                            <div className="contact-label">WhatsApp</div>
                                            <div className="contact-value">Chat with us</div>
                                        </div>
                                    </a>
                                </div>
                                <button className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }} onClick={handleContactClick}>
                                    Request Consultation
                                </button>
                            </div>

                            {/* Quick Info Card */}
                            <div className="sidebar-card glass-card">
                                <h3>Quick Info</h3>
                                <div className="quick-info-list">
                                    <div className="quick-info-item">
                                        <span className="info-label">Category</span>
                                        <span className="info-value">{service.category}</span>
                                    </div>

                                    <div className="quick-info-item">
                                        <span className="info-label">Expert</span>
                                        <span className="info-value">Yugant V. Rahele</span>
                                    </div>
                                </div>
                            </div>

                            {/* Why Choose Us Card */}
                            <div className="sidebar-card glass-card">
                                <h3>Why Choose Us?</h3>
                                <ul className="why-choose-list">
                                    <li>
                                        <span className="check-icon">✓</span>
                                        10+ Years Experience
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        500+ Satisfied Clients
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        Expert Team
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        Timely Delivery
                                    </li>
                                    <li>
                                        <span className="check-icon">✓</span>
                                        Affordable Pricing
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="service-cta-section" style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, #0d2818 100%)',
                padding: 'clamp(40px, 8vw, 60px) 0',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '20px' }}>
                        Ready to Get Started?
                    </h2>
                    <p style={{ fontSize: '1.1rem', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
                        Let our experts handle your {service.title.toLowerCase()} needs. Contact us today for a free consultation.
                    </p>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" style={{ background: 'white', color: 'var(--primary)' }} onClick={handleContactClick}>
                            Schedule Consultation
                        </button>
                        <a href="tel:8928895195" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                            Call: 8928895195
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="section" style={{ background: '#fff', borderTop: '1px solid #e2e8f0', padding: '40px 0 20px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                        <p>&copy; 2026 FinTaxVers. Excellence in Finance.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ServiceDetail;
