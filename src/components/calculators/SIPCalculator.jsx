import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const SIPCalculator = () => {
    const [monthlyInv, setMonthlyInv] = useState(5000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(12);

    const [investedAmount, setInvestedAmount] = useState(0);
    const [estReturns, setEstReturns] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        const calculateSIP = () => {
            const i = rate / 12 / 100;
            const n = years * 12;
            const M = monthlyInv;

            const FV = M * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
            const totalInv = M * n;

            setInvestedAmount(totalInv);
            setTotalValue(FV);
            setEstReturns(FV - totalInv);
        };
        calculateSIP();
    }, [monthlyInv, years, rate]);

    return (
        <CalculatorLayout
            title="SIP Calculator"
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
                <input
                    type="range" min="500" max="100000" step="500"
                    value={monthlyInv} onChange={(e) => setMonthlyInv(Number(e.target.value))}
                />
                <input
                    type="number" value={monthlyInv}
                    onChange={(e) => setMonthlyInv(Number(e.target.value))}
                />
            </div>
            <div className="form-group">
                <label>Expected Return Rate (p.a) %</label>
                <input
                    type="range" min="1" max="30" step="0.1"
                    value={rate} onChange={(e) => setRate(Number(e.target.value))}
                />
                <input
                    type="number" value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                />
            </div>
            <div className="form-group">
                <label>Time Period (Years)</label>
                <input
                    type="range" min="1" max="30" step="1"
                    value={years} onChange={(e) => setYears(Number(e.target.value))}
                />
                <input
                    type="number" value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                />
            </div>
        </CalculatorLayout>
    );
};

export default SIPCalculator;
