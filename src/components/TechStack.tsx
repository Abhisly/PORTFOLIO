import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import "./styles/TechStack.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Tech = {
  name: string;
  icon: string;
  type: string;
  desc: string;
  level: string;
};

const techData: Tech[] = [
  { name: "React", icon: "/images/react.webp", type: "ENGINE", desc: "Core frontend architecture for building high-performance interactive interfaces.", level: "ADVANCED" },
  { name: "TypeScript", icon: "/images/typescript.webp", type: "LOGIC", desc: "Strict type-safety for scalable, enterprise-grade application logic.", level: "ADVANCED" },
  { name: "JavaScript", icon: "/images/javascript.webp", type: "CORE", desc: "Foundational scripting language powering the entire modern web ecosystem.", level: "EXPERT" },
  { name: "Angular", icon: "/images/angular.webp", type: "FRAMEWORK", desc: "Comprehensive framework for developing robust single-page applications.", level: "INTERMEDIATE" },
  { name: "Java", icon: "/images/java.png", type: "BACKEND", desc: "High-level object-oriented language for backend services and enterprise software.", level: "INTERMEDIATE" },
  { name: "Python", icon: "/images/python.webp", type: "SCRIPT", desc: "Versatile language for backend development, automation, and data processing.", level: "ADVANCED" },
  { name: "C++", icon: "/images/C++.webp", type: "SYSTEM", desc: "Low-level performance-critical system development and hardware interaction.", level: "BASICS" },
  { name: "HTML5", icon: "/images/HTML5.png", type: "MARKUP", desc: "Semantic structuring for accessible and standards-compliant web content.", level: "EXPERT" },
  { name: "CSS3", icon: "/images/CSS3.png", type: "STYLE", desc: "Advanced styling systems including animations, layouts, and responsive design.", level: "EXPERT" },
  { name: "MongoDB", icon: "/images/mongodb.png", type: "DATA", desc: "NoSQL document-based database management for modern application data.", level: "INTERMEDIATE" },
  { name: "MySQL", icon: "/images/mysql.png", type: "DATA", desc: "Relational database systems for structured data storage and complex querying.", level: "ADVANCED" },
];

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const [activeTech, setActiveTech] = useState<Tech | null>(null);
  const timeline1Ref = useRef<gsap.core.Timeline | null>(null);
  const timeline2Ref = useRef<gsap.core.Timeline | null>(null);

  // Split techData into two rows
  const row1Data = techData.slice(0, Math.ceil(techData.length / 2));
  const row2Data = techData.slice(Math.ceil(techData.length / 2));

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const setupMarquee = (marquee: HTMLElement | null, direction: number, speed: number) => {
      if (!marquee) return null;
      const items = marquee.querySelectorAll(".tech-item");
      const totalWidth = Array.from(items).reduce((acc, item) => acc + item.clientWidth + 40, 0);

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      // Move half the doubled width (totalWidth/2)
      tl.to(marquee, {
        x: direction * (totalWidth / 2),
        duration: speed,
        onReverseComplete: () => {
          tl.totalTime(tl.rawTime() + tl.duration() * 100);
        }
      });

      return tl;
    };

    // Row 1: Left to Right (slower speed: 50s)
    timeline1Ref.current = setupMarquee(marquee1Ref.current, -1, 50);
    // Row 2: Right to Left (slower speed: 50s)
    timeline2Ref.current = setupMarquee(marquee2Ref.current, 1, 50);

    // Initial position for row 2 to start from offset
    if (marquee2Ref.current) {
      const items = marquee2Ref.current.querySelectorAll(".tech-item");
      const totalWidth = Array.from(items).reduce((acc, item) => acc + item.clientWidth + 40, 0);
      gsap.set(marquee2Ref.current, { x: -totalWidth / 2 });
    }

    // Entrance animation
    gsap.fromTo(".ribbon-wrapper", 
      { opacity: 0, scale: 0.8, rotateX: 20 },
      { 
        opacity: 1, 
        scale: 1, 
        rotateX: 0,
        duration: 2, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    return () => {
      timeline1Ref.current?.kill();
      timeline2Ref.current?.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleTechClick = (tech: Tech, e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setActiveTech(tech);
    
    // Stop both marquees
    timeline1Ref.current?.pause();
    timeline2Ref.current?.pause();

    // Highlighting effect
    const target = e.currentTarget as HTMLElement;
    gsap.to(target, { 
      scale: 1.4, 
      zIndex: 100, 
      duration: 0.6, 
      ease: "power3.out",
      boxShadow: "0 0 60px rgba(14, 165, 233, 0.6)",
      borderColor: "#0ea5e9"
    });
    
    gsap.to(".tech-item:not(.active)", { 
      opacity: 0.15, 
      filter: "blur(8px)", 
      scale: 0.85,
      duration: 0.6 
    });
  };

  const handleClose = () => {
    setActiveTech(null);
    
    // Resume both marquees
    timeline1Ref.current?.play();
    timeline2Ref.current?.play();

    // Reset items
    gsap.to(".tech-item", { 
      opacity: 1, 
      filter: "blur(0px)", 
      scale: 1,
      zIndex: 1,
      duration: 0.6,
      boxShadow: "none",
      borderColor: "rgba(14, 165, 233, 0.2)"
    });
  };

  return (
    <div className="tech-stack-section ribbon-mode dual-mode" ref={sectionRef} id="tech" onClick={handleClose}>
      <div className="ribbon-bg">
        <div className="scanline-y"></div>
        <div className="grid-overlay-horizontal"></div>
        <div className="perspective-shadow"></div>
      </div>

      <div className="ribbon-header center">
        <div className="hud-label">NEURAL_STREAM_v5.0</div>
        <h2 className="ribbon-title">MY TECH <span>STACK</span></h2>
      </div>

      <div className="ribbon-wrapper">
        {/* Ribbon Row 1: Left to Right */}
        <div className="ribbon-container row-1">
          <div className="ribbon-track" ref={marquee1Ref}>
            {[...row1Data, ...row1Data].map((tech, i) => (
              <div 
                key={i} 
                className={`tech-item ${activeTech?.name === tech.name ? 'active' : ''}`}
                onClick={(e) => handleTechClick(tech, e)}
                data-cursor="magnetic"
              >
                <div className="item-glass">
                  <div className="item-glow"></div>
                  <div className="item-icon-wrap">
                    <img src={tech.icon} alt={tech.name} className="item-icon" />
                  </div>
                  <div className="item-info">
                    <span className="item-type">{tech.type}</span>
                    <span className="item-name">{tech.name}</span>
                  </div>
                  <div className="item-border"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="ribbon-edge left"></div>
          <div className="ribbon-edge right"></div>
        </div>

        {/* Ribbon Row 2: Right to Left */}
        <div className="ribbon-container row-2">
          <div className="ribbon-track" ref={marquee2Ref}>
            {[...row2Data, ...row2Data].map((tech, i) => (
              <div 
                key={i} 
                className={`tech-item ${activeTech?.name === tech.name ? 'active' : ''}`}
                onClick={(e) => handleTechClick(tech, e)}
                data-cursor="magnetic"
              >
                <div className="item-glass">
                  <div className="item-glow"></div>
                  <div className="item-icon-wrap">
                    <img src={tech.icon} alt={tech.name} className="item-icon" />
                  </div>
                  <div className="item-info">
                    <span className="item-type">{tech.type}</span>
                    <span className="item-name">{tech.name}</span>
                  </div>
                  <div className="item-border"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="ribbon-edge left"></div>
          <div className="ribbon-edge right"></div>
        </div>
      </div>

      {activeTech && (
        <div className="quantum-hud-wrap" onClick={handleClose}>
          <div className="quantum-hud" onClick={(e) => e.stopPropagation()}>
            <div className="hud-glitch-bg"></div>
            <div className="hud-top">
              <div className="hud-id">DATA_ID: {activeTech.name.toUpperCase()}</div>
              <button className="hud-close" onClick={handleClose}>×</button>
            </div>

            <div className="hud-body">
              <div className="hud-visual">
                <div className="hud-icon-wrap">
                  <img src={activeTech.icon} alt="" className="hud-icon" />
                  <div className="hud-scanner"></div>
                </div>
                <div className="hud-metrics">
                  <div className="metric">
                    <span>SYNC_QUALITY</span>
                    <div className="m-bar"><div style={{ width: '98%' }}></div></div>
                  </div>
                  <div className="metric">
                    <span>DATA_DENSITY</span>
                    <div className="m-bar"><div style={{ width: '85%' }}></div></div>
                  </div>
                </div>
              </div>

              <div className="hud-info">
                <h3>{activeTech.name}</h3>
                <div className="hud-meta">
                  <div className="meta-tag">
                    <span className="tag-lab">RANK:</span>
                    <span className="tag-val">{activeTech.level}</span>
                  </div>
                  <div className="meta-tag">
                    <span className="tag-lab">MODULE:</span>
                    <span className="tag-val">{activeTech.type}</span>
                  </div>
                </div>
                <p className="hud-desc">{activeTech.desc}</p>
                
                <div className="hud-footer-actions">
                  <div className="action-btn">ESTABLISH_CONNECTION</div>
                  <div className="action-btn outline">ENCRYPTED_ACCESS</div>
                </div>
              </div>
            </div>

            <div className="hud-bottom">
              <div className="bottom-line"></div>
              <span>DUAL_STREAM_PAUSED // ANALYSIS_ACTIVE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStack;
