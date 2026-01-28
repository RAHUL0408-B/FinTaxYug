import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalculatorLayout from '../../components/calculators/CalculatorLayout';
import SIPCalculator from '../../components/calculators/SIPCalculator';
import StepUpSIPCalculator from '../../components/calculators/StepUpSIPCalculator';
import MFCalculator from '../../components/calculators/MFCalculator';
import CAGRCalculator from '../../components/calculators/CAGRCalculator';
import EMICalculator from '../../components/calculators/EMICalculator';
import HomeAffordabilityCalculator from '../../components/calculators/HomeAffordabilityCalculator';
import EMISIPCalculator from '../../components/calculators/EMISIPCalculator';
import IncomeTaxCalculator from '../../components/calculators/IncomeTaxCalculator';
import HRACalculator from '../../components/calculators/HRACalculator';
import NPSCalculator from '../../components/calculators/NPSCalculator';
import SWPCalculator from '../../components/calculators/SWPCalculator';
import EmergencyFundCalculator from '../../components/calculators/EmergencyFundCalculator';
import GoalCalculator from '../../components/calculators/GoalCalculator';
import EducationCalculator from '../../components/calculators/EducationCalculator';
import RetirementCalculator from '../../components/calculators/RetirementCalculator';
import WealthTargetCalculator from '../../components/calculators/WealthTargetCalculator';
import NetworthCalculator from '../../components/calculators/NetworthCalculator';
import CostOfDelayCalculator from '../../components/calculators/CostOfDelayCalculator';
import PurchasingPowerCalculator from '../../components/calculators/PurchasingPowerCalculator';

const calculatorsList = [
    { id: 'sip', title: 'SIP CALCULATOR', desc: 'Find out the how much wealth can you generate by doing a particular amount of SIP.', icon: '📊' },
    { id: 'step-up-sip', title: 'SIP STEP UP CALCULATOR', desc: 'Find out the how much wealth can you generate by doing a particular amount of SIP and increseing it every year.', icon: '📈' },
    { id: 'mf', title: 'MF CALCULATOR', desc: 'Find out the value of the lumpsum investments.', icon: '💰' },
    { id: 'cagr', title: 'CAGR CALCULATOR', desc: 'Find out the CAGR return required to reach a target value.', icon: '📉' },
    { id: 'emi', title: 'EMI CALCULATOR', desc: 'Calculate your monthly EMI, along with principal and interest breakup.', icon: '🏠' },
    { id: 'home-affordability', title: 'HOME AFFORDABILITY CALCULATOR', desc: 'Find out the worth of house you can buy given your capacity to pay.', icon: '🏘️' },
    { id: 'emi-sip', title: 'EMI & SIP CALCULATOR', desc: 'Find out the percentage of a loan that can be obtained through SIP investments.', icon: '🔄' },
    { id: 'income-tax', title: 'INCOME TAX CALCULATOR', desc: 'Calculate your payable income tax based on the latest tax regime.', icon: '🧾' },
    { id: 'hra', title: 'HRA CALCULATOR', desc: 'Find out how much HRA will you be exempt out of your total income.', icon: '🏢' },
    { id: 'nps', title: 'NPS CALCULATOR', desc: 'National Pension Scheme Calculator.', icon: '👴' },
    { id: 'swp', title: 'SWP CALCULATOR', desc: 'Find out the fund value at the end of withdrawal period.', icon: '💸' },
    { id: 'emergency-fund', title: 'EMERGENCY FUND CALCULATOR', desc: 'Find out the Emergency Fund required by you.', icon: '🚨' },
    { id: 'goal', title: 'GOAL CALCULATOR', desc: 'Find out how much money you need to invest to achieve your goal.', icon: '🎯' },
    { id: 'education', title: 'CHILDREN EDUCATION CALCULATOR', desc: 'Find out how much money you need for your children higher education.', icon: '🎓' },
    { id: 'retirement', title: 'RETIREMENT CALCULATOR', desc: 'Find out how much will you require for retirement and monthly investment required.', icon: '🏖️' },
    { id: 'wealth-target', title: 'WEALTH TARGET CALCULATOR', desc: 'Calculate the expected wealth targets in next years.', icon: '💎' },
    { id: 'networth', title: 'NETWORTH CALCULATOR', desc: 'Find Out Your Networth and Asset Allocation.', icon: '💼' },
    { id: 'cost-of-delay', title: 'COST OF DELAY CALCULATOR', desc: 'Find out how it impacts you if your investment is delayed.', icon: '⏳' },
    { id: 'purchasing-power', title: 'PURCHASING POWER CALCULATOR', desc: 'Find out the worth of your investment in future in real terms.', icon: '🛒' },
];

function Calculators() {
    const [selectedCalc, setSelectedCalc] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const ActiveCalculator = () => {
        switch (selectedCalc) {
            case 'sip': return <SIPCalculator />;
            case 'step-up-sip': return <StepUpSIPCalculator />;
            case 'mf': return <MFCalculator />;
            case 'cagr': return <CAGRCalculator />;
            case 'emi': return <EMICalculator />;
            case 'home-affordability': return <HomeAffordabilityCalculator />;
            case 'emi-sip': return <EMISIPCalculator />;
            case 'income-tax': return <IncomeTaxCalculator />;
            case 'hra': return <HRACalculator />;
            case 'nps': return <NPSCalculator />;
            case 'swp': return <SWPCalculator />;
            case 'emergency-fund': return <EmergencyFundCalculator />;
            case 'goal': return <GoalCalculator />;
            case 'education': return <EducationCalculator />;
            case 'retirement': return <RetirementCalculator />;
            case 'wealth-target': return <WealthTargetCalculator />;
            case 'networth': return <NetworthCalculator />;
            case 'cost-of-delay': return <CostOfDelayCalculator />;
            case 'purchasing-power': return <PurchasingPowerCalculator />;
            default: return <div>Calculator not found</div>;
        }
    };

    return (
        <div className="calculators-page" style={{ paddingTop: '100px', minHeight: '100vh', background: '#fdfbff' }}>
            <nav className="navbar">
                <div className="container nav-container">
                    <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.5px' }}>FinTaxYug</span>
                    </div>

                    <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>

                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a></li>
                        <li><a href="/#services" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 500); }}>Services</a></li>
                        <li><a href="/#about" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 500); }}>About</a></li>
                        <li><a href="/#contact" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 500); }}>Contact</a></li>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <div className="section-header">
                    <h2>Calculators</h2>
                    <p>Plan your financial future with our comprehensive suite of calculators.</p>
                </div>

                {selectedCalc ? (
                    <div className="calculator-view animate-fade-up">
                        <button className="btn btn-outline" style={{ marginBottom: '20px' }} onClick={() => setSelectedCalc(null)}>← Back to Calculators</button>
                        <ActiveCalculator />
                    </div>
                ) : (
                    <div className="services-grid">
                        {calculatorsList.map((calc, index) => (
                            <div
                                key={index}
                                className="service-card animate-fade-up"
                                style={{ animationDelay: `${index * 0.05}s`, cursor: 'pointer' }}
                                onClick={() => setSelectedCalc(calc.id)}
                            >
                                <div className="service-icon">{calc.icon}</div>
                                <h3>{calc.title}</h3>
                                <p>{calc.desc}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Calculators;
