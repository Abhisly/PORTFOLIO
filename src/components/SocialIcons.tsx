import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect, useRef } from "react";
import HoverLinks from "./HoverLinks";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SocialIcons = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const social = document.getElementById("social") as HTMLElement;

    // Magnetic Animation Logic
    const items = social.querySelectorAll("span");
    items.forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      let mouseX = 0;
      let mouseY = 0;
      let currentX = 0;
      let currentY = 0;
      let isHovering = false;

      const updatePosition = () => {
        if (isHovering) {
          currentX += (mouseX - currentX) * 0.15;
          currentY += (mouseY - currentY) * 0.15;
        } else {
          currentX += (0 - currentX) * 0.15;
          currentY += (0 - currentY) * 0.15;
        }

        link.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(x * x + y * y);

        if (distance < 40) {
          isHovering = true;
          mouseX = x * 0.6;
          mouseY = y * 0.6;
        } else {
          isHovering = false;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();
    });

    // Scroll Visibility Logic: Disappear IMMEDIATELY when leaving Landing
    ScrollTrigger.create({
      trigger: ".landing-section",
      start: "bottom 10%",
      onEnter: () => gsap.to(".social-icons", { opacity: 0, pointerEvents: "none", duration: 0.2 }),
      onLeaveBack: () => gsap.to(".social-icons", { opacity: 1, pointerEvents: "auto", duration: 0.3 }),
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="icons-section" ref={sectionRef}>
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/Abhisly" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://linkedin.com/in/abhi-venkat-sai" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </span>
      </div>
      <a 
        className="resume-button" 
        href="/resume.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span style={{ color: '#0ea5e9' }}>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
