import { useEffect, useState, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { MdDarkMode, MdLightMode } from "react-icons/md";
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

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToTarget(`#${id}`, -60);
  }, []);

  const handleTitleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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
      <div className={`header ${isScrolled ? "header-scrolled" : ""}`}>
        <a
          href="/#"
          className="navbar-title"
          data-cursor="disable"
          onClick={handleTitleClick}
        >
          YP
        </a>
        <ul>
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
      </div>

      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
