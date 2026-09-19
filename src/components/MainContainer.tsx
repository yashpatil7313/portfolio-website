import { lazy, PropsWithChildren, Suspense, useEffect, useRef, useState } from "react";
import About from "./About";
import Career from "./Career";
import Certificates from "./Certificates";
import Contact from "./Contact";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { initSmoothScroll, scrollToTarget } from "./utils/smoothScroll";
import { MdKeyboardArrowUp } from "react-icons/md";
import TextFlowStream from "./TextFlowStream";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
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

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeHandler);
      unsubscribeLenis?.();
    };
  }, []);

  return (
    <div className="container-main">
      <div
        ref={progressBarRef}
        className="global-scroll-progress"
        style={{ transform: "scaleX(0)" }}
      />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{children}</Landing>
            <TextFlowStream />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Certificates />
            <Suspense fallback={<div style={{ height: "50vh" }} />}>
              <TechStack />
            </Suspense>
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
