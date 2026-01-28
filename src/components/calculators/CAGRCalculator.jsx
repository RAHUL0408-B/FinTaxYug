import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const CAGRCalculator = () => {
    const [initialVal, setInitialVal] = useState(10000);
    const [finalVal, setFinalVal] = useState(20000);
    const [years, setYears] = useState(5);
    const [cagr, setCAGR] = useState(0);

    useEffect(() => {
        if (initialVal > 0 && finalVal > 0 && years > 0) {
            const res = (Math.pow(finalVal / initialVal, 1 / years) - 1) * 100;
            setCAGR(res);
        } else {
            setCAGR(0);
        }
    }, [initialVal, finalVal, years]);

    return (
        <CalculatorLayout
            title="CAGR Calculator"
            result={
                <>
                    <h3>CAGR</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '20px 0' }}>{cagr.toFixed(2)} %</div>
                    <p style={{ fontSize: '0.9rem' }}>Compounded Annual Growth Rate</p>
                </>
            }
        >
            <div className="form-group">
                <label>Initial Investment Value (₹)</label>
                <input type="number" value={initialVal} onChange={(e) => setInitialVal(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Final Investment Value (₹)</label>
                <input type="number" value={finalVal} onChange={(e) => setFinalVal(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Duration of Investment (Years)</label>
                <input type="range" min="1" max="50" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );
};

export default CAGRCalculator;
