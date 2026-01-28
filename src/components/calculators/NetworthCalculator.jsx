import React, { useState, useEffect } from 'react';
import CalculatorLayout from './CalculatorLayout';

const NetworthCalculator = () => {
    const [assets, setAssets] = useState({
        realEstate: 5000000,
        equity: 1000000,
        gold: 500000,
        cash: 200000,
        others: 0
    });

    const [liabilities, setLiabilities] = useState({
        homeLoan: 3000000,
        carLoan: 0,
        personalLoan: 0,
        others: 0
    });

    const [networth, setNetworth] = useState(0);

    useEffect(() => {
        const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0);
        const totalLiabilities = Object.values(liabilities).reduce((a, b) => a + b, 0);
        setNetworth(totalAssets - totalLiabilities);
    }, [assets, liabilities]);

    const handleAssetChange = (key, val) => setAssets({ ...assets, [key]: Number(val) });
    const handleLiabChange = (key, val) => setLiabilities({ ...liabilities, [key]: Number(val) });

    return (
        <CalculatorLayout
            title="Networth Calculator"
            result={
                <>
                    <h3>Your Networth</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0', color: networth >= 0 ? 'white' : '#ffcdd2' }}>₹ {networth.toLocaleString()}</div>
                    <div style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Total Assets</span>
                            <span>₹ {Object.values(assets).reduce((a, b) => a + b, 0).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Total Liabilities</span>
                            <span>₹ {Object.values(liabilities).reduce((a, b) => a + b, 0).toLocaleString()}</span>
                        </div>
                    </div>
                </>
            }
        >
            <h4 style={{ marginBottom: '10px', color: '#666' }}>Assets (What you own)</h4>
            <div className="form-group">
                <label>Real Estate Value</label>
                <input type="number" value={assets.realEstate} onChange={(e) => handleAssetChange('realEstate', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Equity / Mutual Funds</label>
                <input type="number" value={assets.equity} onChange={(e) => handleAssetChange('equity', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Gold / Jewellery</label>
                <input type="number" value={assets.gold} onChange={(e) => handleAssetChange('gold', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Cash / Bank Balance</label>
                <input type="number" value={assets.cash} onChange={(e) => handleAssetChange('cash', e.target.value)} />
            </div>

            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: '#666' }}>Liabilities (What you owe)</h4>
            <div className="form-group">
                <label>Home Loan Outstanding</label>
                <input type="number" value={liabilities.homeLoan} onChange={(e) => handleLiabChange('homeLoan', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Other Loans</label>
                <input type="number" value={liabilities.others} onChange={(e) => handleLiabChange('others', e.target.value)} />
            </div>
        </CalculatorLayout>
    );

};

export default NetworthCalculator;
