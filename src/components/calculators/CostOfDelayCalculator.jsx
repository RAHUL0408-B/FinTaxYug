import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const CostOfDelayCalculator = () => {
    const [monthlyInv, setMonthlyInv] = useState(10000);
    const [years, setYears] = useState(20);
    const [rate, setRate] = useState(12);
    const [delay, setDelay] = useState(5); // Years

    const [normalCorpus, setNormalCorpus] = useState(0);
    const [delayedCorpus, setDelayedCorpus] = useState(0);
    const [loss, setLoss] = useState(0);

    useEffect(() => {
        // Calculate corpus if started today
        const calcFV = (inv, n_years, r_rate) => {
            const i = r_rate / 12 / 100;
            const n = n_years * 12;
            return inv * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        };

        const corpusNow = calcFV(monthlyInv, years, rate);

        // Calculate corpus if delayed
        // Investment duration reduces by 'delay' years ? Or just starts later?
        // Usually Cost of Delay means: If I wait 5 years, then invest for remaining (20-5) years [Goal based fixed end date]
        // OR If I wait 5 years, and then invest for 20 years [Goal post shifts]
        // "Cost of Delay" usually implies a fixed goal deadline (like retirement). So finding loss due to lost time.
        // Let's assume Fixed Goal Date (Total Duration fixed).
        // So User has 20 years. Checks today vs Check 5 years later (only 15 years left).

        const remainingYears = years - delay;
        let corpusLater = 0;

        if (remainingYears > 0) {
            corpusLater = calcFV(monthlyInv, remainingYears, rate);
        }

        setNormalCorpus(corpusNow);
        setDelayedCorpus(corpusLater);
        setLoss(corpusNow - corpusLater);

    }, [monthlyInv, years, rate, delay]);

    return (
        <CalculatorLayout
            title="Cost of Delay"
            result={
                <>
                    <h3>Cost of Delaying</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0', color: '#ffcdd2' }}>₹ {Math.round(loss).toLocaleString()}</div>
                    <div style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Corpus (Start Now)</span>
                            <span>₹ {Math.round(normalCorpus).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Corpus (Start After {delay} Years)</span>
                            <span>₹ {Math.round(delayedCorpus).toLocaleString()}</span>
                        </div>
                    </div>
                </>
            }
        >
            <div className="form-group">
                <label>Monthly SIP Amount (₹)</label>
                <input type="number" value={monthlyInv} onChange={(e) => setMonthlyInv(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Investment Tenure (Total Years)</label>
                <input type="range" min="5" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Delay in Starting (Years)</label>
                <input type="range" min="1" max={years - 1} step="1" value={delay} onChange={(e) => setDelay(Number(e.target.value))} />
                <input type="number" value={delay} onChange={(e) => setDelay(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Expected Return (%)</label>
                <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );

};

export default CostOfDelayCalculator;
