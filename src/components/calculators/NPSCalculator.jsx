import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const NPSCalculator = () => {
    const [monthlyInv, setMonthlyInv] = useState(5000);
    const [age, setAge] = useState(25);
    const [retirementAge, setRetirementAge] = useState(60);
    const [roi, setRoi] = useState(10);

    // Results
    const [totalCorpus, setTotalCorpus] = useState(0);
    const [investedAmount, setInvestedAmount] = useState(0);
    const [lumpSum, setLumpSum] = useState(0);
    const [monthlyPension, setMonthlyPension] = useState(0);

    useEffect(() => {
        if (age >= retirementAge) {
            setTotalCorpus(0);
            return;
        }

        const years = retirementAge - age;
        const months = years * 12;
        const r = roi / 12 / 100;

        // SIP Formula
        const corpus = monthlyInv * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
        const invested = monthlyInv * months;

        setTotalCorpus(corpus);
        setInvestedAmount(invested);

        // At retirement:
        // Min 40% must be annuity, 60% can be withdrawn.
        // Let's assume 60% withdrwal
        const ls = corpus * 0.60;
        const annuityCorpus = corpus * 0.40;

        // Annuity returns approx 6% usually
        const annuityRate = 6 / 12 / 100;
        const pension = annuityCorpus * annuityRate;

        setLumpSum(ls);
        setMonthlyPension(pension);

    }, [monthlyInv, age, retirementAge, roi]);

    return (
        <CalculatorLayout
            title="NPS Calculator"
            result={
                <>
                    <h3>Total Corpus Created</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(totalCorpus).toLocaleString()}</div>
                    <div style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Principal Invested</span>
                            <span>₹ {Math.round(investedAmount).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold', color: '#fff' }}>
                            <span>Lump Sum Value (60%)</span>
                            <span>₹ {Math.round(lumpSum).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>Est. Monthly Pension</span>
                            <span>₹ {Math.round(monthlyPension).toLocaleString()}</span>
                        </div>
                    </div>
                </>
            }
        >
            <div className="form-group">
                <label>Monthly Investment (₹)</label>
                <input type="range" min="500" max="150000" step="500" value={monthlyInv} onChange={(e) => setMonthlyInv(Number(e.target.value))} />
                <input type="number" value={monthlyInv} onChange={(e) => setMonthlyInv(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Current Age (Years)</label>
                <input type="range" min="18" max="59" value={age} onChange={(e) => setAge(Number(e.target.value))} />
                <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
            </div>
            {/* Removed Retirement Slider so default stays 60, but allow edit if needed */}
            <div className="form-group">
                <label>Expected Return (ROI %)</label>
                <input type="range" min="5" max="15" step="0.5" value={roi} onChange={(e) => setRoi(Number(e.target.value))} />
                <input type="number" value={roi} onChange={(e) => setRoi(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );
};

export default NPSCalculator;
