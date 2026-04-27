import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const EducationCalculator = () => {
    const [currentCost, setCurrentCost] = useState(1000000);
    const [years, setYears] = useState(15);
    const [inflation, setInflation] = useState(6);
    const [roi, setRoi] = useState(12);

    const [futureCost, setFutureCost] = useState(0);
    const [sipRequired, setSipRequired] = useState(0);

    useEffect(() => {
        // FV of Cost
        const cost = currentCost * Math.pow(1 + inflation / 100, years);
        setFutureCost(cost);

        // SIP to achieve Cost
        const r = roi / 12 / 100;
        const n = years * 12;

        const sip = cost / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
        setSipRequired(sip);
    }, [currentCost, years, inflation, roi]);

    return (
        <CalculatorLayout
            title="Children Education Calculator"
            result={
                <>
                    <h3>Future Cost of Education</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(futureCost).toLocaleString()}</div>
                    <div style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>SIP Required</span>
                            <span style={{ fontWeight: 'bold' }}>₹ {Math.round(sipRequired).toLocaleString()}/mo</span>
                        </div>
                    </div>
                </>
            }
        >
            <div className="form-group">
                <label>Current Cost of Education (₹)</label>
                <input type="range" min="100000" max="10000000" step="100000" value={currentCost} onChange={(e) => setCurrentCost(Number(e.target.value))} />
                <input type="number" value={currentCost} onChange={(e) => setCurrentCost(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Years Left</label>
                <input type="range" min="1" max="25" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Expected Inflation (%)</label>
                <input type="range" min="1" max="15" step="1" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} />
                <input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Expected Investment Return (%)</label>
                <input type="range" min="1" max="25" step="0.5" value={roi} onChange={(e) => setRoi(Number(e.target.value))} />
                <input type="number" value={roi} onChange={(e) => setRoi(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );

};

export default EducationCalculator;
