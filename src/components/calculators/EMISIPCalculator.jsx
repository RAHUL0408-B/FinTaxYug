import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const EMISIPCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(2500000);
    const [loanRate, setLoanRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [sipReturn, setSipReturn] = useState(12);

    const [emi, setEMI] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [sipAmount, setSipAmount] = useState(0); // SIP required to recover interest

    useEffect(() => {
        const r = loanRate / 12 / 100;
        const n = tenure * 12;

        const emiVal = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalInt = (emiVal * n) - loanAmount;

        setEMI(emiVal);
        setTotalInterest(totalInt);

        // SIP Calculation to reach Total Interest Value
        // FV = P * ... => P = FV / ...
        // We want FV = Total Interest
        const i_sip = sipReturn / 12 / 100;
        const sipNeeded = totalInt / (((Math.pow(1 + i_sip, n) - 1) / i_sip) * (1 + i_sip));

        setSipAmount(sipNeeded);

    }, [loanAmount, loanRate, tenure, sipReturn]);

    return (
        <CalculatorLayout
            title="Recover Loan Interest via SIP"
            result={
                <>
                    <h3>Required Monthly SIP</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(sipAmount).toLocaleString()}</div>
                    <div style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Loan EMI</span>
                            <span>₹ {Math.round(emi).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Total Interest to Recover</span>
                            <span>₹ {Math.round(totalInterest).toLocaleString()}</span>
                        </div>
                    </div>
                    <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#eee' }}>
                        Start a SIP of ₹ {Math.round(sipAmount).toLocaleString()} to recover the entire interest amount of ₹ {Math.round(totalInterest).toLocaleString()} by the end of your loan tenure!
                    </p>
                </>
            }
        >
            <div className="form-group">
                <label>Loan Amount (₹)</label>
                <input type="range" min="100000" max="10000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Loan Interest Rate (%)</label>
                <input type="number" value={loanRate} step="0.1" onChange={(e) => setLoanRate(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Loan Tenure (Years)</label>
                <input type="range" min="1" max="30" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
                <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Expected SIP Return (%)</label>
                <input type="number" value={sipReturn} step="0.1" onChange={(e) => setSipReturn(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );
};

export default EMISIPCalculator;
