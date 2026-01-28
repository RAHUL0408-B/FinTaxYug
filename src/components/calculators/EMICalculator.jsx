import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const EMICalculator = () => {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20); // in years

    const [emi, setEMI] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    useEffect(() => {
        const r = rate / 12 / 100;
        const n = tenure * 12;

        const emiVal = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPay = emiVal * n;
        const totalInt = totalPay - loanAmount;

        setEMI(emiVal);
        setTotalPayment(totalPay);
        setTotalInterest(totalInt);
    }, [loanAmount, rate, tenure]);

    return (
        <CalculatorLayout
            title="EMI Calculator"
            result={
                <>
                    <h3>Monthly EMI</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(emi).toLocaleString()}</div>
                    <div style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Principal Amount</span>
                            <span>₹ {Math.round(loanAmount).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Total Interest</span>
                            <span>₹ {Math.round(totalInterest).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>Total Payable</span>
                            <span>₹ {Math.round(totalPayment).toLocaleString()}</span>
                        </div>
                    </div>
                </>
            }
        >
            <div className="form-group">
                <label>Loan Amount (₹)</label>
                <input type="range" min="100000" max="100000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Interest Rate (% p.a)</label>
                <input type="range" min="1" max="20" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Loan Tenure (Years)</label>
                <input type="range" min="1" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
                <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );
};

export default EMICalculator;
