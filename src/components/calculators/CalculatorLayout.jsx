import React from 'react';

const CalculatorLayout = ({ title, children, result }) => {
    return (
        <div className="calculator-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            <div className="calc-inputs" style={{ background: '#ffffff', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
                <h3 style={{ marginBottom: '24px', color: '#4f46e5', fontWeight: '800', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</h3>
                {children}
            </div>
            <div className="calc-results" style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
                color: '#ffffff',
                padding: '30px',
                borderRadius: '24px',
                boxShadow: '0 10px 25px rgba(79, 70, 229, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <div style={{ color: '#ffffff', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem', fontWeight: '800', marginBottom: '16px' }}>Estimated Result</div>
                {result}
            </div>
        </div>
    );
};

export default CalculatorLayout;
