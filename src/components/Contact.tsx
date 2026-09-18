import { useState } from "react";
import { MdArrowOutward, MdCopyright, MdCheck, MdContentCopy } from "react-icons/md";
import { TbDownload } from "react-icons/tb";
import "./styles/Contact.css";

const Contact = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedText(label);
        setTimeout(() => setCopiedText(null), 2000);
      });
    }
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <div className="contact-interactive-line">
              <a className="contact-email" href="mailto:yashrspatil7313@gmail.com" data-cursor="disable">
                yashrspatil7313@gmail.com
              </a>
              <button
                type="button"
                className={`contact-copy-btn ${copiedText === "email" ? "copied" : ""}`}
                onClick={() => copyToClipboard("yashrspatil7313@gmail.com", "email")}
                title="Copy email"
                aria-label="Copy email address"
              >
                {copiedText === "email" ? <MdCheck className="copy-success" /> : <MdContentCopy />}
                {copiedText === "email" && <span className="copy-tooltip">Copied!</span>}
              </button>
            </div>
            <div className="contact-interactive-line">
              <p className="contact-details">
                <span
                  className={`contact-phone-clickable ${copiedText === "phone" ? "copied" : ""}`}
                  onClick={() => copyToClipboard("9359307313", "phone")}
                  title="Click to copy phone"
                >
                  9359307313 {copiedText === "phone" && <span className="copy-tooltip-inline">✓ Copied</span>}
                </span>
                <br />
                Maharashtra, India
              </p>
            </div>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/yashpatil7313"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/yash-patil-468276352/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <a
              href="/Yash_Patil_Resume.docx"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-resume"
            >
              <TbDownload /> Download Resume
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Built by <span>Yash Patil</span>
            </h2>
            <h5>
              <MdCopyright /> 2026 Yash Patil. All Rights Reserved.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
