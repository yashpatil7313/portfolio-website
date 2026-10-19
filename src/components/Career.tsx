import { useEffect } from "react";
import "./styles/Career.css";
import { setAllTimeline } from "./utils/GsapScroll";

const Career = () => {
  useEffect(() => {
    const tl = setAllTimeline();
    return () => {
      tl?.kill();
    };
  }, []);

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>Education <span>&</span><br />focus</h2>
        <div className="career-info">
          <div className="career-timeline"><div className="career-dot" /></div>

          {/* 1. B.E. Computer Science and Design */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Engineering (B.E.)</h4>
                <h5>Computer Science &amp; Design • Pursuing</h5>
              </div>
              <h3>2023 – 2027</h3>
            </div>
            <p>Specializing in Data Engineering, Apache Spark, Spark SQL, Relational Database Design, Data Warehousing, and Scalable ETL Pipeline Architectures.</p>
          </div>

          {/* 2. Higher Secondary Certificate */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Higher Secondary Certificate (HSC)</h4>
                <h5>Percentage: 58.17%</h5>
              </div>
              <h3>2021 – 2022</h3>
            </div>
            <p>Completed higher secondary education building strong foundations in Mathematics, Science, and computational problem-solving.</p>
          </div>

          {/* 3. Secondary School Certificate */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Secondary School Certificate (SSC)</h4>
                <h5>Percentage: 76.60%</h5>
              </div>
              <h3>2019 – 2020</h3>
            </div>
            <p>Graduated with high academic distinction, establishing analytical, logic, and scientific fundamentals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
