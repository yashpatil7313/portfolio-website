import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Certificates from "./Certificates";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { initSmoothScroll, scrollToTarget } from "./utils/smoothScroll";
import { MdKeyboardArrowUp } from "react-icons/md";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    initSmoothScroll();

    let timeoutId: ReturnType<typeof setTimeout>;
    const resizeHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSplitText();
      }, 150);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((scrollY / height) * 100);
      }
      setShowBackToTop(scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container-main">
      <div
        className="global-scroll-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{children}</Landing>
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
        onClick={() => scrollToTarget("#landingDiv", 0)}
        aria-label="Back to top"
        data-cursor="disable"
      >
        <MdKeyboardArrowUp />
      </button>
    </div>
  );
};

export default MainContainer;
