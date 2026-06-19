import { useRef, useCallback } from 'react';

export function useMagneticButton(strength = 8) {
  const btnRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0, 0)';
  }, []);

  return { btnRef, handleMouseMove, handleMouseLeave, strength };
}
