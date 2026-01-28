import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const StepUpSIPCalculator = () => {
    const [monthlyInv, setMonthlyInv] = useState(5000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(12);
    const [stepUp, setStepUp] = useState(10);

    const [investedAmount, setInvestedAmount] = useState(0);
    const [estReturns, setEstReturns] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        let totalInv = 0;
        let futureVal = 0;
        let currentMonthly = monthlyInv;
        const monthlyRate = rate / 12 / 100;

        for (let y = 1; y <= years; y++) {
            for (let m = 1; m <= 12; m++) {
                totalInv += currentMonthly;
                // Compound this month's investment for remaining months
                const monthsRemaining = (years * 12) - ((y - 1) * 12 + m) + 1; // +1 because inv is at beginning of month usually or simply compound for remaining period
                // Standard SIP formula assumes investment at recurring intervals. 
                // Let's do a simple FV summation for accuracy with step up
                futureVal += currentMonthly * Math.pow(1 + monthlyRate, monthsRemaining);
            }
            currentMonthly = currentMonthly * (1 + stepUp / 100);
        }

        // Adjust for end of month/beginning of month if needed, but summation approach is solid
        // Actually, specific formula for Step Up SIP:
        // P * [ (1+r)^n - (1+i)^n ] / (r-i) ... complicated. Iterative is fine.

        setInvestedAmount(totalInv);
        setTotalValue(futureVal);
        setEstReturns(futureVal - totalInv);
    }, [monthlyInv, years, rate, stepUp]);

    return (
        <CalculatorLayout
            title="Step Up SIP Calculator"
            result={
                <>
                    <h3>Expected Amount</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(totalValue).toLocaleString()}</div>
                    <div style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Invested Amount</span>
                            <span>₹ {Math.round(investedAmount).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Est. Returns</span>
                            <span>₹ {Math.round(estReturns).toLocaleString()}</span>
                        </div>
                    </div>
                </>
            }
        >
            <div className="form-group">
                <label>Monthly Investment (₹)</label>
                <input type="range" min="500" max="100000" step="500" value={monthlyInv} onChange={(e) => setMonthlyInv(Number(e.target.value))} />
                <input type="number" value={monthlyInv} onChange={(e) => setMonthlyInv(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Annual Step Up (%)</label>
                <input type="range" min="1" max="50" step="1" value={stepUp} onChange={(e) => setStepUp(Number(e.target.value))} />
                <input type="number" value={stepUp} onChange={(e) => setStepUp(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Expected Return Rate (p.a) %</label>
                <input type="range" min="1" max="30" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Time Period (Years)</label>
                <input type="range" min="1" max="30" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );
};

export default StepUpSIPCalculator;
