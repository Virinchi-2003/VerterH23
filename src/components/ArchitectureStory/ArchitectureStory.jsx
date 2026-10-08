import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Shield, Cpu, Wind } from 'lucide-react';
import './ArchitectureStory.css';

gsap.registerPlugin(ScrollTrigger);

export default function ArchitectureStory() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const blueprintLinesRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const img = imageRef.current;
    const lines = blueprintLinesRef.current;

    // Cinematic slow scale & parallax on scroll
    const scaleAnim = gsap.to(img, {
      scale: 1.15,
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Animate blueprint line drawings
    const lineAnim = gsap.fromTo(
      lines,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        },
      }
    );

    return () => {
      if (scaleAnim.scrollTrigger) scaleAnim.scrollTrigger.kill();
      if (lineAnim.scrollTrigger) lineAnim.scrollTrigger.kill();
    };
  }, []);

  return (
    <section className="architecture-story-section" id="architecture-story" ref={sectionRef}>
      {/* Background Cinematic Image with Parallax */}
      <div className="story-bg-container">
        <img
          src="/images/architecture_story.jpg"
          alt="Architectural Facade Precision Engineering"
          className="story-bg-img"
          ref={imageRef}
          loading="lazy"
        />
        <div className="story-overlay-gradient" />
      </div>

      {/* Blueprint SVG Line Graphics Overlay */}
      <div className="story-blueprint-svg-wrap" ref={blueprintLinesRef}>
        <svg className="blueprint-story-svg" viewBox="0 0 1200 800" preserveAspectRatio="none">
          {/* Engineering Golden Ratio Grid */}
          <path d="M 100 200 L 1100 200" stroke="rgba(96,165,250,0.18)" strokeWidth="1" strokeDasharray="6 6" />
          <path d="M 100 600 L 1100 600" stroke="rgba(96,165,250,0.18)" strokeWidth="1" strokeDasharray="6 6" />
          <path d="M 400 100 L 400 700" stroke="rgba(96,165,250,0.15)" strokeWidth="1" strokeDasharray="4 8" />
          <path d="M 800 100 L 800 700" stroke="rgba(96,165,250,0.15)" strokeWidth="1" strokeDasharray="4 8" />

          {/* Golden Spiral Architectural Accent */}
          <circle cx="400" cy="200" r="12" fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="1" />
          <circle cx="800" cy="600" r="12" fill="none" stroke="rgba(96,165,250,0.5)" strokeWidth="1" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="container story-content-relative">
        <div className="section-header">
          <div className="sub-label">03 // ARCHITECTURAL NARRATIVE</div>
          <h2 className="main-title">
            SCULPTED IN GLASS.<br />
            <span>ANCHORED IN PRECISION.</span>
          </h2>
        </div>

        {/* 4 Precision Pillars */}
        <div className="story-pillars-grid">
          <div className="pillar-card glass-panel">
            <div className="pillar-num">01</div>
            <div className="pillar-icon"><Layers size={22} /></div>
            <h3 className="pillar-title">Acoustic Curtain Wall</h3>
            <p className="pillar-desc">
              Precision double-glazed low-E argon-infilled glass units isolate interior acoustic levels below 32dB, providing pristine quietude in the heart of the bustling metropolis.
            </p>
            <div className="pillar-meta">
              <span>SPEC: STC 48 ACOUSTIC SHIELD</span>
            </div>
          </div>

          <div className="pillar-card glass-panel">
            <div className="pillar-num">02</div>
            <div className="pillar-icon"><Wind size={22} /></div>
            <h3 className="pillar-title">Aerodynamic Louvers</h3>
            <p className="pillar-desc">
              Curated champagne-toned anodized aluminum vertical fins deflect harsh solar glare while funneling natural convective airflow through high-elevation sky courts.
            </p>
            <div className="pillar-meta">
              <span>SPEC: 34% SOLAR HEAT REDUCTION</span>
            </div>
          </div>

          <div className="pillar-card glass-panel">
            <div className="pillar-num">03</div>
            <div className="pillar-icon"><Shield size={22} /></div>
            <h3 className="pillar-title">Seismic Core Spine</h3>
            <p className="pillar-desc">
              Post-tensioned reinforced concrete core shear walls with ductile moment frames, certified to exceed Zone IV seismic specifications and 180 km/h wind shear forces.
            </p>
            <div className="pillar-meta">
              <span>SPEC: GRADE M60 COMPOSITE</span>
            </div>
          </div>

          <div className="pillar-card glass-panel">
            <div className="pillar-num">04</div>
            <div className="pillar-icon"><Cpu size={22} /></div>
            <h3 className="pillar-title">Predictive Climate AI</h3>
            <p className="pillar-desc">
              Integrated building management system dynamically optimizes solar shading, chilled-beam cooling, and air filtration based on micro-climatic atmospheric data.
            </p>
            <div className="pillar-meta">
              <span>SPEC: ZERO CARBON TARGET 2030</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
