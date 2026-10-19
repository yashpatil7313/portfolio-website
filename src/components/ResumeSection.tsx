import { useRef, useEffect } from "react";
import { TbDownload, TbFileDescription, TbExternalLink } from "react-icons/tb";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/ResumeSection.css";

gsap.registerPlugin(ScrollTrigger);

const ResumeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section className="resume-section" id="resume" ref={sectionRef}>
      <div className="resume-container section-container">
        {/* Section Header */}
        <div className="resume-header-wrap">
          <div className="resume-header-text">
            <span className="resume-section-kicker">✦ CURRICULUM VITAE</span>
            <h2 className="title">
              Official <span>Resume</span>
            </h2>
            <p className="resume-section-desc">
              Verified academic records, data engineering background, relational database projects, and technical skills.
            </p>
          </div>

          {/* Download & View Actions */}
          <div className="resume-actions-bar">
            <a
              href="/Yash_Patil_Resume.pdf"
              download="Yash_Rajendra_Patil_Resume.pdf"
              className="resume-action-btn primary"
              title="Download ATS-Friendly PDF Resume"
            >
              <TbDownload className="btn-icon" />
              <span>Download PDF</span>
            </a>

            <a
              href="/Yash_Patil_Resume.docx"
              download="Yash_Rajendra_Patil_Resume.docx"
              className="resume-action-btn secondary"
              title="Download Word Document Version"
            >
              <TbFileDescription className="btn-icon" />
              <span>Download Word (DOCX)</span>
            </a>

            <a
              href="/Yash_Patil_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-action-btn outline"
              title="Open PDF in new tab"
            >
              <TbExternalLink className="btn-icon" />
              <span>Open in New Tab</span>
            </a>
          </div>
        </div>

        {/* The Exact Resume Sheet */}
        <div className="resume-sheet-card" ref={cardRef}>
          {/* Subtle Grid Pattern Overlay */}
          <div className="resume-sheet-grid" aria-hidden="true" />

          {/* Resume Header */}
          <header className="resume-doc-header">
            <h1 className="resume-doc-name">Yash Rajendra Patil</h1>
            <div className="resume-doc-contact">
              <span>📍 Maharashtra, India</span>
              <span className="contact-sep">•</span>
              <span>📞 +91 9359307313</span>
              <span className="contact-sep">•</span>
              <a href="mailto:yashrspatil7313@gmail.com" className="resume-doc-link">
                ✉️ yashrspatil7313@gmail.com
              </a>
              <span className="contact-sep">•</span>
              <a
                href="https://www.linkedin.com/in/yash-patil-468276352/"
                target="_blank"
                rel="noreferrer"
                className="resume-doc-link"
              >
                <FaLinkedinIn /> LinkedIn
              </a>
              <span className="contact-sep">•</span>
              <a
                href="https://github.com/yashpatil7313"
                target="_blank"
                rel="noreferrer"
                className="resume-doc-link"
              >
                <FaGithub /> GitHub
              </a>
            </div>
          </header>

          {/* Professional Summary */}
          <div className="resume-doc-section">
            <h3 className="resume-doc-title">Professional Summary</h3>
            <p className="resume-doc-summary">
              Aspiring Data Engineer and Computer Science &amp; Design undergraduate with strong foundations in SQL, Python, Data Warehousing, and Big Data technologies. Hands-on experience in building ETL pipelines, implementing incremental data loading processes, designing relational database schemas, and processing large datasets using Apache Spark and Spark SQL. Passionate about developing scalable data solutions and leveraging data engineering principles to solve real-world business problems.
            </p>
          </div>

          {/* Education Table */}
          <div className="resume-doc-section">
            <h3 className="resume-doc-title">Education</h3>
            <div className="resume-table-wrap">
              <table className="resume-edu-table">
                <thead>
                  <tr>
                    <th>Degree / Certificate</th>
                    <th>Status / Score</th>
                    <th className="text-right">Year</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Bachelor of Engineering (B.E.) – Computer Science and Design</strong>
                    </td>
                    <td>Pursuing</td>
                    <td className="text-right date-badge">2023 – 2027</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Higher Secondary Certificate (HSC)</strong>
                    </td>
                    <td>Percentage: 58.17%</td>
                    <td className="text-right date-badge">2021 – 2022</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Secondary School Certificate (SSC)</strong>
                    </td>
                    <td>Percentage: 76.60%</td>
                    <td className="text-right date-badge">2019 – 2020</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Projects Portfolio */}
          <div className="resume-doc-section">
            <h3 className="resume-doc-title">Projects Portfolio</h3>

            {/* Project 1: Online Book Store */}
            <div className="resume-project-item">
              <div className="resume-project-head">
                <span className="resume-project-name">Online Book Store – SQL Project</span>
              </div>
              <ul className="resume-bullets">
                <li>Designed and implemented a relational SQL database to manage books, customers, and order transactions efficiently.</li>
                <li>Generated insights on sales, revenue, customer behavior, and top-performing books.</li>
                <li>Demonstrated strong understanding of relational database design, data integrity, and query optimization concepts.</li>
                <li>Performed data analysis using SELECT, WHERE, JOINs, GROUP BY, HAVING, aggregate functions, and subqueries.</li>
              </ul>
            </div>

            {/* Project 2: PrintHub */}
            <div className="resume-project-item">
              <div className="resume-project-head">
                <span className="resume-project-name">PrintHub — Online Xerox Printing Platform | Major Project</span>
              </div>
              <div className="resume-project-stack">
                <strong>Tech Stack:</strong> React, TypeScript, Node.js, Express.js, Prisma, SQLite/PostgreSQL, JWT, Razorpay, SSE
              </div>
              <ul className="resume-bullets">
                <li>Implemented secure authentication with JWT, bcrypt, email OTP verification, and role-based customer/shopkeeper access.</li>
                <li>Built a document upload and print configuration system supporting bulk uploads, page detection, B&amp;W/Color, Duplex, copies, paper size, orientation, and real-time price calculation.</li>
                <li>full-stack online printing platform that enables users to upload documents, customize print settings, select print shops, make payments, and track orders digitally.</li>
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="resume-doc-section">
            <h3 className="resume-doc-title">Technical Skills</h3>
            <div className="resume-skills-grid">
              <div className="resume-skill-row">
                <span className="skill-cat">Programming Languages:</span>
                <span className="skill-items">Python, SQL</span>
              </div>
              <div className="resume-skill-row">
                <span className="skill-cat">Big Data Technologies:</span>
                <span className="skill-items">Apache Spark, Spark SQL</span>
              </div>
              <div className="resume-skill-row">
                <span className="skill-cat">Databases:</span>
                <span className="skill-items">MySQL, PostgreSQL, MongoDB</span>
              </div>
              <div className="resume-skill-row">
                <span className="skill-cat">Data Engineering:</span>
                <span className="skill-items">ETL Pipelines, Incremental Loading, Data Warehousing, Star Schema, Data Modeling, Batch Processing</span>
              </div>
              <div className="resume-skill-row">
                <span className="skill-cat">Data Analysis:</span>
                <span className="skill-items">Pandas, NumPy, Matplotlib, Power BI</span>
              </div>
              <div className="resume-skill-row">
                <span className="skill-cat">Tools:</span>
                <span className="skill-items">Git, GitHub, Jupyter Notebook, VS Code</span>
              </div>
              <div className="resume-skill-row">
                <span className="skill-cat">Core Concepts:</span>
                <span className="skill-items">Relational Database Design, SQL Querying, Data Processing, Data Analysis</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="resume-doc-section mb-0">
            <h3 className="resume-doc-title">Certifications</h3>
            <ul className="resume-bullets resume-certs-list">
              <li>Oracle Agentic AI Certified Foundations Associate</li>
              <li>Software Testing Techniques</li>
              <li>
                <a
                  href="https://www.linkedin.com/in/yash-patil-468276352/overlay/Certifications/1765898727/treasury/?profileId=ACoAAFf12hABpDen48R3RCqkpTyqWCta-Uu7z7I"
                  target="_blank"
                  rel="noreferrer"
                  className="resume-doc-link"
                >
                  30-Days SQL Micro Course ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/yash-patil-468276352/overlay/Certifications/1265493025/treasury/?profileId=ACoAAFf12hABpDen48R3RCqkpTyqWCta-Uu7z7I"
                  target="_blank"
                  rel="noreferrer"
                  className="resume-doc-link"
                >
                  Python Programming Certification ↗
                </a>
              </li>
              <li>SQL Intermediate Certification</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
