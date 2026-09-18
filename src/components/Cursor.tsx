import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run cursor on pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const wrapper = wrapperRef.current;
    if (!dot || !ring || !wrapper) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.classList.remove("cursor-hidden");
        ring.classList.remove("cursor-hidden");
        ringX = mouseX;
        ringY = mouseY;
      }

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.classList.add("cursor-hidden");
      ring.classList.add("cursor-hidden");
    };

    const loop = () => {
      if (isVisible) {
        const ease = 0.16;
        ringX += (mouseX - ringX) * ease;
        ringY += (mouseY - ringY) * ease;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(loop);

    // Hover state management
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const card = target.closest(".certificate-card, .work-box, .what-content");
      if (card) {
        ring.classList.add("cursor-card");
        dot.classList.add("cursor-hover");
        return;
      }

      const interactive = target.closest("a, button, .theme-toggle, .what-tags, [data-cursor]");
      if (interactive) {
        ring.classList.add("cursor-hover");
        dot.classList.add("cursor-hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const card = target.closest(".certificate-card, .work-box, .what-content");
      const interactive = target.closest("a, button, .theme-toggle, .what-tags, [data-cursor]");

      if (card || interactive) {
        ring.classList.remove("cursor-hover", "cursor-card");
        dot.classList.remove("cursor-hover");
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="cursor-wrapper" ref={wrapperRef}>
      <div className="cursor-dot cursor-hidden" ref={dotRef} />
      <div className="cursor-ring cursor-hidden" ref={ringRef} />
    </div>
  );
};

export default Cursor;
