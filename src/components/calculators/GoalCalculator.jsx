import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const GoalCalculator = () => {
    const [goalAmount, setGoalAmount] = useState(5000000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(12);

    const [monthlySIP, setMonthlySIP] = useState(0);

    useEffect(() => {
        const r = rate / 12 / 100;
        const n = years * 12;

        // FV = P * ((1+r)^n - 1)/r * (1+r)
        // P = FV / [ ((1+r)^n - 1)/r * (1+r) ]

        const val = goalAmount / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
        setMonthlySIP(val);

    }, [goalAmount, years, rate]);

    return (
        <CalculatorLayout
            title="Goal SIP Calculator"
            result={
                <>
                    <h3>Required Monthly Investment</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(monthlySIP).toLocaleString()}</div>
                    <p style={{ fontSize: '0.9rem' }}>To reach your goal of ₹{goalAmount.toLocaleString()} in {years} years.</p>
                </>
            }
        >
            <div className="form-group">
                <label>Target Goal Amount (₹)</label>
                <input type="range" min="100000" max="100000000" step="100000" value={goalAmount} onChange={(e) => setGoalAmount(Number(e.target.value))} />
                <input type="number" value={goalAmount} onChange={(e) => setGoalAmount(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Years to Goal</label>
                <input type="range" min="1" max="30" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Expected Return (%)</label>
                <input type="range" min="1" max="25" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );

};

export default GoalCalculator;
