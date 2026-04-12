import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/ProjectDetail.css";
import gsap from "gsap";

type Project = {
  title: string;
  category: string;
  tools: string;
  year: string;
  githubUrl: string | null;
  liveUrl: string | null;
  description: string;
  features: string[];
};

const projectData: Record<string, Project> = {
  "0": {
    title: "AI-Driven Chatbot for Public Health Awareness",
    category: "Public Health Awareness",
    tools: "React.js, Flask, Python, REST API",
    year: "AUG 2025",
    githubUrl: "https://github.com/Abhisly/AI-HEALTH-CHATBOT",
    liveUrl: null,
    description: "Built a full-stack AI health chatbot for symptom guidance and disease awareness as part of Smart India Hackathon (SIH). The frontend uses React hooks and state-driven UI patterns, while the backend exposes a Flask/Python REST API consumed via async JavaScript data fetching. Optimized for mobile-first usability and built with team Git workflows.",
    features: [
      "Reusable, state-driven React UI components",
      "Flask/Python REST API integration (async fetch)",
      "Mobile-first responsive layouts",
      "Team Git workflow (branches, PRs, conflicts) — 5-member team",
      "Symptom guidance & disease awareness module"
    ],
  },
  "1": {
    title: "ZeroWaste – Smart Food Wastage Protection & Redistribution System",
    category: "Food Donation & Logistics Platform",
    tools: "React.js / Next.js, Node.js REST APIs, MongoDB / MySQL",
    year: "2026 (BUILDING)",
    githubUrl: "https://github.com/Abhisly/ZeroWaste",
    liveUrl: "https://zero-waste-puce.vercel.app/",
    description: "Building a full-stack platform connecting restaurants, NGOs, and delivery agents to minimize food wastage. Designed as a multi-portal system with role-based access control and distinct workflows for each stakeholder, including donation scheduling, tracking, and status updates, plus map-based delivery navigation and analytics dashboards.",
    features: [
      "Multi-portal RBAC (Restaurant, NGO, Admin, Agents)",
      "Real-time donation + request workflows with tracking",
      "Dual-role Agent module (Verification + Delivery operations)",
      "Map-based route tracking & navigation simulation",
      "Interactive analytics dashboards with glassmorphism UI"
    ],
  },
  "2": {
    title: "AURA – Adaptive AI Skill Intelligence Platform",
    category: "AI Skill Evaluation Platform",
    tools: "React.js, Node.js, Supabase, PostgreSQL",
    year: "2025",
    githubUrl: "https://github.com/Abhisly/AURA",
    liveUrl: "https://aura-five-omega.vercel.app/",
    description: "Engineered a full-stack AI-powered skill evaluation system with domain-specific MCQ assessments, personalized learning roadmaps, and intelligent user-state management differentiating onboarding vs. returning users. Features an AI mentor module with context-aware responses based on user performance, paired with an immersive UI with dynamic layouts and 3D visual elements.",
    features: [
      "Domain-specific MCQ assessment engine",
      "Personalized learning roadmaps per user performance",
      "Intelligent onboarding vs. returning user differentiation",
      "AI mentor module with context-aware guidance",
      "Immersive UI with dynamic layouts, animations & 3D elements"
    ],
  },
  "3": {
    title: "Personal Portfolio Website",
    category: "Web Development",
    tools: "Next.js (App Router), TypeScript, Tailwind CSS, SWR",
    year: "2026",
    githubUrl: "https://github.com/Abhisly/PORTFOLIO",
    liveUrl: "https://portfolio-nu-sage-28.vercel.app/",
    description: "Designed and deployed a responsive personal portfolio showcasing projects, skills, and certifications. Built with Next.js App Router, TypeScript, and Tailwind, with dynamic content via REST APIs and SWR (caching + revalidation). Includes smooth animations, dark/light theming, and SEO optimizations, deployed on Vercel with CI/CD via GitHub.",
    features: [
      "Next.js App Router with client/server components",
      "SWR data fetching (cache + revalidation)",
      "Dark/light theme toggling + smooth animations",
      "SEO-focused structure and metadata",
      "Vercel deployment with GitHub CI/CD"
    ],
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
            <span className="value">{project.year}</span>
          </div>
        </div>

        <div className="detail-actions">
          {project.githubUrl ? (
            <a className="detail-action-btn" href={project.githubUrl} target="_blank" rel="noreferrer">
              GITHUB
            </a>
          ) : (
            <div className="detail-action-btn disabled">GITHUB_SOON</div>
          )}

          {project.liveUrl ? (
            <a className="detail-action-btn" href={project.liveUrl} target="_blank" rel="noreferrer">
              VIEW_LIVE
            </a>
          ) : (
            <div className="detail-action-btn disabled">LIVE_SOON</div>
          )}
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
