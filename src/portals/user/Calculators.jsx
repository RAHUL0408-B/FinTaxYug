import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import logo from '../../assets/fintaxverslogo.png';
import Navbar from '../../components/common/Navbar';


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
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.calcId) {
            setSelectedCalc(location.state.calcId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Clear location state if we want "Back to list" to not reopen it on refresh
            // window.history.replaceState({}, document.title); 
        }
    }, [location.state]);




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
        <div className="calculators-page" style={{
            paddingTop: '140px',
            minHeight: '100vh',
            background: '#f8fafc',
            color: '#1e293b'
        }}>
            <Navbar />


            <div className="container" style={{ marginTop: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#1e293b' }}>Calculators</h2>
                    <p style={{ color: '#64748b' }}>Plan your financial future with our comprehensive suite of calculators.</p>
                </div>

                {selectedCalc ? (
                    <div className="calculator-view animate-fade-up">
                        <button className="btn btn-primary" style={{ marginBottom: '30px' }} onClick={() => setSelectedCalc(null)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6" /></svg>
                            Back to List
                        </button>
                        <ActiveCalculator />
                    </div>
                ) : (
                    <div className="services-grid" style={{ marginTop: '20px' }}>
                        {calculatorsList.map((calc, index) => (
                            <div
                                key={index}
                                className="service-card animate-fade-up"
                                style={{ animationDelay: `${index * 0.05}s`, cursor: 'pointer' }}
                                onClick={() => setSelectedCalc(calc.id)}
                            >
                                <div className="service-icon">{calc.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.2rem', marginBottom: '10px' }}>{calc.title}</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{calc.desc}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default Calculators;
