import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './Admin.css';

import logo from '../../assets/logo.png';

function AdminPortal() {
    const { inquiries, updateInquiryStatus } = useApp();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleLogout = () => {
        localStorage.removeItem('fintxyug_auth');
        navigate('/admin/login');
    };

    const stats = [
        { label: "Total Inquiries", value: inquiries.length },
        { label: "Pending Requests", value: inquiries.filter(i => i.status === 'Pending').length },
        { label: "Contacted", value: inquiries.filter(i => i.status === 'Contacted').length },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <>
                        <header className="admin-header">
                            <h2>Dashboard Overview</h2>
                            <div className="admin-user">Welcome, Yugant</div>
                        </header>

                        <section className="stats-grid">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="stat-card">
                                    <h4>{stat.label}</h4>
                                    <div className="value">{stat.value}</div>
                                </div>
                            ))}
                        </section>

                        <section className="inquiry-table-container">
                            <h3 style={{ marginBottom: '20px' }}>Recent Consultant Requests</h3>
                            <InquiryTable data={inquiries.slice(0, 5)} updateStatus={updateInquiryStatus} setEditingInquiry={setEditingInquiry} />
                        </section>
                    </>
                );
            case 'inquiries':
                return (
                    <>
                        <header className="admin-header">
                            <h2>All Inquiries</h2>
                            <div className="admin-user">Manage Client Requests</div>
                        </header>
                        <section className="inquiry-table-container">
                            <InquiryTable data={inquiries} updateStatus={updateInquiryStatus} setEditingInquiry={setEditingInquiry} />
                        </section>
                    </>
                );
            case 'services':
                return (
                    <>
                        <header className="admin-header">
                            <h2>Services Management</h2>
                        </header>
                        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                            <h3>Manage Your Services</h3>
                            <p style={{ color: '#888', marginTop: '10px' }}>Feature coming soon: Add, edit, or remove services offered on the user portal.</p>
                        </div>
                    </>
                );
            case 'settings':
                return (
                    <>
                        <header className="admin-header">
                            <h2>Admin Settings</h2>
                        </header>
                        <div className="glass-card" style={{ padding: '40px', maxWidth: '600px' }}>
                            <div className="form-group">
                                <label>Admin Name</label>
                                <input type="text" value="Yugant V. Rahele" readOnly style={{ background: '#f5f5f5' }} />
                            </div>
                            <div className="form-group">
                                <label>Admin Email</label>
                                <input type="email" value="admin@fintaxyug.com" readOnly style={{ background: '#f5f5f5' }} />
                            </div>
                            <button className="btn btn-primary">Update Profile</button>
                        </div>
                    </>
                );
            default:
                return <div>Select a tab</div>;
        }
    };

    const [editingInquiry, setEditingInquiry] = useState(null);
    const { updateInquiry } = useApp();

    const EditNoteModal = () => {
        const [note, setNote] = useState(editingInquiry?.notes || '');

        const handleSave = async () => {
            const success = await updateInquiry(editingInquiry.id, { notes: note });
            if (success) setEditingInquiry(null);
        };

        return (
            <div className="modal-overlay">
                <div className="modal-content glass-card" style={{ padding: '30px', maxWidth: '500px', width: '90%' }}>
                    <h3>Add/Edit Note</h3>
                    <p style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#666' }}>
                        Client: {editingInquiry.name} ({editingInquiry.mobile})
                    </p>
                    <textarea
                        rows="5"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Type your notes here..."
                        style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '20px', resize: 'vertical' }}
                    ></textarea>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1 }}>Save Note</button>
                        <button className="btn btn-outline" onClick={() => setEditingInquiry(null)} style={{ flex: 1 }}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo-container" style={{ marginBottom: '30px', padding: '0 10px' }}>
                    <img src={logo} alt="FinTaxYug" style={{ width: '100%', height: 'auto', filter: 'brightness(0) invert(1)' }} />
                </div>
                <ul className="admin-nav">
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'dashboard' ? 'active' : ''}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'inquiries' ? 'active' : ''}
                            onClick={() => setActiveTab('inquiries')}
                        >
                            Inquiries
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'services' ? 'active' : ''}
                            onClick={() => setActiveTab('services')}
                        >
                            Services
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'settings' ? 'active' : ''}
                            onClick={() => setActiveTab('settings')}
                        >
                            Settings
                        </a>
                    </li>
                </ul>
                <button
                    onClick={handleLogout}
                    className="btn btn-outline"
                    style={{ marginTop: 'auto', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
                >
                    Logout
                </button>
            </aside>

            <main className="admin-main">
                {renderContent()}
            </main>

            {editingInquiry && <EditNoteModal />}
        </div>
    );
}

// Reusable Table Component (Internal for now)
const InquiryTable = ({ data, updateStatus, setEditingInquiry }) => (
    <table className="admin-table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Client Name</th>
                <th>Mobile</th>
                <th>Service Type</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.length === 0 ? (
                <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>No inquiries found.</td>
                </tr>
            ) : (
                data.map(inquiry => (
                    <tr key={inquiry.id}>
                        <td>{inquiry.date}</td>
                        <td>
                            <div style={{ fontWeight: '600' }}>{inquiry.name}</div>
                            {inquiry.notes && (
                                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '500', marginTop: '4px', fontStyle: 'italic' }}>
                                    Note: {inquiry.notes}
                                </div>
                            )}
                            <div style={{ fontSize: '0.8rem', color: '#888' }}>{inquiry.message}</div>
                        </td>
                        <td>{inquiry.mobile}</td>
                        <td>{inquiry.type}</td>
                        <td>
                            <span className={`status-badge status-${inquiry.status.toLowerCase()}`}>
                                {inquiry.status}
                            </span>
                        </td>
                        <td>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {inquiry.status === 'Pending' && (
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => updateStatus(inquiry.id, 'Contacted')}
                                    >
                                        Mark Contacted
                                    </button>
                                )}
                                <button
                                    className="btn btn-outline btn-sm"
                                    onClick={() => setEditingInquiry(inquiry)}
                                    style={{ padding: '6px 10px' }}
                                >
                                    {inquiry.notes ? 'Edit Note' : 'Add Note'}
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
);

export default AdminPortal;
