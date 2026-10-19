import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { TbDownload, TbMail, TbPhone, TbMapPin } from "react-icons/tb";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  permission: boolean;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    permission: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const name = target.id;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.permission) {
      setErrorMsg("Please accept the contact permission checkbox.");
      return;
    }

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill out your name, email, and message.");
      return;
    }

    // Launch mailto so Yash receives the message directly
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formData.firstName} ${formData.lastName}`
    );
    const body = encodeURIComponent(
      `Hi Yash,\n\n${formData.message}\n\nFrom: ${formData.firstName} ${formData.lastName} (${formData.email})`
    );
    window.open(`mailto:yashrspatil7313@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setSubmitted(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      permission: false,
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (bgTitleRef.current) {
      gsap.fromTo(
        bgTitleRef.current,
        { opacity: 0, scale: 0.88, y: 30 },
        {
          opacity: 0.16,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section className="netflix-contact-section" id="contact" ref={sectionRef}>
      {/* Massive Bold Background Typography: CONTACT */}
      <div className="netflix-contact-bg-text-wrap" aria-hidden="true">
        <h1 className="netflix-contact-bg-title" ref={bgTitleRef}>CONTACT</h1>
      </div>

      <div className="netflix-contact-inner section-container">
        {/* Right-Aligned Bold Crimson Red Contact Card */}
        <div className="netflix-contact-card-wrap">
          <div className="netflix-contact-card" ref={cardRef}>
            {/* Header: Kicker & Success Badge */}
            <div className="netflix-contact-card-header">
              <div className="netflix-contact-card-kicker">GET IN TOUCH</div>

              {submitted && (
                <div className="netflix-contact-success-badge" role="status">
                  <span className="netflix-contact-success-dot" />
                  Message Sent Successfully!
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="netflix-contact-error-badge" role="alert">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Two-Column Minimal Form */}
            <form className="netflix-contact-form" onSubmit={handleSubmit}>
              <div className="netflix-form-row">
                {/* Left Column: First Name, Last Name, Email */}
                <div className="netflix-form-col">
                  <div className="netflix-input-group">
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                      className="netflix-input"
                    />
                  </div>

                  <div className="netflix-input-group">
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="netflix-input"
                    />
                  </div>

                  <div className="netflix-input-group">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="netflix-input"
                    />
                  </div>
                </div>

                {/* Right Column: Message */}
                <div className="netflix-form-col">
                  <div className="netflix-input-group message-group">
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here"
                      required
                      className="netflix-textarea"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Row: Checkbox, Privacy Note, and Send Button */}
              <div className="netflix-form-bottom">
                <div className="netflix-form-bottom-left">
                  {/* Permission Checkbox */}
                  <div className="netflix-checkbox-wrap">
                    <input
                      type="checkbox"
                      id="permission"
                      checked={formData.permission}
                      onChange={handleChange}
                      className="netflix-checkbox"
                    />
                    <label htmlFor="permission" className="netflix-checkbox-label">
                      I give permission to contact me at this email address.
                    </label>
                  </div>

                  {/* Privacy & reCAPTCHA Note */}
                  <p className="netflix-privacy-note">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
                      Terms of Service
                    </a>{" "}
                    apply.
                  </p>
                </div>

                {/* Send Button */}
                <div className="netflix-form-bottom-right">
                  <button type="submit" className="netflix-send-btn">
                    <span>Send</span>
                    <svg
                      className="netflix-send-icon"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Minimalist Bottom Footer Strip */}
        <footer className="netflix-footer">
          <div className="netflix-footer-top">
            <div className="netflix-footer-col">
              <h4>Direct Contact</h4>
              <p>
                <TbMail className="footer-icon" /> yashrspatil7313@gmail.com
              </p>
              <p>
                <TbPhone className="footer-icon" /> +91 9359307313
              </p>
              <p>
                <TbMapPin className="footer-icon" /> Maharashtra, India
              </p>
            </div>

            <div className="netflix-footer-col">
              <h4>Education &amp; Focus</h4>
              <p>Bachelor of Engineering (B.E.)</p>
              <p>Computer Science &amp; Design (2023 – 2027)</p>
              <a href="#work" className="netflix-footer-link">
                View All Projects ↗
              </a>
            </div>

            <div className="netflix-footer-col netflix-footer-actions">
              <h4>Connect &amp; Assets</h4>
              <div className="netflix-footer-socials">
                <a
                  href="https://github.com/yashpatil7313"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="netflix-social-pill"
                >
                  <FaGithub /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/yash-patil-468276352/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="netflix-social-pill"
                >
                  <FaLinkedinIn /> LinkedIn
                </a>
              </div>
              <a
                href="/Yash_Patil_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="netflix-resume-pill"
              >
                <TbDownload /> Download Resume
              </a>
            </div>
          </div>

          {/* Huge Architectural Watermark Name */}
          <div className="netflix-footer-watermark" aria-hidden="true">
            <h2>YASH PATIL</h2>
          </div>

          <div className="netflix-footer-copyright">
            <p>© {new Date().getFullYear()} Yash Patil. Built for High-Performance Production.</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
