import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface WorkProject {
  name: string;
  category: string;
  description: string;
  tech: string;
  link?: string;
  webpage?: string;
  video?: string;
  image?: string;
}

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Scroll progress bar
  timeline.to(".work-scroll-progress", {
    scaleX: 1,
    ease: "none",
  }, 0);

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);

  const handleBtnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const wave = document.createElement("span");
    wave.className = "btn-click-wave";
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    el.appendChild(wave);
    setTimeout(() => {
      wave.remove();
    }, 600);
  };

  return (
    <div className="work-section" id="work">
      <div className="work-scroll-track">
        <div className="work-scroll-progress" />
      </div>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {([
            {
              name: "AI Resume Analyzer",
              category: "AI-powered resume analysis application",
              description:
                "Evaluates resumes, calculates ATS compatibility scores, extracts skills, identifies skill gaps, and gives personalized suggestions to improve job applications.",
              tech: "Python, PostgreSQL, React, FastAPI, AI/NLP",
              link: "https://github.com/yashpatil7313/AI_Resume_Analyzer",
              image: "/images/placeholder.webp",
            },
            {
              name: "Retail Sales Analysis using SQL",
              category: "Data analysis project",
              description:
                "Analyzed retail sales data with SQL queries to clean data and generate useful business insights.",
              tech: "SQL, MySQL",
              link: "https://github.com/yashpatil7313/SQL_Retail_Sales_Analysis-Project",
              image: "/images/placeholder.webp",
            },
          ] as WorkProject[]).map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                {project.description && <p>{project.description}</p>}
                <h4>Tools and features</h4>
                <div className="work-tech-pills">
                  {project.tech.split(",").map((t, tIdx) => (
                    <span className="work-tech-tag" key={tIdx}>{t.trim()}</span>
                  ))}
                </div>
                {"link" in project && project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="disable"
                    className="work-project-link"
                    onClick={handleBtnClick}
                  >
                    View GitHub
                  </a>
                )}
                {"webpage" in project && project.webpage && (
                  <a
                    href={project.webpage}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="disable"
                    className="work-project-link"
                    onClick={handleBtnClick}
                  >
                    View Webpage
                  </a>
                )}
              </div>
              <WorkImage
                image={"image" in project && project.image ? project.image : "/images/placeholder.webp"}
                alt={project.name}
                video={"video" in project ? project.video : undefined}
                link={"webpage" in project ? project.webpage : "link" in project ? project.link : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
