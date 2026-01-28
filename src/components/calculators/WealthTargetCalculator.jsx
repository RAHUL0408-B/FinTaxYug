import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const WealthTargetCalculator = () => {
    const [target, setTarget] = useState(10000000); // 1 Cr
    const [monthlyInv, setMonthlyInv] = useState(25000);
    const [rate, setRate] = useState(12);

    const [years, setYears] = useState(0);

    useEffect(() => {
        // FV = P * ...
        // Solve for n.
        // FV = P * [ (1+i)^n - 1 ] / i
        // FV * i / P = (1+i)^n - 1
        // (FV * i / P) + 1 = (1+i)^n
        // n = log( ... ) / log(1+i)

        const i = rate / 12 / 100;
        const P = monthlyInv;
        const FV = target;

        // Ignoring 'beg' vs 'end' mode (usually beg for SIP: * (1+i))
        // FV = P * [ (1+i)^n - 1 ] / i * (1+i)
        // Let's use simple end mode for ease or stick to previous standard. Consistent: * (1+i)

        // FV / (P * (1+i)) = [ (1+i)^n - 1 ] / i
        // (FV * i) / (P * (1+i)) = (1+i)^n - 1
        // (FV * i) / (P * (1+i)) + 1 = (1+i)^n

        const term = (FV * i) / (P * (1 + i)) + 1;
        const n_months = Math.log(term) / Math.log(1 + i);

        if (n_months > 0 && isFinite(n_months)) {
            setYears(n_months / 12);
        } else {
            setYears(0);
        }

    }, [target, monthlyInv, rate]);

    return (
        <CalculatorLayout
            title="Time to Wealth Target"
            result={
                <>
                    <h3>Time Required</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>{years.toFixed(1)} Years</div>
                    <p style={{ fontSize: '0.9rem' }}>To reach ₹{target.toLocaleString()} with ₹{monthlyInv.toLocaleString()}/mo SIP at {rate}%.</p>
                </>
            }
        >
            <div className="form-group">
                <label>Target Wealth Amount (₹)</label>
                <input type="range" min="100000" max="100000000" step="100000" value={target} onChange={(e) => setTarget(Number(e.target.value))} />
                <input type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Monthly SIP Amount (₹)</label>
                <input type="range" min="1000" max="500000" step="1000" value={monthlyInv} onChange={(e) => setMonthlyInv(Number(e.target.value))} />
                <input type="number" value={monthlyInv} onChange={(e) => setMonthlyInv(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Expected Return (%)</label>
                <input type="range" min="1" max="25" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );

};

export default WealthTargetCalculator;
