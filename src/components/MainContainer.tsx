import { lazy, Suspense, useEffect, useRef, useState } from "react";
import About from "./About";
import Career from "./Career";
import Certificates from "./Certificates";
import Contact from "./Contact";
import Landing from "./Landing";
import Navbar from "./Navbar";
import ResumeSection from "./ResumeSection";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { initSmoothScroll, scrollToTarget } from "./utils/smoothScroll";
import { MdKeyboardArrowUp } from "react-icons/md";
import TextFlowStream from "./TextFlowStream";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = initSmoothScroll();

    let timeoutId: ReturnType<typeof setTimeout>;
    const resizeHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSplitText();
      }, 150);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    const updateProgress = (ratio: number) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${ratio})`;
      }
    };

    let unsubscribeLenis: (() => void) | undefined;
    if (lenis) {
      const onLenisScroll = (e: { scroll: number; limit: number }) => {
        if (e.limit > 0) {
          updateProgress(Math.min(1, Math.max(0, e.scroll / e.limit)));
        }
        setShowBackToTop((prev) => {
          const next = e.scroll > 450;
          return prev !== next ? next : prev;
        });
      };
      lenis.on("scroll", onLenisScroll);
      unsubscribeLenis = () => lenis.off("scroll", onLenisScroll);
    } else {
      const handleScroll = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height > 0) {
          updateProgress(Math.min(1, Math.max(0, scrollY / height)));
        }
        setShowBackToTop((prev) => {
          const next = scrollY > 450;
          return prev !== next ? next : prev;
        });
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      unsubscribeLenis = () => window.removeEventListener("scroll", handleScroll);
    }

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "button, a, .netflix-card, .netflix-pill-btn, .netflix-play-btn, .certificate-card, .about-stat-card, .landing-social-btn, .back-to-top-btn"
      );
      if (!target) return;

      const ripple = document.createElement("span");
      ripple.className = "tactile-click-wave";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 650);
    };

    window.addEventListener("click", handleGlobalClick, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("click", handleGlobalClick);
      unsubscribeLenis?.();
    };
  }, []);

  return (
    <div className="container-main">
      <div className="global-space-bg" aria-hidden="true" />
      <div
        ref={progressBarRef}
        className="global-scroll-progress"
        style={{ transform: "scaleX(0)" }}
      />
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <TextFlowStream />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Certificates />
            <Suspense fallback={<div style={{ height: "50vh" }} />}>
              <TechStack />
            </Suspense>
            <ResumeSection />
            <Contact />
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`back-to-top-btn ${showBackToTop ? "visible" : ""}`}
        onClick={() => scrollToTarget(0, 0)}
        aria-label="Back to top"
        data-cursor="disable"
      >
        <MdKeyboardArrowUp />
      </button>
    </div>
  );
};

export default MainContainer;
