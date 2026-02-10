import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/fintaxverslogo.png';




const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDropdown = (name) => {
        if (window.innerWidth <= 992) {
            setOpenDropdown(openDropdown === name ? null : name);
        }
    };

    const handleNavClick = (sectionId) => {
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
            }
        } else {
            navigate('/', { state: { scrollTo: sectionId } });
        }
    };

    const handleCalcNav = (calcId) => {
        setMenuOpen(false);
        setOpenDropdown(null);
        navigate('/calculators', { state: { calcId } });
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <div className="logo" onClick={() => navigate('/')} style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px 0'
                }}>
                    <img
                        className="navbar-logo-img"
                        src={logo}
                        alt="FinTaxVers Logo"
                        style={{
                            objectFit: 'contain',
                            transition: 'transform 0.3s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </div>



                <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <div className="bar" style={{ background: 'var(--primary)' }}></div>
                    <div className="bar" style={{ background: 'var(--primary)' }}></div>
                    <div className="bar" style={{ background: 'var(--primary)' }}></div>
                </div>

                <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <li><a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a></li>

                    {/* Services Dropdown */}
                    <li className={`dropdown ${openDropdown === 'services' ? 'open' : ''}`}>
                        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown('services'); }}>
                            Services
                            <span style={{ fontSize: '0.6rem', marginLeft: '4px' }}>▼</span>
                        </a>
                        <div className="dropdown-menu services-mega-menu glass-card">
                            <div className="calc-group">
                                <h4>Business Finance</h4>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>CMA Data & Project Financing</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Business Loan Assistance</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Govt. Subsidy Consulting</a>
                            </div>
                            <div className="calc-group">
                                <h4>Registration</h4>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Company / LLP Formation</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Shop Act & MSME (Udyam)</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>ROC & Annual Compliance</a>
                            </div>
                            <div className="calc-group">
                                <h4>Tax & Ops</h4>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>GST Returns & Solutions</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Income Tax & Planning</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Financial Reporting</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Internal Audit</a>
                            </div>
                        </div>
                    </li>

                    {/* Calculators Dropdown */}
                    <li className={`dropdown ${openDropdown === 'calculators' ? 'open' : ''}`}>
                        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown('calculators'); }}>
                            Calculators
                            <span style={{ fontSize: '0.6rem', marginLeft: '4px' }}>▼</span>
                        </a>
                        <div className="dropdown-menu calculator-menu glass-card">
                            <div className="calc-group">
                                <h4>Investments</h4>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('sip'); }}>SIP Calculator</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('step-up-sip'); }}>Step Up SIP</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('mf'); }}>Mutual Fund</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('cagr'); }}>CAGR Calculator</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('nps'); }}>NPS Calculator</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('swp'); }}>SWP Calculator</a>
                            </div>
                            <div className="calc-group">
                                <h4>Loans & Tax</h4>
                                <a href="#" className="dropdown-item" onClick={(e) => { handleCalcNav('emi'); }}>EMI Calculator</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { handleCalcNav('home-affordability'); }}>Home Affordability</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { handleCalcNav('income-tax'); }}>Income Tax (New)</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { handleCalcNav('hra'); }}>HRA Calculator</a>
                            </div>
                            <div className="calc-group">
                                <h4>Planning</h4>
                                <a href="#" className="dropdown-item" onClick={(e) => { handleCalcNav('emergency-fund'); }}>Emergency Fund</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { handleCalcNav('goal'); }}>Goal Planner</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { handleCalcNav('education'); }}>Child Education</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { handleCalcNav('retirement'); }}>Retirement</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { handleCalcNav('wealth-target'); }}>Wealth Target</a>
                            </div>
                        </div>
                    </li>

                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a></li>
                </ul>
                <button className="nav-cta btn btn-primary" onClick={() => handleNavClick('contact')}>Book Consultation</button>
            </div>

        </nav>
    );
};

export default Navbar;
