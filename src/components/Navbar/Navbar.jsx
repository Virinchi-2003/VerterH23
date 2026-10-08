import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  User, 
  Menu, 
  X, 
  ArrowUpRight,
  Layers
} from 'lucide-react';
import VertexLogo from '../common/VertexLogo';
import './Navbar.css';

export default function Navbar() {
  const {
    activeView,
    setActiveView,
    favorites,
    compareList = [],
    setIsFavoritesDrawerOpen,
    openScheduleModal,
    currentUser,
    setIsAuthOpen
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view, sectionId = null) => {
    setActiveView(view);
    setMobileMenuOpen(false);

    if (view === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''} ${activeView !== 'home' ? 'nav-light-surface' : ''}`}>
        <div className="navbar-container">
          {/* Brand Logo & Emblem */}
          <button 
            className="navbar-logo" 
            onClick={() => navigateTo('home')}
            aria-label="Vertex Horizon Home"
          >
            <VertexLogo size={34} idSuffix="nav" />
            <span className="brand-name">VERTEX HORIZON</span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="navbar-nav desktop-only" aria-label="Main Navigation">
            <button 
              onClick={() => navigateTo('home')} 
              className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
            >
              Overview
            </button>
            <button 
              onClick={() => navigateTo('properties')} 
              className={`nav-link ${activeView === 'properties' ? 'active' : ''}`}
            >
              Properties
            </button>
            <button 
              onClick={() => navigateTo('projects')} 
              className={`nav-link ${activeView === 'projects' ? 'active' : ''}`}
            >
              Projects
            </button>
            <button 
              onClick={() => navigateTo('locations')} 
              className={`nav-link ${activeView === 'locations' ? 'active' : ''}`}
            >
              Locations
            </button>
            <button 
              onClick={() => navigateTo('services')} 
              className={`nav-link ${activeView === 'services' ? 'active' : ''}`}
            >
              Services
            </button>
            <button 
              onClick={() => navigateTo('about')} 
              className={`nav-link ${activeView === 'about' ? 'active' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => navigateTo('calculators')} 
              className={`nav-link ${activeView === 'calculators' ? 'active' : ''}`}
            >
              Calculators
            </button>
          </nav>

          {/* Right Action Icons & VIP CTA */}
          <div className="navbar-actions desktop-only">
            {/* Compare Matrix Link */}
            <button 
              className={`nav-icon-btn ${compareList.length > 0 ? 'has-badge' : ''}`}
              onClick={() => navigateTo('compare')}
              title="Property Comparison Matrix"
              aria-label="Open property comparison matrix"
            >
              <Layers size={17} />
              {compareList.length > 0 && (
                <span className="nav-badge gold">{compareList.length}</span>
              )}
            </button>

            {/* Favorites Collection Drawer */}
            <button 
              className={`nav-icon-btn ${favorites.length > 0 ? 'has-badge' : ''}`}
              onClick={() => setIsFavoritesDrawerOpen(true)}
              title="Saved Collection"
              aria-label="Open saved properties collection"
            >
              <Heart size={17} />
              {favorites.length > 0 && (
                <span className="nav-badge gold">{favorites.length}</span>
              )}
            </button>

            {/* User Account / Profile Switch */}
            {currentUser ? (
              <div className="user-profile-menu">
                <button 
                  className={`user-nav-chip ${currentUser.role === 'admin' ? 'admin-chip' : ''}`}
                  onClick={() => navigateTo(currentUser.role === 'admin' ? 'admin' : 'dashboard')}
                  title="View Portal"
                >
                  <User size={15} />
                  <span className="user-name-short">{currentUser.name.split(' ')[0]}</span>
                </button>
              </div>
            ) : (
              <button 
                className="nav-icon-btn"
                onClick={() => setIsAuthOpen(true)}
                title="Sign In / Portal Access"
                aria-label="Open sign in modal"
              >
                <User size={17} />
              </button>
            )}

            {/* VIP CTA: Schedule Visit */}
            <button 
              className="nav-cta-btn" 
              onClick={() => openScheduleModal()}
              id="nav-schedule-visit-btn"
            >
              <span>SCHEDULE VISIT</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="mobile-actions-row mobile-only">
            <button 
              className="nav-icon-btn"
              onClick={() => navigateTo('compare')}
              aria-label="Compare properties"
            >
              <Layers size={18} />
              {compareList.length > 0 && (
                <span className="nav-badge gold">{compareList.length}</span>
              )}
            </button>

            <button 
              className="nav-icon-btn"
              onClick={() => setIsFavoritesDrawerOpen(true)}
              aria-label="Saved properties"
            >
              <Heart size={18} />
              {favorites.length > 0 && (
                <span className="nav-badge gold">{favorites.length}</span>
              )}
            </button>

            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Fullscreen Menu Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <VertexLogo size={28} idSuffix="mob-nav" />
              <span className="brand-name">VERTEX HORIZON</span>
            </div>
            <button
              className="drawer-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mobile-nav-links">
            <button onClick={() => navigateTo('home')} className="mobile-nav-item">
              <span className="item-num">01</span>
              <span className="item-title">Overview</span>
            </button>
            <button onClick={() => navigateTo('properties')} className="mobile-nav-item">
              <span className="item-num">02</span>
              <span className="item-title">Properties Directory</span>
            </button>
            <button onClick={() => navigateTo('projects')} className="mobile-nav-item">
              <span className="item-num">03</span>
              <span className="item-title">Flagship Projects</span>
            </button>
            <button onClick={() => navigateTo('locations')} className="mobile-nav-item">
              <span className="item-num">04</span>
              <span className="item-title">Prime Metros</span>
            </button>
            <button onClick={() => navigateTo('services')} className="mobile-nav-item">
              <span className="item-num">05</span>
              <span className="item-title">Bespoke Services</span>
            </button>
            <button onClick={() => navigateTo('about')} className="mobile-nav-item">
              <span className="item-num">06</span>
              <span className="item-title">Brand & Philosophy</span>
            </button>
            <button onClick={() => navigateTo('calculators')} className="mobile-nav-item">
              <span className="item-num">07</span>
              <span className="item-title">Mortgage & ROI Calculators</span>
            </button>
            <button onClick={() => navigateTo('compare')} className="mobile-nav-item">
              <span className="item-num">08</span>
              <span className="item-title">Comparison Matrix {compareList.length > 0 ? `(${compareList.length})` : ''}</span>
            </button>
          </div>

          <div className="mobile-drawer-footer">
            <button
              className="btn-primary mobile-cta-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                openScheduleModal();
              }}
            >
              SCHEDULE A VISIT <ArrowUpRight size={18} />
            </button>
            <div className="mobile-contact-meta">
              <p>RERA REG: P02400005821 · TELANGANA</p>
              <p>Financial District, Gachibowli, Hyderabad</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
