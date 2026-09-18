import { useEffect, useState, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { MdDarkMode, MdLightMode, MdMenu, MdClose } from "react-icons/md";
import { TbDownload } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import { scrollToTarget } from "./utils/smoothScroll";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

export const smoother = { paused: (_v: boolean) => {} };

const NAV_ITEMS = [
  { id: "about", label: "ABOUT" },
  { id: "work", label: "WORK" },
  { id: "certificates", label: "CERTIFICATES" },
  { id: "contact", label: "CONTACT" },
];

const Navbar = () => {
  const [isLightTheme, setIsLightTheme] = useState(() =>
    localStorage.getItem("theme") === "light"
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = isLightTheme ? "light" : "dark";
    localStorage.setItem("theme", isLightTheme ? "light" : "dark");
  }, [isLightTheme]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Detect active section based on scroll position
      const triggerPos = scrollY + 280;
      let current = "";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (triggerPos >= top && triggerPos < top + height) {
            current = item.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollToTarget(`#${id}`, -60);
  }, []);

  const handleTitleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollToTarget(0, 0);
  }, []);

  const [isThemeRotating, setIsThemeRotating] = useState(false);

  const handleToggleTheme = useCallback(() => {
    setIsThemeRotating(true);
    setIsLightTheme((current) => !current);
    setTimeout(() => setIsThemeRotating(false), 650);
  }, []);

  return (
    <>
      <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
        <a
          href="/#"
          className="navbar-title"
          data-cursor="disable"
          onClick={handleTitleClick}
        >
          YP
        </a>

        {/* Desktop navigation */}
        <ul className="desktop-nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                data-href={`#${item.id}`}
                href={`#${item.id}`}
                className={activeSection === item.id ? "active-nav-item" : ""}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                <HoverLinks text={item.label} />
              </a>
            </li>
          ))}
        </ul>

        <div className="header-actions">
          <button
            className={`theme-toggle ${isThemeRotating ? "theme-rotating" : ""}`}
            type="button"
            aria-label={isLightTheme ? "Switch to dark mode" : "Switch to light mode"}
            title={isLightTheme ? "Dark mode" : "Light mode"}
            onClick={handleToggleTheme}
            data-cursor="disable"
          >
            {isLightTheme ? <MdDarkMode /> : <MdLightMode />}
          </button>

          {/* Mobile hamburger button */}
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            data-cursor="disable"
          >
            {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </header>

      {/* Mobile Sliding Glass Drawer */}
      <div
        className={`mobile-drawer-backdrop ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-brand">YP · Yash Patil</span>
          <button
            className="mobile-drawer-close"
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <MdClose />
          </button>
        </div>

        <ul className="mobile-nav-list">
          {NAV_ITEMS.map((item, idx) => (
            <li key={item.id} style={{ animationDelay: `${idx * 0.06}s` }}>
              <a
                href={`#${item.id}`}
                className={`mobile-nav-item ${activeSection === item.id ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                <span className="mobile-nav-num">0{idx + 1}</span>
                <span className="mobile-nav-text">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-drawer-footer">
          <a
            href="/Yash_Patil_Resume.docx"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-drawer-resume"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <TbDownload /> Download Resume
          </a>
          <div className="mobile-drawer-meta">
            <span>CSD '27 · Data Engineer</span>
          </div>
        </div>
      </nav>

      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;

