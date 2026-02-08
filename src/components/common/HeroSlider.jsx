import React, { useState, useEffect } from 'react';
import heroGrowth from '../../assets/hero_growth.png';
import heroTax from '../../assets/hero_tax.png';
import heroConsult from '../../assets/hero_consult.png';
import './HeroSlider.css';

const slides = [
    {
        id: 1,
        image: heroGrowth,
        badge: "FinTaxVers - Excellence in Finance",
        title: "Bespoke Financial Excellence",
        description: "Preserving wealth and ensuring compliance through sophisticated multi-disciplinary expertise.",
        btnText: "Book Now",
        link: "#contact"
    },
    {
        id: 2,
        image: heroTax,
        badge: "Institutional Grade",
        title: "Sophisticated Audit & Strategy",
        description: "Advanced indirect tax advisory and seamless filing for complex corporate structures.",
        btnText: "Explore Services",
        link: "#services"
    },
    {
        id: 3,
        image: heroConsult,
        badge: "Strategic Growth",
        title: "Institutional Capital Solutions",
        description: "Expert navigation of capital markets for personal and business liquidity needs.",
        btnText: "Get Started",
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
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                            <div className="slide-content animate-fade-up">
                                {slide.badge && <span className="hero-badge">{slide.badge}</span>}
                                <h1>{slide.title}</h1>
                                <p>{slide.description}</p>
                                <div className="hero-btns" style={{ justifyContent: 'center' }}>
                                    <a href={slide.link} className="btn btn-primary">{slide.btnText}</a>
                                </div>
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
