import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Compass, Shield, ArrowUpRight } from 'lucide-react';
import './AboutSection.css';

const STATS = [
  { value: '500+', label: 'Curated Properties', sub: 'Across 7 Global Metros' },
  { value: '50+', label: 'Landmark Projects', sub: 'Award-Winning Architecture' },
  { value: '₹2,480 Cr', label: 'Transaction Volume', sub: 'Institutional & Private Client' },
  { value: '5,000+', label: 'Discerning Clients', sub: '99.4% Client Satisfaction' },
];

export default function AboutSection() {
  const { openScheduleModal } = useApp();

  return (
    <section className="luxury-about-section" id="about-section">
      <div className="container">
        {/* Top Header */}
        <div className="section-header">
          <div className="sub-label">
            <span>BRAND MANIFESTO & HERITAGE</span>
          </div>
          <h2 className="main-title">
            THE ARCHITECTURE OF <span>EXCEPTIONAL LIVING</span>
          </h2>
        </div>

        {/* Narrative & Visual 2.5D Composition */}
        <div className="about-split-stage">
          {/* Left Text Narrative */}
          <div className="about-text-column">
            <h3 className="about-manifesto-headline">
              We do not merely broker real estate. We curate architectural legacies that define skyline horizons.
            </h3>
            <p className="about-body-text">
              Founded on the belief that monumental design has the power to elevate human consciousness, Vertex Horizon represents India’s premier architectural estates and commercial monoliths.
            </p>
            <p className="about-body-text">
              Each residence in our private collection is vetted through rigorous criteria: structural integrity, daylight optimization, acoustic isolation, and investment resilience. From cantilevered glass penthouses in Hyderabad’s Financial District to seafront duplexes on Mumbai’s Worli Sea Face, we connect the global vanguard with their next address.
            </p>

            <div className="about-pillars-grid">
              <div className="pillar-item">
                <Shield size={20} className="pillar-icon" />
                <div>
                  <h4 className="pillar-title">Forensic Due Diligence</h4>
                  <p className="pillar-desc">100% RERA compliant and clear legal title verification on every square foot.</p>
                </div>
              </div>
              <div className="pillar-item">
                <Compass size={20} className="pillar-icon" />
                <div>
                  <h4 className="pillar-title">Architectural Purity</h4>
                  <p className="pillar-desc">Collaborating exclusively with Pritzker-caliber and visionary design studios.</p>
                </div>
              </div>
            </div>

            <div className="about-cta-row">
              <button
                type="button"
                className="btn-primary"
                onClick={() => openScheduleModal()}
              >
                <span>ARRANGE PRIVATE ATELIER VISIT</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Layered Visuals (2.5D composition) */}
          <div className="about-visual-column">
            <div className="layered-art-box">
              <img
                src="/images/architecture_story.jpg"
                alt="Architectural Facade"
                className="art-img-primary"
              />
              <img
                src="/images/property_atrium.jpg"
                alt="Interior Atrium"
                className="art-img-floating"
              />
              <div className="art-badge-chip glass-panel">
                <Award size={18} className="badge-icon-gold" />
                <div className="badge-chip-text">
                  <strong>Pinnacle Architecture Awards</strong>
                  <span>Best Residential Landmark · 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Statistics Ribbon */}
        <div className="stats-ribbon-grid glass-panel">
          {STATS.map((st, idx) => (
            <div key={idx} className="stat-unit-cell">
              <div className="stat-number">{st.value}</div>
              <div className="stat-primary-label">{st.label}</div>
              <div className="stat-sub-label">{st.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
