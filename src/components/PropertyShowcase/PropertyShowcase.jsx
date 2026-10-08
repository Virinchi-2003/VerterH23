import React, { useEffect, useRef } from 'react';
import { initHorizontalShowcase } from '../../animations/scrollAnimations';
import { ArrowUpRight, BedDouble, Maximize, Compass, Sparkles } from 'lucide-react';
import './PropertyShowcase.css';

const SHOWCASE_DATA = [
  {
    id: 1,
    name: 'The Sovereign Sky Penthouse',
    level: 'LEVEL 22 – 24 // CROWN',
    location: 'Financial District, Hyderabad',
    type: '5 BHK Triplex Penthouse',
    area: '8,400 SQ.FT',
    price: '₹ 18.50 Cr',
    image: '/images/property_penthouse.jpg',
    features: ['Private 360° Sky Deck', '24ft Double-Height Living', 'Direct Biometric Lift'],
    badge: 'SIGNATURE PENTHOUSE',
  },
  {
    id: 2,
    name: 'The Azure Infinity Sky Villa',
    level: 'LEVEL 18 – 21 // SKY TERRACE',
    location: 'Financial District, Hyderabad',
    type: '4 BHK Cantilevered Sky Villa',
    area: '6,200 SQ.FT',
    price: '₹ 14.20 Cr',
    image: '/images/property_sky_villa.jpg',
    features: ['Private Heated Glass Pool', '270° Panoramic Skyline', 'Italian Marble Finish'],
    badge: 'PRIVATE POOL',
  },
  {
    id: 3,
    name: 'The Grand Atrium Suite',
    level: 'LEVEL 05 – 14 // RESIDENTIAL CORE',
    location: 'Financial District, Hyderabad',
    type: '4 BHK Luxury Residence',
    area: '4,800 SQ.FT',
    price: '₹ 10.80 Cr',
    image: '/images/property_atrium.jpg',
    features: ['Travertine Stone Facets', 'Lutron Smart Automation', 'Acoustic Soundproofing'],
    badge: 'LUXURY SUITE',
  },
  {
    id: 4,
    name: 'The Lumina Executive Atelier',
    level: 'LEVEL 15 – 17 // COMMERCIAL CREST',
    location: 'Financial District, Hyderabad',
    type: 'Grade-A Corporate Headquarters',
    area: '11,500 SQ.FT',
    price: '₹ 24.00 Cr',
    image: '/images/cta_tower.jpg',
    features: ['Column-Free Span', 'Triple-Glazed Thermal Envelope', 'Dedicated Lobby Bank'],
    badge: 'COMMERCIAL LANDMARK',
  },
];

export default function PropertyShowcase({ onOpenSchedule }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const tween = initHorizontalShowcase(sectionRef.current, trackRef.current);
    return () => {
      if (tween && tween.scrollTrigger) {
        tween.scrollTrigger.kill();
        tween.kill();
      }
    };
  }, []);

  return (
    <section className="property-showcase-section" id="property-showcase" ref={sectionRef}>
      <div className="showcase-header-wrap">
        <div className="container">
          <div className="section-header">
            <div className="sub-label">02 // CURATED RESIDENCES</div>
            <h2 className="main-title">
              ARCHITECTURAL<br />
              <span>COLLECTION</span>
            </h2>
          </div>
          <div className="showcase-hint desktop-only">
            <span>SCROLL VERTICALLY TO EXPLORE HORIZONTALLY</span>
            <div className="hint-arrow">→</div>
          </div>
        </div>
      </div>

      {/* Horizontal Track */}
      <div className="showcase-track-container">
        <div className="showcase-cards-track" ref={trackRef}>
          {SHOWCASE_DATA.map((item) => (
            <div className="property-card glass-panel" key={item.id}>
              {/* Card Image Frame */}
              <div className="card-image-box">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img"
                  loading="lazy"
                />
                <div className="card-badge-tag">
                  <Sparkles size={13} />
                  <span>{item.badge}</span>
                </div>
                <div className="card-level-tag">{item.level}</div>
              </div>

              {/* Card Details */}
              <div className="card-body">
                <div className="card-location-row">
                  <Compass size={14} className="accent-icon" />
                  <span>{item.location}</span>
                </div>

                <h3 className="card-title">{item.name}</h3>

                <div className="card-meta-chips">
                  <span className="chip"><Maximize size={13} /> {item.area}</span>
                  <span className="chip"><BedDouble size={13} /> {item.type}</span>
                </div>

                <div className="card-features-list">
                  {item.features.map((feat, idx) => (
                    <div className="feature-line" key={idx}>
                      <span className="feat-dash"></span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="card-footer-row">
                  <div className="price-box">
                    <span className="price-label">INVESTMENT</span>
                    <span className="price-val">{item.price}</span>
                  </div>

                  <button
                    className="card-cta-btn"
                    onClick={onOpenSchedule}
                    aria-label={`Inquire about ${item.name}`}
                  >
                    <span>VIEW RESIDENCE</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
