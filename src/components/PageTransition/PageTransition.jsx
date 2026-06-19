import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, pageTransitionIn, pageTransitionOut, animatePageEnter } from '../../utils/animations';

export default function PageTransition({ children }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
      }
      return;
    }

    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    const tl = gsap.timeline();

    tl.add(pageTransitionIn(overlay))
      .add(() => {
        gsap.set(content, { opacity: 0, y: 30 });
      })
      .add(pageTransitionOut(overlay))
      .add(animatePageEnter(content));

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <>
      <div ref={overlayRef} className="page-transition-overlay" />
      <div ref={contentRef}>{children}</div>
    </>
  );
}
