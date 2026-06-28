import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="f-footer">
            <div className="f-wrap">

                <div className="f-grid">

                    {/* Brand + About + Contact */}
                    <div className="f-brand">
                        <div className="f-brand-name"><span className="dot"></span>FinTaxVers</div>
                        <p className="f-about">
                            <strong>FinTaxVers Consultancy Services</strong> is a trusted{' '}
                            <span className="accent">financial consultant in Nagpur, Maharashtra</span>,
                            founded by <strong>Yugant Rahele</strong>. We help individuals, MSMEs, and businesses with
                            GST registration &amp; filing, income tax returns, business loan project reports (CMA data),
                            MSME/Udyam registration, company incorporation, and year-round financial planning
                            across Nagpur and Maharashtra.
                        </p>

                        <div className="f-contact">
                            <div className="f-contact-row"><span className="ic">📍</span> Nagpur, Maharashtra, India</div>
                            <div className="f-contact-row"><span className="ic">📞</span> <a href="tel:+918928895195">+91-8928895195</a> / <a href="tel:+919011424236">+91-9011424236</a></div>
                            <div className="f-contact-row"><span className="ic">✉️</span> <a href="mailto:contact@fintaxvers.com">contact@fintaxvers.com</a></div>
                            <div className="f-contact-row"><span className="ic">🕘</span> Mon–Sat: 10 AM – 7 PM</div>
                        </div>

                        <div className="f-social">
                            <a href="#" aria-label="LinkedIn">in</a>
                            <a href="#" aria-label="Facebook">f</a>
                            <a href="#" aria-label="Instagram">ig</a>
                            <a href={`https://wa.me/918928895195`} target="_blank" rel="noreferrer" aria-label="WhatsApp">wa</a>
                        </div>
                    </div>

                    {/* Our Services */}
                    <div className="f-col">
                        <h5>Our Services</h5>
                        <ul>
                            <li><Link to="/services/cma-data-project-financing">Business Loan Project Report (CMA)</Link></li>
                            <li><Link to="/services/gst-returns-solutions">GST Registration &amp; Return Filing</Link></li>
                            <li><Link to="/services/income-tax-planning">Income Tax Return Filing</Link></li>
                            <li><Link to="/services/company-llp-formation">Company &amp; LLP Registration</Link></li>
                            <li><Link to="/services/shop-act-msme">MSME / Udyam Registration</Link></li>
                            <li><Link to="/services/business-loan-assistance">Business Loan Assistance</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="f-col">
                        <h5>Quick Links</h5>
                        <ul>
                            <li><Link to="/calculators">GST &amp; EMI Calculators</Link></li>
                            <li><Link to="/calculators">SIP Calculator</Link></li>
                            <li><Link to="/calculators">Income Tax Calculator</Link></li>
                            <li><Link to="/links">Useful Links</Link></li>
                            <li><Link to="/blog">Financial Insights Blog</Link></li>
                            <li><a href={`https://wa.me/918928895195`} target="_blank" rel="noreferrer">Chat on WhatsApp</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom strip */}
                <div className="f-bottom">
                    <div className="f-copy">© {new Date().getFullYear()} <strong>FinTaxVers Consultancy Services</strong> — Nagpur, Maharashtra, India. All rights reserved.</div>
                    <div className="f-seo-links">
                        <Link to="/">Best Financial Consultant in Nagpur</Link><span className="sep">|</span>
                        <Link to="/">GST Consultant Nagpur</Link><span className="sep">|</span>
                        <Link to="/">Tax Consultant Nagpur</Link><span className="sep">|</span>
                        <Link to="/services/cma-data-project-financing">CMA Report Expert</Link><span className="sep">|</span>
                        <Link to="/">Yugant Rahele</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
