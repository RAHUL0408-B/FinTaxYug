import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import logo from '../../assets/fintaxverslogo.png';
import './Admin.css';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // This allows you to use your Gmail email and password
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('fintxyug_auth', 'true');
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid Gmail ID or Password. Please ensure your account is registered in the Admin Console.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card glass-card">
                <div className="login-header" style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <img
                        src={logo}
                        alt="FinTaxVers"
                        style={{
                            height: 'auto',
                            width: '100%',
                            maxWidth: '220px',
                            marginBottom: '15px'
                        }}
                    />
                    <h2 style={{ fontSize: '1.2rem', color: '#64748b', fontWeight: '500' }}>Admin Portal</h2>
                    <p>Login with Authorized Gmail</p>
                </div>

                <form onSubmit={handleLogin}>
                    {error && <div className="login-error">{error}</div>}

                    <div className="form-group">
                        <label>Gmail Address</label>
                        <input
                            type="email"
                            placeholder="yourname@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '10px' }}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>

                <div className="login-footer">
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Authorized company member access only.
                    </p>
                    <a href="/" style={{ color: 'var(--primary)', fontSize: '0.9rem', marginTop: '10px', display: 'inline-block' }}>Back to Home</a>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
