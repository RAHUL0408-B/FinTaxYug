import React, { useState, useEffect } from 'react';
import heroGrowth from '../../assets/hero_growth.png';
import heroTax from '../../assets/hero_tax.png';
import heroConsult from '../../assets/hero_consult.png';
import './HeroSlider.css';

const slides = [
    {
        id: 1,
        image: heroGrowth,
        badge: "Led by Yugant V. Rahele | MBA (Finance), M.Com",
        title: "Complete Financial Consultancy & Business Growth Partner in Nagpur",
        description: "Expert guidance on Project Financing, Business Loans, and Corporate Compliance. We help your business grow with strategic financial planning.",
        btnText: "Talk to Specialist",
        link: "#contact"
    },
    {
        id: 2,
        image: heroTax,
        badge: "High-Precision Compliance",
        title: "GST Solutions & Financial Health",
        description: "From new registrations to complex audit corrections, we ensure your business stays compliant and tax-efficient.",
        btnText: "Explore Services",
        link: "#services"
    },
    {
        id: 3,
        image: heroConsult,
        badge: "Strategic Funding",
        title: "Secure Your Capital Needs",
        description: "Expert preparation of CMA Data and Project Reports for Mudra, Secured, and Unsecured Business Loans.",
        btnText: "Get Funding Advice",
        link: "#contact"
    }
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="hero-slider" id="home">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="slide-overlay">
                        <div className="slide-content animate-fade-up">
                            {slide.badge && <span className="hero-badge">{slide.badge}</span>}
                            <h1>{slide.title}</h1>
                            <p>{slide.description}</p>
                            <div className="hero-btns">
                                <a href={slide.link} className="btn btn-primary">{slide.btnText}</a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button className="slider-arrow prev" onClick={prevSlide}>&#10094;</button>
            <button className="slider-arrow next" onClick={nextSlide}>&#10095;</button>

            {/* Dots */}
            <div className="slider-dots">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;
