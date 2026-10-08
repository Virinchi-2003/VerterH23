import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MapPin, 
  Calendar, 
  Heart, 
  Layers, 
  Phone, 
  MessageSquare, 
  Share2, 
  Download, 
  Check, 
  Compass, 
  Building, 
  Video, 
  Camera, 
  ArrowUpRight
} from 'lucide-react';
import './PropertyDetailModal.css';

export default function PropertyDetailModal() {
  const { 
    selectedProperty, 
    setSelectedProperty, 
    toggleFavorite, 
    isFavorite, 
    compareList, 
    toggleCompare, 
    openScheduleModal, 
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'video' | 'floorplans'
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeFloorPlanIdx, setActiveFloorPlanIdx] = useState(0);

  if (!selectedProperty) return null;

  const property = selectedProperty;
  const isFav = isFavorite(property.id);
  const isCompared = compareList.includes(property.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Portfolio Link Copied', 'Private link copied to clipboard.', 'success');
    }
  };

  const handleDownloadBrochure = () => {
    addToast('Brochure Generating', 'Preparing architectural specifications brochure PDF...', 'info');
    setTimeout(() => {
      addToast('Download Initiated', `${property.title} brochure ready.`, 'success');
    }, 1200);
  };

  const handleWhatsApp = () => {
    const phone = property.agent?.whatsapp || '919849012890';
    const text = encodeURIComponent(
      `Hello ${property.agent?.name || 'Director'}, I would like to arrange an exclusive consultation regarding ${property.title} (${property.formattedPrice}) listed on Vertex Horizon.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleCall = () => {
    const phone = property.agent?.phone || '+919849012890';
    window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedProperty(null)}>
      <div className="modal-container detail-modal-shell" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header Bar */}
        <div className="detail-modal-header">
          <div className="header-meta-left">
            <span className="detail-category-badge">{property.category}</span>
            <span className="detail-status-badge">{property.status}</span>
            <span className="detail-rera-tag">RERA: {property.specs.reraId || 'APPROVED'}</span>
          </div>

          <div className="header-actions-right">
            <button
              type="button"
              className={`detail-icon-btn ${isFav ? 'active' : ''}`}
              onClick={() => toggleFavorite(property.id)}
              title={isFav ? 'Remove from Saved' : 'Save to Portfolio'}
              aria-label="Save Property"
            >
              <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
            </button>

            <button
              type="button"
              className={`detail-icon-btn ${isCompared ? 'active' : ''}`}
              onClick={() => toggleCompare(property.id)}
              title="Add to Comparison Matrix"
              aria-label="Compare"
            >
              <Layers size={16} />
            </button>

            <button
              type="button"
              className="detail-icon-btn"
              onClick={handleShare}
              title="Share Link"
              aria-label="Share"
            >
              <Share2 size={16} />
            </button>

            <button
              type="button"
              className="detail-close-btn"
              onClick={() => setSelectedProperty(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="detail-modal-body">
          {/* Main Media Showcase (Gallery & Video Switcher) */}
          <div className="detail-media-showcase">
            <div className="media-view-tabs">
              <button
                type="button"
                className={`media-tab ${activeTab === 'gallery' ? 'active' : ''}`}
                onClick={() => setActiveTab('gallery')}
              >
                <Camera size={14} />
                <span>PHOTOGRAPHY ({property.images.length})</span>
              </button>
              {property.videoUrl && (
                <button
                  type="button"
                  className={`media-tab ${activeTab === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveTab('video')}
                >
                  <Video size={14} />
                  <span>4K CINEMA PREVIEW</span>
                </button>
              )}
              {property.floorPlans && property.floorPlans.length > 0 && (
                <button
                  type="button"
                  className={`media-tab ${activeTab === 'floorplans' ? 'active' : ''}`}
                  onClick={() => setActiveTab('floorplans')}
                >
                  <Compass size={14} />
                  <span>FLOOR PLANS ({property.floorPlans.length})</span>
                </button>
              )}
            </div>

            {/* Gallery Display */}
            {activeTab === 'gallery' && (
              <div className="gallery-stage">
                <div className="main-image-viewer">
                  <img
                    src={property.images[activeImageIdx] || property.images[0]}
                    alt={`${property.title} view ${activeImageIdx + 1}`}
                    className="gallery-main-img"
                  />
                  <div className="gallery-counter">
                    {activeImageIdx + 1} / {property.images.length}
                  </div>
                </div>

                {property.images.length > 1 && (
                  <div className="gallery-thumbnail-strip">
                    {property.images.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`thumb-btn ${i === activeImageIdx ? 'active' : ''}`}
                        onClick={() => setActiveImageIdx(i)}
                      >
                        <img src={img} alt={`Thumbnail ${i + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Video Display */}
            {activeTab === 'video' && (
              <div className="video-stage">
                <video
                  src={property.videoUrl}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="detail-video-player"
                />
              </div>
            )}

            {/* Floor Plans Display */}
            {activeTab === 'floorplans' && property.floorPlans && (
              <div className="floorplan-stage">
                <div className="floorplan-switcher">
                  {property.floorPlans.map((fp, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`fp-tab ${i === activeFloorPlanIdx ? 'active' : ''}`}
                      onClick={() => setActiveFloorPlanIdx(i)}
                    >
                      {fp.level} ({fp.area})
                    </button>
                  ))}
                </div>

                <div className="fp-viewer-box">
                  <img
                    src={property.floorPlans[activeFloorPlanIdx].image}
                    alt={property.floorPlans[activeFloorPlanIdx].level}
                    className="fp-img"
                  />
                  <div className="fp-details-overlay">
                    <strong>{property.floorPlans[activeFloorPlanIdx].level}</strong>
                    <span>{property.floorPlans[activeFloorPlanIdx].specs}</span>
                    <button 
                      type="button" 
                      className="fp-download-btn"
                      onClick={handleDownloadBrochure}
                    >
                      <Download size={14} />
                      <span>Download Blueprint PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Title & Valuation Banner */}
          <div className="detail-title-banner">
            <div className="banner-left">
              <div className="detail-loc-line">
                <MapPin size={15} />
                <span>{property.location.address}</span>
              </div>
              <h1 className="detail-property-title">{property.title}</h1>
              <p className="detail-tagline">{property.tagline}</p>
            </div>

            <div className="banner-right">
              <div className="detail-price-main">{property.formattedPrice}</div>
              <div className="detail-price-unit">{property.pricePerSqft}</div>
              <div className="detail-possession-badge">
                <Calendar size={13} />
                <span>{property.possessionDate}</span>
              </div>
            </div>
          </div>

          {/* Key Architectural Specifications Grid */}
          <div className="detail-specs-grid">
            <div className="spec-card">
              <span className="spec-name">Typology</span>
              <span className="spec-val">{property.type}</span>
            </div>
            {property.specs.bhk && (
              <div className="spec-card">
                <span className="spec-name">Configuration</span>
                <span className="spec-val">{property.specs.bhk} ({property.specs.beds} Beds)</span>
              </div>
            )}
            {property.specs.baths && (
              <div className="spec-card">
                <span className="spec-name">Bathrooms</span>
                <span className="spec-val">{property.specs.baths} Ensuites</span>
              </div>
            )}
            {property.specs.builtUpSqft && (
              <div className="spec-card">
                <span className="spec-name">Built-Up Area</span>
                <span className="spec-val">{property.specs.builtUpSqft.toLocaleString()} sq.ft</span>
              </div>
            )}
            {property.specs.carpetSqft && (
              <div className="spec-card">
                <span className="spec-name">Carpet Area</span>
                <span className="spec-val">{property.specs.carpetSqft.toLocaleString()} sq.ft</span>
              </div>
            )}
            {property.specs.floor !== null && (
              <div className="spec-card">
                <span className="spec-name">Floor Level</span>
                <span className="spec-val">Floor {property.specs.floor} of {property.specs.totalFloors}</span>
              </div>
            )}
            {property.specs.facing && (
              <div className="spec-card">
                <span className="spec-name">Orientation</span>
                <span className="spec-val">{property.specs.facing}</span>
              </div>
            )}
            {property.specs.parking && (
              <div className="spec-card">
                <span className="spec-name">Private Parking</span>
                <span className="spec-val">{property.specs.parking} Covered Bays</span>
              </div>
            )}
            {property.specs.furnishing && (
              <div className="spec-card">
                <span className="spec-name">Furnishing</span>
                <span className="spec-val">{property.specs.furnishing}</span>
              </div>
            )}
          </div>

          {/* Description & Highlights */}
          <div className="detail-content-section">
            <h3 className="section-heading">Architectural Overview</h3>
            <p className="detail-paragraph">{property.description}</p>

            {property.highlights && property.highlights.length > 0 && (
              <div className="highlights-box">
                <h4 className="highlights-title">Distinctive Architecture Highlights</h4>
                <ul className="highlights-list">
                  {property.highlights.map((item, idx) => (
                    <li key={idx} className="highlight-item">
                      <span className="highlight-bullet">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Amenities Grid */}
          <div className="detail-content-section">
            <h3 className="section-heading">Curated Amenities & Lifestyle</h3>
            <div className="detail-amenities-grid">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="amenity-item-card">
                  <Check size={14} className="amenity-check" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Landmarks & Connectivity */}
          {property.nearbyLandmarks && property.nearbyLandmarks.length > 0 && (
            <div className="detail-content-section">
              <h3 className="section-heading">Prime Vicinity & Transit Times</h3>
              <div className="landmarks-grid">
                {property.nearbyLandmarks.map((lm, idx) => (
                  <div key={idx} className="landmark-row">
                    <span className="lm-name">{lm.name}</span>
                    <span className="lm-dist">{lm.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assigned Senior Director / Partner Profile */}
          {property.agent && (
            <div className="detail-agent-card glass-panel">
              <div className="agent-avatar-wrap">
                <Building size={24} className="agent-avatar-icon" />
              </div>
              <div className="agent-info-block">
                <span className="agent-lead-label">Direct Portfolio Partner</span>
                <h4 className="agent-name">{property.agent.name}</h4>
                <p className="agent-role">{property.agent.title}</p>
                <div className="agent-stats">
                  <span>{property.agent.experience}</span>
                  <span>•</span>
                  <span>{property.agent.activeListings} Active Listings</span>
                  <span>•</span>
                  <span>★ {property.agent.rating} Rating</span>
                </div>
              </div>
              <div className="agent-actions">
                <button 
                  type="button" 
                  className="agent-btn whatsapp" 
                  onClick={handleWhatsApp}
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp</span>
                </button>
                <button 
                  type="button" 
                  className="agent-btn call" 
                  onClick={handleCall}
                >
                  <Phone size={15} />
                  <span>Direct Call</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Action Footer (Prompt 28) */}
        <div className="detail-sticky-footer">
          <div className="footer-price-col">
            <span className="f-price-label">Valuation</span>
            <span className="f-price-val">{property.formattedPrice}</span>
          </div>

          <div className="footer-buttons-group">
            <button
              type="button"
              className="footer-btn whatsapp"
              onClick={handleWhatsApp}
            >
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </button>

            <button
              type="button"
              className="footer-btn call"
              onClick={handleCall}
            >
              <Phone size={16} />
              <span>Call Partner</span>
            </button>

            <button
              type="button"
              className="footer-btn schedule-cta"
              onClick={() => {
                openScheduleModal(property);
              }}
            >
              <span>Schedule Private Visit</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
