import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUp, ShieldCheck, Mail, Phone, MapPin, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import VertexLogo from '../common/VertexLogo';
import './Footer.css';

export default function Footer() {
  const { setActiveView, openScheduleModal, addToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    addToast('Subscription Confirmed', 'You will receive our confidential off-market quarterly dispatch.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Big Closing CTA (Prompt point 46) */}
        <div className="footer-big-cta-box glass-panel">
          <div className="big-cta-content">
            <span className="meta-tag gold">PRIVATE CLIENT INVITATION</span>
            <h2 className="big-cta-headline">LET'S FIND YOUR NEXT ADDRESS.</h2>
            <p className="big-cta-sub">
              Arrange an exclusive private presentation with our Managing Directors, or receive off-market pocket listings curated for your investment criteria.
            </p>
          </div>
          <div className="big-cta-action">
            <button
              type="button"
              className="btn-primary big-cta-btn"
              onClick={() => openScheduleModal()}
            >
              <span>SCHEDULE PRIVATE ATELIER VISIT</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        {/* Top Footer Section */}
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <VertexLogo size={32} idSuffix="footer" />
              <span className="logo-text-bold">VERTEX HORIZON</span>
            </div>
            <p className="footer-tagline">
              A monumental architectural synthesis of glowing blueprint geometry, structural steel, and curtain-wall glass. Curating India’s most prestigious residential sky mansions and commercial trophies.
            </p>
            <div className="footer-contact-info">
              <div className="contact-row">
                <MapPin size={15} className="accent-icon" />
                <span>Vertex Horizon Atelier, Financial District, Gachibowli, Hyderabad, 500032</span>
              </div>
              <div className="contact-row">
                <Phone size={15} className="accent-icon" />
                <span>+91 98490 12890 // Managing Director Direct Desk</span>
              </div>
              <div className="contact-row">
                <Mail size={15} className="accent-icon" />
                <span>privilege@vertexhorizon.luxury</span>
              </div>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">PORTFOLIO</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={() => setActiveView('properties')}>
                  Sky Penthouses
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveView('properties')}>
                  Ridge Mansions & Villas
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveView('properties')}>
                  Arabian Seafront Estates
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveView('properties')}>
                  Commercial Monoliths
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveView('properties')}>
                  Gated Estate Land
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={() => setActiveView('projects')}>
                  Flagship Projects
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveView('locations')}>
                  Metropolitan Metros
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveView('services')}>
                  Private Client Services
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveView('calculators')}>
                  Mortgage & ROI Models
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveView('about')}>
                  Heritage & Philosophy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveView('admin')}>
                  Admin CRM Portal
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-links-col newsletter-col">
            <h4 className="footer-col-title">OFF-MARKET DISPATCH</h4>
            <p className="newsletter-desc">
              Subscribe to our confidential quarterly publication covering off-market pocket listings and sovereign wealth allocations.
            </p>

            {subscribed ? (
              <div style={{ color: '#34d399', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0' }}>
                <CheckCircle2 size={16} />
                <span>Subscription Confirmed. Welcome to the Atelier.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Enter personal email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                  <Send size={15} />
                </button>
              </form>
            )}

            <div className="rera-badge-box">
              <ShieldCheck size={18} className="accent-icon" />
              <div>
                <span className="rera-title">RERA VERIFIED REGISTRY</span>
                <span className="rera-num">TS-RERA: P02400005821</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-legal-copy">
            <span>© {new Date().getFullYear()} VERTEX HORIZON ATELIER. ALL RIGHTS RESERVED.</span>
            <span className="divider-slash">/</span>
            <a href="#privacy">PRIVACY POLICY</a>
            <span className="divider-slash">/</span>
            <a href="#terms">TERMS OF GOVERNANCE</a>
            <span className="divider-slash">/</span>
            <a href="#rera">RERA COMPLIANCE</a>
          </div>

          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to top">
            <span>RETURN TO TOP</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
