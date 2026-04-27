import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const MFCalculator = () => {
    const [investment, setInvestment] = useState(25000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(12);

    const [estReturns, setEstReturns] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        const FV = investment * Math.pow((1 + rate / 100), years);
        setTotalValue(FV);
        setEstReturns(FV - investment);
    }, [investment, years, rate]);

    return (
        <CalculatorLayout
            title="Lumpsum Calculator"
            result={
                <>
                    <h3>Expected Amount</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(totalValue).toLocaleString()}</div>
                    <div style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Invested Amount</span>
                            <span>₹ {Math.round(investment).toLocaleString()}</span>
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
                <label>Total Investment (₹)</label>
                <input type="range" min="5000" max="10000000" step="5000" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
                <input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Expected Return Rate (p.a) %</label>
                <input type="range" min="1" max="30" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Time Period (Years)</label>
                <input type="range" min="1" max="50" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );
};

export default MFCalculator;
