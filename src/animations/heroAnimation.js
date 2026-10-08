import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PHASES = [
  { progress: 0.0, label: 'PHASE 01 // WIREFRAME BLUEPRINT', desc: 'Glowing vector architectural wireframe lines over twilight city' },
  { progress: 0.18, label: 'PHASE 02 // SUBSTRUCTURE & PODIUM', desc: 'Ground-level structural columns and foundation podium take form' },
  { progress: 0.38, label: 'PHASE 03 // FLOOR SLABS & ELEVATION', desc: 'Vertical core reinforcement rising through 24 structural levels' },
  { progress: 0.58, label: 'PHASE 04 // DOUBLE-GLAZED CURTAIN WALL', desc: 'High-performance acoustic glass envelopes the architectural envelope' },
  { progress: 0.78, label: 'PHASE 05 // AMBER INTERIOR ILLUMINATION', desc: 'Warm hospitality cove lights and penthouse atriums illuminate' },
  { progress: 0.95, label: 'PHASE 06 // MONUMENTAL LANDMARK COMPLETE', desc: 'The realized glass tower commands the Hyderabad skyline' },
];

export function getPhaseInfo(progress) {
  for (let i = PHASES.length - 1; i >= 0; i--) {
    if (progress >= PHASES[i].progress) {
      return PHASES[i];
    }
  }
  return PHASES[0];
}

/**
 * Connect hero scroll to frame scrubbing and HUD updates
 */
export function initHeroScrollTrigger({
  triggerEl,
  onProgressUpdate,
  endDistance = '+=2400',
}) {
  if (!triggerEl) return null;

  const st = ScrollTrigger.create({
    trigger: triggerEl,
    start: 'top top',
    end: endDistance,
    pin: true,
    scrub: 0.4,
    anticipatePin: 1,
    onUpdate: (self) => {
      if (onProgressUpdate) {
        onProgressUpdate(self.progress);
      }
    },
  });

  return st;
}
