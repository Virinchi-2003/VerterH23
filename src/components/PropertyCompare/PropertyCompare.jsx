import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Plus, 
  Check, 
  Minus, 
  ArrowUpRight, 
  Layers
} from 'lucide-react';
import './PropertyCompare.css';

export default function PropertyCompare() {
  const { 
    properties, 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    setSelectedProperty, 
    openScheduleModal,
    setActiveView 
  } = useApp();

  const comparedProperties = properties.filter((p) => compareList.includes(p.id));

  const COMPARISON_SPECS = [
    { label: 'Valuation', key: 'formattedPrice' },
    { label: 'Price / Sq.Ft', key: 'pricePerSqft' },
    { label: 'Typology', key: 'type' },
    { label: 'Location / City', render: (p) => p.location?.area ? `${p.location.area}, ${p.location.city || ''}` : (p.location?.city || 'Financial District, Hyderabad') },
    { label: 'Bedrooms', render: (p) => p.specs?.bhk || 'N/A' },
    { label: 'Bathrooms', render: (p) => p.specs?.baths ? `${p.specs.baths} Ensuites` : 'N/A' },
    { label: 'Built-Up Area', render: (p) => p.specs?.builtUpSqft ? `${p.specs.builtUpSqft.toLocaleString()} sq.ft` : 'N/A' },
    { label: 'Carpet Area', render: (p) => p.specs?.carpetSqft ? `${p.specs.carpetSqft.toLocaleString()} sq.ft` : 'N/A' },
    { label: 'Parking Bays', render: (p) => p.specs?.parking ? `${p.specs.parking} Covered Bays` : 'N/A' },
    { label: 'Orientation', render: (p) => p.specs?.facing || 'N/A' },
    { label: 'Furnishing', render: (p) => p.specs?.furnishing || 'N/A' },
    { label: 'Status', key: 'status' },
    { label: 'Possession Date', key: 'possessionDate' },
    { label: 'RERA Registration', render: (p) => p.specs?.reraId || 'P02400005821' },
  ];

  const COMMON_AMENITIES = [
    'Private Infinity Pool',
    'Private Elevator',
    'Concierge 24/7',
    'Smart Home Automation',
    'Sky Lounge',
    'Private Spa',
    'EV Supercharging',
    'Italian Marble',
    '3-Tier Biometric Security',
  ];

  if (comparedProperties.length === 0) {
    return (
      <section className="compare-section empty-state-container">
        <div className="container">
          <div className="empty-compare-box glass-panel">
            <Layers size={44} className="empty-compare-icon" />
            <h2 className="empty-compare-title">No Properties in Comparison Matrix</h2>
            <p className="empty-compare-text">
              Add up to 4 architectural properties to inspect side-by-side technical specifications, pricing metrics, and amenities.
            </p>
            <button 
              className="btn-primary"
              onClick={() => setActiveView('properties')}
            >
              BROWSE PROPERTIES CATALOG
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="compare-section" id="compare-section">
      <div className="container">
        {/* Header */}
        <div className="compare-header-row">
          <div>
            <div className="meta-tag">
              <span className="tag-dot"></span>
              <span>TECHNICAL BENCHMARKING</span>
            </div>
            <h1 className="compare-title">SIDE-BY-SIDE COMPARISON</h1>
            <p className="compare-subtitle">
              Evaluating {comparedProperties.length} of 4 maximum selected architectural properties
            </p>
          </div>

          <div className="compare-top-actions">
            <button 
              type="button" 
              className="btn-secondary add-more-btn"
              onClick={() => setActiveView('properties')}
            >
              <Plus size={15} />
              <span>Add Property</span>
            </button>
            <button 
              type="button" 
              className="clear-all-btn"
              onClick={clearCompare}
            >
              Clear Comparison
            </button>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="compare-matrix-wrapper glass-panel">
          <div className="matrix-scrollable">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="spec-label-col">Property Overview</th>
                  {comparedProperties.map((prop) => (
                    <th key={prop.id} className="property-header-col">
                      <div className="th-card-box">
                        <button
                          type="button"
                          className="th-remove-btn"
                          onClick={() => removeFromCompare(prop.id)}
                          title="Remove from comparison"
                          aria-label="Remove property"
                        >
                          <X size={14} />
                        </button>
                        <img src={prop.images[0]} alt={prop.title} className="th-img" />
                        <span className="th-category">{prop.category}</span>
                        <h4 className="th-title">{prop.title}</h4>
                        <div className="th-price">{prop.formattedPrice}</div>
                        <button
                          type="button"
                          className="th-view-btn"
                          onClick={() => setSelectedProperty(prop)}
                        >
                          <span>Explore Details</span>
                          <ArrowUpRight size={13} />
                        </button>
                      </div>
                    </th>
                  ))}
                  {/* Placeholder column if less than 4 */}
                  {Array.from({ length: 4 - comparedProperties.length }).map((_, i) => (
                    <th key={`slot-${i}`} className="empty-slot-col">
                      <div className="empty-slot-card" onClick={() => setActiveView('properties')}>
                        <Plus size={24} />
                        <span>Add Property to Compare</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Specifications Rows */}
                {COMPARISON_SPECS.map((spec, sIdx) => (
                  <tr key={sIdx} className="matrix-row">
                    <td className="spec-label-cell">{spec.label}</td>
                    {comparedProperties.map((prop) => (
                      <td key={prop.id} className="spec-value-cell">
                        {spec.render ? spec.render(prop) : prop[spec.key]}
                      </td>
                    ))}
                    {Array.from({ length: 4 - comparedProperties.length }).map((_, i) => (
                      <td key={`empty-cell-${sIdx}-${i}`} className="empty-cell">—</td>
                    ))}
                  </tr>
                ))}

                {/* Amenities Comparison Header */}
                <tr className="amenities-header-row">
                  <td colSpan={5}>
                    <strong>LIFESTYLE AMENITIES COMPARISON</strong>
                  </td>
                </tr>

                {/* Amenities Rows */}
                {COMMON_AMENITIES.map((amenity, aIdx) => (
                  <tr key={`amenity-${aIdx}`} className="matrix-row">
                    <td className="spec-label-cell">{amenity}</td>
                    {comparedProperties.map((prop) => {
                      const hasAmenity = prop.amenities?.includes(amenity);
                      return (
                        <td key={prop.id} className="spec-value-cell amenity-cell">
                          {hasAmenity ? (
                            <span className="amenity-badge-yes">
                              <Check size={14} /> Available
                            </span>
                          ) : (
                            <span className="amenity-badge-no">
                              <Minus size={14} /> Optional
                            </span>
                          )}
                        </td>
                      );
                    })}
                    {Array.from({ length: 4 - comparedProperties.length }).map((_, i) => (
                      <td key={`empty-amenity-${aIdx}-${i}`} className="empty-cell">—</td>
                    ))}
                  </tr>
                ))}

                {/* Bottom CTA Row */}
                <tr className="matrix-footer-row">
                  <td className="spec-label-cell">Consultation</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="spec-value-cell">
                      <button
                        type="button"
                        className="matrix-schedule-btn"
                        onClick={() => openScheduleModal(prop)}
                      >
                        Schedule Visit
                      </button>
                    </td>
                  ))}
                  {Array.from({ length: 4 - comparedProperties.length }).map((_, i) => (
                    <td key={`empty-cta-${i}`} className="empty-cell"></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
