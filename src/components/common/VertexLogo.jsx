import React from 'react';

/**
 * Official Vertex Horizon Architectural Emblem & Monogram Component
 */
export default function VertexLogo({ 
  size = 36, 
  className = '', 
  showText = false,
  textVariant = 'light', // 'light' | 'dark'
  idSuffix = ''
}) {
  const pId = (id) => `${id}${idSuffix ? `-${idSuffix}` : ''}`;

  return (
    <div className={`vertex-brand-mark ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="vertex-logo-svg"
        aria-label="Vertex Horizon Emblem"
      >
        <defs>
          {/* Radiant Champagne Gold Gradient */}
          <linearGradient id={pId('vh-gold-main')} x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#b38840" />
            <stop offset="100%" stopColor="#855b1a" />
          </linearGradient>

          {/* Light Facet Gold */}
          <linearGradient id={pId('vh-gold-facet-light')} x1="16" y1="16" x2="32" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>

          {/* Dark Facet Gold */}
          <linearGradient id={pId('vh-gold-facet-dark')} x1="48" y1="16" x2="32" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="60%" stopColor="#b38840" />
            <stop offset="100%" stopColor="#6e4e13" />
          </linearGradient>

          {/* Horizon Beam Gradient */}
          <linearGradient id={pId('vh-horizon-beam')} x1="10" y1="31" x2="54" y2="31" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>

          {/* Outer Border Rim Gradient */}
          <linearGradient id={pId('vh-border-rim')} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#b38840" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.9" />
          </linearGradient>

          {/* Obsidian Base Gradient */}
          <linearGradient id={pId('vh-bg-obsidian')} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0b0f19" />
            <stop offset="100%" stopColor="#04060a" />
          </linearGradient>
        </defs>

        {/* Outer Luxury Architectural Shield */}
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="14"
          fill={`url(#${pId('vh-bg-obsidian')})`}
          stroke={`url(#${pId('vh-border-rim')})`}
          strokeWidth="1.5"
        />

        {/* Blueprint Geometric Guide Lines */}
        <line x1="8" y1="31" x2="56" y2="31" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="0.8" strokeDasharray="2 3" />
        <line x1="32" y1="8" x2="32" y2="56" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="0.8" strokeDasharray="2 3" />
        <circle cx="32" cy="31" r="18" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="0.8" strokeDasharray="3 4" />

        {/* Crown Pinnacle Diamond (Apex of the Skyscraper) */}
        <polygon
          points="32,8 37,14.5 32,21 27,14.5"
          fill={`url(#${pId('vh-gold-facet-light')})`}
        />
        <polygon
          points="32,8 37,14.5 32,21"
          fill={`url(#${pId('vh-gold-facet-dark')})`}
          opacity="0.85"
        />

        {/* Soaring Left Wing Pillar (The "V" of Vertex) */}
        <polygon
          points="14,19 21,19 32,38 32,50 28,50 14,24"
          fill={`url(#${pId('vh-gold-facet-light')})`}
        />

        {/* Soaring Right Wing Pillar */}
        <polygon
          points="50,19 43,19 32,38 32,50 36,50 50,24"
          fill={`url(#${pId('vh-gold-facet-dark')})`}
        />

        {/* Inner Apex Chevron Interlock */}
        <polygon
          points="32,24 38,34 32,42 26,34"
          fill={`url(#${pId('vh-gold-main')})`}
          opacity="0.9"
        />

        {/* The Horizon Plane (Horizontal Radiant Beam) */}
        <rect
          x="10"
          y="29.5"
          width="44"
          height="3"
          rx="1.5"
          fill={`url(#${pId('vh-horizon-beam')})`}
        />

        {/* Core Jewel Highlight (Center of the Horizon) */}
        <polygon
          points="32,27 35.5,31 32,35 28.5,31"
          fill="#ffffff"
        />

        {/* Architectural Foundation Base Plinth */}
        <line x1="22" y1="54" x2="42" y2="54" stroke={`url(#${pId('vh-gold-main')})`} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="26" y1="57" x2="38" y2="57" stroke={`url(#${pId('vh-gold-main')})`} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      </svg>

      {showText && (
        <span 
          className="vertex-logo-text"
          style={{
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
            fontSize: '1.14rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: textVariant === 'light' ? '#ffffff' : '#090e17',
            lineHeight: 1.1,
            textTransform: 'uppercase'
          }}
        >
          VERTEX HORIZON
        </span>
      )}
    </div>
  );
}
