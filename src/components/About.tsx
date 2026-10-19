import "./styles/About.css";
import { TbDatabase, TbCode, TbCertificate, TbSchool } from "react-icons/tb";

const stats = [
  { icon: TbDatabase, number: "ETL & Spark", label: "Pipelines & Warehousing", color: "#38bdf8" },
  { icon: TbCode, number: "Python & SQL", label: "Relational & Big Data", color: "#60a5fa" },
  { icon: TbCertificate, number: "5+", label: "Industry Certifications", color: "#0ea5e9" },
  { icon: TbSchool, number: "2023 – 2027", label: "B.E. Computer Science & Design", color: "#2563eb" },
];

const About = () => (
  <div className="about-section" id="about">
    <div className="about-me">
      <h3 className="title">About Me</h3>
      <p className="para">
        Aspiring <span className="about-highlight">Data Engineer</span> and <span className="about-highlight">Computer Science &amp; Design</span> undergraduate with strong foundations in <span className="about-highlight">SQL, Python, Data Warehousing</span>, and <span className="about-highlight">Big Data technologies</span>. Hands-on experience in building ETL pipelines, implementing incremental data loading processes, designing relational database schemas, and processing large datasets using Apache Spark and Spark SQL. Passionate about developing scalable data solutions and leveraging data engineering principles to solve real-world business problems.
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
