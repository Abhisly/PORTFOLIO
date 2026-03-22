import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  const main = document.getElementsByTagName("main")[0];
  if (main) {
    main.classList.add("main-active");
  }
  
  // Background transition
  gsap.to("body", {
    backgroundColor: "#030712",
    duration: 1,
    ease: "power2.inOut",
  });

  // Smooth entry for the main wrapper
  gsap.fromTo("#smooth-wrapper", 
    { y: 50, opacity: 0, scale: 0.98 },
    { y: 0, opacity: 1, scale: 1, duration: 1.8, ease: "power4.out", delay: 0.2 }
  );

  // Enhanced entrance for landing content
  gsap.fromTo(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1", ".landing-h2-info"],
    { opacity: 0, y: 40, filter: "blur(10px)" },
    {
      opacity: 1,
      duration: 1.5,
      filter: "blur(0px)",
      ease: "power3.out",
      y: 0,
      stagger: 0.15,
      delay: 0.4,
    }
  );

  // Nav and social icons fade in
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0, y: -20 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.6,
    }
  );
}

