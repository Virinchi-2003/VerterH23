import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutGrid, 
  List, 
  Map, 
  Heart, 
  Eye, 
  Layers, 
  ArrowUpRight, 
  Bed, 
  Bath, 
  Maximize, 
  MapPin, 
  Phone, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import InteractiveMap from '../maps/InteractiveMap';
import './PropertyListing.css';

export default function PropertyListing() {
  const { 
    filteredProperties, 
    searchFilters, 
    setFilter, 
    resetFilters,
    setSelectedProperty, 
    toggleFavorite, 
    isFavorite,
    compareList,
    toggleCompare,
    openScheduleModal
  } = useApp();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list' | 'map'
  const [activeImageIndex, setActiveImageIndex] = useState({});

  const handleWhatsApp = (property, e) => {
    e.stopPropagation();
    const phone = property.agent?.whatsapp || '919849012890';
    const text = encodeURIComponent(
      `Hello, I am interested in acquiring "${property.title}" listed for ${property.formattedPrice} at Vertex Horizon Luxury Atelier.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleCall = (property, e) => {
    e.stopPropagation();
    const phone = property.agent?.phone || '+919849012890';
    window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
  };

  return (
    <section className="property-listing-section" id="properties-section">
      <div className="container">
        {/* Section Header & View Controls */}
        <div className="listing-controls-header">
          <div>
            <div className="meta-tag">
              <span className="tag-dot"></span>
              <span>CURATED MASTER INVENTORY</span>
            </div>
            <h2 className="listing-main-title">
              ARCHITECTURAL RESIDENCES
            </h2>
            <p className="listing-subtitle">
              Showing {filteredProperties.length} hand-picked luxury residences and commercial trophies
            </p>
          </div>

          <div className="listing-actions-cluster">
            {/* Sort Dropdown */}
            <div className="sort-dropdown-wrap">
              <span className="sort-label">Sort:</span>
              <select
                value={searchFilters.sortOption}
                onChange={(e) => setFilter('sortOption', e.target.value)}
                className="sort-select"
                aria-label="Sort listings"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Valuation: Low to High</option>
                <option value="price-desc">Valuation: High to Low</option>
                <option value="sqft-desc">Built-Up Area: Largest</option>
              </select>
            </div>

            {/* View Mode Toggle: Grid | List | Map */}
            <div className="view-mode-toggle">
              <button
                type="button"
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
                aria-label="List View"
              >
                <List size={16} />
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
                onClick={() => setViewMode('map')}
                title="Interactive Map View"
                aria-label="Map View"
              >
                <Map size={16} />
                <span className="map-btn-text">Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="empty-results-card">
            <Sparkles size={36} className="empty-icon" />
            <h3>No Properties Found</h3>
            <p>No listings matched your active filter criteria. Try adjusting your parameters.</p>
            <button className="btn-primary" onClick={resetFilters}>
              RESET SEARCH FILTERS
            </button>
          </div>
        )}

        {/* MAP VIEW */}
        {viewMode === 'map' && filteredProperties.length > 0 && (
          <div className="map-view-wrapper">
            <InteractiveMap properties={filteredProperties} onSelectProperty={setSelectedProperty} />
          </div>
        )}

        {/* GRID VIEW & LIST VIEW */}
        {viewMode !== 'map' && filteredProperties.length > 0 && (
          <div className={`properties-container ${viewMode === 'list' ? 'list-layout' : 'grid-layout'}`}>
            {filteredProperties.map((property) => {
              const currentImgIdx = activeImageIndex[property.id] || 0;
              const displayImage = property.images[currentImgIdx] || property.images[0];
              const isFav = isFavorite(property.id);
              const isCompared = compareList.includes(property.id);

              return (
                <article
                  key={property.id}
                  className="property-card glass-panel"
                  onClick={() => setSelectedProperty(property)}
                >
                  {/* Card Media Container */}
                  <div className="card-media-wrap">
                    <img
                      src={displayImage}
                      alt={property.title}
                      className="card-image"
                      loading="lazy"
                    />

                    {/* Image indicator dots if multiple images */}
                    {property.images.length > 1 && (
                      <div className="media-dots">
                        {property.images.map((_, i) => (
                          <span
                            key={i}
                            className={`media-dot ${i === currentImgIdx ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex((prev) => ({ ...prev, [property.id]: i }));
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Floating Badges */}
                    <div className="card-top-badges">
                      <span className="category-pill">{property.category}</span>
                      <span className="status-pill">{property.status}</span>
                    </div>

                    {/* Top Right Quick Action Buttons */}
                    <div className="card-action-btns">
                      <button
                        type="button"
                        className={`action-bubble ${isFav ? 'favorited' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(property.id);
                        }}
                        title={isFav ? 'Remove from Saved' : 'Save to Portfolio'}
                        aria-label="Save Property"
                      >
                        <Heart size={15} fill={isFav ? 'currentColor' : 'none'} />
                      </button>

                      <button
                        type="button"
                        className={`action-bubble ${isCompared ? 'compared' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(property.id);
                        }}
                        title={isCompared ? 'Remove from Comparison' : 'Add to Comparison'}
                        aria-label="Compare Property"
                      >
                        <Layers size={15} />
                      </button>
                    </div>

                    {/* Quick View Button on Hover */}
                    <button 
                      className="quick-view-overlay-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProperty(property);
                      }}
                    >
                      <Eye size={14} />
                      <span>EXPLORE ARCHITECTURE</span>
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="card-body">
                    <div className="card-location">
                      <MapPin size={13} className="loc-pin" />
                      <span>{property.location.area}, {property.location.city}</span>
                    </div>

                    <h3 className="card-title">{property.title}</h3>

                    <div className="card-price-row">
                      <div className="price-primary">{property.formattedPrice}</div>
                      <div className="price-secondary">{property.pricePerSqft}</div>
                    </div>

                    {/* Specifications Row */}
                    <div className="card-specs-row">
                      {property.specs.bhk && (
                        <div className="spec-unit" title="Bedrooms">
                          <Bed size={14} />
                          <span>{property.specs.bhk}</span>
                        </div>
                      )}
                      {property.specs.baths && (
                        <div className="spec-unit" title="Bathrooms">
                          <Bath size={14} />
                          <span>{property.specs.baths} Baths</span>
                        </div>
                      )}
                      {property.specs.builtUpSqft && (
                        <div className="spec-unit" title="Built-up Area">
                          <Maximize size={14} />
                          <span>{property.specs.builtUpSqft.toLocaleString()} sq.ft</span>
                        </div>
                      )}
                    </div>

                    {/* Card Footer Actions */}
                    <div className="card-footer-actions">
                      <button
                        type="button"
                        className="card-cta-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openScheduleModal(property);
                        }}
                      >
                        <span>Schedule Visit</span>
                        <ArrowUpRight size={14} />
                      </button>

                      <div className="card-direct-contact">
                        <button
                          type="button"
                          className="contact-bubble whatsapp"
                          onClick={(e) => handleWhatsApp(property, e)}
                          title="WhatsApp In-Charge Director"
                          aria-label="WhatsApp Agent"
                        >
                          <MessageSquare size={14} />
                        </button>
                        <button
                          type="button"
                          className="contact-bubble phone"
                          onClick={(e) => handleCall(property, e)}
                          title="Call Assigned Partner"
                          aria-label="Call Agent"
                        >
                          <Phone size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
