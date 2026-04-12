import { useEffect, useState, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const loadingTexts = [
    "INITIALIZING_CORE...",
    "LOADING_ASSETS...",
    "COMPILING_MODULES...",
    "ESTABLISHING_CONNECTION...",
    "SYSTEM_READY"
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 800);
    return () => clearInterval(textInterval);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Background animation
    gsap.to(".cyber-grid", {
      backgroundPosition: "100px 100px",
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Floating animation for the card
    gsap.to(cardRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Rotating HUD rings
    gsap.to(".ring-outer", { rotation: 360, duration: 20, repeat: -1, ease: "none" });
    gsap.to(".ring-mid", { rotation: -360, duration: 15, repeat: -1, ease: "none" });
    gsap.to(".ring-inner", { rotation: 360, duration: 10, repeat: -1, ease: "none" });
    gsap.to(".ring-dash", { rotation: -360, duration: 30, repeat: -1, ease: "none" });

    // Floating animation for the core
    gsap.to(".avs-core-wrapper", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, { scope: containerRef });

  // Mouse parallax effect for HUD elements
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5);
      mouseY = (e.clientY / window.innerHeight - 0.5);
    };

    const updateParallax = () => {
      // Move background huge number
      gsap.set(".huge-progress-bg", {
        x: mouseX * 50,
        y: mouseY * 50,
      });

      // Tilt core
      gsap.set(".avs-core-wrapper", {
        rotationY: mouseX * 15,
        rotationX: -mouseY * 15,
      });

      // Shift corner elements slightly
      gsap.set(".hud-corner", {
        x: mouseX * -10,
        y: mouseY * -10,
      });

      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (percent < 100) return;
    const timeoutId = window.setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => window.clearTimeout(timeoutId);
  }, [percent]);

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        // Entrance animation for the portfolio
        const tl = gsap.timeline({
          onComplete: () => {
            if (module.initialFX) {
              module.initialFX();
            }
            setIsLoading(false);
          }
        });

        tl.to(".loading-container", {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "power4.inOut"
        })
        .to(".loading-screen", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut"
        });
      }
    });
  }, [isLoaded]);

  const progress = percent;

  return (
    <div className="loading-screen hud-mode" ref={containerRef}>
      {/* Background Layers */}
      <div className="cyber-grid"></div>
      <div className="scanlines"></div>
      <div className="noise-bg"></div>
      <div className="vignette"></div>

      {/* Floating Background Text (Data Stream) */}
      <div className="bg-data-stream left">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="data-line">0x{Math.random().toString(16).substr(2, 8).toUpperCase()}</div>
        ))}
      </div>
      <div className="bg-data-stream right">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="data-line">0x{Math.random().toString(16).substr(2, 8).toUpperCase()}</div>
        ))}
      </div>

      {/* Large Interactive Background Progress */}
      <div className="huge-progress-bg" style={{ 
        transform: `translate(${progress * 0.1}px, ${progress * 0.1}px)` 
      }}>
        {Math.round(progress)}
      </div>

      <div className="loading-container full-page">
        {/* HUD Corner Elements */}
        <div className="hud-corner top-left">
          <div className="corner-bracket"></div>
          <div className="hud-stat">
            <span className="label">SYSTEM_STATUS</span>
            <span className="value status-ok">CONNECTED</span>
          </div>
          <div className="hud-stat">
            <span className="label">LATENCY</span>
            <span className="value">12ms</span>
          </div>
        </div>

        <div className="hud-corner top-right">
          <div className="corner-bracket"></div>
          <div className="hud-stat text-right">
            <span className="label">CORE_VERSION</span>
            <span className="value">v2.0.26</span>
          </div>
          <div className="hud-stat text-right">
            <span className="label">POWER</span>
            <div className="battery-bar">
              <div className="battery-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="hud-corner bottom-left">
          <div className="corner-bracket"></div>
          <div className="hud-stat">
            <span className="label">MEMORY_ALLOC</span>
            <span className="value">{Math.round(progress * 10.24)} MB</span>
          </div>
          <div className="hud-stat">
            <span className="label">UPTIME</span>
            <span className="value">99.9%</span>
          </div>
        </div>

        <div className="hud-corner bottom-right">
          <div className="corner-bracket"></div>
          <div className="hud-stat text-right">
            <span className="label">PROCESS_ID</span>
            <span className="value">#8842-X</span>
          </div>
          <div className="hud-stat text-right">
            <span className="label">GEOLOC</span>
            <span className="value">GLOBAL_NET</span>
          </div>
        </div>

        {/* Central Core HUD */}
        <div className="avs-core-wrapper" ref={logoRef}>
          <div className="core-rings">
            <div className="core-ring ring-outer"></div>
            <div className="core-ring ring-mid"></div>
            <div className="core-ring ring-inner"></div>
            <div className="core-ring ring-dash"></div>
          </div>
          
          <div className="core-content">
            <div className="core-logo">WELCOME TO MY PORTFOLIO</div>
            <div className="core-status-text">{loadingTexts[currentText]}</div>
            
            <div className="core-progress-display">
              <svg className="core-svg" viewBox="0 0 200 200">
                <circle className="core-track" cx="100" cy="100" r="85"/>
                <circle 
                  className="core-fill" 
                  cx="100" 
                  cy="100" 
                  r="85"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 85}`,
                    strokeDashoffset: `${2 * Math.PI * 85 * (1 - progress / 100)}`
                  }}
                />
              </svg>
              <div className="core-percent">
                <span className="num">{Math.round(progress)}</span>
                <span className="unit">%</span>
              </div>
            </div>
          </div>
          
          <div className="core-glow-field"></div>
        </div>

        {/* Bottom Status Bar */}
        <div className="hud-bottom-bar">
          <div className="bar-label-group">
            <span className="bar-label">INITIALIZING_PORTFOLIO_CORE</span>
            <span className="bar-percentage">{Math.round(progress)}%</span>
          </div>
          <div className="bar-container">
            <div className="bar-fill" style={{ width: `${progress}%` }}>
              <div className="bar-glow-tip"></div>
            </div>
          </div>
        </div>
        
        <div className={`hud-enter-action ${percent === 100 && "active"}`} onClick={() => setIsLoaded(true)}>
          <button className="hud-button">
            <div className="btn-bg"></div>
            <span className="btn-text">ACCESS_CORE_SYSTEM</span>
            <div className="btn-glow"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      const rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
