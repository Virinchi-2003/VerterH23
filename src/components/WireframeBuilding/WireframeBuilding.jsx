import React, { useEffect, useRef, useState } from 'react';
import './WireframeBuilding.css';

export default function WireframeBuilding({ 
  isMobile = false,
  isPlaying = true,
  onTogglePlay = null
}) {
  const videoRef = useRef(null);
  const trailsCanvasRef = useRef(null);

  const [internalPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const activePlaying = onTogglePlay ? isPlaying : internalPlaying;

  // Sync video play state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activePlaying) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Mobile autoplay fallback on first user gesture
          const handleFirstInteraction = () => {
            if (video && video.paused) {
              video.muted = true;
              video.play().catch(() => {});
            }
          };
          window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
          window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
        });
      }
    } else {
      video.pause();
    }
  }, [activePlaying]);

  // Road Light Trails Animation (Lower Boulevard)
  useEffect(() => {
    const canvas = trailsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const streaks = [
      { x: 0, speed: 3.8, len: 120, yPct: 0.93, color: 'rgba(239, 68, 68, 0.9)', width: 3 },
      { x: 180, speed: 4.8, len: 160, yPct: 0.945, color: 'rgba(249, 115, 22, 0.95)', width: 3.5 },
      { x: 380, speed: 3.2, len: 100, yPct: 0.92, color: 'rgba(239, 68, 68, 0.8)', width: 2.5 },
      { x: 120, speed: -4.2, len: 150, yPct: 0.96, color: 'rgba(255, 240, 200, 0.95)', width: 3 },
      { x: 320, speed: -5.2, len: 190, yPct: 0.975, color: 'rgba(255, 255, 255, 0.98)', width: 3.5 },
    ];

    const renderTrails = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      streaks.forEach((st) => {
        st.x += st.speed;
        if (st.speed > 0 && st.x - st.len > w) st.x = -st.len;
        else if (st.speed < 0 && st.x + st.len < 0) st.x = w + st.len;

        const y = h * st.yPct;
        const grad = ctx.createLinearGradient(st.x - st.len, y, st.x, y);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(0.7, st.color);
        grad.addColorStop(1, '#ffffff');

        ctx.strokeStyle = grad;
        ctx.lineWidth = st.width * (window.devicePixelRatio > 1 ? 1.4 : 1);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(st.x - st.len, y);
        ctx.lineTo(st.x, y);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(renderTrails);
    };

    renderTrails();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className={`half-page-building-showcase ${isMobile ? 'is-mobile-view' : ''}`}>
      {/* Completely STABLE Video Showcase Stage - NO tilt, NO cursor movement */}
      <div className="stable-building-stage">
        {/* Main 4K Video Viewport */}
        <div className="building-media-container">
          <video
            ref={videoRef}
            className="stable-4k-video"
            src="/videos/hero_building_4k_loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            onLoadedData={() => setIsLoaded(true)}
          />

          {!isLoaded && (
            <img 
              src="/frames/frame_00.webp" 
              alt="Architectural Blueprint Frame" 
              className="building-loading-placeholder"
            />
          )}

          {/* Road Traffic Light Trails Canvas */}
          <canvas ref={trailsCanvasRef} className="building-trails-canvas" />

          {/* Mobile Video Gradient Scrim & Color Blend (Active on Mobile Background) */}
          <div className="video-mobile-scrim" />

          {/* Multi-Layer Seamless Gradient Blend Overlays (Mixes with landing page like Image 2) */}
          <div className="video-blend-overlay-left" />
          <div className="video-blend-overlay-bottom" />
          <div className="video-blend-overlay-top" />
          <div className="video-blend-overlay-right" />
          <div className="video-ambient-glow-tint" />
        </div>
      </div>
    </div>
  );
}
