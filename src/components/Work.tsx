import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

export interface PipelineNode {
  step: string;
  name: string;
  type: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subCategory: string;
  category: "fullstack" | "data";
  badge: string;
  posterEmoji: string;
  gradient: string;
  accentColor: string;
  match: string;
  year: string;
  duration: string;
  description: string;
  story: string;
  metrics: { label: string; value: string }[];
  pipelineNodes: PipelineNode[];
  tags: string[];
  live?: string;
  github: string;
}

const projectsData: ProjectItem[] = [
  {
    id: "printhub",
    title: "PrintHub — Online Printing Platform",
    subCategory: "CLOUD-EDGE PRINTING ENGINE",
    category: "fullstack",
    badge: "SYSTEMS",
    posterEmoji: "🖨️",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 60%, #090d16 100%)",
    accentColor: "#3b82f6",
    match: "98% Match",
    year: "2026",
    duration: "React • Node.js • Prisma • PostgreSQL",
    description:
      "Distributed cloud-edge document printing platform with automated page & paper pricing calculation, multi-format file processing, and automated print dispatch.",
    story:
      "PrintHub bridges the gap between digital users and physical stationery print shops. Customers upload documents online (PDF, DOCX, images), select paper specifications (color, GSM, duplex binding), view auto-calculated prices in real-time, and make payments via UPI/Razorpay. Orders are routed directly to shop queues with automated spooling.",
    metrics: [
      { value: "Real-Time", label: "PRICE ENGINE" },
      { value: "Auto-Spool", label: "PRINT DISPATCH" },
      { value: "PostgreSQL", label: "PRISMA DB" },
    ],
    pipelineNodes: [
      { step: "01", name: "Doc Ingest", type: "PDF / DOCX Multi-Format" },
      { step: "02", name: "Price Engine", type: "Real-time GSM & Duplex" },
      { step: "03", name: "Prisma Cloud", type: "PostgreSQL Spool Queue" },
      { step: "04", name: "Hardware Spool", type: "Auto Print Dispatch" },
    ],
    tags: ["React", "Node.js", "Express", "Prisma", "PostgreSQL", "Razorpay", "Tailwind CSS"],
    live: "https://printhub-chi-kohl.vercel.app",
    github: "https://github.com/yashpatil7313/PrintHub-Online-Printing-Platform",
  },
  {
    id: "online-book-store-sql",
    title: "Online Book Store — Relational SQL Database",
    subCategory: "RELATIONAL SCHEMA & BUSINESS ANALYTICS",
    category: "data",
    badge: "SQL ARCH",
    posterEmoji: "📚",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #311042 60%, #0d0718 100%)",
    accentColor: "#818cf8",
    match: "99% Match",
    year: "2026",
    duration: "SQL • Relational DB Design • Data Analysis",
    description:
      "Production-ready relational SQL database to manage books, customers, inventory stocks, and order transactions with advanced SQL business analytics and query optimization.",
    story:
      "Designed and implemented a relational SQL database to manage books, customer profiles, inventory stocks, and order transactions efficiently. Generated actionable business insights on sales volume, revenue velocity, customer purchasing behavior, and top-performing book categories. Demonstrated strong understanding of database normalization, relational integrity constraints, index tuning, and complex query analytics using SELECT, WHERE, JOINs, GROUP BY, HAVING, aggregations, and nested subqueries.",
    metrics: [
      { value: "Normalized", label: "RELATIONAL SCHEMA" },
      { value: "Complex", label: "JOINs & SUBQUERIES" },
      { value: "Actionable", label: "SALES & REVENUE EDA" },
    ],
    pipelineNodes: [
      { step: "01", name: "Schema Design", type: "Normalized 3NF Relational" },
      { step: "02", name: "Data Ingest", type: "Books, Stocks & Orders" },
      { step: "03", name: "Query Engine", type: "JOINs, CTEs & Windows" },
      { step: "04", name: "Sales Analytics", type: "Revenue Velocity EDA" },
    ],
    tags: ["SQL", "Relational Design", "Normalization", "JOINs", "GROUP BY", "Query Tuning", "Data Integrity"],
    github: "https://github.com/yashpatil7313",
  },
  {
    id: "bizinsight",
    title: "Bizinsight — Business Analytics Suite",
    subCategory: "CLIENT-SIDE DATA INTELLIGENCE",
    category: "data",
    badge: "ANALYTICS",
    posterEmoji: "📈",
    gradient: "linear-gradient(135deg, #581c87 0%, #2e1065 60%, #0d0718 100%)",
    accentColor: "#a855f7",
    match: "97% Match",
    year: "2026",
    duration: "React • Chart.js • Client Analytics",
    description:
      "Instant, privacy-first business analytics right in your browser. Generates dynamic revenue breakdowns, sales velocity trends, and executive KPI summaries without server uploads.",
    story:
      "Bizinsight empowers small business owners and analysts to visualize messy tabular business data instantly. Built with a 100% in-browser processing philosophy, user files never leave the machine. It dynamically maps CSV/JSON columns into interactive financial charts, monthly revenue run-rates, cohort comparisons, and downloadable visual reports.",
    metrics: [
      { value: "100%", label: "PRIVACY FIRST" },
      { value: "Interactive", label: "CHART.JS VIZ" },
      { value: "Instant", label: "IN-BROWSER EDA" },
    ],
    pipelineNodes: [
      { step: "01", name: "Local Ingestion", type: "CSV / JSON Zero-Upload" },
      { step: "02", name: "Memory Pipeline", type: "Client-Side DataFrame" },
      { step: "03", name: "Chart Telemetry", type: "Dynamic Chart.js Viz" },
      { step: "04", name: "Executive KPI", type: "Instant Run-Rate Reports" },
    ],
    tags: ["React", "JavaScript", "Chart.js", "Data Viz", "Netlify", "CSS3"],
    live: "https://clever-churros-cf417e.netlify.app/",
    github: "https://github.com/yashpatil7313/Bizinsight",
  },
  {
    id: "ecommerce-analysis",
    title: "Superstore Sales & Profit Analysis",
    subCategory: "RETAIL EXPLORATORY DATA ANALYSIS",
    category: "data",
    badge: "DATA ARCH",
    posterEmoji: "🛒",
    gradient: "linear-gradient(135deg, #881337 0%, #4c0519 60%, #17040a 100%)",
    accentColor: "#f43f5e",
    match: "99% Match",
    year: "2026",
    duration: "Python • Pandas • Plotly • EDA",
    description:
      "Comprehensive statistical EDA analyzing sales velocity, gross profit margins, regional returns, and customer segment profitability across multinational superstore operations.",
    story:
      "A deep-dive data analytics study on multi-year retail transactions. The analysis identifies key drivers of product discounting loss leaders, shipping lag correlations, regional profit leakages, and high-value customer clusters. Leveraged vectorised Pandas pipelines and interactive Plotly figures for actionable business recommendations.",
    metrics: [
      { value: "Multi-Year", label: "SALES DATA" },
      { value: "Pandas", label: "DATA PIPELINE" },
      { value: "Plotly", label: "INTERACTIVE EDA" },
    ],
    pipelineNodes: [
      { step: "01", name: "Retail Logs", type: "Multi-Year Transactions" },
      { step: "02", name: "Pandas Pipeline", type: "Vectorized Aggregations" },
      { step: "03", name: "Profit Clustering", type: "Regional Margin EDA" },
      { step: "04", name: "Plotly Studio", type: "Interactive EDA Dash" },
    ],
    tags: ["Python", "Pandas", "Plotly", "Jupyter", "Data Science", "Statistics"],
    github: "https://github.com/yashpatil7313/Ecommerce-sales-profit-analysis",
  },
  {
    id: "solar-admin",
    title: "Solar Installation & Admin Panel",
    subCategory: "CLEANTECH INSTALLATION ERP",
    category: "fullstack",
    badge: "PLATFORM",
    posterEmoji: "☀️",
    gradient: "linear-gradient(135deg, #78350f 0%, #451a03 60%, #150901 100%)",
    accentColor: "#f59e0b",
    match: "96% Match",
    year: "2026",
    duration: "React • Node.js • Express • PostgreSQL",
    description:
      "Solar installation and government subsidy management admin suite with real-time inverter telemetry, document verifications, customer pipeline, and field team roles.",
    story:
      "Built for renewable energy contractors and government subsidy liaisons. The platform manages the entire lifecycle of rooftop and commercial solar projects: from site survey uploads (via Multer), kilowatt-capacity estimations, subsidy document processing, to engineer assignment and live power generation telemetry monitoring.",
    metrics: [
      { value: "End-to-End", label: "SUBSIDY ERP" },
      { value: "PostgreSQL", label: "RELATIONAL STORE" },
      { value: "Role-Based", label: "ACCESS CONTROL" },
    ],
    pipelineNodes: [
      { step: "01", name: "Survey Ingest", type: "Multer Multi-part Upload" },
      { step: "02", name: "Capacity Model", type: "Kilowatt Power Estimator" },
      { step: "03", name: "Subsidy ERP", type: "PostgreSQL Workflow Engine" },
      { step: "04", name: "Live Telemetry", type: "Inverter Generation Stream" },
    ],
    tags: ["React", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Render", "Multer"],
    live: "https://solar-admin-panel-wer9.onrender.com/",
    github: "https://github.com/yashpatil7313/solar-admin-panel",
  },
  {
    id: "college-complaint",
    title: "Digital College Complaint System",
    subCategory: "INSTITUTIONAL WORKFLOW AUTOMATION",
    category: "fullstack",
    badge: "COMMUNITY",
    posterEmoji: "🎓",
    gradient: "linear-gradient(135deg, #064e3b 0%, #022c22 60%, #03130e 100%)",
    accentColor: "#10b981",
    match: "95% Match",
    year: "2025",
    duration: "React • JavaScript • Node.js • Vercel",
    description:
      "Web-based college grievance redressal portal allowing students to submit, track, and escalate complaints with transparent administrative resolution timelines.",
    story:
      "Replaces antiquated paper complaint boxes with a streamlined, accountable digital tracking system. Students lodge categorised grievances (hostel, academics, infrastructure, labs) with attachments, monitor live status badges ('Pending', 'Under Review', 'Resolved'), while department heads review, assign, and submit documented resolutions.",
    metrics: [
      { value: "100%", label: "TRANSPARENCY" },
      { value: "Live", label: "STATUS TRACKING" },
      { value: "Multi-Role", label: "STUDENT & ADMIN" },
    ],
    pipelineNodes: [
      { step: "01", name: "Ticket Ingest", type: "Authenticated Student Input" },
      { step: "02", name: "Role Routing", type: "HOD & Admin Triaging" },
      { step: "03", name: "SLA Resolution", type: "Live Status Dispatch" },
      { step: "04", name: "Audit Trail", type: "Historical Analytics Log" },
    ],
    tags: ["React", "JavaScript", "Node.js", "Vercel", "Full Stack", "Responsive UI"],
    live: "https://college-complaint-system-5jyn.vercel.app/",
    github: "https://github.com/yashpatil7313/college-complaint-system",
  },
  {
    id: "spotify-sql",
    title: "Spotify Music Streaming Analytics",
    subCategory: "ADVANCED RELATIONAL DATA ARCHITECTURE",
    category: "data",
    badge: "SQL ARCH",
    posterEmoji: "🎵",
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #082f49 60%, #02131f 100%)",
    accentColor: "#0ea5e9",
    match: "99% Match",
    year: "2026",
    duration: "SQL • PostgreSQL • Query Tuning",
    description:
      "Advanced SQL database analysis of Spotify's music library, querying audio metrics (danceability, tempo, valence) and artist stream distributions using window functions & CTEs.",
    story:
      "Engineered complex SQL queries across normalized tables modeling Spotify tracks, albums, genres, and listening metrics. Implemented DENSE_RANK() window functions for top-per-genre tracks, CTEs for recursive hierarchy parsing, aggregate rollups for artist revenue distribution, and indexed foreign keys for sub-10ms query execution.",
    metrics: [
      { value: "Advanced", label: "SQL CTEs & WINDOWS" },
      { value: "Sub-10ms", label: "INDEXED QUERIES" },
      { value: "PostgreSQL", label: "RELATIONAL DB" },
    ],
    pipelineNodes: [
      { step: "01", name: "Track Catalog", type: "Audio Metric Ingestion" },
      { step: "02", name: "Index Tuning", type: "Sub-10ms Relational Store" },
      { step: "03", name: "Window Analytics", type: "DENSE_RANK & CTE Trees" },
      { step: "04", name: "Stream Insights", type: "Artist Revenue Breakdown" },
    ],
    tags: ["SQL", "PostgreSQL", "Window Functions", "CTEs", "Database Design", "Performance Tuning"],
    github: "https://github.com/yashpatil7313/Spotify-Data-Analysis-Using-SQL",
  },
];

const Work = () => {
  const [filter, setFilter] = useState<"all" | "fullstack" | "data">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Modal Refs for GSAP 3D spring animations
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalDialogRef = useRef<HTMLDivElement>(null);
  const xRotTo = useRef<((value: number) => void) | null>(null);
  const yRotTo = useRef<((value: number) => void) | null>(null);

  // Open modal with dramatic GSAP 3D spring unfold
  const handleOpenModal = (project: ProjectItem) => {
    setIsClosing(false);
    setSelectedProject(project);
  };

  // Close modal with smooth GSAP 3D fold-away exit
  const handleCloseModal = () => {
    if (isClosing || !modalDialogRef.current || !backdropRef.current) return;
    setIsClosing(true);

    // Fade backdrop
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });

    // Fold dialog into 3D distance
    gsap.to(modalDialogRef.current, {
      opacity: 0,
      transformPerspective: 1400,
      rotateX: 28,
      rotateY: 6,
      scale: 0.8,
      y: 70,
      z: -100,
      duration: 0.3,
      ease: "power3.in",
      force3D: true,
      onComplete: () => {
        setSelectedProject(null);
        setIsClosing(false);
      },
    });
  };

  // Run GSAP 3D Unfolding Entrance when selectedProject changes
  useEffect(() => {
    if (!selectedProject || !modalDialogRef.current || !backdropRef.current) return;

    // Set initial 3D pose
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(modalDialogRef.current, {
      opacity: 0,
      transformPerspective: 1400,
      rotateX: 34,
      rotateY: -7,
      scale: 0.76,
      y: 95,
      z: -130,
      force3D: true,
    });

    // Animate backdrop in
    gsap.to(backdropRef.current, {
      opacity: 1,
      duration: 0.32,
      ease: "power2.out",
    });

    // Spring unfold dialog in true 3D perspective
    gsap.to(modalDialogRef.current, {
      opacity: 1,
      transformPerspective: 1400,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      y: 0,
      z: 0,
      duration: 0.55,
      ease: "back.out(1.25)",
      force3D: true,
      onComplete: () => {
        // Setup quickTo for buttery smooth mouse gyro tracking
        if (modalDialogRef.current) {
          xRotTo.current = gsap.quickTo(modalDialogRef.current, "rotateX", {
            duration: 0.3,
            ease: "power2.out",
          });
          yRotTo.current = gsap.quickTo(modalDialogRef.current, "rotateY", {
            duration: 0.3,
            ease: "power2.out",
          });
        }
      },
    });
  }, [selectedProject]);

  // Close modal on Escape key press with exit animation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject && !isClosing) {
        handleCloseModal();
      }
    };
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, isClosing]);

  // Entrance & Stagger animation for project cards
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".relay-3d-card");
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.94, transformPerspective: 1200, rotateX: 15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [filter]);

  const cardRfs = useRef<WeakMap<HTMLDivElement, number>>(new WeakMap());
  const modalRaf = useRef<number | null>(null);

  // Card 3D Spring Tilt handlers (GSAP-powered, 144Hz synchronized via rAF)
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;

    const prevRaf = cardRfs.current.get(card);
    if (prevRaf) cancelAnimationFrame(prevRaf);

    const rafId = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((y - centerY) / centerY) * -12; // ±12deg clearly visible 3D tilt
      const rotY = ((x - centerX) / centerX) * 12;

      gsap.to(card, {
        transformPerspective: 1100,
        rotateX: rotX,
        rotateY: rotY,
        duration: 0.16,
        ease: "power1.out",
        overwrite: "auto",
        force3D: true,
      });

      card.style.setProperty("--mx", `${((x / rect.width) * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${((y / rect.height) * 100).toFixed(1)}%`);
      cardRfs.current.delete(card);
    });

    cardRfs.current.set(card, rafId);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const prevRaf = cardRfs.current.get(card);
    if (prevRaf) cancelAnimationFrame(prevRaf);

    gsap.to(card, {
      transformPerspective: 1100,
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "back.out(1.6)", // snappy spring bounce return
      overwrite: "auto",
      force3D: true,
    });
  };

  // Modal 3D interactive gyro tilt on mouse movement (144Hz throttled)
  const handleModalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isClosing || !modalDialogRef.current) return;
    const dialog = modalDialogRef.current;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (modalRaf.current) cancelAnimationFrame(modalRaf.current);

    modalRaf.current = requestAnimationFrame(() => {
      const rect = dialog.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((y - centerY) / centerY) * -7.5; // ±7.5deg interactive modal tilt
      const rotY = ((x - centerX) / centerX) * 7.5;

      if (xRotTo.current && yRotTo.current) {
        xRotTo.current(rotX);
        yRotTo.current(rotY);
      }

      dialog.style.setProperty("--glare-x", `${((x / rect.width) * 100).toFixed(1)}%`);
      dialog.style.setProperty("--glare-y", `${((y / rect.height) * 100).toFixed(1)}%`);
      modalRaf.current = null;
    });
  };

  const handleModalMouseLeave = () => {
    if (modalRaf.current) cancelAnimationFrame(modalRaf.current);
    if (xRotTo.current && yRotTo.current) {
      xRotTo.current(0);
      yRotTo.current(0);
    }
  };

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section className="work-section" id="work">
      <div className="work-container section-container">
        {/* Section Header */}
        <div className="work-header-wrap">
          <div className="work-header-text">
            <span className="work-section-kicker">✦ RELAY 3D SHOWCASE // ARCHITECTURE &amp; SYSTEMS</span>
            <h2 className="title">
              Featured <span>Projects</span>
            </h2>
            <p className="work-section-desc">
              Production full-stack platforms, client dashboards, and deep-dive SQL data architectures with interactive 3D pipelines.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="netflix-filter-pills" role="tablist" aria-label="Project filter categories">
            <button
              className={`netflix-pill-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
              type="button"
            >
              All Releases ({projectsData.length})
            </button>
            <button
              className={`netflix-pill-btn ${filter === "fullstack" ? "active" : ""}`}
              onClick={() => setFilter("fullstack")}
              type="button"
            >
              Full Stack &amp; Systems ({projectsData.filter((p) => p.category === "fullstack").length})
            </button>
            <button
              className={`netflix-pill-btn ${filter === "data" ? "active" : ""}`}
              onClick={() => setFilter("data")}
              type="button"
            >
              Data &amp; SQL Analytics ({projectsData.filter((p) => p.category === "data").length})
            </button>
          </div>
        </div>

        {/* 3-Column Relay 3D Project Cards Grid */}
        <div className="netflix-projects-grid" ref={gridRef}>
          {filteredProjects.map((project, idx) => (
            <div className="relay-card-container" key={project.id}>
              <article
                className="relay-3d-card group"
                style={{ "--project-accent": project.accentColor } as React.CSSProperties}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => handleOpenModal(project)}
              >
                {/* Active Perimeter Stream of Light */}
                <div className="relay-card-border-stream" aria-hidden="true" />

                {/* Dynamic 3D Glare Spotlight */}
                <div className="netflix-card-glare" aria-hidden="true" />

                {/* Card Header Poster (Elevated in 3D) */}
                <div
                  className="netflix-poster relay-layer-poster"
                  style={{ background: project.gradient }}
                >
                  <div className="netflix-poster-grid" aria-hidden="true" />
                  <div className="netflix-modal-vignette" aria-hidden="true" />

                  {/* Top Poster Row: Relay Badge & Live Indicator */}
                  <div className="netflix-poster-top relay-layer-top">
                    <span className="relay-badge-mono">
                      <span className="relay-badge-index">0{idx + 1} //</span> {project.badge}
                    </span>
                    <div className="netflix-poster-actions">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="netflix-live-indicator"
                          title="Live Website Available"
                          aria-label={`Open live link for ${project.title}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="live-dot" /> LIVE
                        </a>
                      )}
                      <span className="netflix-poster-emoji">{project.posterEmoji}</span>
                    </div>
                  </div>

                  {/* Bottom Poster Row: Kicker & Title */}
                  <div className="netflix-poster-bottom relay-layer-title">
                    <span className="netflix-poster-kicker">{project.subCategory}</span>
                    <h3 className="netflix-poster-title">{project.title}</h3>
                  </div>
                </div>

                {/* Card Body Details (Elevated in 3D) */}
                <div className="netflix-card-body relay-layer-body">
                  <div>
                    {/* Meta Row: Match Rating, Year, Stack */}
                    <div className="netflix-meta-row">
                      <span className="netflix-match-score">{project.match}</span>
                      <span className="netflix-year-badge">{project.year}</span>
                      <span className="netflix-duration-kicker">{project.duration}</span>
                    </div>

                    {/* Description Paragraph */}
                    <p className="netflix-card-desc">{project.description}</p>
                  </div>

                  <div>
                    {/* Tech Stack Pills */}
                    <div className="netflix-tech-pills relay-layer-pills">
                      {project.tags.slice(0, 4).map((tag, tIdx) => (
                        <span className="netflix-tech-tag" key={tIdx}>
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="netflix-tech-tag netflix-tech-more">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Bar: Relay Signature 3D Blueprint Button */}
                    <div className="netflix-action-bar relay-layer-actions">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(project);
                        }}
                        className="relay-neon-cta-btn"
                        aria-label={`Open 3D blueprint for ${project.title}`}
                      >
                        <span className="relay-btn-icon-sq">⚡</span>
                        <span>3D Blueprint</span>
                      </button>

                      <div className="netflix-secondary-links">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="netflix-live-link"
                            title="Open Live Website"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Live ↗
                          </a>
                        )}

                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="netflix-code-link"
                          title="View GitHub Repository"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Code ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Relay 3D Perspective Modal Popup */}
      {selectedProject && (
        <div
          ref={backdropRef}
          className="relay-modal-backdrop"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relay-perspective-stage">
            <div
              ref={modalDialogRef}
              className="relay-3d-dialog"
              onClick={(e) => e.stopPropagation()}
              onMouseMove={handleModalMouseMove}
              onMouseLeave={handleModalMouseLeave}
              style={{ "--modal-accent": selectedProject.accentColor } as React.CSSProperties}
            >
              {/* Relay Stream of Light Orbit Ring */}
              <div className="relay-stream-ring" aria-hidden="true" />
              {/* Dynamic Specular Glass Sheen */}
              <div className="relay-specular-sheen" aria-hidden="true" />

              {/* Relay Mechanical Top Bar */}
              <div className="relay-dialog-topbar">
                <div className="relay-topbar-left">
                  <span className="relay-live-beacon">
                    <span className="relay-beacon-pulse" />
                    <span className="relay-beacon-dot" />
                  </span>
                  <span className="relay-topbar-badge">
                    RELAY 3D PIPELINE // {selectedProject.badge}
                  </span>
                  <span className="relay-topbar-model">{selectedProject.year} ARCH</span>
                </div>

                <button
                  type="button"
                  className="relay-close-btn"
                  onClick={handleCloseModal}
                  aria-label="Close Project Modal"
                  title="Close (Esc)"
                >
                  <span className="relay-close-text">ESC</span>
                  <svg
                    className="relay-close-icon"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Hero Banner */}
              <div
                className="netflix-modal-hero"
                style={{ background: selectedProject.gradient }}
              >
                <div className="netflix-poster-grid" aria-hidden="true" />
                <div className="netflix-modal-vignette" aria-hidden="true" />

                <div className="netflix-modal-hero-content">
                  <div className="netflix-modal-badge-row">
                    <span className="relay-badge-mono">{selectedProject.badge}</span>
                    <span className="netflix-modal-category-pill">
                      {selectedProject.subCategory}
                    </span>
                  </div>
                  <h3 className="netflix-modal-title" id="modal-title">
                    {selectedProject.title}
                  </h3>
                  <p className="netflix-modal-tagline">{selectedProject.duration}</p>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="netflix-modal-body">
                {/* Relay Iconic 3D Interactive Node Pipeline */}
                <div className="relay-pipeline-section">
                  <div className="relay-pipeline-header">
                    <span className="relay-pipeline-title">✦ 3D EXECUTION PIPELINE ARCHITECTURE</span>
                    <span className="relay-pipeline-status">STATUS: OPTIMAL</span>
                  </div>

                  <div className="relay-pipeline-grid">
                    {selectedProject.pipelineNodes.map((node, nIdx) => (
                      <div className="relay-node-box" key={nIdx}>
                        <div className="relay-node-top">
                          <span className="relay-node-step">{node.step}</span>
                          <span className="relay-node-pulse-dot" />
                        </div>
                        <h5 className="relay-node-name">{node.name}</h5>
                        <p className="relay-node-type">{node.type}</p>
                        {nIdx < selectedProject.pipelineNodes.length - 1 && (
                          <div className="relay-node-connector" aria-hidden="true">
                            <span className="relay-connector-line" />
                            <span className="relay-connector-arrow">▶</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3-Column Key Metrics */}
                <div className="netflix-metrics-grid">
                  {selectedProject.metrics.map((metric, mIdx) => (
                    <div className="netflix-metric-card" key={mIdx}>
                      <span className="netflix-metric-val">{metric.value}</span>
                      <span className="netflix-metric-lbl">{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* Architectural Story Section */}
                <div className="netflix-modal-story-wrap">
                  <h4 className="netflix-modal-section-title">
                    <span>✦</span> Architectural Blueprint &amp; Story
                  </h4>
                  <p className="netflix-modal-story-text">{selectedProject.story}</p>
                </div>

                {/* Core Technologies Pills */}
                <div className="netflix-modal-tech-wrap">
                  <h4 className="netflix-modal-section-title">
                    <span>✦</span> Core Technologies &amp; Libraries
                  </h4>
                  <div className="netflix-modal-tech-tags">
                    {selectedProject.tags.map((tag, tIdx) => (
                      <span className="netflix-modal-tag" key={tIdx}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons with Relay Signature Neon Launch */}
                <div className="netflix-modal-cta-row">
                  {selectedProject.live ? (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relay-modal-launch-btn"
                    >
                      <span>🚀</span> Launch Live Platform ↗
                    </a>
                  ) : (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relay-modal-launch-btn"
                    >
                      <span>📊</span> Explore Analysis &amp; Data Notebook ↗
                    </a>
                  )}

                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="netflix-cta-code-btn"
                  >
                    <span>💻</span> View Source Code ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;
