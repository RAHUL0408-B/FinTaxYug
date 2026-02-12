import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import officePhoto from '../../assets/office_photo.jpg';
import whatsappLogo from '../../assets/whatsapp_logo.png';
import qrCode from '../../assets/instagram_qr.png';
import yugantProfile from '../../assets/yugant_profile_new.png';
import yugantSignature from '../../assets/yugant_signature.png';
import HeroSlider from '../../components/common/HeroSlider';
import logo from '../../assets/fintaxverslogo.png';
import Navbar from '../../components/common/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function UserPortal() {
    const { addInquiry, services } = useApp();
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', type: '', message: '', businessType: '', turnover: '' });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Handle scrolling
        if (location.state?.scrollTo) {
            setTimeout(() => {
                scrollToSection(location.state.scrollTo);
            }, 100);
        }

        // Handle URL parameters for pre-filling form
        const params = new URLSearchParams(location.search);
        const msg = params.get('message');
        const type = params.get('type');
        if (msg || type) {
            setFormData(prev => ({
                ...prev,
                message: msg ? decodeURIComponent(msg) : prev.message,
                type: type ? decodeURIComponent(type) : prev.type
            }));
            scrollToSection('contact');
        }
    }, [location]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent double submission
        if (isSubmitting) return;

        setIsSubmitting(true);
        const success = await addInquiry(formData);

        if (success) {
            setShowSuccess(true);
            setFormData({ name: '', email: '', mobile: '', type: '', message: '', businessType: '', turnover: '' });
            setTimeout(() => setShowSuccess(false), 5000);
        }

        setIsSubmitting(false);
    };


    return (
        <div className="user-portal" style={{ background: '#f8fafc', color: '#1e293b' }}>
            {/* Navbar */}
            <Navbar />


            {/* Hero Slider */}
            <div id="home">
                <HeroSlider />
            </div>

            {/* Services Section */}
            <section id="services" className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '16px', color: '#1e293b' }}>Our Services</h2>
                        <p style={{ color: '#64748b', maxWidth: '800px', margin: '0 auto' }}>Comprehensive financial and compliance solutions tailored for Indian businesses and MSMEs.</p>
                    </div>
                    <div className="services-container">
                        {[
                            {
                                category: "A. Business Finance & Loans (High Value)",
                                items: [
                                    { title: "Project Financing & CMA Data", desc: "Expert preparation of Credit Monitoring Arrangement (CMA) reports for bank loan approvals.", icon: "📊", link: "/services/cma-data-project-financing" },
                                    { title: "Loan Assistance", desc: "Guidance for Unsecured Business Loans, Secured Loans, and Mudra Loans.", icon: "💵", link: "/services/business-loan-assistance" },
                                    { title: "Subsidy Consultancy", desc: "Helping you identify and apply for government business subsidies.", icon: "🏛️", link: "/services/govt-subsidy-consulting" }
                                ]
                            },
                            {
                                category: "B. Registration & Compliance (Startup Focused)",
                                items: [
                                    { title: "Business Setup", desc: "Company Registration (Pvt Ltd, LLP), Partnership Firm Registration.", icon: "🏢", link: "/services/company-llp-formation" },
                                    { title: "Local Licenses", desc: "Shop Act (Gumasta), MSME (Udyam Aadhar) Registration.", icon: "📝", link: "/services/shop-act-msme" },
                                    { title: "ROC Filing", desc: "Handling annual returns and Ministry of Corporate Affairs (MCA) compliance.", icon: "⚖️", link: "/services/roc-annual-compliance" }
                                ]
                            },
                            {
                                category: "C. Tax & Accounting (Day-to-Day Operations)",
                                items: [
                                    { title: "GST Solutions", desc: "New GST Registration, Monthly/Quarterly Return Filing, and error correction.", icon: "📄", link: "/services/gst-returns-solutions" },
                                    { title: "Financial Reporting", desc: "End-to-end accounting, bookkeeping, and financial statement preparation.", icon: "📈", link: "/services/financial-reporting" },
                                    { title: "Tax Management", desc: "Income Tax planning and return filing services.", icon: "💰", link: "/services/income-tax-planning" },
                                    { title: "Internal Audit", desc: "Reviewing your internal financial controls to prevent leakage.", icon: "🔍", link: "/services/internal-audit" }
                                ]
                            }
                        ].map((cat, idx) => (
                            <div key={idx} style={{ marginBottom: '60px' }}>
                                <h3 style={{
                                    color: 'var(--primary)',
                                    fontSize: '1.5rem',
                                    marginBottom: '30px',
                                    paddingBottom: '10px',
                                    borderBottom: '2px solid #e2e8f0',
                                    display: 'inline-block'
                                }}>
                                    {cat.category}
                                </h3>
                                <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                                    {cat.items.map((service, sIdx) => (
                                        <div
                                            key={sIdx}
                                            className="service-card animate-fade-up"
                                            style={{
                                                animationDelay: `${sIdx * 0.1} s`,
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onClick={() => navigate(service.link)}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-8px)';
                                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '';
                                            }}
                                        >
                                            <div className="service-icon">{service.icon}</div>
                                            <h3 style={{ color: '#1e293b', marginBottom: '15px', fontSize: '1.1rem' }}>{service.title}</h3>
                                            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '15px' }}>{service.desc}</p>
                                            <button
                                                className="btn btn-outline"
                                                style={{
                                                    marginTop: 'auto',
                                                    padding: '8px 20px',
                                                    borderRadius: '50px',
                                                    border: '1px solid var(--primary)',
                                                    color: 'var(--primary)',
                                                    background: 'transparent',
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(service.link);
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'var(--primary)';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = 'var(--primary)';
                                                }}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology Section */}
            <section className="section methodology">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '16px', color: '#1e293b' }}>Work Methodology</h2>
                        <p style={{ color: '#64748b', maxWidth: '800px', margin: '0 auto' }}>Our streamlined 3-step process ensures accuracy and timely compliance reporting.</p>
                    </div>
                    <div className="method-grid">
                        <div className="method-step animate-fade-up">
                            <div className="step-number">1</div>
                            <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>Data Collection</h3>
                            <p style={{ color: '#64748b' }}>Systematic gathering of financial records and transaction details.</p>
                        </div>
                        <div className="method-step animate-fade-up">
                            <div className="step-number">2</div>
                            <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>Accurate Calculation</h3>
                            <p style={{ color: '#64748b' }}>Assessment of tax liabilities and financial health based on current norms.</p>
                        </div>
                        <div className="method-step animate-fade-up">
                            <div className="step-number">3</div>
                            <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>Compliance Reporting</h3>
                            <p style={{ color: '#64748b' }}>Submission and performance of tax reporting with zero compliance risk.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '16px', color: '#1e293b' }}>About FinTaxVers</h2>
                        <p style={{ color: '#64748b', maxWidth: '800px', margin: '0 auto' }}>Dedicated to providing professional financial excellence and building long-term consultant relationships.</p>
                    </div>
                    <div className="about-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '30px',
                        alignItems: 'stretch'
                    }}>
                        <div className="about-card-wrapper animate-fade-up">
                            <div className="glass-card" style={{ height: '100%', padding: '20px' }}>
                                <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', minHeight: '300px' }}>
                                    <img src={officePhoto} alt="FinTaxVers Office" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--primary)' }}>Our Premium Workspace</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Experience sophisticated financial planning in our Nagpur headquarters.</p>
                                </div>
                            </div>
                        </div>

                        <div className="about-card-wrapper animate-fade-up" style={{ animationDelay: '0.2s' }}>
                            <div className="glass-card" style={{ height: '100%', padding: 'clamp(20px, 4vw, 40px)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' }}>
                                    <div style={{ width: '120px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                                        <img src={logo} alt="FinTaxVers Logo" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.75rem', marginBottom: '4px', color: 'var(--primary)' }}>Yugant V. Rahele</h3>
                                        <p style={{ color: '#1e293b', fontWeight: '600', fontSize: '1rem' }}>Founder, FinTaxVers Consultancy Services</p>
                                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>B.Com, M.Com, MBA Finance</p>
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#1e293b' }}>Meet Your Financial Strategist</h3>
                                <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '25px', lineHeight: '1.7' }}>
                                    With a strong background in commerce and finance, Yugant specializes in helping businesses secure funding and maintain compliance.
                                    Unlike traditional tax filing, his focus is on <strong>Financial Health</strong>—helping you create the Project Reports (CMA) needed for bank loans, managing your working capital, and ensuring your business registration is flawless.
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '25px', textAlign: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--primary)' }}>10+</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Years Exp.</div>
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--primary)' }}>500+</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Clients</div>
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--primary)' }}>Nagpur</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Local Base</div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '30px', textAlign: 'right' }}>
                                    <img src={yugantSignature} alt="Yugant Signature" style={{ width: '120px', opacity: 0.9, filter: 'grayscale(1) contrast(1.2)' }} />
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '5px' }}>Lead Consultant</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '16px', color: '#1e293b' }}>Contact & Consult</h2>
                        <p style={{ color: '#64748b', maxWidth: '800px', margin: '0 auto' }}>Have a question or need financial advice? Get in touch with our experts today.</p>
                    </div>
                    <div className="contact-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '50px' }}>
                        <div className="contact-info glass-card" style={{ padding: 'clamp(25px, 5vw, 50px)' }}>
                            <h3 style={{ color: '#1e293b', marginBottom: '30px' }}>Get In Touch</h3>
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                                <span>📍</span>
                                <div>
                                    <h4 style={{ color: '#1e293b' }}>Office Address</h4>
                                    <p style={{ color: '#64748b' }}>CA R S Puri & Associates, Near Ganeshpeth, Opposite Yatri Hotel, Ganeshpeth Colony, Nagpur, Maharashtra 440018</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                                <span>📞</span>
                                <div>
                                    <h4 style={{ color: '#1e293b' }}>Phone Number</h4>
                                    <p style={{ color: '#64748b' }}>+91-8928895195<br />+91-9011424236</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                                <span>📧</span>
                                <div>
                                    <h4 style={{ color: '#1e293b' }}>Email Address</h4>
                                    <p style={{ color: '#64748b' }}>contact@fintaxvers.com</p>
                                </div>
                            </div>
                            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '15px',
                                    background: 'linear-gradient(135deg, #f9a825 0%, #f4511e 100%)',
                                    borderRadius: '15px',
                                    boxShadow: '0 8px 20px rgba(244, 81, 30, 0.3)'
                                }}>
                                    <img
                                        src={`${qrCode}?v=${Date.now()}`}
                                        alt="Follow @FINTAXVERS on Instagram"
                                        style={{
                                            width: '180px',
                                            height: '180px',
                                            borderRadius: '10px',
                                            background: 'white',
                                            padding: '10px',
                                            display: 'block'
                                        }}
                                    />
                                </div>
                                <p style={{
                                    marginTop: '15px',
                                    fontSize: '0.9rem',
                                    color: '#1e293b',
                                    fontWeight: '600'
                                }}>
                                    📸 Follow us on Instagram
                                </p>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--primary)',
                                    fontWeight: '700',
                                    marginTop: '5px'
                                }}>
                                    @FINTAXVERS
                                </p>
                            </div>
                        </div>

                        <div className="contact-form-container glass-card" style={{ padding: 'clamp(25px, 5vw, 50px)' }}>
                            {showSuccess ? (
                                <div style={{ textAlign: 'center', padding: '40px' }}>
                                    <div style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '20px' }}>✅</div>
                                    <h3 style={{ color: '#1e293b' }}>Request Submitted!</h3>
                                    <p style={{ color: '#64748b' }}>Thank you. Yugant V. Rahele will contact you shortly.</p>
                                    <button className="btn btn-outline" style={{ marginTop: '20px' }} onClick={() => setShowSuccess(false)}>Send Another Request</button>
                                </div>
                            ) : (

                                <form onSubmit={handleSubmit}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input type="text" required placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Mobile Number</label>
                                            <input type="tel" required placeholder="+91" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="email" required placeholder="example@gmail.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Business Type</label>
                                            <select value={formData.businessType || ''} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}>
                                                <option value="">Select Business Type</option>
                                                <option value="Proprietorship">Proprietorship</option>
                                                <option value="Partnership">Partnership / LLP</option>
                                                <option value="Pvt Ltd">Private Limited</option>
                                                <option value="Individual">Individual (Salaried/Other)</option>
                                                <option value="Startup">New Startup</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div className="form-group">
                                            <label>Inquiry Type</label>
                                            <select required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                                <option value="">Select Inquiry Type</option>
                                                <option>Taxation</option>
                                                <option>GST Services</option>
                                                <option>Company Registration</option>
                                                <option>Audit & Assurance</option>
                                                <option>Loan Financing</option>
                                                <option>Project Report (CMA)</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Approx. Loan/Turnover</label>
                                            <input type="text" placeholder="e.g. 50 Lacs" value={formData.turnover || ''} onChange={(e) => setFormData({ ...formData, turnover: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Message / Specific Requirements</label>
                                        <textarea rows="3" placeholder="Tell us about your requirement..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Submit Professional Inquiry'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="section" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', borderTop: '2px solid #e2e8f0', padding: '70px 0 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '50px',
                        marginBottom: '50px'
                    }}>
                        {/* Company Info */}
                        <div style={{ maxWidth: '350px' }}>
                            <h4 style={{
                                marginBottom: '15px',
                                fontSize: 'clamp(1.2rem, 4vw, 1.75rem)',
                                fontWeight: '800',
                                color: 'var(--primary)',
                                letterSpacing: '-0.5px'
                            }}>FinTaxVers</h4>
                            <p style={{
                                color: '#64748b',
                                lineHeight: '1.6',
                                marginBottom: '15px',
                                fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)'
                            }}>
                                Expert Project Finance Consultant, CMA Data Preparation, Business Loan Assistance, MSME Registration, GST Filing & Company Registration services in Nagpur.
                            </p>
                            <div style={{
                                padding: 'clamp(10px, 3vw, 15px) clamp(12px, 4vw, 20px)',
                                background: 'var(--primary)',
                                color: 'white',
                                borderRadius: '8px',
                                fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
                                fontWeight: '600',
                                textAlign: 'center'
                            }}>
                                FinTaxVers Consultancy Services
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 style={{
                                marginBottom: '15px',
                                color: '#1e293b',
                                fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
                                fontWeight: '700',
                                borderBottom: '3px solid var(--primary)',
                                paddingBottom: '8px',
                                display: 'inline-block'
                            }}>Quick Links</h4>
                            <ul style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                color: '#64748b',
                                fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)'
                            }}>
                                <li><a href="#home" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>🏠 Home</a></li>
                                <li><a href="#services" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>💼 Services</a></li>
                                <li><a href="#about" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>👤 About</a></li>
                                <li><a href="#contact" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>📞 Contact</a></li>
                            </ul>
                        </div>

                        {/* Core Services */}
                        <div>
                            <h4 style={{
                                marginBottom: '15px',
                                color: '#1e293b',
                                fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
                                fontWeight: '700',
                                borderBottom: '3px solid var(--primary)',
                                paddingBottom: '8px',
                                display: 'inline-block'
                            }}>Core Services</h4>
                            <ul style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                color: '#64748b',
                                fontSize: 'clamp(0.75rem, 2.3vw, 0.9rem)',
                                lineHeight: '1.5'
                            }}>
                                <li>✓ Project Finance & CMA Data</li>
                                <li>✓ Business Loan Financing</li>
                                <li>✓ MSME & Shop Act Registration</li>
                                <li>✓ Company Registration & ROC</li>
                                <li>✓ GST Returns & Income Tax</li>
                                <li>✓ Internal Audit Services</li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 style={{
                                marginBottom: '15px',
                                color: '#1e293b',
                                fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
                                fontWeight: '700',
                                borderBottom: '3px solid var(--primary)',
                                paddingBottom: '8px',
                                display: 'inline-block'
                            }}>Get In Touch</h4>
                            <ul style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                color: '#64748b',
                                fontSize: 'clamp(0.75rem, 2.3vw, 0.9rem)'
                            }}>
                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>📍</span>
                                    <div>
                                        <strong style={{ color: '#1e293b', display: 'block', marginBottom: '4px' }}>Location</strong>
                                        Nagpur, Maharashtra
                                    </div>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>📞</span>
                                    <div>
                                        <strong style={{ color: '#1e293b', display: 'block', marginBottom: '4px' }}>Phone</strong>
                                        <a href="tel:+918928895195" style={{ color: 'var(--primary)', fontWeight: '600' }}>+91-8928895195</a>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>📧</span>
                                    <div>
                                        <strong style={{ color: '#1e293b', display: 'block', marginBottom: '4px' }}>Email</strong>
                                        <a href="mailto:contact@fintaxvers.com" style={{ color: 'var(--primary)', fontWeight: '600' }}>contact@fintaxvers.com</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div style={{
                        borderTop: '2px solid #e2e8f0',
                        paddingTop: '25px',
                        paddingBottom: '25px',
                        textAlign: 'center',
                        color: '#94a3b8',
                        fontSize: '0.9rem',
                        background: '#f8fafc'
                    }}>
                        <p style={{ margin: '0' }}>
                            &copy; 2026 <strong style={{ color: 'var(--primary)' }}>FinTaxVers Consultancy Services</strong> | Excellence in Finance | Nagpur, Maharashtra
                        </p>
                    </div>
                </div>
            </footer>

            {/* Floating Buttons */}
            <div className="floating-actions" style={{ position: 'fixed', bottom: '40px', right: '30px', display: 'flex', flexDirection: 'column', gap: '15px', zIndex: 1000 }}>
                {/* WhatsApp Button */}
                <a href={`https://wa.me/918928895195?text=${encodeURIComponent("Hi Yugant, I'm visiting your website FinTaxVers and I am interested in a professional consultation. Please guide me.")}`} target="_blank" rel="noreferrer" className="float-btn" style={{
                    width: 'clamp(50px, 12vw, 60px)',
                    height: 'clamp(50px, 12vw, 60px)',
                    background: '#25D366',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                    transition: 'var(--transition)'
                }}>
                    <svg width="clamp(24px, 6vw, 32px)" height="clamp(24px, 6vw, 32px)" viewBox="0 0 24 24" fill="white">
                        <path d="M12.03 2.02c-5.52 0-9.98 4.47-9.98 9.99 0 1.77.46 3.44 1.28 4.9L2 22l5.25-1.38c1.41.77 3.02 1.21 4.75 1.21 5.52 0 10.01-4.47 10.01-9.99S17.55 2.02 12.03 2.02zM12 20.37c-1.57 0-3.11-.42-4.45-1.22l-.32-.19-3.3.87.88-3.23-.21-.33a8.12 8.12 0 0 1-1.25-4.3c0-4.48 3.65-8.13 8.13-8.13 4.48 0 8.13 3.65 8.13 8.13s-3.65 8.13-8.13 8.13zm4.44-6.11c-.24-.12-1.42-.7-1.65-.78-.22-.08-.38-.12-.55.12-.16.24-.63.78-.77.93-.14.15-.29.17-.53.05-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.01-.37.11-.49.1-.1.22-.24.33-.37.11-.12.15-.19.22-.32.07-.13.04-.24-.02-.37-.06-.12-.55-1.33-.76-1.84-.2-.5-.41-.43-.55-.44h-.48c-.16 0-.44.06-.66.3-.22.24-.86.84-.86 2.04s.87 2.37.99 2.53c.12.16 1.72 2.62 4.16 3.67.58.25 1.03.4 1.38.52.58.19 1.11.16 1.53.1.47-.07 1.42-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
                    </svg>
                </a >

                {/* Call Button */}
                < a href="tel:+918928895195" className="float-btn" style={{
                    width: 'clamp(50px, 12vw, 60px)',
                    height: 'clamp(50px, 12vw, 60px)',
                    background: '#6366f1', // Changed to primary blue for variety
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                    transition: 'var(--transition)'
                }}>
                    <svg width="clamp(22px, 5.5vw, 28px)" height="clamp(22px, 5.5vw, 28px)" viewBox="0 0 24 24" fill="white">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.3-.3.4-.69.24-1.01a10.75 10.75 0 0 1-.56-3.53c0-.55-.45-1-1-1H4.44c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.55c0-.55-.45-1-1-1z" />
                    </svg>
                </a >
            </div >




        </div >
    );
}

export default UserPortal;
