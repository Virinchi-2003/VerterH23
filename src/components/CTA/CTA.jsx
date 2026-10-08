import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, CalendarCheck, ShieldCheck } from 'lucide-react';
import ScheduleModal from './ScheduleModal';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const [modalOpen, setModalOpen] = useState(false);
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);
  const sectionRef = useRef(null);
  const bgImgRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const img = bgImgRef.current;

    // Slow zoom / parallax effect on scroll
    const anim = gsap.fromTo(
      img,
      { scale: 1.05, yPercent: -5 },
      {
        scale: 1.22,
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
    };
  }, []);

  const handleBrochureDownload = () => {
    setBrochureDownloaded(true);
    // Simulate instant download notification
    setTimeout(() => {
      alert('VERTEX HORIZON - Architectural Dossier & Specifications (PDF) will download now.');
    }, 200);
  };

  return (
    <>
      <section className="cta-section" id="cta-section" ref={sectionRef}>
        {/* Parallax Background */}
        <div className="cta-bg-container">
          <img
            src="/images/cta_tower.jpg"
            alt="Vertex Horizon Tower At Night"
            className="cta-bg-image"
            ref={bgImgRef}
            loading="lazy"
          />
          <div className="cta-overlay-gradient" />
        </div>

        {/* Content Box */}
        <div className="container cta-content-relative">
          <div className="cta-inner-card glass-panel">
            <div className="meta-tag amber">
              <span className="tag-dot"></span>
              <span>LIMITED TO 48 BESPOKE RESIDENCES</span>
            </div>

            <h2 className="cta-headline">
              YOUR NEXT<br />
              <span className="headline-glow">ADDRESS STARTS HERE.</span>
            </h2>

            <p className="cta-subtext">
              Secure your place within Hyderabad's most iconic architectural achievement. Experience panoramic skyline vistas, world-class acoustic serenity, and bespoke concierge hospitality.
            </p>

            <div className="cta-buttons-row">
              <button
                className="btn-primary"
                onClick={() => setModalOpen(true)}
                id="cta-schedule-visit-btn"
              >
                <CalendarCheck size={18} />
                <span>SCHEDULE A VISIT</span>
              </button>

              <button
                className="btn-secondary"
                onClick={handleBrochureDownload}
                id="cta-get-brochure-btn"
              >
                <Download size={18} />
                <span>{brochureDownloaded ? 'DOSSIER DOWNLOADED' : 'GET BROCHURE (PDF)'}</span>
              </button>
            </div>

            <div className="cta-compliance-meta">
              <div className="meta-cell">
                <ShieldCheck size={14} className="accent-icon" />
                <span>TS-RERA REGISTRATION NO. P02400008892</span>
              </div>
              <div className="meta-cell">
                <span>HANDOVER SCHEDULED: Q4 2028</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <ScheduleModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
