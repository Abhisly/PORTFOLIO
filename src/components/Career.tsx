import { useEffect, useRef } from "react";
import "./styles/Career.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const Career = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    let mouseX = 0;
    let mouseY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateTilt = () => {
      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll(".career-grid-card");
      
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const rotateX = (mouseY - cardCenterY) * 0.04;
        const rotateY = (cardCenterX - mouseX) * 0.04;

        gsap.set(card, {
          rotateX: rotateX,
          rotateY: rotateY,
        });
      });

      rafId = requestAnimationFrame(updateTilt);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(updateTilt);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const careerData = [
    {
      role: "Full Stack Developer",
      company: "AI Health Chatbot (SIH)",
      year: "AUG 2025",
      description: "Built a full-stack AI health chatbot using React.js and Flask/Python REST API, featuring async data fetching, mobile-first layouts, and reusable state-driven components for symptom guidance and disease awareness. Led Git workflow for a 5-member team."
    },
    {
      role: "Full Stack Developer",
      company: "AURA — AI Skill Intelligence",
      year: "2025",
      description: "Engineered an AI-powered skill evaluation system with domain-specific MCQ assessments, personalized learning roadmaps, and an AI mentor module delivering context-aware responses based on user performance data."
    },
    {
      role: "Full Stack Developer",
      company: "ZeroWaste — Food Redistribution",
      year: "2026",
      description: "Building a full-stack platform connecting restaurants, NGOs, and delivery agents with multi-portal role-based access, real-time donation workflows, live status tracking, map-based route tracking, and analytics dashboards."
    },
    {
      role: "Frontend Developer",
      company: "Personal Portfolio",
      year: "NOW",
      description: "Designed and deployed a responsive portfolio using Next.js (App Router), TypeScript, and Tailwind CSS with REST API integration, SWR data fetching, smooth animations, dark/light theme toggle, and SEO optimization."
    }
  ];

  return (
    <div className="career-section section-container" id="career" ref={sectionRef}>
      <div className="career-bg-glow-main"></div>
      <div className="career-grid-overlay"></div>
      
      <div className="career-wrapper grid-mode">
        <div className="career-title-area grid-title">
          <div className="career-subtitle">PROFESSIONAL_JOURNEY</div>
          <h2 className="career-h2">
            My career <span>&</span> experience
          </h2>
        </div>
        
        <div className="career-grid-layout">
          {careerData.map((item, index) => (
            <div key={index} className="career-grid-item">
              <div className="career-grid-card">
                <div className="card-top-accent"></div>
                <div className="card-glass-content">
                  <div className="card-meta">
                    <span className="card-index">0{index + 1}</span>
                    <span className="card-year-tag">{item.year}</span>
                  </div>
                  
                  <div className="card-main-info">
                    <h3 className="card-role-title">{item.role}</h3>
                    <h4 className="card-company-tag">{"@ " + item.company}</h4>
                  </div>
                  
                  <p className="card-description-text">{item.description}</p>
                  
                  <div className="card-bottom-hud">
                    <div className="hud-line"></div>
                    <div className="hud-status">
                      <span className="status-dot"></span>
                      <span className="status-text">SYSTEM_ACTIVE</span>
                    </div>
                  </div>
                </div>
                <div className="card-outer-glow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
