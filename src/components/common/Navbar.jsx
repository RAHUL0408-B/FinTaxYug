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
                    padding: '5px 0'
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
                        <div className="dropdown-menu glass-card">
                            <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>All Services</a>
                            <div style={{ borderTop: '1px solid #f1f5f9', margin: '5px 0' }}></div>
                            <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Financial Reporting</a>
                            <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Project Financing</a>
                            <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>GST Compliance</a>
                            <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Entity Formation</a>
                            <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>ROC Filing</a>
                            <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>Loan Advisory</a>
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
                                <h4 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Investments</h4>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('sip'); }}>SIP Calculator</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('step-up-sip'); }}>Step Up SIP</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('mf'); }}>Mutual Fund</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('cagr'); }}>CAGR Calculator</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('nps'); }}>NPS Calculator</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('swp'); }}>SWP Calculator</a>
                            </div>
                            <div className="calc-group">
                                <h4 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Loans & Tax</h4>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('emi'); }}>EMI Calculator</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('home-affordability'); }}>Home Affordability</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('income-tax'); }}>Income Tax (New)</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('hra'); }}>HRA Calculator</a>
                            </div>
                            <div className="calc-group">
                                <h4 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Planning</h4>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('emergency-fund'); }}>Emergency Fund</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('goal'); }}>Goal Planner</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('education'); }}>Child Education</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('retirement'); }}>Retirement</a>
                                <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleCalcNav('wealth-target'); }}>Wealth Target</a>
                            </div>
                        </div>
                    </li>

                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a></li>
                </ul>
                <button className="nav-cta btn btn-primary" onClick={() => handleNavClick('contact')}>Book Consultation</button>
            </div>

            <style>{`
                .calculator-menu {
                    display: flex;
                    gap: 30px;
                    padding: 30px !important;
                    min-width: 700px !important;
                }
                .calc-group {
                    flex: 1;
                }
                .calc-group h4 {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-bottom: 1px solid #f1f5f9;
                    padding-bottom: 10px;
                }
                @media (max-width: 992px) {
                    .calculator-menu {
                        flex-direction: column;
                        min-width: 100% !important;
                        padding: 10px !important;
                        gap: 15px;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
