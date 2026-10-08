import React, { useEffect, useRef } from 'react';
import { initSectionReveal } from '../../animations/scrollAnimations';
import { Building2, MapPin, Maximize2, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import './PropertyIntro.css';

export default function PropertyIntro({ onOpenSchedule }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reveal = initSectionReveal(sectionRef.current);
    return () => {
      if (reveal) reveal.kill();
    };
  }, []);

  return (
    <section className="property-intro-section" id="property-intro" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="sub-label">01 // PROJECT OVERVIEW</div>
          <h2 className="main-title">
            A NEW STANDARD<br />
            <span>IN URBAN LIVING</span>
          </h2>
        </div>

        {/* Split Layout */}
        <div className="intro-split-grid">
          {/* Left: Large Architectural Photography */}
          <div className="intro-image-wrapper glass-panel">
            <div className="image-frame">
              <img
                src="/images/property_intro.jpg"
                alt="Vertex Horizon Architectural Facade"
                className="intro-arch-img"
                loading="lazy"
              />
              <div className="image-blueprint-hud">
                <span className="hud-badge">FIG 01.1 // EXTERIOR TWILIGHT ATRIUM</span>
                <span className="hud-dimensions">HEIGHT: 110M · FOOTPRINT: 1.8 ACRES</span>
              </div>
            </div>
            <div className="intro-badge-floater">
              <span className="floater-num">IGBC</span>
              <span className="floater-label">PLATINUM CERTIFIED GREEN ARCHITECTURE</span>
            </div>
          </div>

          {/* Right: Property Narrative & Specification Matrix */}
          <div className="intro-content-wrapper">
            <p className="intro-lead-text">
              Rising prominently in Hyderabad's premier Financial District corridor, <strong>VERTEX HORIZON</strong> synthesizes sculptural parametric architecture with ultra-luxurious, light-drenched spatial planning.
            </p>
            <p className="intro-body-text">
              Engineered with sound-attenuating double-glazed acoustic curtain walls, deep bronze solar shading louvers, and bespoke cantilevered sky gardens, every floor plate offers uncompromised 360-degree vistas of the illuminated urban skyline.
            </p>

            {/* Architectural Matrix Grid */}
            <div className="specs-matrix-grid">
              <div className="spec-item glass-panel">
                <div className="spec-icon"><MapPin size={18} /></div>
                <div className="spec-info">
                  <span className="spec-label">LOCATION</span>
                  <span className="spec-val">Financial District, Hyd</span>
                </div>
              </div>

              <div className="spec-item glass-panel">
                <div className="spec-icon"><Maximize2 size={18} /></div>
                <div className="spec-info">
                  <span className="spec-label">TOTAL AREA</span>
                  <span className="spec-val">3,20,000 Sq.Ft</span>
                </div>
              </div>

              <div className="spec-item glass-panel">
                <div className="spec-icon"><Building2 size={18} /></div>
                <div className="spec-info">
                  <span className="spec-label">CONFIGURATION</span>
                  <span className="spec-val">4 & 5 BHK Sky Mansions</span>
                </div>
              </div>

              <div className="spec-item glass-panel">
                <div className="spec-icon"><Calendar size={18} /></div>
                <div className="spec-info">
                  <span className="spec-label">COMPLETION</span>
                  <span className="spec-val">Q4 2028 Handover</span>
                </div>
              </div>

              <div className="spec-item glass-panel">
                <div className="spec-icon"><ShieldCheck size={18} /></div>
                <div className="spec-info">
                  <span className="spec-label">STARTING PRICE</span>
                  <span className="spec-val price-highlight">₹ 8.50 Cr Onwards</span>
                </div>
              </div>

              <div className="spec-item glass-panel">
                <div className="spec-icon"><Building2 size={18} /></div>
                <div className="spec-info">
                  <span className="spec-label">STOREYS</span>
                  <span className="spec-val">24 Floors // 110M</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="intro-actions-row">
              <button className="btn-primary" onClick={onOpenSchedule}>
                <span>INQUIRE EXCLUSIVE ALLOCATION</span>
                <ArrowRight size={16} />
              </button>
              <a
                href="#property-showcase"
                className="btn-secondary"
              >
                <span>EXPLORE FLOOR PLANS</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
