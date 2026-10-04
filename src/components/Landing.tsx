import { useEffect, useState } from "react";
import "./styles/Landing.css";
import { useLoading } from "../context/LoadingProvider";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

function useTypingEffect(text: string, delay: number, speed: number, enabled: boolean) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!enabled) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, speed, enabled]);
  return displayed;
}

const Landing = () => {
  const { isLoading } = useLoading();
  const name = useTypingEffect("YASH PATIL", 1500, 120, !isLoading);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          {/* Left Intro Card: Profile, Name, Socials, Class Badge */}
          <div className="landing-intro">
            <div className="landing-profile-wrap">
              <img
                className="landing-profile-photo"
                src="/images/yash-patil-profile.jpeg"
                alt="Yash Patil"
              />
              <div className="landing-profile-ring"></div>
            </div>
            <h2>Hello! I'm</h2>
            <h1 className="landing-typed-name" aria-label="Yash Patil">
              {name}<span className="typing-cursor">|</span>
            </h1>
            <div className="landing-social-links">
              <a
                href="https://github.com/yashpatil7313"
                target="_blank"
                rel="noreferrer"
                className="landing-social-btn"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/yashpatil7313"
                target="_blank"
                rel="noreferrer"
                className="landing-social-btn"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedinIn />
              </a>
            </div>
            <div className="landing-status-badge">
              <span className="landing-status-dot"></span>
              <span>CST Class of 2027</span>
            </div>
          </div>

          {/* Center Cosmic Infinity Graphic: SQL DEVELOPER & Particle Sphere */}
          <div className="landing-infinity-wrap">
            <img
              src="/images/sql-developer-infinity-clean.png"
              alt="SQL Developer Cosmic Infinity Loop"
              className="landing-infinity-graphic"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
