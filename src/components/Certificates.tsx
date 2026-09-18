import { useEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import { TbCertificate, TbSparkles } from "react-icons/tb";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Certificates.css";

gsap.registerPlugin(ScrollTrigger);

interface CertificateItem {
  title: string;
  issuer: string;
  file: string;
  badge?: string;
  color?: string;
}

const certificates: CertificateItem[] = [
  {
    title: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle University",
    file: "/certificates/oracle-agentic-ai-certificate.pdf",
    badge: "Oracle Certified",
    color: "#f59e0b",
  },
  {
    title: "DBMS & SQL Mastery",
    issuer: "DevTown × Microsoft Student Chapter - GNIT",
    file: "/certificates/dbms-sql-microsoft-certificate.pdf",
    badge: "Microsoft Chapter",
    color: "#38bdf8",
  },
  {
    title: "DBMS & SQL Mastery",
    issuer: "DevTown × Google Developer Groups - CSMU",
    file: "/certificates/dbms-sql-gdg-certificate.pdf",
    badge: "Google GDG",
    color: "#34d399",
  },
  {
    title: "Learning Full Stack Development",
    issuer: "Wingspan",
    file: "/certificates/full-stack-certificate.pdf",
    badge: "Full Stack",
    color: "#a855f7",
  },
  {
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    file: "/certificates/sql-intermediate-certificate.pdf",
    badge: "HackerRank",
    color: "#22c55e",
  },
  {
    title: "30-Days SQL Micro Course",
    issuer: "E-Learning Course",
    file: "/certificates/sql-certificate.pdf",
    badge: "SQL Mastery",
    color: "#60a5fa",
  },
  {
    title: "Python Certificate",
    issuer: "Python Course",
    file: "/certificates/python-certificate.pdf",
    badge: "Python",
    color: "#fbbf24",
  },
  {
    title: "Software Testing Techniques",
    issuer: "Wingspan",
    file: "/certificates/infosys-certificate.pdf",
    badge: "Quality Assurance",
    color: "#ec4899",
  },
];

const Certificates = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".certificate-card");
    const anim = gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
    card.style.setProperty("--glare-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--glare-y", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  };

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const wave = document.createElement("span");
    wave.className = "card-click-wave";
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    card.appendChild(wave);
    setTimeout(() => {
      wave.remove();
    }, 650);
  };

  return (
    <section className="certificates-section section-container" id="certificates" ref={sectionRef}>
      <div className="certificates-header">
        <p className="certificates-kicker">
          <TbSparkles className="kicker-sparkle" /> Learning & achievements
        </p>
        <h2>Certificates</h2>
        <p className="certificates-subtitle">
          Verified industry certifications and bootcamps strengthening my foundations in Databases, SQL, AI, and Software Engineering.
        </p>
      </div>
      <div className="certificates-grid" ref={gridRef}>
        {certificates.map((certificate) => (
          <a
            className="certificate-card"
            href={certificate.file}
            target="_blank"
            rel="noreferrer"
            data-cursor="disable"
            key={certificate.file}
            style={{ "--cert-color": certificate.color } as React.CSSProperties}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
          >
            <div className="cert-glare" />
            <div className="cert-icon-wrapper">
              <TbCertificate aria-hidden="true" />
            </div>
            <div className="cert-body">
              {certificate.badge && (
                <span className="cert-badge">{certificate.badge}</span>
              )}
              <h3>{certificate.title}</h3>
              <p>{certificate.issuer}</p>
            </div>
            <div className="cert-arrow-wrap">
              <MdArrowOutward className="certificate-arrow" aria-hidden="true" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
