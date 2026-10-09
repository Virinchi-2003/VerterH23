import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import WireframeBuilding from '../WireframeBuilding/WireframeBuilding';
import { 
  ChevronRight, 
  Search, 
  MapPin, 
  Building
} from 'lucide-react';
import './Hero.css';

export default function Hero({ onExploreClick }) {
  const { setActiveView, setFilter, openScheduleModal } = useApp();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Quick Search Hero Inputs
  const [heroType, setHeroType] = useState('all');
  const [heroCity, setHeroCity] = useState('all');
  const [heroListingType] = useState('buy');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleCinematicPlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setFilter('listingType', heroListingType);
    setFilter('city', heroCity);
    setFilter('propertyType', heroType);
    setActiveView('properties');
  };

  return (
    <div className="hero-gradient-viewport">
      {/* Dynamic Ambient Gradient Mesh matching video sky and amber glow */}
      <div className="hero-ambient-mesh">
        <div className="mesh-glow-cyan" />
        <div className="mesh-glow-amber" />
        <div className="mesh-glow-deep-blue" />
        <div className="mesh-subtle-grid" />
      </div>

      {/* 50/50 Viewport-Fit Container (No vertical cut-off) */}
      <div className={`hero-5050-container ${isMobile ? 'hero-mobile-layout' : ''}`}>
        {/* Left 50%: Compact Editorial Typography & CTAs (Fitted exactly like Reference Image) */}
        <div className="hero-left-half">
          <div className="hero-editorial-wrapper">
            {/* Master Headline (Fitted with clamp so it never overflows viewport) */}
            <h1 className="hero-ref-headline">
              Where Architecture.<br />
              Meets Reality.<br />
              <span className="ref-headline-gold">One Vision Ahead.</span>
            </h1>

            {/* Clean, light descriptive subtitle */}
            <p className="hero-ref-subtitle">
              Witness the continuous metamorphosis of a visionary architectural wireframe into a monumental 24-storey glass monolith. Explore ultra-luxury sky penthouses, ridge mansions, and commercial icons.
            </p>

            {/* Pill CTA Buttons (exact style from Reference Image) */}
            <div className="hero-ref-btn-group">
              <button
                className="ref-pill-primary"
                onClick={onExploreClick || (() => setActiveView('properties'))}
                id="hero-explore-cta"
              >
                <span>EXPLORE PROPERTIES</span>
                <ChevronRight size={17} className="pill-arrow-icon" />
              </button>

              <button
                className="ref-pill-secondary"
                onClick={() => openScheduleModal()}
              >
                <div className="pill-play-triangle"></div>
                <span>SCHEDULE VISIT</span>
              </button>
            </div>

            {/* Streamlined Single-Line Concierge Search Dock (Fitted cleanly) */}
            <div className="hero-compact-search-dock">
              <form className="dock-form" onSubmit={handleHeroSearch}>
                <div className="dock-field">
                  <MapPin size={14} className="dock-icon" />
                  <select 
                    value={heroCity} 
                    onChange={(e) => setHeroCity(e.target.value)}
                    className="dock-select"
                    aria-label="Select City"
                  >
                    <option value="all">All Metros</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="bengaluru">Bengaluru</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi ncr">Delhi NCR</option>
                    <option value="dubai">Dubai</option>
                  </select>
                </div>

                <div className="dock-divider" />

                <div className="dock-field">
                  <Building size={14} className="dock-icon" />
                  <select 
                    value={heroType} 
                    onChange={(e) => setHeroType(e.target.value)}
                    className="dock-select"
                    aria-label="Select Typology"
                  >
                    <option value="all">All Typologies</option>
                    <option value="Sky Penthouse">Sky Penthouses</option>
                    <option value="Luxury Villa">Luxury Villas</option>
                    <option value="Waterfront Estate">Waterfront Estates</option>
                    <option value="Commercial Monolith">Commercial Monoliths</option>
                  </select>
                </div>

                <button type="submit" className="dock-submit-btn">
                  <Search size={14} />
                  <span>FIND</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right 50%: Stable Continuous 4K Video Showcase (Seamlessly Blended in Space) */}
        <div className="hero-right-half">
          <WireframeBuilding 
            isMobile={isMobile} 
            isPlaying={isPlaying} 
            onTogglePlay={toggleCinematicPlay}
            playbackSpeed={1.5}
          />
        </div>

        {/* Mobile View Bottom Action Dock (Headline on top + Action Buttons over Video Showcase) */}
        <div className="hero-mobile-bottom-dock">
          {/* Master Headline on top of mobile CTA buttons */}
          <h2 className="hero-mobile-headline">
            Where Architecture.<br />
            Meets Reality.<br />
            <span className="ref-headline-gold">One Vision Ahead.</span>
          </h2>

          <div className="hero-mobile-btn-row" role="toolbar" aria-label="Quick Actions">
            <button
              type="button"
              className="ref-pill-primary mobile-cta-btn"
              onClick={onExploreClick || (() => setActiveView('properties'))}
              id="hero-mobile-explore-cta"
              aria-label="Explore Properties"
            >
              <span>EXPLORE PROPERTIES</span>
              <ChevronRight size={17} className="pill-arrow-icon" />
            </button>

            <button
              type="button"
              className="ref-pill-secondary mobile-cta-btn"
              onClick={() => openScheduleModal()}
              id="hero-mobile-schedule-cta"
              aria-label="Schedule Visit"
            >
              <div className="pill-play-triangle" aria-hidden="true"></div>
              <span>SCHEDULE VISIT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
