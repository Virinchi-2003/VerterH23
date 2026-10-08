import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import './LocationsSection.css';

export default function LocationsSection() {
  const { locations, setFilter, setActiveView } = useApp();

  const handleCitySelect = (cityName) => {
    setFilter('city', cityName.toLowerCase());
    setActiveView('properties');
  };

  return (
    <section className="locations-discovery-section" id="locations-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="sub-label">
            <span>TERRITORIAL PRESENCE</span>
          </div>
          <h2 className="main-title">
            METROPOLITAN <span>LUXURY DESTINATIONS</span>
          </h2>
          <p className="locations-intro-desc">
            Strategic territorial deployment across India’s highest wealth concentration centers and global tax havens.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="locations-cards-grid">
          {locations.map((loc, idx) => (
            <div
              key={loc.id}
              className={`location-tile glass-panel ${idx === 0 ? 'featured-tile' : ''}`}
              onClick={() => handleCitySelect(loc.name)}
            >
              {/* Background Media */}
              <div className="loc-tile-bg-wrap">
                <img src={loc.image} alt={loc.name} className="loc-tile-img" loading="lazy" />
                <div className="loc-tile-overlay"></div>
              </div>

              {/* Top Meta Badges */}
              <div className="loc-tile-top">
                <span className="loc-appreciation-badge">
                  <TrendingUp size={12} />
                  <span>{loc.appreciationRate}</span>
                </span>
                <span className="loc-count-pill">{loc.propertyCount} Properties</span>
              </div>

              {/* Bottom Content */}
              <div className="loc-tile-content">
                <div className="loc-state-label">{loc.state}</div>
                <h3 className="loc-city-title">{loc.name}</h3>

                <div className="loc-metrics-row">
                  <div className="loc-metric-item">
                    <span className="lm-lbl">Benchmark Valuation</span>
                    <span className="lm-val">{loc.avgPricePerSqft} / sq.ft</span>
                  </div>
                </div>

                <p className="loc-popular-typology">
                  <strong>Typologies:</strong> {loc.popularTypes}
                </p>

                <div className="loc-explore-action">
                  <span>Explore Portfolio</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
