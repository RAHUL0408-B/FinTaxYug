import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../../firebase';
import logo from '../../assets/fintaxverslogo.png';
import './Admin.css';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        // ... (rest of function)
    };

    // ... (rest of functions)

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
                    <p>{isSignUp ? 'Create a new admin account' : 'Login to manage your consultancy'}</p>
                </div>

                <form onSubmit={handleAuth}>
                    {error && <div className="login-error">{error}</div>}
                    {message && <div style={{ color: 'green', marginBottom: '15px', textAlign: 'center' }}>{message}</div>}

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="admin@fintaxvers.com"
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
                        {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                    </button>
                </form>

                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                    <span style={{ color: '#888' }}>OR</span>
                </div>

                <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleGoogleLogin}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    disabled={loading}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
                        <path fill="#EA4335" d="M12 4.61c1.61 0 3.09.56 4.23 1.61l3.18-3.18C17.46 1.15 14.96 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Sign in with Google
                </button>

                <div className="login-footer">
                    <p
                        style={{ cursor: 'pointer', color: 'var(--primary)', marginBottom: '10px' }}
                        onClick={() => handleForgotPassword()}
                    >
                        Forgot password?
                    </p>
                    <p>
                        {isSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}
                        <span
                            style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: '600' }}
                            onClick={() => setIsSignUp(!isSignUp)}
                        >
                            {isSignUp ? 'Login' : 'Create Account'}
                        </span>
                    </p>
                    <a href="/" style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '10px', display: 'inline-block' }}>Back to Home</a>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
