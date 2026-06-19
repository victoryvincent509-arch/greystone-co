import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function animateSectionReveal(scope, selector = '[data-animate]') {
  const elements = scope?.querySelectorAll(selector);
  if (!elements?.length) return;

  gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: elements[0],
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
}

export function animateStaggerCards(scope, selector = '[data-card]') {
  const cards = scope?.querySelectorAll(selector);
  if (!cards?.length) return;

  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: cards[0].parentElement,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}

export function animateCounter(element, endValue, options = {}) {
  const { suffix = '', prefix = '', duration = 2, decimals = 0 } = options;
  const obj = { val: 0 };

  gsap.to(obj, {
    val: endValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      const formatted = decimals > 0
        ? obj.val.toFixed(decimals)
        : Math.round(obj.val).toLocaleString('en-GB');
      element.textContent = `${prefix}${formatted}${suffix}`;
    },
  });
}

export function setupParallax(element, speed = 0.4) {
  if (!element) return;

  const wrapper = element.parentElement;
  if (!wrapper) return;

  gsap.fromTo(
    element,
    { y: () => -(wrapper.offsetHeight * speed) },
    {
      y: () => wrapper.offsetHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  );
}

export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

export function pageTransitionIn(overlay) {
  return gsap.timeline()
    .to(overlay, { y: 0, duration: 0.5, ease: 'power3.inOut' });
}

export function pageTransitionOut(overlay) {
  return gsap.timeline()
    .to(overlay, { y: '-100%', duration: 0.5, ease: 'power3.inOut', delay: 0.1 });
}

export function animatePageEnter(scope) {
  return gsap.fromTo(
    scope,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 }
  );
}
