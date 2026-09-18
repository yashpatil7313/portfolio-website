import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const wrapper = wrapperRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;

    // Helper: spawn silky click ripple & micro-sparks
    const spawnClickRipple = (x: number, y: number) => {
      if (!wrapper) return;
      const ripple = document.createElement("div");
      ripple.className = "click-ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      const wave = document.createElement("span");
      wave.className = "ripple-wave";
      ripple.appendChild(wave);

      const ringWave = document.createElement("span");
      ringWave.className = "ripple-ring-wave";
      ripple.appendChild(ringWave);

      for (let i = 0; i < 4; i++) {
        const spark = document.createElement("span");
        spark.className = `ripple-spark spark-${i + 1}`;
        ripple.appendChild(spark);
      }

      wrapper.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 700);
    };

    // Global click listener for ripple effects (works on both mouse & touch)
    const handleGlobalPointerDown = (e: PointerEvent) => {
      spawnClickRipple(e.clientX, e.clientY);
      if (!isCoarse && ring && dot) {
        ring.classList.add("cursor-clicking");
        dot.classList.add("cursor-clicking");
      }
    };

    const handleGlobalPointerUp = () => {
      if (!isCoarse && ring && dot) {
        ring.classList.remove("cursor-clicking");
        dot.classList.remove("cursor-clicking");
        ring.classList.remove("cursor-release-pop");
        void ring.offsetWidth; // force reflow
        ring.classList.add("cursor-release-pop");
        setTimeout(() => {
          ring.classList.remove("cursor-release-pop");
        }, 400);
      }
    };

    window.addEventListener("pointerdown", handleGlobalPointerDown, { passive: true });
    window.addEventListener("pointerup", handleGlobalPointerUp, { passive: true });

    // If touchscreen only, don't run custom mouse follower
    if (isCoarse || !dot || !ring) {
      return () => {
        window.removeEventListener("pointerdown", handleGlobalPointerDown);
        window.removeEventListener("pointerup", handleGlobalPointerUp);
      };
    }

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

      const card = target.closest(".certificate-card, .work-box, .what-content, .metric-card");
      if (card) {
        ring.classList.add("cursor-card");
        dot.classList.add("cursor-hover");
        return;
      }

      const interactive = target.closest("a, button, .theme-toggle, .what-tags, .work-tech-tag, [data-cursor]");
      if (interactive) {
        ring.classList.add("cursor-hover");
        dot.classList.add("cursor-hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const card = target.closest(".certificate-card, .work-box, .what-content, .metric-card");
      const interactive = target.closest("a, button, .theme-toggle, .what-tags, .work-tech-tag, [data-cursor]");

      if (card || interactive) {
        ring.classList.remove("cursor-hover", "cursor-card");
        dot.classList.remove("cursor-hover");
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointerdown", handleGlobalPointerDown);
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="cursor-wrapper" ref={wrapperRef}>
      <div className="cursor-dot cursor-hidden" ref={dotRef}>
        <span className="cursor-dot-core" />
      </div>
      <div className="cursor-ring cursor-hidden" ref={ringRef}>
        <span className="cursor-ring-core" />
      </div>
    </div>
  );
};

export default Cursor;
