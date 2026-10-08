import React from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import PropertySearch from '../components/PropertySearch/PropertySearch';
import PropertyListing from '../components/PropertyListing/PropertyListing';
import PropertyIntro from '../components/PropertyIntro/PropertyIntro';
import PropertyShowcase from '../components/PropertyShowcase/PropertyShowcase';
import ProjectsSection from '../components/Projects/ProjectsSection';
import LocationsSection from '../components/Locations/LocationsSection';
import ServicesSection from '../components/Services/ServicesSection';
import AboutSection from '../components/About/AboutSection';
import CalculatorsSection from '../components/Calculators/CalculatorsSection';
import ArchitectureStory from '../components/ArchitectureStory/ArchitectureStory';
import PropertyStats from '../components/PropertyStats/PropertyStats';
import Location from '../components/Location/Location';
import CTA from '../components/CTA/CTA';
import Footer from '../components/Footer/Footer';

// Modals & Overlays
import PropertyDetailModal from '../components/PropertyDetail/PropertyDetailModal';
import ScheduleModal from '../components/CTA/ScheduleModal';
import FavoritesDrawer from '../components/Favorites/FavoritesDrawer';
import AuthModal from '../components/Auth/AuthModal';
import ToastContainer from '../components/common/ToastContainer';
import PropertyCompare from '../components/PropertyCompare/PropertyCompare';
import UserDashboard from '../components/Dashboard/UserDashboard';
import AdminPortal from '../components/Admin/AdminPortal';

export default function Home() {
  const { activeView, openScheduleModal } = useApp();

  const handleExploreClick = () => {
    const el = document.getElementById('property-search-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page-root blueprint-grid-bg">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Primary Views Router */}
      {activeView === 'home' && (
        <main>
          {/* Hero Section with 4K Video Canvas Transformation */}
          <Hero onExploreClick={handleExploreClick} />

          {/* Advanced Property Search Filter Bar */}
          <PropertySearch />

          {/* Comprehensive Property Listings (Grid / List / Map) */}
          <PropertyListing />

          {/* 01: Project Overview Split Section */}
          <PropertyIntro onOpenSchedule={() => openScheduleModal()} />

          {/* 02: Horizontal Scroll Property Showcase */}
          <PropertyShowcase onOpenSchedule={() => openScheduleModal()} />

          {/* Flagship Landmark Developments */}
          <ProjectsSection />

          {/* Metropolitan Luxury Destinations */}
          <LocationsSection />

          {/* Bespoke Private Client Advisory & Services */}
          <ServicesSection />

          {/* Brand Manifesto & Heritage About Section */}
          <AboutSection />

          {/* Super-Luxury Mortgage & Investment ROI Models */}
          <CalculatorsSection />

          {/* 03: Cinematic Architectural Story */}
          <ArchitectureStory />

          {/* 04: Engineering & Benchmarks Animated Statistics */}
          <PropertyStats />

          {/* 05: Location Connectivity Radar */}
          <Location />

          {/* 06: Final Cinematic Call To Action */}
          <CTA />
        </main>
      )}

      {/* Standalone View: Properties Directory */}
      {activeView === 'properties' && (
        <main style={{ paddingTop: '80px' }}>
          <PropertySearch />
          <PropertyListing />
        </main>
      )}

      {/* Standalone View: Flagship Projects */}
      {activeView === 'projects' && (
        <main style={{ paddingTop: '80px' }}>
          <ProjectsSection />
        </main>
      )}

      {/* Standalone View: Locations */}
      {activeView === 'locations' && (
        <main style={{ paddingTop: '80px' }}>
          <LocationsSection />
        </main>
      )}

      {/* Standalone View: Bespoke Services */}
      {activeView === 'services' && (
        <main style={{ paddingTop: '80px' }}>
          <ServicesSection />
        </main>
      )}

      {/* Standalone View: Heritage About */}
      {activeView === 'about' && (
        <main style={{ paddingTop: '80px' }}>
          <AboutSection />
          <ArchitectureStory />
          <PropertyStats />
        </main>
      )}

      {/* Standalone View: Property Comparison Matrix */}
      {activeView === 'compare' && (
        <main>
          <PropertyCompare />
        </main>
      )}

      {/* Standalone View: Financial Calculators */}
      {activeView === 'calculators' && (
        <main style={{ paddingTop: '80px' }}>
          <CalculatorsSection />
        </main>
      )}

      {/* Standalone View: User Dashboard */}
      {activeView === 'dashboard' && (
        <main>
          <UserDashboard />
        </main>
      )}

      {/* Standalone View: Admin & CRM Portal */}
      {activeView === 'admin' && (
        <main>
          <AdminPortal />
        </main>
      )}

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Global Modals & Drawers */}
      <PropertyDetailModal />
      <ScheduleModal />
      <FavoritesDrawer />
      <AuthModal />
      <ToastContainer />
    </div>
  );
}
