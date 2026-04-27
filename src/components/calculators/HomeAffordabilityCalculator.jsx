import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const HomeAffordabilityCalculator = () => {
    const [grossIncome, setGrossIncome] = useState(100000); // Monthly
    const [existingEMI, setExistingEMI] = useState(10000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [downPayment, setDownPayment] = useState(1000000);

    const [affordability, setAffordability] = useState(0);
    const [maxEMI, setMaxEMI] = useState(0);

    useEffect(() => {
        // Assumption: Bank allows EMI up to 50% of (Gross Income - Existing EMI)
        const disposableIncome = grossIncome;
        // Typically lenders look at FOIR (Fixed Obligation to Income Ratio), usually 40-50%
        const maxAllowedEMI = (disposableIncome * 0.50) - existingEMI;

        if (maxAllowedEMI <= 0) {
            setMaxEMI(0);
            setAffordability(downPayment);
            return;
        }

        const r = rate / 12 / 100;
        const n = tenure * 12;

        // P = EMI * [ (1+r)^n - 1 ] / [ r(1+r)^n ]
        const loanPossible = maxAllowedEMI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));

        setMaxEMI(maxAllowedEMI);
        setAffordability(loanPossible + downPayment);

    }, [grossIncome, existingEMI, rate, tenure, downPayment]);

    return (
        <CalculatorLayout
            title="Home Affordability Calculator"
            result={
                <>
                    <h3>Maximum Home Value</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(affordability).toLocaleString()}</div>
                    <div style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Max Loan Amount</span>
                            <span>₹ {Math.round(affordability - downPayment).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Max Monthly EMI</span>
                            <span>₹ {Math.round(maxEMI).toLocaleString()}</span>
                        </div>
                    </div>
                </>
            }
        >
            <div className="form-group">
                <label>Monthly Gross Income (₹)</label>
                <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Existing MC (EMIs) (₹)</label>
                <input type="number" value={existingEMI} onChange={(e) => setExistingEMI(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Loan Tenure (Years)</label>
                <input type="range" min="1" max="30" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
                <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Interest Rate (%)</label>
                <input type="number" value={rate} step="0.1" onChange={(e) => setRate(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Down Payment / Savings (₹)</label>
                <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );
};

export default HomeAffordabilityCalculator;
