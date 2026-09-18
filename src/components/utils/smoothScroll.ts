import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    autoRaf: true,
    lerp: 0.085,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.0,
    smoothWheel: true,
    syncTouch: false,
  });

  lenisInstance.on("scroll", ScrollTrigger.update);

  // Expose global instance for debugging / access
  (window as unknown as { lenis: Lenis }).lenis = lenisInstance;

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function stopSmoothScroll() {
  lenisInstance?.stop();
}

export function startSmoothScroll() {
  lenisInstance?.start();
}

export function scrollToTarget(target: number | string | HTMLElement, offset?: number) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const resolvedOffset = offset !== undefined ? offset : (isMobile ? -70 : -30);

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: resolvedOffset,
      duration: isMobile ? 1.0 : 1.3,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) {
        const topPos = (el as HTMLElement).getBoundingClientRect().top + window.pageYOffset + resolvedOffset;
        window.scrollTo({ top: Math.max(0, topPos), behavior: "smooth" });
      }
    }
  }

  // Trigger gentle arrival glow shimmer on target element
  if (typeof target === "string" && target.startsWith("#")) {
    const el = document.querySelector(target) as HTMLElement | null;
    if (el) {
      el.classList.remove("section-arrival-pulse");
      void el.offsetWidth; // trigger reflow
      el.classList.add("section-arrival-pulse");
      setTimeout(() => {
        el.classList.remove("section-arrival-pulse");
      }, 1600);
    }
  }
}
