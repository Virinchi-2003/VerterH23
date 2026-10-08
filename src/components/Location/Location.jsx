import React, { useState } from 'react';
import { Plane, Train, Briefcase, ShoppingBag, HeartPulse, GraduationCap, Navigation, Clock } from 'lucide-react';
import './Location.css';

const CATEGORIES = ['ALL', 'TRANSIT', 'BUSINESS', 'LIFESTYLE', 'HEALTHCARE'];

const LANDMARKS = [
  {
    id: 1,
    name: "Rajiv Gandhi Int'l Airport (RGIA)",
    category: 'TRANSIT',
    time: '22 MINS',
    distance: '28 KM',
    route: 'Direct via 8-lane Outer Ring Road (ORR)',
    icon: Plane,
    highlight: true,
  },
  {
    id: 2,
    name: 'HITEC City Metro & Cyber Towers',
    category: 'TRANSIT',
    time: '07 MINS',
    distance: '4.8 KM',
    route: 'Direct Metro connectivity via Blue Line',
    icon: Train,
    highlight: false,
  },
  {
    id: 3,
    name: 'Financial District Tech Hub (Amazon, Google, Apple)',
    category: 'BUSINESS',
    time: '03 MINS',
    distance: '1.2 KM',
    route: 'Adjacent Corporate Epicenter Corridor',
    icon: Briefcase,
    highlight: true,
  },
  {
    id: 4,
    name: 'Knowledge City & ITC Kohenur',
    category: 'BUSINESS',
    time: '08 MINS',
    distance: '5.2 KM',
    route: 'Via Mindspace Elevated Expressway',
    icon: Briefcase,
    highlight: false,
  },
  {
    id: 5,
    name: 'Inorbit Luxury Galleria & Durgam Lake',
    category: 'LIFESTYLE',
    time: '08 MINS',
    distance: '5.6 KM',
    route: 'Prime Waterfront & Luxury Retail District',
    icon: ShoppingBag,
    highlight: false,
  },
  {
    id: 6,
    name: 'Continental Super-Specialty Hospital',
    category: 'HEALTHCARE',
    time: '04 MINS',
    distance: '1.8 KM',
    route: 'Nanakramguda Healthcare Quad',
    icon: HeartPulse,
    highlight: false,
  },
  {
    id: 7,
    name: 'Oakridge & Chirec International Schools',
    category: 'LIFESTYLE',
    time: '09 MINS',
    distance: '6.0 KM',
    route: 'Gachibowli Educational Boulevard',
    icon: GraduationCap,
    highlight: false,
  },
  {
    id: 8,
    name: 'US Consulate General Hyderabad',
    category: 'BUSINESS',
    time: '06 MINS',
    distance: '3.4 KM',
    route: 'Diplomatic Enclave, Financial District',
    icon: Briefcase,
    highlight: false,
  },
];

export default function Location() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredLandmarks = activeCategory === 'ALL'
    ? LANDMARKS
    : LANDMARKS.filter((item) => item.category === activeCategory);

  return (
    <section className="location-section" id="location-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="sub-label">05 // PRIME CONNECTIVITY</div>
          <h2 className="main-title">
            THE EPICENTER OF<br />
            <span>FINANCIAL DISTRICT, HYDERABAD</span>
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="location-filters-row">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Layout: Interactive Dark Vector Map Graphic + Landmark Grid */}
        <div className="location-display-grid">
          {/* Left: Stylized Map Card */}
          <div className="map-visual-card glass-panel">
            <div className="map-radar-graphic">
              {/* Concentric distance radar rings */}
              <div className="radar-circle ring-3" />
              <div className="radar-circle ring-2" />
              <div className="radar-circle ring-1" />

              {/* Pulsing Central Landmark Beacon */}
              <div className="center-beacon">
                <div className="beacon-ring" />
                <div className="beacon-core" />
                <div className="beacon-label">
                  <strong>VERTEX HORIZON</strong>
                  <span>GROUND ZERO // FIN-DISTRICT</span>
                </div>
              </div>

              {/* Surrounding Landmark Nodes */}
              <div className="map-node node-airport">
                <span className="node-dot"></span>
                <span className="node-tag">AIRPORT 22M</span>
              </div>
              <div className="map-node node-hitec">
                <span className="node-dot"></span>
                <span className="node-tag">HITEC CITY 7M</span>
              </div>
              <div className="map-node node-amazon">
                <span className="node-dot"></span>
                <span className="node-tag">AMAZON HQ 3M</span>
              </div>
              <div className="map-node node-lake">
                <span className="node-dot"></span>
                <span className="node-tag">DURGAM LAKE 8M</span>
              </div>
            </div>

            <div className="map-footer-coords">
              <div className="coord-item">
                <Navigation size={14} className="accent-icon" />
                <span>17.4401° N, 78.3489° E</span>
              </div>
              <div className="coord-item">
                <Clock size={14} className="accent-icon" />
                <span>ORR INTERCHANGE 400M</span>
              </div>
            </div>
          </div>

          {/* Right: Connectivity Cards List */}
          <div className="landmarks-list-col">
            {filteredLandmarks.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  className={`landmark-item-card glass-panel ${item.highlight ? 'highlighted' : ''}`}
                  key={item.id}
                >
                  <div className="landmark-icon-box">
                    <Icon size={18} />
                  </div>
                  <div className="landmark-info">
                    <div className="landmark-header-row">
                      <h4 className="landmark-title">{item.name}</h4>
                      <div className="time-badge">
                        <Clock size={12} />
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <div className="landmark-route-row">
                      <span className="route-dist">{item.distance}</span>
                      <span className="route-dot">·</span>
                      <span className="route-desc">{item.route}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
