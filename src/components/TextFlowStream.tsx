import Marquee from "react-fast-marquee";
import "./styles/TextFlowStream.css";

const STREAM_1 = [
  "DATA ENGINEER",
  "SQL ARCHITECT",
  "AGENTIC AI",
  "PYTHON & FASTAPI",
  "DATABASE OPTIMIZATION",
  "REACT & TYPESCRIPT",
  "ETL PIPELINES",
  "PERFORMANCE TUNING",
];

const STREAM_2 = [
  "COMPLEX QUERIES",
  "SYSTEM ARCHITECTURE",
  "MACHINE LEARNING",
  "POSTGRESQL & MYSQL",
  "REST API DESIGN",
  "CREATIVE PROBLEM SOLVING",
  "DATA VISUALIZATION",
  "MODERN WEB APPS",
];

const TextFlowStream = () => {
  return (
    <div className="text-flow-stream-wrap" aria-hidden="true">
      <div className="text-flow-fade-left" />
      <div className="text-flow-fade-right" />

      {/* Primary Flow Stream */}
      <div className="text-flow-row text-flow-primary">
        <Marquee speed={48} gradient={false} pauseOnHover={true}>
          {STREAM_1.map((item, idx) => (
            <div className="text-flow-item" key={idx}>
              <span className="text-flow-word">{item}</span>
              <span className="text-flow-star">✦</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Secondary Reverse Outline Flow Stream */}
      <div className="text-flow-row text-flow-secondary">
        <Marquee speed={36} direction="right" gradient={false} pauseOnHover={true}>
          {STREAM_2.map((item, idx) => (
            <div className="text-flow-item outline-item" key={idx}>
              <span className="text-flow-word">{item}</span>
              <span className="text-flow-star alt-star">✦</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default TextFlowStream;
