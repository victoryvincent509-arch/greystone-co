let lenisInstance = null;

export function setLenisInstance(lenis) {
  lenisInstance = lenis;
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}
