import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate section fade-in and upward slide
 */
export function initSectionReveal(element, triggerElement = null) {
  if (!element) return null;
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerElement || element,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Setup horizontal property showcase cards driven by vertical scroll
 */
export function initHorizontalShowcase(sectionEl, trackEl) {
  if (!sectionEl || !trackEl) return null;

  // On mobile screens (<768px), horizontal scroll via touch is more intuitive and prevents pin trapping
  if (window.innerWidth < 768) {
    return null;
  }

  const getScrollAmount = () => {
    return -(trackEl.scrollWidth - window.innerWidth + 120);
  };

  const tween = gsap.to(trackEl, {
    x: getScrollAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top top',
      end: () => `+=${trackEl.scrollWidth - window.innerWidth + 400}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  return tween;
}

/**
 * Counter animation for statistics
 */
export function initStatCounter(element, targetValue, duration = 2.2, isYear = false) {
  if (!element) return null;
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: targetValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      if (isYear) {
        element.innerText = Math.floor(obj.val).toString();
      } else {
        element.innerText = Number.isInteger(targetValue)
          ? Math.floor(obj.val).toLocaleString()
          : obj.val.toFixed(1);
      }
    },
  });
}
