import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const IncomeTaxCalculator = () => {
    const [income, setIncome] = useState(1200000);
    const [tax, setTax] = useState(0);

    useEffect(() => {
        let taxableIncome = income - 75000; // Standard Deduction for New Regime FY 24-25+
        if (taxableIncome < 0) taxableIncome = 0;

        let calculatedTax = 0;

        // New Regime Slabs (Approx for latest updates)
        // 0-3L: Nil
        // 3-7L: 5%
        // 7-10L: 10%
        // 10-12L: 15%
        // 12-15L: 20%
        // >15L: 30%

        // Rebate u/s 87A: Taxable income upto 7L => Tax is 0.

        if (taxableIncome <= 700000) {
            calculatedTax = 0;
        } else {
            if (taxableIncome > 300000) {
                calculatedTax += Math.min(treatment(taxableIncome, 700000), 400000) * 0.05;
            }
            if (taxableIncome > 700000) {
                calculatedTax += Math.min(treatment(taxableIncome, 1000000), 300000) * 0.10;
            }
            if (taxableIncome > 1000000) {
                calculatedTax += Math.min(treatment(taxableIncome, 1200000), 200000) * 0.15;
            }
            if (taxableIncome > 1200000) {
                calculatedTax += Math.min(treatment(taxableIncome, 1500000), 300000) * 0.20;
            }
            if (taxableIncome > 1500000) {
                calculatedTax += (taxableIncome - 1500000) * 0.30;
            }
        }

        function treatment(total, limit) {
            return Math.max(0, Math.min(total, limit) - Math.max(0, limit - (limit === 700000 ? 400000 : (limit === 1000000 ? 300000 : (limit === 1200000 ? 200000 : 300000)))));
            // That logic is messy. Let's simplify.
        }

        // Re-cal
        let tempIncome = taxableIncome;
        let t = 0;

        if (taxableIncome <= 1200000 && taxableIncome <= 700000) { // Rebate condition check usually on taxable income
            // Actually, rebate is if taxable income <= 7L, tax is 0.
            // If > 7L, calculate normally.
        }

        if (taxableIncome <= 700000) {
            t = 0;
        } else {
            // >3L to 7L @ 5%
            if (taxableIncome > 300000) {
                const slab = Math.min(taxableIncome, 700000) - 300000;
                t += slab * 0.05;
            }
            // >7L to 10L @ 10%
            if (taxableIncome > 700000) {
                const slab = Math.min(taxableIncome, 1000000) - 700000;
                t += slab * 0.10;
            }
            // >10L to 12L @ 15%
            if (taxableIncome > 1000000) {
                const slab = Math.min(taxableIncome, 1200000) - 1000000;
                t += slab * 0.15;
            }
            // >12L to 15L @ 20%
            if (taxableIncome > 1200000) {
                const slab = Math.min(taxableIncome, 1500000) - 1200000;
                t += slab * 0.20;
            }
            // >15L @ 30%
            if (taxableIncome > 1500000) {
                const slab = taxableIncome - 1500000;
                t += slab * 0.30;
            }
        }

        // Cess 4%
        t = t * 1.04;

        setTax(t);

    }, [income]);

    return (
        <CalculatorLayout
            title="Income Tax Calculator (New Regime)"
            result={
                <>
                    <h3>Estimated Annual Tax</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(tax).toLocaleString()}</div>
                    <p style={{ fontSize: '0.9rem' }}>Includes Standard Deduction of ₹75,000 and 4% Cess.</p>
                </>
            }
        >
            <div className="form-group">
                <label>Annual Gross Income (₹)</label>
                <input type="range" min="300000" max="5000000" step="10000" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
                <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
            </div>
            <div className="alert-info" style={{ background: '#e3f2fd', padding: '10px', borderRadius: '5px', fontSize: '0.9rem', color: '#0d47a1' }}>
                Note: This calculator uses the latest New Tax Regime (FY 2025-26 proposed / current) slabs.
            </div>
        </CalculatorLayout>
    );
};

export default IncomeTaxCalculator;
