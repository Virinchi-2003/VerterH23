import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, User, Mail, Lock, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import VertexLogo from '../common/VertexLogo';
import './AuthModal.css';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, login } = useApp();
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login('buyer', { name: name || 'Aarav Singhania', email: email || 'aarav.singhania@apexcapital.in' });
    setIsAuthOpen(false);
  };

  const handleDemoLogin = (role) => {
    login(role);
    setIsAuthOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthOpen(false)}>
      <div className="modal-container auth-modal-box glass-panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="auth-close-btn"
          onClick={() => setIsAuthOpen(false)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="auth-header">
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            <VertexLogo size={48} idSuffix="auth" />
          </div>
          <div className="meta-tag">
            <span className="tag-dot"></span>
            <span>PORTAL AUTHENTICATION</span>
          </div>
          <h2 className="auth-title">
            {authMode === 'login' ? 'WELCOME TO THE ATELIER' : 'JOIN THE PRIVATE CLIENT REGISTRY'}
          </h2>
          <p className="auth-subtitle">
            Access confidential off-market acquisitions, customized financial models, and private site visit bookings.
          </p>
        </div>

        {/* Instant Fast Demo Logins */}
        <div className="demo-logins-strip">
          <span className="demo-label">FAST DEMO ACCESS:</span>
          <div className="demo-buttons">
            <button
              type="button"
              className="demo-chip buyer"
              onClick={() => handleDemoLogin('buyer')}
            >
              <User size={13} />
              <span>Accredited Buyer</span>
            </button>
            <button
              type="button"
              className="demo-chip agent"
              onClick={() => handleDemoLogin('agent')}
            >
              <Sparkles size={13} />
              <span>Partner Director</span>
            </button>
            <button
              type="button"
              className="demo-chip admin"
              onClick={() => handleDemoLogin('admin')}
            >
              <ShieldCheck size={13} />
              <span>Admin / CRM</span>
            </button>
          </div>
        </div>

        <div className="auth-divider">
          <span>OR SIGN IN WITH CREDENTIALS</span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {authMode === 'register' && (
            <div className="form-group">
              <label><User size={13} /> Full Legal Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Aarav Singhania"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label><Mail size={13} /> Official Email</label>
            <input
              type="email"
              required
              placeholder="name@organization.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label><Lock size={13} /> Security Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary auth-submit-btn">
            <span>{authMode === 'login' ? 'ENTER PRIVATE PORTAL' : 'CREATE PORTAL PROFILE'}</span>
            <ArrowUpRight size={16} />
          </button>
        </form>

        <div className="auth-footer-toggle">
          {authMode === 'login' ? (
            <p>
              Not registered in the private atelier?{' '}
              <button type="button" onClick={() => setAuthMode('register')}>
                Register Private Account
              </button>
            </p>
          ) : (
            <p>
              Already have credentials?{' '}
              <button type="button" onClick={() => setAuthMode('login')}>
                Sign in to Profile
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
