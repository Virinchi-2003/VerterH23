import React, { useEffect, useRef, useState, useCallback } from 'react';
import './WireframeBuilding.css';

export default function WireframeBuilding({ 
  isMobile = false,
  isPlaying = true,
  onTogglePlay = null,
  playbackSpeed = 1.5,
  onSpeedChange = null
}) {
  const videoRef = useRef(null);
  const trailsCanvasRef = useRef(null);

  const [internalPlaying, setInternalPlaying] = useState(true);
  const [internalSpeed, setInternalSpeed] = useState(1.5);
  const [isLoaded, setIsLoaded] = useState(false);

  const activePlaying = onTogglePlay ? isPlaying : internalPlaying;
  const activeSpeed = (onSpeedChange && playbackSpeed !== undefined) ? playbackSpeed : internalSpeed;

  const enforcePlaybackRate = useCallback((rate) => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.defaultPlaybackRate = rate;
      if (video.playbackRate !== rate) {
        video.playbackRate = rate;
      }
    } catch {
      // Safe fallback for strict browser sandboxes
    }
  }, []);

  const handleSelectSpeed = (newSpeed) => {
    if (onSpeedChange) {
      onSpeedChange(newSpeed);
    } else {
      setInternalSpeed(newSpeed);
    }
    enforcePlaybackRate(newSpeed);
  };

  const handleTogglePlay = () => {
    if (onTogglePlay) {
      onTogglePlay();
    } else {
      setInternalPlaying(prev => !prev);
    }
  };

  // Sync video play state and speed rate
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    enforcePlaybackRate(activeSpeed);

    if (activePlaying) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            enforcePlaybackRate(activeSpeed);
          })
          .catch(() => {
            // Mobile autoplay fallback on first user gesture
            const handleFirstInteraction = () => {
              if (video) {
                video.muted = true;
                enforcePlaybackRate(activeSpeed);
                if (video.paused) {
                  video.play()
                    .then(() => enforcePlaybackRate(activeSpeed))
                    .catch(() => {});
                }
              }
            };
            window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
            window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
          });
      }
    } else {
      video.pause();
    }
  }, [activePlaying, activeSpeed, enforcePlaybackRate]);

  // Road Light Trails Animation (Lower Boulevard) synchronized with playback speed
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

      const speedMult = activePlaying ? activeSpeed : 0;

      streaks.forEach((st) => {
        st.x += st.speed * speedMult;
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
  }, [activePlaying, activeSpeed]);

  return (
    <div className={`half-page-building-showcase ${isMobile ? 'is-mobile-view' : ''}`}>
      {/* Completely STABLE Video Showcase Stage */}
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
            onLoadedMetadata={() => enforcePlaybackRate(activeSpeed)}
            onLoadedData={() => {
              enforcePlaybackRate(activeSpeed);
              setIsLoaded(true);
            }}
            onCanPlay={() => enforcePlaybackRate(activeSpeed)}
            onPlay={() => enforcePlaybackRate(activeSpeed)}
            onPlaying={() => enforcePlaybackRate(activeSpeed)}
            onRateChange={(e) => {
              // Critical: prevent mobile browser or loop restart from resetting rate to 1.0
              if (e.currentTarget.playbackRate !== activeSpeed) {
                e.currentTarget.playbackRate = activeSpeed;
              }
            }}
            onTimeUpdate={(e) => {
              // Extra safeguard against loop resets
              if (e.currentTarget.playbackRate !== activeSpeed) {
                e.currentTarget.playbackRate = activeSpeed;
              }
            }}
            onSeeked={() => enforcePlaybackRate(activeSpeed)}
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

          {/* Multi-Layer Seamless Gradient Blend Overlays */}
          <div className="video-blend-overlay-left" />
          <div className="video-blend-overlay-bottom" />
          <div className="video-blend-overlay-top" />
          <div className="video-blend-overlay-right" />
          <div className="video-ambient-glow-tint" />

          {/* Cinematic Speed & Playback Controls HUD */}
          <div 
            className="building-video-controls" 
            role="toolbar" 
            aria-label="Cinematic Video Speed and Playback Controls"
          >
            <button
              type="button"
              className="bvc-btn bvc-play-btn"
              onClick={handleTogglePlay}
              aria-label={activePlaying ? 'Pause cinematic showcase' : 'Play cinematic showcase'}
              title={activePlaying ? 'Pause Video' : 'Play Video'}
            >
              {activePlaying ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1.5" />
                  <rect x="14" y="4" width="4" height="16" rx="1.5" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              )}
            </button>

            <div className="bvc-divider" />

            <div className="bvc-speed-group">
              <div className="bvc-speed-badge">
                <span className="bvc-pulse-dot" />
                <span className="bvc-speed-label">SPEED</span>
              </div>

              <div className="bvc-speed-pills">
                {[1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    className={`bvc-rate-pill ${activeSpeed === rate ? 'is-active' : ''}`}
                    onClick={() => handleSelectSpeed(rate)}
                    aria-pressed={activeSpeed === rate}
                    aria-label={`Set speed to ${rate}x`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
