import React, { useState } from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import './InteractiveMap.css';

export default function InteractiveMap({ properties, onSelectProperty }) {
  const [activeProperty, setActiveProperty] = useState(properties[0] || null);
  const [selectedCity, setSelectedCity] = useState('all');

  const cityFiltered = selectedCity === 'all' 
    ? properties 
    : properties.filter(p => p.location.city.toLowerCase() === selectedCity.toLowerCase());

  // Cities for the filter tabs
  const cities = ['all', 'hyderabad', 'bengaluru', 'mumbai', 'delhi ncr', 'pune', 'chennai', 'dubai'];

  return (
    <div className="interactive-map-container">
      {/* City Switcher Controls */}
      <div className="map-city-tabs">
        {cities.map((city) => (
          <button
            key={city}
            type="button"
            className={`city-pill ${selectedCity === city ? 'active' : ''}`}
            onClick={() => setSelectedCity(city)}
          >
            {city === 'all' ? 'All Locations' : city.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="map-split-stage">
        {/* Vector Radar Canvas Map Display */}
        <div className="vector-map-canvas">
          <div className="map-grid-mesh"></div>
          <div className="radar-sweep-beam"></div>

          {/* Map Landmarks Background Vector Coordinates */}
          <div className="radar-crosshair"></div>
          <div className="radar-circle circle-1"></div>
          <div className="radar-circle circle-2"></div>
          <div className="radar-circle circle-3"></div>

          {/* Map Overlay Top HUD */}
          <div className="map-hud-overlay">
            <span className="hud-metric">METRO NETWORK // ACTIVE RADAR</span>
            <span className="hud-metric-right">GPS SYNC 17.4401°N · 78.3489°E</span>
          </div>

          {/* Interactive Property Pins placed across relative coordinates */}
          <div className="pins-overlay-layer">
            {cityFiltered.map((prop, idx) => {
              // Calculate deterministic normalized pin coordinates based on lat/lng or index
              const leftPct = 15 + ((idx * 23 + (prop.location.lng ? (prop.location.lng % 5) * 15 : 0)) % 72);
              const topPct = 20 + ((idx * 29 + (prop.location.lat ? (prop.location.lat % 5) * 12 : 0)) % 65);
              const isSelected = activeProperty?.id === prop.id;

              return (
                <div
                  key={prop.id}
                  className={`property-map-pin ${isSelected ? 'selected' : ''}`}
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                  onClick={() => setActiveProperty(prop)}
                >
                  <div className="pin-pulse"></div>
                  <div className="pin-badge">
                    <span className="pin-price">{prop.formattedPrice}</span>
                  </div>
                  <div className="pin-tooltip">
                    <span className="tooltip-title">{prop.title}</span>
                    <span className="tooltip-loc">{prop.location.area}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Property Preview Sidebar */}
        {activeProperty && (
          <aside className="map-preview-sidebar glass-panel">
            <div className="preview-media-box">
              <img
                src={activeProperty.images[0]}
                alt={activeProperty.title}
                className="preview-img"
              />
              <span className="preview-category">{activeProperty.category}</span>
            </div>

            <div className="preview-body">
              <div className="preview-loc">
                <MapPin size={13} />
                <span>{activeProperty.location.area}, {activeProperty.location.city}</span>
              </div>
              <h4 className="preview-title">{activeProperty.title}</h4>
              <div className="preview-price">{activeProperty.formattedPrice}</div>

              <div className="preview-specs">
                <span>{activeProperty.specs.bhk}</span>
                <span>•</span>
                <span>{activeProperty.specs.builtUpSqft?.toLocaleString()} sq.ft</span>
                <span>•</span>
                <span>{activeProperty.status}</span>
              </div>

              <div className="preview-actions">
                <button
                  type="button"
                  className="preview-view-btn"
                  onClick={() => onSelectProperty(activeProperty)}
                >
                  <span>VIEW FULL DETAILS</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
