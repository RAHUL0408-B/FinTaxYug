import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const HRACalculator = () => {
    const [basic, setBasic] = useState(500000); // Yearly
    const [da, setDA] = useState(0); // Yearly
    const [hraReceived, setHRAReceived] = useState(200000);
    const [rentPaid, setRentPaid] = useState(180000);
    const [isMetro, setIsMetro] = useState(false);

    const [exemptHRA, setExemptHRA] = useState(0);
    const [taxableHRA, setTaxableHRA] = useState(0);

    useEffect(() => {
        const salary = basic + da;

        // 1. Actual HRA Received
        const c1 = hraReceived;

        // 2. 50% (Metro) or 40% (Non-Metro) of Salary
        const c2 = salary * (isMetro ? 0.50 : 0.40);

        // 3. Rent Paid - 10% of Salary
        const c3 = rentPaid - (salary * 0.10);

        let exemption = 0;

        if (rentPaid > 0 && c3 > 0) {
            exemption = Math.min(c1, c2, c3);
        } else {
            exemption = 0;
        }

        if (exemption < 0) exemption = 0;

        setExemptHRA(exemption);
        setTaxableHRA(hraReceived - exemption);

    }, [basic, da, hraReceived, rentPaid, isMetro]);

    return (
        <CalculatorLayout
            title="HRA Exemption Calculator"
            result={
                <>
                    <h3>Exempted HRA</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>₹ {Math.round(exemptHRA).toLocaleString()}</div>
                    <div style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Taxable HRA</span>
                            <span>₹ {Math.round(taxableHRA).toLocaleString()}</span>
                        </div>
                    </div>
                </>
            }
        >
            <div className="form-group">
                <label>Basic Salary + DA (Yearly ₹)</label>
                <input type="number" value={basic} onChange={(e) => setBasic(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>HRA Received (Yearly ₹)</label>
                <input type="number" value={hraReceived} onChange={(e) => setHRAReceived(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Rent Paid (Yearly ₹)</label>
                <input type="number" value={rentPaid} onChange={(e) => setRentPaid(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>City Type</label>
                <select value={isMetro ? 'metro' : 'non-metro'} onChange={(e) => setIsMetro(e.target.value === 'metro')} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
                    <option value="non-metro">Non-Metro</option>
                    <option value="metro">Metro (Delhi, Mumbai, Kol, Chn)</option>
                </select>
            </div>
        </CalculatorLayout>
    );
};

export default HRACalculator;
