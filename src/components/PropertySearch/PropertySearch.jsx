import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  MapPin, 
  Building, 
  SlidersHorizontal, 
  RotateCcw, 
  Bed, 
  Check, 
  ChevronDown, 
  Sparkles 
} from 'lucide-react';
import './PropertySearch.css';

const AMENITY_OPTIONS = [
  'Private Infinity Pool',
  'Private Elevator',
  'Concierge 24/7',
  'Smart Home Automation',
  'Sky Lounge',
  'Private Spa',
  'Wine Cellar',
  'EV Supercharging',
  'Italian Marble',
  '3-Tier Biometric Security',
  'Private Cinema',
  'Underground Car Vault',
  'Oceanfront Balconies',
  'IGBC Platinum Certified',
];

export default function PropertySearch() {
  const { 
    searchFilters, 
    setFilter, 
    resetFilters, 
    filteredProperties 
  } = useApp();

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const toggleAmenity = (amenity) => {
    const current = searchFilters.amenities || [];
    if (current.includes(amenity)) {
      setFilter('amenities', current.filter((a) => a !== amenity));
    } else {
      setFilter('amenities', [...current, amenity]);
    }
  };

  return (
    <div className="property-search-component" id="property-search-section">
      <div className="container">
        <div className="search-box-card">
          {/* Header Row: Buy/Rent Toggle & Search Keyword */}
          <div className="search-top-row">
            <div className="listing-type-toggle">
              <button
                type="button"
                className={`type-toggle-btn ${searchFilters.listingType === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('listingType', 'all')}
              >
                All Status
              </button>
              <button
                type="button"
                className={`type-toggle-btn ${searchFilters.listingType === 'buy' ? 'active' : ''}`}
                onClick={() => setFilter('listingType', 'buy')}
              >
                Buy
              </button>
              <button
                type="button"
                className={`type-toggle-btn ${searchFilters.listingType === 'rent' ? 'active' : ''}`}
                onClick={() => setFilter('listingType', 'rent')}
              >
                Rent / Lease
              </button>
            </div>

            {/* Keyword Search Input */}
            <div className="keyword-search-field">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search by property name, area, or landmark..."
                value={searchFilters.keyword}
                onChange={(e) => setFilter('keyword', e.target.value)}
                className="keyword-input"
              />
              {searchFilters.keyword && (
                <button 
                  className="clear-keyword-btn" 
                  onClick={() => setFilter('keyword', '')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Primary Filters Grid */}
          <div className="primary-filters-grid">
            {/* City Dropdown */}
            <div className="filter-group">
              <label className="filter-label">
                <MapPin size={13} />
                <span>Metro City</span>
              </label>
              <select
                value={searchFilters.city}
                onChange={(e) => setFilter('city', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Metros</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="bengaluru">Bengaluru</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi ncr">Delhi NCR</option>
                <option value="pune">Pune</option>
                <option value="chennai">Chennai</option>
                <option value="dubai">Dubai</option>
              </select>
            </div>

            {/* Property Typology */}
            <div className="filter-group">
              <label className="filter-label">
                <Building size={13} />
                <span>Typology</span>
              </label>
              <select
                value={searchFilters.propertyType}
                onChange={(e) => setFilter('propertyType', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Typologies</option>
                <option value="Sky Penthouse">Sky Penthouses</option>
                <option value="Luxury Villa">Luxury Villas</option>
                <option value="Waterfront Estate">Waterfront Estates</option>
                <option value="Commercial Monolith">Commercial Monoliths</option>
                <option value="Land / Plot">Estate Land / Plots</option>
              </select>
            </div>

            {/* Bedrooms Configuration */}
            <div className="filter-group">
              <label className="filter-label">
                <Bed size={13} />
                <span>Bedrooms</span>
              </label>
              <select
                value={searchFilters.bhk}
                onChange={(e) => setFilter('bhk', e.target.value)}
                className="filter-select"
              >
                <option value="all">Any BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="5 BHK">5 BHK</option>
                <option value="6 BHK">6+ BHK</option>
              </select>
            </div>

            {/* Property Status */}
            <div className="filter-group">
              <label className="filter-label">
                <Sparkles size={13} />
                <span>Status</span>
              </label>
              <select
                value={searchFilters.status}
                onChange={(e) => setFilter('status', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Statuses</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
              </select>
            </div>
          </div>

          {/* Action Bar: Advanced Toggle & Reset & Live Count */}
          <div className="search-actions-bar">
            <div className="actions-left">
              <button
                type="button"
                className={`advanced-toggle-btn ${isAdvancedOpen ? 'active' : ''}`}
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              >
                <SlidersHorizontal size={14} />
                <span>Advanced Filters</span>
                <ChevronDown size={14} className={`chevron-icon ${isAdvancedOpen ? 'rotated' : ''}`} />
              </button>

              <button
                type="button"
                className="reset-filters-btn"
                onClick={resetFilters}
                title="Reset all search parameters"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>

            <div className="actions-right">
              <span className="results-counter-badge">
                <strong>{filteredProperties.length}</strong> Properties Available
              </span>
            </div>
          </div>

          {/* Expandable Advanced Filters Drawer */}
          {isAdvancedOpen && (
            <div className="advanced-filters-drawer">
              {/* Budget Range Slider */}
              <div className="advanced-section">
                <div className="section-title-row">
                  <span className="adv-title">Maximum Valuation</span>
                  <span className="adv-val">
                    {searchFilters.maxPrice >= 800000000
                      ? 'Up to ₹80+ Cr'
                      : `Up to ₹${(searchFilters.maxPrice / 10000000).toFixed(1)} Cr`}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000000"
                  max="800000000"
                  step="10000000"
                  value={searchFilters.maxPrice}
                  onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
                  className="price-range-slider"
                />
                <div className="slider-limits">
                  <span>₹5 Cr</span>
                  <span>₹25 Cr</span>
                  <span>₹50 Cr</span>
                  <span>₹80 Cr+</span>
                </div>
              </div>

              {/* Luxury Amenities Checkboxes */}
              <div className="advanced-section">
                <span className="adv-title">Architectural Features & Amenities</span>
                <div className="amenities-tag-cloud">
                  {AMENITY_OPTIONS.map((amenity) => {
                    const isChecked = searchFilters.amenities?.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        className={`amenity-chip ${isChecked ? 'selected' : ''}`}
                        onClick={() => toggleAmenity(amenity)}
                      >
                        {isChecked && <Check size={12} />}
                        <span>{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
