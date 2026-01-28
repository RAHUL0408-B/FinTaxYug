import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const EmergencyFundCalculator = () => {
    const [monthlyExpense, setMonthlyExpense] = useState(30000);
    const [months, setMonths] = useState(6);

    const [fundRequired, setFundRequired] = useState(0);

    useEffect(() => {
        setFundRequired(monthlyExpense * months);
    }, [monthlyExpense, months]);

    return (
        <CalculatorLayout
            title="Emergency Fund Calculator"
            result={
                <>
                    <h3>Required Emergency Fund</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(fundRequired).toLocaleString()}</div>
                    <p style={{ fontSize: '0.9rem' }}>It is recommended to have at least 6 months of expenses saved in a liquid fund.</p>
                </>
            }
        >
            <div className="form-group">
                <label>Monthly Expenses (₹)</label>
                <input type="range" min="5000" max="200000" step="1000" value={monthlyExpense} onChange={(e) => setMonthlyExpense(Number(e.target.value))} />
                <input type="number" value={monthlyExpense} onChange={(e) => setMonthlyExpense(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Months of Coverage</label>
                <input type="range" min="1" max="12" step="1" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
                <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );

};

export default EmergencyFundCalculator;
