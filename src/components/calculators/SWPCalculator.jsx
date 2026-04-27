import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const SWPCalculator = () => {
    const [initialCorpus, setInitialCorpus] = useState(5000000);
    const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(25000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(8);

    const [finalValue, setFinalValue] = useState(0);
    const [totalWithdrawn, setTotalWithdrawn] = useState(0);

    useEffect(() => {
        let balance = initialCorpus;
        let withdrawn = 0;
        const monthlyRate = rate / 12 / 100;
        const months = years * 12;

        for (let i = 0; i < months; i++) {
            // Interest earned this month
            const interest = balance * monthlyRate;
            // Balance after interest
            balance += interest;
            // Withdrawal
            balance -= monthlyWithdrawal;
            withdrawn += monthlyWithdrawal;

            if (balance < 0) {
                balance = 0;
                break;
            }
        }

        setFinalValue(balance);
        setTotalWithdrawn(withdrawn);

    }, [initialCorpus, monthlyWithdrawal, years, rate]);

    return (
        <CalculatorLayout
            title="SWP Calculator"
            result={
                <>
                    <h3>Final Value</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(finalValue).toLocaleString()}</div>
                    <div style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Total Investment</span>
                            <span>₹ {Math.round(initialCorpus).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Total Withdrawn</span>
                            <span>₹ {Math.round(totalWithdrawn).toLocaleString()}</span>
                        </div>
                    </div>
                </>
            }
        >
            <div className="form-group">
                <label>Total Investment (₹)</label>
                <input type="range" min="100000" max="10000000" step="100000" value={initialCorpus} onChange={(e) => setInitialCorpus(Number(e.target.value))} />
                <input type="number" value={initialCorpus} onChange={(e) => setInitialCorpus(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Monthly Withdrawal (₹)</label>
                <input type="range" min="1000" max="100000" step="1000" value={monthlyWithdrawal} onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))} />
                <input type="number" value={monthlyWithdrawal} onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Expected Return Rate (% p.a)</label>
                <input type="range" min="1" max="20" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Time Period (Years)</label>
                <input type="range" min="1" max="30" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );
};

export default SWPCalculator;
