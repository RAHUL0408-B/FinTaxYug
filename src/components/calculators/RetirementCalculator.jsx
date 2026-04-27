import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const RetirementCalculator = () => {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [lifeExpectancy, setLifeExpectancy] = useState(85);
    const [monthlyExp, setMonthlyExp] = useState(50000);
    const [inflation, setInflation] = useState(6);
    const [roi, setRoi] = useState(12);

    const [corpusNeeded, setCorpusNeeded] = useState(0);
    const [monthlysip, setMonthlySip] = useState(0);

    useEffect(() => {
        const yearsToRetirement = retirementAge - currentAge;
        const yearsInRetirement = lifeExpectancy - retirementAge;

        if (yearsToRetirement <= 0 || yearsInRetirement <= 0) return;

        // 1. Expense at Retirement
        // FV = PV * (1+r)^n
        const expenseAtRetirement = monthlyExp * Math.pow(1 + inflation / 100, yearsToRetirement);

        // 2. Corpus Required to sustain this expense
        // This is a PV of an Annuity Due types (growing annuity usually, but let's simplify)
        // Approximate: Need (Expense * 12 * Years) adjusted?
        // Better: Real Rate of Return during retirement = (Return - Inflation) / (1 + Inflation) approx.
        // Let's assume Post-Retirement ROI is conservative, say 8%.
        const postRetROI = 8;
        const realRate = (postRetROI - inflation) / 100; // Simplified real rate approx

        // Corpus = Annual_Exp * [ (1 - (1+r)^-n) / r ] ? No, growing annuity.
        // Let's use simple logic: Corpus = Annual Expense * Inverse of Real Rate?
        // Real logic: Present Value of Growing Annuity. 
        // PV = C * [ 1 - ((1+g)/(1+r))^n ] / (r - g). Here g = inflation, r = roi.

        // Let's assume Expenses continue to grow at inflation during retirement.
        // So required Corpus involves inflation adjusted withdrawal.

        // Let's try to be precise enough:
        // Annual Expense First Year = expenseAtRetirement * 12.
        // Corpus = Expense * 12 * [ 1 - (1+inf/1+ret_roi)^n ] / (ret_roi - inf) ... something like that.

        // SIMPLIFIED APPROACH used in many calcs:
        // Corpus = Monthly * 12 * YearsInRetirement (Very unsafe)
        // Better: Inflation Adjusted Corpus.
        // Let's assume Real Return during retirement is ~2% (8% return, 6% inflation).

        const realReturn = (postRetROI - inflation) / (1 + inflation / 100);

        // PV of Annuity factor
        // PMT = expenseAtRetirement * 12
        // r = realReturn / 100
        // n = yearsInRetirement
        // PV = PMT * (1 - (1+r)^-n) / r

        const annualExp = expenseAtRetirement * 12;
        const r_real = realReturn / 100;

        let corpus = 0;
        if (r_real === 0) {
            corpus = annualExp * yearsInRetirement;
        } else {
            corpus = annualExp * (1 - Math.pow(1 + r_real, -yearsInRetirement)) / r_real;
        }

        setCorpusNeeded(corpus);

        // 3. SIP to accumulate Corpus
        // FV = Corpus
        // P = FV / [ ((1+i)^n - 1)/i * (1+i) ]
        const i = roi / 12 / 100;
        const n_months = yearsToRetirement * 12;

        const sip = corpus / (((Math.pow(1 + i, n_months) - 1) / i) * (1 + i));
        setMonthlySip(sip);

    }, [currentAge, retirementAge, lifeExpectancy, monthlyExp, inflation, roi]);

    return (
        <CalculatorLayout
            title="Retirement Planning Calculator"
            result={
                <>
                    <h3>Required Retirement Corpus</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(corpusNeeded / 100000) / 10} Lakhs</div>
                    {/* Display in Lakhs/Cr might be better for huge numbers, but localestring works */}
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0', color: '#fff' }}>(₹ {Math.round(corpusNeeded).toLocaleString()})</div>
                    <div style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Monthly SIP Required</span>
                            <span style={{ fontWeight: 'bold' }}>₹ {Math.round(monthlysip).toLocaleString()}</span>
                        </div>
                    </div>
                </>
            }
        >
            <div className="form-group">
                <label>Current Age</label>
                <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Retirement Age</label>
                <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Current Monthly Expense (₹)</label>
                <input type="number" value={monthlyExp} onChange={(e) => setMonthlyExp(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Expected Inflation (%)</label>
                <input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Pre-Retirement ROI (%)</label>
                <input type="number" value={roi} onChange={(e) => setRoi(Number(e.target.value))} />
            </div>
        </CalculatorLayout>
    );

};

export default RetirementCalculator;
