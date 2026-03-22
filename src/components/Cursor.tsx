import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const coords = coordsRef.current!;
    const status = statusRef.current!;
    
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;
    let isMagnetic = false;
    let lastGlitchTime = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      const magneticEl = target.closest('[data-cursor="magnetic"]') as HTMLElement;
      const clickableEl = target.closest('a, button, [role="button"], .cursor-pointer, .hover-link') as HTMLElement;

      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Target position for magnetic effect
        dotX = centerX + (mouseX - centerX) * 0.3;
        dotY = centerY + (mouseY - centerY) * 0.3;
        ringX = centerX;
        ringY = centerY;

        if (!isMagnetic) {
          gsap.to(ring, { scale: 1.8, duration: 0.4, ease: "power2.out" });
          ring.classList.add("is-magnetic");
          if (status) status.innerText = "LOCKED_ON";
          isMagnetic = true;
        }
      } else {
        if (isMagnetic) {
          gsap.to(ring, { scale: 1, duration: 0.4, ease: "power2.out" });
          ring.classList.remove("is-magnetic");
          if (status) status.innerText = "SYS_ACTIVE";
          isMagnetic = false;
        }

        if (clickableEl) {
          if (!ring.classList.contains("is-clickable")) {
            gsap.to(ring, { scale: 0.8, duration: 0.3, ease: "power2.out" });
            ring.classList.add("is-clickable");
            if (status) status.innerText = "INTERACT";
          }
        } else {
          if (ring.classList.contains("is-clickable")) {
            gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
            ring.classList.remove("is-clickable");
            if (status) status.innerText = "SYS_ACTIVE";
          }
        }
      }

      // Performance: Throttled glitch trigger
      const speed = Math.abs(e.movementX) + Math.abs(e.movementY);
      const now = Date.now();
      if (speed > 25 && now - lastGlitchTime > 200) {
        lastGlitchTime = now;
        gsap.fromTo(".dot-glitch", 
          { opacity: 0.5, scale: 1 },
          { opacity: 0, scale: 1.8, duration: 0.3, ease: "power2.out" }
        );
      }
    };

    const render = () => {
      if (isMagnetic) {
        // Smoothly interpolate dot to magnetic target
        const currentDotX = gsap.getProperty(dot, "x") as number || 0;
        const currentDotY = gsap.getProperty(dot, "y") as number || 0;
        gsap.set(dot, { 
          x: currentDotX + (dotX - currentDotX) * 0.2, 
          y: currentDotY + (dotY - currentDotY) * 0.2 
        });
        
        // Ring follows magnetic center
        const currentRingX = gsap.getProperty(ring, "x") as number || 0;
        const currentRingY = gsap.getProperty(ring, "y") as number || 0;
        gsap.set(ring, { 
          x: currentRingX + (ringX - currentRingX) * 0.15, 
          y: currentRingY + (ringY - currentRingY) * 0.15 
        });
      } else {
        // Standard smooth following
        const currentDotX = gsap.getProperty(dot, "x") as number || 0;
        const currentDotY = gsap.getProperty(dot, "y") as number || 0;
        gsap.set(dot, { 
          x: currentDotX + (mouseX - currentDotX) * 0.4, 
          y: currentDotY + (mouseY - currentDotY) * 0.4 
        });

        const currentRingX = gsap.getProperty(ring, "x") as number || 0;
        const currentRingY = gsap.getProperty(ring, "y") as number || 0;
        gsap.set(ring, { 
          x: currentRingX + (mouseX - currentRingX) * 0.15, 
          y: currentRingY + (mouseY - currentRingY) * 0.15 
        });
      }

      if (coords) {
        coords.innerText = `${Math.round(mouseX)} : ${Math.round(mouseY)}`;
      }

      requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove);
    const rafId = requestAnimationFrame(render);

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.4, duration: 0.2 });
      dot.classList.add("is-clicking");
      if (status) status.innerText = "EXECUTING";
    };
    const onMouseUp = () => {
      gsap.to(ring, { scale: isMagnetic ? 1.8 : 1, duration: 0.3 });
      dot.classList.remove("is-clicking");
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}>
        <div className="dot-inner"></div>
        <div className="dot-glitch"></div>
      </div>
      <div className="cursor-ring" ref={ringRef}>
        <div className="ring-bracket tl"></div>
        <div className="ring-bracket tr"></div>
        <div className="ring-bracket bl"></div>
        <div className="ring-bracket br"></div>
        <div className="ring-center-cross"></div>
        <div className="cursor-coords" ref={coordsRef}>0 : 0</div>
        <div className="cursor-status" ref={statusRef}>SYS_ACTIVE</div>
      </div>
    </>
  );
};

export default Cursor;
