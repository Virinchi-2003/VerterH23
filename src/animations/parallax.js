// 2.5D Subtle Mouse and Gyroscope Parallax Controller

export function initParallax(containerRef, layers = []) {
  if (!containerRef || typeof window === 'undefined') return () => {};

  // Don't bind mouse parallax on touch/mobile devices for 60fps performance
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch || window.innerWidth < 768) {
    return () => {};
  }

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let animationFrameId = null;

  const handleMouseMove = (e) => {
    const rect = containerRef.getBoundingClientRect();
    // Normalize coordinates (-1 to 1) from container center
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX = Math.max(-1, Math.min(1, x));
    mouseY = Math.max(-1, Math.min(1, y));
  };

  const handleMouseLeave = () => {
    mouseX = 0;
    mouseY = 0;
  };

  const renderLoop = () => {
    // Smooth lerp (0.06 factor for luxury heavyweight feel)
    currentX += (mouseX - currentX) * 0.06;
    currentY += (mouseY - currentY) * 0.06;

    layers.forEach(({ el, depth = 10, rotate = 0 }) => {
      if (!el) return;
      const moveX = currentX * depth;
      const moveY = currentY * depth;
      const rotY = currentX * rotate;
      const rotX = -currentY * rotate;
      el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    animationFrameId = requestAnimationFrame(renderLoop);
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  containerRef.addEventListener('mouseleave', handleMouseLeave);
  animationFrameId = requestAnimationFrame(renderLoop);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    containerRef.removeEventListener('mouseleave', handleMouseLeave);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };
}
