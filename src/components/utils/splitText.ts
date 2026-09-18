import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FlowElement extends HTMLElement {
  anim?: gsap.core.Animation;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });

  const textElements: NodeListOf<FlowElement> = document.querySelectorAll(
    ".title, .para, .certificates-header h2, .certificates-subtitle, .work-container h2, .contact-container h3, .about-stat-card"
  );

  textElements.forEach((el: FlowElement) => {
    if (el.anim) {
      el.anim.kill();
    }

    el.anim = gsap.fromTo(
      el,
      { autoAlpha: 0, y: 35 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}
