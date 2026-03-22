import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/ProjectDetail.css";
import gsap from "gsap";

type Project = {
  title: string;
  category: string;
  tools: string;
  description: string;
  features: string[];
};

const projectData: Record<string, Project> = {
  "0": {
    title: "AI Health Chatbot",
    category: "Public Health Awareness",
    tools: "React.js, Flask, Python, API",
    description: "A comprehensive health assistance platform using advanced NLP to provide instant health advice and symptom tracking. Built with a focus on accessibility and real-time response.",
    features: ["Instant Symptom Analysis", "Health Tracking Dashboard", "Multilingual Support"],
  },
  "1": {
    title: "AI Chess Bot",
    category: "Game Development",
    tools: "JavaScript, Python, OOP",
    description: "An intelligent chess engine that learns from player behavior. Featuring a custom-built GUI and complex move-prediction algorithms that adapt to different difficulty levels.",
    features: ["Dynamic AI Difficulty", "Move Analysis History", "3D Board Interface"],
  },
  "2": {
    title: "Personal Portfolio",
    category: "Web Development",
    tools: "Next.js, TypeScript, Tailwind",
    description: "The very portfolio you are browsing. A testament to visual-first design principles, utilizing the latest in web animation technologies and high-production UI/UX.",
    features: ["GSAP Smooth Scroll", "Three.js Integration", "Responsive 3D Character"],
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = id ? projectData[id] : null;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(containerRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    
    gsap.from(".detail-hero-title", {
      opacity: 0,
      y: 100,
      duration: 1.2,
      delay: 0.2,
      ease: "power4.out"
    });
  }, [id]);

  if (!project) return <div className="error-page">PROJECT_NOT_FOUND</div>;

  return (
    <div className="project-detail-container" ref={containerRef}>
      <div className="back-btn" onClick={() => navigate("/")}>← BACK_TO_FLOW</div>
      
      <div className="detail-hero">
        <h3 className="detail-cat">{project.category}</h3>
        <h1 className="detail-hero-title">{project.title}</h1>
        <div className="detail-meta-row">
          <div className="meta-item">
            <span className="label">TOOLS</span>
            <span className="value">{project.tools}</span>
          </div>
          <div className="meta-item">
            <span className="label">YEAR</span>
            <span className="value">2026</span>
          </div>
        </div>
      </div>

      <div className="detail-content">
        <div className="desc-section">
          <h2>OVERVIEW</h2>
          <p>{project.description}</p>
        </div>

        <div className="features-section">
          <h2>CORE_FEATURES</h2>
          <ul>
            {project.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="detail-footer-scan"></div>
    </div>
  );
};

export default ProjectDetail;
