import gsap from 'gsap';

export function openModalAnimation(overlayEl, modalEl) {
  if (!overlayEl || !modalEl) return;
  gsap.fromTo(
    overlayEl,
    { opacity: 0 },
    { opacity: 1, duration: 0.35, ease: 'power2.out' }
  );
  gsap.fromTo(
    modalEl,
    { opacity: 0, y: 30, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }
  );
}

export function closeModalAnimation(overlayEl, modalEl, onComplete) {
  if (!overlayEl || !modalEl) {
    if (onComplete) onComplete();
    return;
  }
  gsap.to(modalEl, { opacity: 0, y: 20, scale: 0.96, duration: 0.25, ease: 'power2.in' });
  gsap.to(overlayEl, {
    opacity: 0,
    duration: 0.25,
    ease: 'power2.in',
    onComplete,
  });
}
