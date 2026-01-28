import React, { useState, useEffect } from 'react';
import heroGrowth from '../../assets/hero_growth.png';
import heroTax from '../../assets/hero_tax.png';
import heroConsult from '../../assets/hero_consult.png';
import './HeroSlider.css';

const slides = [
    {
        id: 1,
        image: heroGrowth,
        title: "Expert Tax Reporting & Financial Solutions",
        description: "Maximize your wealth with our professional assistance in GST, Income Tax, and financial compliance.",
        btnText: "Get Started",
        link: "#contact"
    },
    {
        id: 2,
        image: heroTax,
        title: "Seamless Audit & Compliance",
        description: "Ensure 100% compliance with our accurate internal audits and statutory reporting services.",
        btnText: "Our Services",
        link: "#services"
    },
    {
        id: 3,
        image: heroConsult,
        title: "Strategic Financial Consultation",
        description: "Grow your business with expert guidance on project financing, loans, and MSME registration.",
        btnText: "Book Consultation",
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
                        <div className="container">
                            <div className="slide-content animate-fade-up">
                                <h1>{slide.title}</h1>
                                <p>{slide.description}</p>
                                <div className="hero-btns">
                                    <a href={slide.link} className="btn btn-primary">{slide.btnText}</a>
                                    <a href="#services" className="btn btn-outline" style={{ marginLeft: '15px' }}>Explore Services</a>
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
