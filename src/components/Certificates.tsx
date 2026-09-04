import { MdArrowOutward } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import "./styles/Certificates.css";

const certificates = [
  {
    title: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle University",
    file: "/certificates/oracle-agentic-ai-certificate.pdf",
  },
  {
    title: "DBMS & SQL Mastery",
    issuer: "DevTown × Microsoft Student Chapter - GNIT",
    file: "/certificates/dbms-sql-microsoft-certificate.pdf",
  },
  {
    title: "DBMS & SQL Mastery",
    issuer: "DevTown × Google Developer Groups - CSMU",
    file: "/certificates/dbms-sql-gdg-certificate.pdf",
  },
  {
    title: "Learning Full Stack Development",
    issuer: "Wingspan",
    file: "/certificates/full-stack-certificate.pdf",
  },
  {
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    file: "/certificates/sql-intermediate-certificate.pdf",
  },
  {
    title: "30-Days SQL Micro Course",
    issuer: "E-Learning Course",
    file: "/certificates/sql-certificate.pdf",
  },
  {
    title: "Python Certificate",
    issuer: "Python Course",
    file: "/certificates/python-certificate.pdf",
  },
  {
    title: "Software Testing Techniques",
    issuer: "Wingspan",
    file: "/certificates/infosys-certificate.pdf",
  },
];

const Certificates = () => (
  <section className="certificates-section section-container" id="certificates">
    <p className="certificates-kicker">Learning & achievements</p>
    <h2>Certificates</h2>
    <div className="certificates-grid">
      {certificates.map((certificate) => (
        <a
          className="certificate-card"
          href={certificate.file}
          target="_blank"
          rel="noreferrer"
          data-cursor="disable"
          key={certificate.file}
        >
          <TbCertificate aria-hidden="true" />
          <div>
            <h3>{certificate.title}</h3>
            <p>{certificate.issuer}</p>
          </div>
          <MdArrowOutward className="certificate-arrow" aria-hidden="true" />
        </a>
      ))}
    </div>
  </section>
);

export default Certificates;
