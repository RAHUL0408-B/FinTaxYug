import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, FileText, Landmark, Shield, FileCheck, Building2, 
    Calculator, ArrowRight, Phone, ChevronDown, CheckCircle, Quote
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import HeroSlider from '../../components/common/HeroSlider';
import yugantSignature from '../../assets/yugant_signature.png';
import logo from '../../assets/fintaxverslogo.png';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div style={{ borderBottom: '1px solid var(--border-light)', padding: '20px 0' }}>
            <div 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 600 }}>{question}</h4>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown color="var(--primary)" />
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p style={{ marginTop: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

function UserPortal() {
    const { addInquiry } = useApp();
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', type: '', message: '', businessType: '', turnover: '' });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.scrollTo) {
            setTimeout(() => {
                scrollToSection(location.state.scrollTo);
            }, 100);
        }

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
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

    const servicesList = [
        {
            category: "Core Services",
            items: [
                { title: "GST Registration Services", desc: "End-to-end GST Return Filing and registration for seamless compliance.", icon: <FileCheck size={32} />, link: "/services/gst-returns-solutions" },
                { title: "Income Tax Filing India", desc: "Expert tax planning and ITR Filing for individuals and businesses.", icon: <FileText size={32} />, link: "/services/income-tax-planning" },
                { title: "Company Registration Services", desc: "Pvt Ltd, LLP, and Firm registration with complete Business Compliance.", icon: <Building2 size={32} />, link: "/services/company-llp-formation" }
            ]
        },
        {
            category: "Financial Advisory",
            items: [
                { title: "Business Loan Project Report", desc: "Expert preparation of detailed project reports for quick bank approvals.", icon: <Briefcase size={32} />, link: "/services/cma-data-project-financing" },
                { title: "CMA Report Services", desc: "Credit Monitoring Arrangement data preparation for working capital.", icon: <Landmark size={32} />, link: "/services/cma-data-project-financing" },
                { title: "Financial Planning", desc: "Comprehensive Financial Consultancy Services for business growth.", icon: <Shield size={32} />, link: "/services/business-loan-assistance" }
            ]
        }
    ];

    return (
        <div className="user-portal" style={{ background: 'var(--bg-page)' }}>
            <Navbar />
            <HeroSlider />

            {/* Services Section */}
            <section id="services" className="section" style={{ background: '#F8FAFC' }}>
                <style>{`
                    .flip-card { perspective: 1000px; height: 220px; cursor: pointer; }
                    .flip-card-inner {
                        position: relative; width: 100%; height: 100%;
                        transition: transform 0.65s cubic-bezier(0.4,0.2,0.2,1);
                        transform-style: preserve-3d;
                    }
                    .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
                    .flip-card-front, .flip-card-back {
                        position: absolute; inset: 0; border-radius: 16px;
                        backface-visibility: hidden; -webkit-backface-visibility: hidden;
                        display: flex; flex-direction: column; align-items: center;
                        justify-content: center; padding: 28px 24px; text-align: center;
                    }
                    .flip-card-front {
                        background: white;
                        border: 1px solid #e2e8f0;
                        box-shadow: 0 2px 12px rgba(11,31,58,0.06);
                    }
                    .flip-card-back {
                        background: linear-gradient(135deg, #0B1F3A 0%, #16325C 100%);
                        transform: rotateY(180deg);
                        box-shadow: 0 12px 32px rgba(11,31,58,0.25);
                    }
                    .flip-card-back .flip-btn {
                        margin-top: 18px; padding: 9px 22px;
                        background: #16A34A; color: white; border: none;
                        border-radius: 8px; font-size: 0.88rem; font-weight: 700;
                        cursor: pointer; transition: background 0.2s;
                    }
                    .flip-card-back .flip-btn:hover { background: #15803D; }
                `}</style>

                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>What We Do</span>
                        <h2 style={{ marginTop: '10px' }}>Premium Financial Solutions</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '12px auto 0' }}>Comprehensive financial, tax, and compliance solutions tailored for ambitious Indian businesses.</p>
                    </div>

                    <div className="services-container">
                        {servicesList.map((cat, idx) => (
                            <div key={idx} style={{ marginBottom: '50px' }}>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '24px', borderLeft: '4px solid #16A34A', paddingLeft: '14px', color: '#0B1F3A' }}>{cat.category}</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                                    {cat.items.map((service, sIdx) => (
                                        <div key={sIdx} className="flip-card">
                                            <div className="flip-card-inner">
                                                {/* FRONT */}
                                                <div className="flip-card-front">
                                                    <div style={{
                                                        width: '60px', height: '60px', borderRadius: '14px',
                                                        background: '#EFF6FF', color: '#0B1F3A',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        marginBottom: '16px'
                                                    }}>
                                                        {service.icon}
                                                    </div>
                                                    <h3 style={{ fontSize: '1.05rem', color: '#0B1F3A', margin: '0 0 10px', lineHeight: 1.3 }}>{service.title}</h3>
                                                    <p style={{ color: '#64748b', fontSize: '0.82rem', margin: 0 }}>Hover to learn more →</p>
                                                </div>

                                                {/* BACK */}
                                                <div className="flip-card-back">
                                                    <div style={{ color: '#4ade80', marginBottom: '10px' }}>{service.icon}</div>
                                                    <h3 style={{ fontSize: '1rem', color: 'white', margin: '0 0 12px', lineHeight: 1.3 }}>{service.title}</h3>
                                                    <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>{service.desc}</p>
                                                    <button className="flip-btn" onClick={() => navigate(service.link)}>
                                                        View Details →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Calculator Highlight Section */}
            <section className="section" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px', justifyContent: 'space-between' }}>
                        <div style={{ flex: '1 1 500px' }}>
                            <h2 style={{ color: 'white', marginBottom: '20px' }}>Plan Your Financial Future</h2>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '30px', maxWidth: '500px' }}>
                                Use our free suite of financial calculators to plan your SIPs, calculate EMIs, evaluate Mutual Funds, and manage your retirement goals with precision.
                            </p>
                            <button onClick={() => navigate('/calculators')} className="btn" style={{ background: 'var(--secondary)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                <Calculator size={20} /> Access Calculators
                            </button>
                        </div>
                        <div style={{ flex: '1 1 400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {['GST Calculator', 'EMI Calculator', 'SIP Calculator', 'Income Tax Calculator', 'HRA Calculator'].map((calc, i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h4 style={{ color: 'white', margin: 0 }}>{calc}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Methodology – compact horizontal workflow */}
            <section style={{ background: '#F8FAFC', padding: '40px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem' }}>How We Work</span>
                        <h2 style={{ marginTop: '6px', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}>Our 4-Step Process</h2>
                    </div>

                    {/* Workflow row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', flexWrap: 'wrap', rowGap: '16px' }}>
                        {[
                            { step: '01', title: 'Consultation', desc: 'Understand your goals', icon: '🤝' },
                            { step: '02', title: 'Document Submission', desc: 'Share docs digitally', icon: '📁' },
                            { step: '03', title: 'Expert Review', desc: 'CA team prepares reports', icon: '🔍' },
                            { step: '04', title: 'Execution', desc: 'Timely filing & delivery', icon: '✅' },
                        ].map((item, i, arr) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                {/* Step card */}
                                <div style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    background: 'white', borderRadius: '14px',
                                    border: '1px solid #e2e8f0',
                                    padding: '20px 22px', width: '160px', textAlign: 'center',
                                    boxShadow: '0 2px 10px rgba(11,31,58,0.06)',
                                    position: 'relative'
                                }}>
                                    {/* Step number badge */}
                                    <div style={{
                                        position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        background: 'var(--primary)', color: 'white',
                                        fontSize: '0.72rem', fontWeight: 700,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>{item.step}</div>
                                    <div style={{ fontSize: '1.6rem', marginBottom: '8px', marginTop: '8px' }}>{item.icon}</div>
                                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0B1F3A', marginBottom: '4px', lineHeight: 1.3 }}>{item.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>{item.desc}</div>
                                </div>

                                {/* Arrow connector (not after last item) */}
                                {i < arr.length - 1 && (
                                    <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px', flexShrink: 0 }}>
                                        <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #0B1F3A, #16325C)' }} />
                                        <div style={{ width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '8px solid #16325C' }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* About */}
            <section id="about" className="section" style={{ background: 'white' }}>
                <div className="container">
                    <div style={{ background: 'var(--primary-dark)', borderRadius: '24px', overflow: 'hidden', color: 'white', display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 400px', padding: 'clamp(40px, 8vw, 80px)' }}>
                            <span style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Leadership</span>
                            <h2 style={{ color: 'white', marginTop: '10px', marginBottom: '20px', fontSize: 'clamp(2rem, 3vw, 2.5rem)' }}>Meet Your Financial Strategist</h2>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '30px' }}>
                                With a robust background in commerce and finance, Yugant specializes in helping businesses secure funding and maintain absolute compliance. 
                                As a leading <strong>Tax Consultant India</strong>, the focus is on maximizing your financial health—creating impeccable <strong>Business Loan Project Reports</strong> and ensuring seamless <strong>Company Registration Services</strong>.
                            </p>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <img src={logo} alt="Logo" style={{ width: '80px', filter: 'brightness(0) invert(1)' }} />
                                <div>
                                    <h4 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>Yugant V. Rahele</h4>
                                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Founder, MBA Finance</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: '1 1 300px', background: 'var(--primary)', padding: 'clamp(40px, 8vw, 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '30px' }}>
                            <div>
                                <h3 style={{ fontSize: '2.5rem', color: 'white', margin: 0 }}>10+</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Years Experience</p>
                            </div>
                            <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                            <div>
                                <h3 style={{ fontSize: '2.5rem', color: 'white', margin: 0 }}>500+</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Satisfied Clients</p>
                            </div>
                            <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                            <div>
                                <img src={yugantSignature} alt="Signature" style={{ width: '140px', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="section" style={{ background: '#F8FAFC' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ marginTop: '10px' }}>Frequently Asked Questions</h2>
                    </div>
                    <div>
                        <FAQItem question="What is CMA Data and why do I need it?" answer="CMA (Credit Monitoring Arrangement) Data is a detailed financial report required by banks to evaluate your business's financial health before approving term loans or working capital limits." />
                        <FAQItem question="How long does Company Registration take?" answer="Typically, a Private Limited Company or LLP can be registered within 7-10 working days, provided all documents (PAN, Aadhaar, address proof) are in order." />
                        <FAQItem question="Can you help me get a Mudra Loan?" answer="Yes, we assist in preparing the necessary project reports, financial projections, and compliance documents required to apply for a Mudra Loan under government schemes." />
                        <FAQItem question="Do you provide monthly GST filing services?" answer="Absolutely. We offer end-to-end GST solutions, including new registrations, monthly/quarterly return filings (GSTR-1, GSTR-3B), and annual audits." />
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="section" style={{ background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ marginTop: '10px' }}>Book a Free Consultation</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Fill out the form below and our experts will get back to you within 24 hours.</p>
                    </div>
                    
                    <div style={{ background: 'var(--bg-input)', padding: 'clamp(30px, 5vw, 50px)', borderRadius: '24px', border: '1px solid var(--border-light)' }}>
                        {showSuccess ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <CheckCircle size={64} color="var(--secondary)" style={{ margin: '0 auto 20px' }} />
                                <h3>Request Submitted!</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Thank you. Yugant V. Rahele will contact you shortly.</p>
                                <button className="btn btn-outline" style={{ marginTop: '20px' }} onClick={() => setShowSuccess(false)}>Send Another Request</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Full Name</label>
                                        <input type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-medium)', outline: 'none', transition: '0.3s' }} />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Mobile Number</label>
                                        <input type="tel" required placeholder="+91" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-medium)', outline: 'none' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Email Address</label>
                                        <input type="email" required placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-medium)', outline: 'none' }} />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Business Type</label>
                                        <select value={formData.businessType || ''} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-medium)', outline: 'none', background: 'white' }}>
                                            <option value="">Select Business Type</option>
                                            <option value="Proprietorship">Proprietorship</option>
                                            <option value="Partnership">Partnership / LLP</option>
                                            <option value="Pvt Ltd">Private Limited</option>
                                            <option value="Startup">New Startup</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Inquiry Type</label>
                                    <select required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-medium)', outline: 'none', background: 'white' }}>
                                        <option value="">Select Inquiry Type</option>
                                        <option>Project Report (CMA) / Loan</option>
                                        <option>Company Registration</option>
                                        <option>GST Services</option>
                                        <option>Taxation</option>
                                        <option>Audit & Assurance</option>
                                    </select>
                                </div>

                                <div className="form-group" style={{ marginBottom: '30px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Message</label>
                                    <textarea rows="4" placeholder="Tell us about your requirements..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-medium)', outline: 'none', resize: 'vertical' }}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '8px', fontSize: '1.05rem', fontWeight: 600 }} disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending Request...' : 'Submit Inquiry'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: 'var(--primary-dark)', color: 'rgba(255,255,255,0.7)', paddingTop: '80px', paddingBottom: '30px' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '50px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '50px', marginBottom: '30px' }}>
                        
                        <div style={{ gridColumn: 'span 2' }}>
                            <a href="/" style={{ display: 'inline-block', marginBottom: '18px' }}>
                                <img
                                    src={logo}
                                    alt="FinTaxVers Logo"
                                    style={{ height: '54px', width: 'auto', objectFit: 'contain' }}
                                />
                            </a>
                            <p style={{ lineHeight: 1.7, marginBottom: '20px', maxWidth: '400px' }}>
                                Expert Project Finance Consultant, CMA Data Preparation, Business Loan Assistance, MSME Registration, and GST Filing services in Nagpur.
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <a href="https://www.linkedin.com/in/yugant-rahele" target="_blank" rel="noreferrer"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#0077B5'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                    title="LinkedIn">in</a>
                                <a href="https://www.facebook.com/fintaxvers" target="_blank" rel="noreferrer"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#1877F2'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                    title="Facebook">fb</a>
                                <a href="https://www.instagram.com/fintaxvers" target="_blank" rel="noreferrer"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#E1306C'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                    title="Instagram">ig</a>
                                <a href="https://wa.me/918928895195" target="_blank" rel="noreferrer"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#25D366'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                    title="WhatsApp">wa</a>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1rem' }}>Services</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li><a href="/services/cma-data-project-financing" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Business Loan Project Report</a></li>
                                <li><a href="/services/company-llp-formation" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Company Registration Services</a></li>
                                <li><a href="/services/gst-returns-solutions" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>GST Registration Services</a></li>
                                <li><a href="/services/income-tax-planning" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Income Tax Filing India</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1rem' }}>Contact</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li>+91 89288 95195</li>
                                <li>contact@fintaxvers.com</li>
                                <li>Nagpur, Maharashtra</li>
                            </ul>
                        </div>

                    </div>
                    <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                        &copy; 2026 FinTaxVers Consultancy Services. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* Floating CTA */}
            <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <a href="https://wa.me/918928895195" target="_blank" rel="noreferrer"
                    style={{ width: '60px', height: '60px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)', color: 'white', transition: 'transform 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <svg width="32" height="32" viewBox="0 0 48 48" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 4C12.95 4 4 12.95 4 24c0 3.55.93 6.88 2.56 9.78L4 44l10.47-2.52A19.86 19.86 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36a16 16 0 0 1-8.17-2.25l-.58-.35-6.21 1.5 1.54-5.97-.38-.61A15.94 15.94 0 0 1 8 24c0-8.84 7.16-16 16-16s16 7.16 16 16-7.16 16-16 16zm8.77-11.9c-.48-.24-2.84-1.4-3.28-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.04-.75-3.88-2.4-1.44-1.28-2.4-2.86-2.68-3.34-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.38-.92-.78-.8-1.08-.82-.28-.02-.6-.02-.92-.02-.32 0-.84.12-1.28.6-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.15.5 2.04.8 2.74 1.02 1.15.36 2.2.31 3.02.19.92-.14 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z"/>
                    </svg>
                </a>
                <a href="tel:+918928895195"
                    style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px var(--primary-glow)', color: 'white', transition: 'transform 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Phone size={28} />
                </a>
            </div>
        </div>
    );
}

export default UserPortal;
