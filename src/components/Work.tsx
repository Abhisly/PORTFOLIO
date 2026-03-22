import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    title: "AI HEALTH CHATBOT",
    category: "PUBLIC HEALTH",
    tools: "REACT.JS, FLASK",
    description: "NEURAL_NODE_01: ADVANCED NLP DIAGNOSTICS SYSTEM",
    accent: "#0ea5e9"
  },
  {
    title: "AI CHESS ENGINE",
    category: "GAME THEORY",
    tools: "JS, PYTHON, OOP",
    description: "NEURAL_NODE_02: ADAPTIVE PLAYSTYLE PREDICTION ENGINE",
    accent: "#38bdf8"
  },
  {
    title: "VIRTUAL ARCHIVE",
    category: "WEB DEVELOPMENT",
    tools: "NEXT.JS, THREE.JS",
    description: "NEURAL_NODE_03: IMMERSIVE 3D DATA VISUALIZATION",
    accent: "#0ea5e9"
  },
];

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5);
      mouseY = (e.clientY / window.innerHeight - 0.5);
    };

    const updateParallax = () => {
      gsap.set(".theme-grid", {
        x: mouseX * 30,
        y: mouseY * 30,
      });

      gsap.set(".theme-glow-sphere", {
        x: mouseX * -50,
        y: mouseY * -50,
      });

      gsap.set(".bg-data-node", {
        x: mouseX * 100,
        y: mouseY * 100,
      });

      requestAnimationFrame(updateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(updateParallax);

    const sections = gsap.utils.toArray<HTMLElement>(".project-immersive-section");
    // ... rest of existing section animations ...
    
    sections.forEach((section) => {
      const title = section.querySelector(".immersive-title");
      const details = section.querySelector(".immersive-details");
      const visitBtn = section.querySelector(".immersive-visit-portal");
      const backgroundText = section.querySelector(".immersive-bg-text");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        }
      });

      tl.fromTo(backgroundText, 
        { opacity: 0, x: -100, scale: 0.8 },
        { opacity: 0.05, x: 0, scale: 1, duration: 1.5, ease: "power4.out" }
      )
      .fromTo(title,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
        "-=1"
      )
      .fromTo(details,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(visitBtn,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="work-section immersive-mode" ref={containerRef} id="work">
      {/* Immersive Theme Background */}
      <div className="immersive-theme-bg">
        <div className="theme-grid"></div>
        <div className="theme-glow-sphere"></div>
        <div className="theme-vignette"></div>
        
        {/* Kinetic HUD Layers */}
        <div className="bg-neural-network">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="bg-data-node" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}>
              <span className="node-label">0x{Math.random().toString(16).substr(2, 4).toUpperCase()}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-code-stream left">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="code-line">PROCESS_INIT_NODE_{i}::CONNECTED</div>
          ))}
        </div>
        
        <div className="bg-light-beams">
          <div className="beam beam-1"></div>
          <div className="beam beam-2"></div>
        </div>
      </div>

      <div className="immersive-global-hud">
        <div className="hud-corner-tl">PROJECT_LOG_ACTIVE</div>
        <div className="hud-corner-tr">V2.0.26</div>
        <div className="hud-side-label">DATA_VISUALIZATION_STREAM</div>
      </div>

      {/* Prominent Section Header */}
      <div className="projects-hero-header">
        <div className="hero-subtitle-box">
          <span className="hero-subtitle">ARCHIVE_01</span>
        </div>
        <h1 className="hero-main-title">PROJECTS</h1>
        <div className="hero-line-accent"></div>
      </div>

      <div className="immersive-projects-container">
        {projects.map((project, index) => (
          <section key={index} className="project-immersive-section">
            <div className="immersive-bg-text">{project.title}</div>
            
            <div className="immersive-content-wrapper">
              <div className="immersive-index-group">
                <span className="immersive-num">0{index + 1}</span>
                <div className="immersive-line"></div>
                <span className="immersive-cat">{project.category}</span>
              </div>

              <div className="immersive-main-display">
                <h2 className="immersive-title" data-text={project.title}>
                  {project.title}
                </h2>
                
                <div className="immersive-details">
                  <div className="immersive-tools">{project.tools}</div>
                  <p className="immersive-desc">{project.description}</p>
                </div>

                <div className="immersive-action-area">
                  <Link 
                    to={`/project/${index}`} 
                    className="immersive-visit-portal"
                    data-cursor="magnetic"
                  >
                    <div className="portal-rings">
                      <div className="ring ring-1"></div>
                      <div className="ring ring-2"></div>
                      <div className="ring ring-3"></div>
                    </div>
                    <div className="portal-content">
                      <span className="portal-text">VISIT</span>
                      <svg viewBox="0 0 24 24" className="portal-arrow">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" fill="none" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="portal-glow" style={{ background: project.accent }}></div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="immersive-section-footer">
              <div className="footer-status">
                <span className="status-bit"></span>
                <span className="status-bit"></span>
                <span className="status-bit"></span>
                <span className="status-text">DEPLOYED_STABLE</span>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Work;
