import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import officePhoto from '../../assets/office_photo.jpg';
import whatsappLogo from '../../assets/whatsapp_logo.png';
// import whatsappLogo from '../../assets/whatsapp_logo.png';
import qrCode from '../../assets/instagram_qr.png';
import yugantProfile from '../../assets/yugant_profile_new.png';
import HeroSlider from '../../components/common/HeroSlider';

function UserPortal() {
    const { addInquiry } = useApp();
    const [formData, setFormData] = useState({ name: '', mobile: '', type: 'Taxation', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
        }
    };

    const services = [
        { title: "Accounting & Financial Reporting", desc: "Comprehensive bookkeeping and financial statement preparation.", icon: "📊" },
        { title: "Project Financing & CMA", desc: "Detailed funding analysis and Credit Monitoring Arrangement data.", icon: "💰" },
        { title: "All GST Related Services", desc: "Registration, returns filing, and expert GST advisory.", icon: "📉" },
        { title: "MSME & Company Registration", desc: "Legal entity formation and MSME/Shop Act certificates.", icon: "🏢" },
        { title: "ROC Filing", desc: "Corporate law compliance and annual ROC returns.", icon: "📝" },
        { title: "Loan Financing", desc: "Personal and business loan assistance with expert guidance.", icon: "🏦" },
        { title: "Internal Audit", desc: "In-depth process verification and internal control checks.", icon: "🔍" },
        { title: "Income Tax & Statutory Audits", desc: "Statutory audits and tax compliance reporting.", icon: "⚖️" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await addInquiry(formData);
        if (success) {
            setSubmitted(true);
            setFormData({ name: '', mobile: '', type: 'Taxation', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        }
    };

    return (
        <div className="user-portal">
            {/* Navbar */}
            <nav className="navbar">
                <div className="container nav-container">
                    <div className="logo" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.5px' }}>FinTaxYug</span>
                    </div>

                    <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>

                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>

                        {/* Services Dropdown */}
                        <li className="dropdown">
                            <a href="#services">Services ▾</a>
                            <div className="dropdown-menu">
                                {services.map((s, i) => (
                                    <a key={i} href="#services" className="dropdown-item">
                                        {s.title}
                                    </a>
                                ))}
                            </div>
                        </li>

                        {/* Calculators Dropdown */}
                        <li className="dropdown">
                            <a href="/calculators">Calculators ▾</a>
                            <div className="dropdown-menu calculator-menu">
                                <div className="calc-group">
                                    <h4>Investments</h4>
                                    <a href="/calculators" className="dropdown-item">SIP Calculator</a>
                                    <a href="/calculators" className="dropdown-item">Step Up SIP</a>
                                    <a href="/calculators" className="dropdown-item">Mutual Fund</a>
                                    <a href="/calculators" className="dropdown-item">CAGR Calculator</a>
                                    <a href="/calculators" className="dropdown-item">NPS Calculator</a>
                                    <a href="/calculators" className="dropdown-item">SWP Calculator</a>
                                </div>
                                <div className="calc-group">
                                    <h4>Loans & Tax</h4>
                                    <a href="/calculators" className="dropdown-item">EMI Calculator</a>
                                    <a href="/calculators" className="dropdown-item">Home Affordability</a>
                                    <a href="/calculators" className="dropdown-item">Income Tax (New)</a>
                                    <a href="/calculators" className="dropdown-item">HRA Calculator</a>
                                </div>
                                <div className="calc-group">
                                    <h4>Planning</h4>
                                    <a href="/calculators" className="dropdown-item">Emergency Fund</a>
                                    <a href="/calculators" className="dropdown-item">Goal Planner</a>
                                    <a href="/calculators" className="dropdown-item">Child Education</a>
                                    <a href="/calculators" className="dropdown-item">Retirement</a>
                                    <a href="/calculators" className="dropdown-item">Wealth Target</a>
                                </div>
                            </div>
                        </li>

                        <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
                        <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
                    </ul>
                    <button className="nav-cta btn btn-primary" onClick={() => scrollToSection('contact')}>Book Consultation</button>
                </div>
            </nav>

            {/* Hero Slider */}
            <HeroSlider />

            {/* Services Section */}
            <section id="services" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Services</h2>
                        <p>Comprehensive financial and compliance solutions tailored for Indian businesses and MSMEs.</p>
                    </div>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="service-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology Section */}
            <section className="section methodology">
                <div className="container">
                    <div className="section-header">
                        <h2>Work Methodology</h2>
                        <p>Our streamlined 3-step process ensures accuracy and timely compliance reporting.</p>
                    </div>
                    <div className="method-grid">
                        <div className="method-step animate-fade-up">
                            <div className="step-number">1</div>
                            <h3>Data Collection</h3>
                            <p>Systematic gathering of financial records and transaction details.</p>
                        </div>
                        <div className="method-step animate-fade-up">
                            <div className="step-number">2</div>
                            <h3>Accurate Calculation</h3>
                            <p>Assessment of tax liabilities and financial health based on current norms.</p>
                        </div>
                        <div className="method-step animate-fade-up">
                            <div className="step-number">3</div>
                            <h3>Compliance Reporting</h3>
                            <p>Submission and performance of tax reporting with zero compliance risk.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Consultant Profile */}
            <section id="about" className="section">
                <div className="container">
                    <div className="glass-card" style={{ padding: '60px', textAlign: 'center', borderTop: '4px solid var(--primary)' }}>
                        <div style={{ margin: '0 auto 20px', width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', border: '5px solid var(--bg-gray)' }}>
                            <img src={yugantProfile} alt="Yugant V. Rahele" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Yugant V. Rahele</h2>
                        <p style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '20px' }}>B.Com, M.Com, MBA Finance</p>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '800px', margin: '0 auto 30px' }}>
                            A dedicated financial professional providing expert tax reporting and compliance solutions.
                            Our firm establishes trust through authority, clarity, and a commitment to professional excellence.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--primary)' }}>10+</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Years Experience</div>
                            </div>
                            <div style={{ width: '1px', background: '#ddd' }}></div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--primary)' }}>500+</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Happy Clients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section">
                <div className="container">
                    <div className="section-header">
                        <h2>Contact & Consult</h2>
                        <p>Have a question or need financial advice? Get in touch with our experts today.</p>
                    </div>
                    <div className="contact-section">
                        <div className="contact-info animate-fade-up">
                            <h3>Get In Touch</h3>
                            <div className="info-item">
                                <span className="info-icon">📍</span>
                                <div>
                                    <h4>Office Address</h4>
                                    <p>305, Rahul Complex 1, Wing 1, Near Ganeshpeth Bus Stand, Nagpur - 440018</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">📞</span>
                                <div>
                                    <h4>Phone Number</h4>
                                    <p>+91-8928895195<br />+91-9011424236</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">📧</span>
                                <div>
                                    <h4>Email Address</h4>
                                    <p>fintaxyug@gmail.com</p>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <img src={qrCode} alt="Instagram QR" style={{ width: '150px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                                <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>Scan to follow on Instagram</p>
                            </div>
                        </div>

                        <div className="contact-form-container animate-fade-up">
                            {submitted ? (
                                <div style={{ textAlign: 'center', padding: '40px' }}>
                                    <div style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '20px' }}>✅</div>
                                    <h3>Request Submitted!</h3>
                                    <p>Thank you. Yugant V. Rahele will contact you shortly.</p>
                                    <button className="btn btn-outline" style={{ marginTop: '20px' }} onClick={() => setSubmitted(false)}>Send Another Request</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Mobile Number</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+91"
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Inquiry Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option>Taxation</option>
                                            <option>GST Services</option>
                                            <option>Company Registration</option>
                                            <option>Audit & Assurance</option>
                                            <option>Loan Financing</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea
                                            rows="4"
                                            required
                                            placeholder="Tell us about your requirement..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Request</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="section" style={{ background: '#1a1a1a', color: 'white', padding: '60px 0 30px' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
                        <div>
                            <h4 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-light)' }}>FinTaxYug</h4>
                            <p style={{ color: '#999' }}>Professional CA and financial consultancy services for MSMEs and startups.</p>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '20px' }}>Quick Links</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#999' }}>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#contact">Contact</a></li>
                                <li><a href="/admin" style={{ color: 'var(--primary-light)' }}>Admin Login</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '20px' }}>Services</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#999' }}>
                                <li>GST Filing</li>
                                <li>Income Tax</li>
                                <li>Audit</li>
                                <li>Registration</li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid #333', paddingTop: '30px', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                        <p>&copy; 2026 FinTaxYug. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Floating Buttons */}
            <div className="floating-actions">
                <a href="https://wa.me/918928895195" target="_blank" rel="noreferrer" className="float-btn whatsapp-btn" style={{ background: 'transparent', padding: 0 }}>
                    <img src={whatsappLogo} alt="WhatsApp" style={{ width: '60px', height: '60px' }} />
                </a>
                <a href="tel:+918928895195" className="float-btn call-btn" style={{ width: '50px', height: '50px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.3-.3.4-.69.24-1.01a10.75 10.75 0 0 1-.56-3.53c0-.55-.45-1-1-1H4.44c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.55c0-.55-.45-1-1-1z" /></svg>
                </a>
            </div>
        </div>
    );
}

export default UserPortal;
