document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // Parallax Layers
  document
    .querySelectorAll("[data-parallax-layers]")
    .forEach((triggerElement) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0
        }
      });
      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 }
      ];
      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(
            `[data-parallax-layer="${layerObj.layer}"]`
          ),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    });

  // Scroll-based SVG rotation
  const svgElement = document.querySelector(".osmo-icon-svg");

  window.addEventListener("scroll", () => {
    // Get the scroll position
    const scrollPosition = window.scrollY;

    // Calculate rotation based on scroll position
    const rotation = scrollPosition % 360; // Keeps the rotation within 360 degrees

    // Apply rotation to the SVG
    svgElement.style.transform = `rotate(${rotation}deg)`;
  });
});

/* Lenis */
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
