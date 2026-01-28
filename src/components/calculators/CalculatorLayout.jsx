import React from 'react';

const CalculatorLayout = ({ title, children, result }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div className="calc-inputs" style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>{title}</h3>
                {children}
            </div>
            <div className="calc-results" style={{ background: 'var(--primary)', color: 'white', padding: '30px', borderRadius: '15px', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                {result}
            </div>
        </div>
    );
};

export default CalculatorLayout;
