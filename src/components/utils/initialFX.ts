import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  smoother.paused(false);
  const main = document.getElementsByTagName("main")[0];
  if (main) main.classList.add("main-active");

  // 1. Navigation Header Drops In
  gsap.fromTo(
    ".header",
    { opacity: 0, y: -35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
    }
  );

  // 2. Hero Centerpiece (SQL Developer Cosmic Loop) Expands & Blooms in
  gsap.fromTo(
    ".landing-infinity-graphic",
    { opacity: 0, scale: 0.82, filter: "blur(14px)" },
    {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.4,
      ease: "power3.out",
      delay: 0.15,
    }
  );

  // 3. Left Intro Profile Card Glides in from Left with Soft Spring
  gsap.fromTo(
    ".landing-intro",
    { opacity: 0, x: -60, filter: "blur(8px)" },
    {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2,
    }
  );

  // 4. Text Flow Stream Fades in
  gsap.fromTo(
    ".text-flow-stream-wrap",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "power2.out",
      delay: 0.45,
    }
  );
}
