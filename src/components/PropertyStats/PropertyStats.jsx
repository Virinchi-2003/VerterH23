import React, { useEffect, useRef } from 'react';
import { initStatCounter } from '../../animations/scrollAnimations';
import './PropertyStats.css';

const STATS = [
  { id: 1, target: 24, label: 'FLOORS', sub: '110M Architectural Elevation', isFloat: false },
  { id: 2, target: 3.2, suffix: 'L', label: 'SQ.FT BUILT-UP AREA', sub: 'Low-Density Spatial Planning', isFloat: true },
  { id: 3, target: 18, label: 'PREMIUM AMENITIES', sub: 'Private Sky Club & Butler Concierge', isFloat: false },
  { id: 4, target: 2028, label: 'COMPLETION YEAR', sub: 'Q4 Handover · RERA Verified', isFloat: false, isYear: true },
  { id: 5, target: 40, suffix: 'FT', label: 'LOBBY ATRIUM', sub: 'Triple-Height Fluted Marble Volume', isFloat: false },
  { id: 6, target: 99.4, suffix: '%', label: 'ACOUSTIC & THERMAL ISOLATION', sub: 'Low-E Double Glazed Curtain Envelope', isFloat: true },
];

export default function PropertyStats() {
  const statRefs = useRef([]);

  useEffect(() => {
    const tweens = [];
    STATS.forEach((st, idx) => {
      const el = statRefs.current[idx];
      if (el) {
        const tween = initStatCounter(el, st.target, 2.0, !!st.isYear);
        if (tween) tweens.push(tween);
      }
    });

    return () => {
      tweens.forEach((t) => {
        if (t.scrollTrigger) t.scrollTrigger.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section className="property-stats-section" id="property-stats">
      <div className="container">
        <div className="section-header">
          <div className="sub-label">04 // ARCHITECTURAL BENCHMARKS</div>
          <h2 className="main-title">
            ENGINEERED TO<br />
            <span>EXCEED EXPECTATION</span>
          </h2>
        </div>

        {/* 6 Stats Grid */}
        <div className="stats-grid">
          {STATS.map((stat, idx) => (
            <div className="stat-card glass-panel" key={stat.id}>
              <div className="stat-value-row">
                <span
                  className="stat-number"
                  ref={(el) => (statRefs.current[idx] = el)}
                >
                  0
                </span>
                {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
              </div>
              <div className="stat-divider-line" />
              <h3 className="stat-label">{stat.label}</h3>
              <p className="stat-sub">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
