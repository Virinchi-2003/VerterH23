import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  ArrowUpRight, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import './ProjectsSection.css';

export default function ProjectsSection() {
  const { projects, openScheduleModal, setSelectedProperty, properties } = useApp();
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const currentProject = projects[activeProjectIdx] || projects[0];

  const handleNext = () => {
    setActiveProjectIdx((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveProjectIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="projects-showcase-section" id="projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="sub-label">
            <span>ARCHITECTURAL DEVELOPMENTS</span>
          </div>
          <h2 className="main-title">
            FLAGSHIP LANDMARK <span>DEVELOPMENTS</span>
          </h2>
        </div>

        {/* Cinematic Project Portfolio Stage */}
        <div className="cinematic-project-stage glass-panel">
          {/* Left Column: Visual Showcase */}
          <div className="project-visual-column">
            <div className="project-image-box">
              <img
                src={currentProject.heroImage}
                alt={currentProject.name}
                className="project-main-image"
                key={currentProject.id}
              />
              <div className="project-image-glow-overlay"></div>

              {/* Top Developer & RERA Badge */}
              <div className="project-floating-badges">
                <span className="badge-dev">{currentProject.developer}</span>
                <span className="badge-rera">RERA: {currentProject.reraNumber}</span>
              </div>

              {/* Interactive Slide Controls */}
              <div className="project-slider-arrows">
                <button
                  type="button"
                  className="arrow-circle"
                  onClick={handlePrev}
                  aria-label="Previous project"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="arrow-circle"
                  onClick={handleNext}
                  aria-label="Next project"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="project-progress-pills">
                {projects.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`prog-bar-btn ${idx === activeProjectIdx ? 'active' : ''}`}
                    onClick={() => setActiveProjectIdx(idx)}
                    aria-label={`Go to project ${p.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {currentProject.secondaryImages && (
              <div className="project-mini-gallery">
                {currentProject.secondaryImages.map((img, i) => (
                  <div key={i} className="mini-thumb-wrap">
                    <img src={img} alt={`Detail ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Architectural Story & Specs */}
          <div className="project-info-column">
            <div className="project-meta-top">
              <span className="project-num-index">DEVELOPMENT 0{activeProjectIdx + 1} // 0{projects.length}</span>
              <div className="project-loc-tag">
                <MapPin size={13} />
                <span>{currentProject.location}, {currentProject.city}</span>
              </div>
            </div>

            <h3 className="project-name-heading">{currentProject.name}</h3>
            <p className="project-tagline-text">{currentProject.tagline}</p>
            <p className="project-story-p">{currentProject.story}</p>

            {/* Specs Grid */}
            <div className="project-specifications-grid">
              <div className="proj-spec-card">
                <span className="ps-label">Starting Valuation</span>
                <span className="ps-val gold">{currentProject.startingPrice}</span>
              </div>

              <div className="ps-label-card">
                <span className="ps-label">Typologies</span>
                <span className="ps-val">{currentProject.configurations}</span>
              </div>

              <div className="proj-spec-card">
                <span className="ps-label">Available Inventory</span>
                <span className="ps-val">{currentProject.availableUnits} of {currentProject.totalUnits} Units</span>
              </div>

              <div className="proj-spec-card">
                <span className="ps-label">Possession Timeline</span>
                <span className="ps-val">{currentProject.possessionDate}</span>
              </div>
            </div>

            {/* Architectural Highlights */}
            <div className="project-features-list">
              <span className="features-headline">Atelier Highlights & Features:</span>
              {currentProject.features.map((feat, fIdx) => (
                <div key={fIdx} className="feature-item-row">
                  <CheckCircle2 size={15} className="feat-check" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Bottom Project CTAs */}
            <div className="project-action-row">
              <button
                type="button"
                className="btn-primary proj-enquire-btn"
                onClick={() => openScheduleModal()}
              >
                <span>SCHEDULE PRIVATE PRESENTATION</span>
                <ArrowUpRight size={16} />
              </button>

              <button
                type="button"
                className="btn-secondary proj-explore-residences-btn"
                onClick={() => {
                  const related = properties.find(p => p.location.city.toLowerCase() === currentProject.city.toLowerCase());
                  if (related) setSelectedProperty(related);
                }}
              >
                <span>EXPLORE RESIDENCES</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
