import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building, 
  Award, 
  Key, 
  TrendingUp, 
  Shield, 
  Compass, 
  Clock, 
  DollarSign, 
  ArrowUpRight,
  Check
} from 'lucide-react';
import './ServicesSection.css';

const ICON_MAP = {
  Building,
  Award,
  Key,
  TrendingUp,
  Shield,
  Compass,
  Clock,
  DollarSign,
};

export default function ServicesSection() {
  const { services, openScheduleModal } = useApp();

  return (
    <section className="services-section" id="services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="sub-label">
            <span>BESPOKE CLIENT SERVICES</span>
          </div>
          <h2 className="main-title">
            PRIVATE CLIENT <span>ADVISORY & SERVICES</span>
          </h2>
          <p className="services-intro-p">
            Comprehensive fiduciary representation for sovereign wealth funds, single family offices, and distinguished private collectors.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="services-cards-grid">
          {services.map((srv, idx) => {
            const IconComponent = ICON_MAP[srv.icon] || Building;

            return (
              <div key={srv.id} className="service-card glass-panel">
                <div className="service-top-row">
                  <div className="service-icon-box">
                    <IconComponent size={24} />
                  </div>
                  <span className="service-index-number">0{idx + 1}</span>
                </div>

                <h3 className="service-card-title">{srv.title}</h3>
                <span className="service-subtitle">{srv.subtitle}</span>
                <p className="service-description-p">{srv.description}</p>

                {srv.perks && (
                  <div className="service-perks-list">
                    {srv.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="service-perk-item">
                        <Check size={13} className="perk-check" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  className="service-action-btn"
                  onClick={() => openScheduleModal()}
                >
                  <span>Request Advisory Consultation</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
