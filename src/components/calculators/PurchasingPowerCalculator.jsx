import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const PurchasingPowerCalculator = () => {
    const [amount, setAmount] = useState(100000);
    const [years, setYears] = useState(20);
    const [inflation, setInflation] = useState(6);

    const [futureValue, setFutureValue] = useState(0);

    useEffect(() => {
        // Impact of Inflation
        // Value decreases: Real Value = Amount / (1+r)^n
        // Cost Increases: Future Cost = Amount * (1+r)^n
        // "Purchasing Power" usually refers to erosion. 
        // "What is the value of 1 Lakh today in 20 years?" (Lower)
        // Let's show: "Future Value of Current Amount" (Equivalent Cost)
        // Usually people want to know: "I need 1 Lakh today, how much I need in 20 years?"
        // Code: futureCost = current * (1+r)^n

        const fv = amount * Math.pow(1 + inflation / 100, years);
        setFutureValue(fv);

    }, [amount, years, inflation]);

    return (
        <CalculatorLayout
            title="Purchasing Power Calculator"
            result={
                <>
                    <h3>Equivalent Future Amount</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(futureValue).toLocaleString()}</div>
                    <p style={{ fontSize: '0.9rem' }}>To buy the same goods worth ₹{amount.toLocaleString()} today, you will need this amount in {years} years.</p>
                </>
            }
        >
            <div className="form-group">
                <label>Current Amount (₹)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Time Period (Years)</label>
                <input type="range" min="1" max="50" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Inflation Rate (%)</label>
                <input type="range" min="1" max="15" step="0.5" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} />
                <input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );
};

export default PurchasingPowerCalculator;
