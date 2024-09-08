const isMobile = window.innerWidth < 768;

const fadeIn = !isMobile
  ? {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { delay: 0.4 },
  }
  : {};

  const fadeInLeft = !isMobile
  ? {
    initial: { opacity: 0, x: "50%" },
    whileInView: { opacity: 1, x: "0" },
    viewport: { once: true },
    transition: { ease: "circOut", duration: 1 },
  }
  : {};

  const zoomIn = !isMobile
  ? {
    initial: { opacity: 0, scale: 0.3 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
  }
  : {};

  export {fadeIn, fadeInLeft, zoomIn}
