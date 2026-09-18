import "./styles/About.css";
import { TbDatabase, TbCode, TbCertificate, TbSchool } from "react-icons/tb";

const stats = [
  { icon: TbDatabase, number: "500+", label: "SQL Queries Solved", color: "#38bdf8" },
  { icon: TbCode, number: "15+", label: "Projects & Utilities", color: "#a855f7" },
  { icon: TbCertificate, number: "3+", label: "Industry Certifications", color: "#f59e0b" },
  { icon: TbSchool, number: "2027", label: "B.Tech Grad (CSD)", color: "#10b981" },
];

const About = () => (
  <div className="about-section" id="about">
    <div className="about-me">
      <h3 className="title">About Me</h3>
      <p className="para">
        I am a B.Tech Computer Science and Design student passionate about databases, SQL, Python, and data-driven problem solving. I enjoy learning new technologies, building practical projects, and improving my technical skills through continuous practice. I am focused on strengthening my SQL and Python expertise to prepare for internships and placement opportunities in the data field.
      </p>
      <div className="about-stats-grid">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div className="about-stat-card" key={i} style={{ "--card-accent": stat.color } as React.CSSProperties}>
              <div className="about-stat-icon-wrap">
                <Icon className="about-stat-icon" />
              </div>
              <div className="about-stat-content">
                <h4>{stat.number}</h4>
                <p>{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default About;
