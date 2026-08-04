import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

export const smoother = { paused: (_v: boolean) => {} };

const Navbar = () => {
  const [isLightTheme, setIsLightTheme] = useState(() =>
    localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = isLightTheme ? "light" : "dark";
    localStorage.setItem("theme", isLightTheme ? "light" : "dark");
  }, [isLightTheme]);

  useEffect(() => {
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          const href = element.getAttribute("data-href");
          if (href && href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          YP
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#certificates" href="#certificates">
              <HoverLinks text="CERTIFICATES" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
        <button
          className="theme-toggle"
          type="button"
          aria-label={isLightTheme ? "Switch to dark mode" : "Switch to light mode"}
          title={isLightTheme ? "Dark mode" : "Light mode"}
          onClick={() => setIsLightTheme((current) => !current)}
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
