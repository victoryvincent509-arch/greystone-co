import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../utils/animations';
import { setLenisInstance } from '../utils/scroll';

export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenisInstance(null);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);
}
