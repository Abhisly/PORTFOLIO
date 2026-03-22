import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Global ScrollTrigger Performance Optimization
ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: 1.5, // Smoother tracking
      invalidateOnRefresh: true,
      fastScrollEnd: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: 2, // Smoother transitions
      invalidateOnRefresh: true,
      fastScrollEnd: true,
    },
  });
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: 1, // Balanced for focus
      invalidateOnRefresh: true,
      fastScrollEnd: true,
    },
  });
  let screenLightMesh: THREE.Mesh | null = null;
  let monitorMesh: THREE.Mesh | null = null;

  character?.children.forEach((object) => {
    if (object.name === "Plane004") {
      object.children.forEach((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const material = Array.isArray(child.material) ? child.material[0] : child.material;
        if (!material) return;
        material.transparent = true;
        material.opacity = 0;
        if (material.name === "Material.018" && material instanceof THREE.MeshStandardMaterial) {
          monitorMesh = child;
          material.color.set("#111111");
          material.emissive.set("#ffffff");
          material.emissiveIntensity = 8;
          material.roughness = 0.05;
          material.metalness = 0.9;
        }
      });
    }
    if (object.name === "screenlight") {
      if (!(object instanceof THREE.Mesh)) return;
      const material = Array.isArray(object.material) ? object.material[0] : object.material;
      if (!(material instanceof THREE.MeshStandardMaterial)) return;

      material.transparent = true;
      material.opacity = 0;
      material.emissive.set("#ffffff");
      
      gsap.to(material, {
        emissiveIntensity: 4,
        duration: 0.15,
        repeat: -1,
        yoyo: true,
        ease: "none",
        repeatRefresh: true,
        onRepeat: () => {
          gsap.set(material, { emissiveIntensity: 2 + Math.random() * 4 });
        }
      });
      screenLightMesh = object;
    }
  });
  const neckBone = character?.getObjectByName("spine005") || null;
  if (window.innerWidth > 1024) {
    if (character) {
      const getMaterial = (mesh: THREE.Mesh): THREE.Material | null => {
        if (Array.isArray(mesh.material)) return mesh.material[0] ?? null;
        return mesh.material;
      };

      const monitorMaterial = monitorMesh ? getMaterial(monitorMesh) : null;
      const screenLightMaterial = screenLightMesh ? getMaterial(screenLightMesh) : null;
      const monitorPositionTarget = (monitorMesh as THREE.Object3D | null)?.position;

      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      tl2
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
        .to(neckBone ? neckBone.rotation : { x: 0 }, { x: 0.6, delay: 2, duration: 3 }, 0)
        .to(monitorMaterial ? monitorMaterial : { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
        .to(screenLightMaterial ? screenLightMaterial : { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6 },
          0
        )
        .fromTo(
          monitorPositionTarget ?? { y: 0, z: 0 },
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0
        )
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        );

      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 4, ease: "none", delay: 1 },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    }
  } else {
    if (character) {
      const tM2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      });
      tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
    }
  }
}

export function setAllTimeline() {
  const careerItems = gsap.utils.toArray<HTMLElement>(".career-grid-item");
  
  careerItems.forEach((item, index) => {
    gsap.fromTo(item, 
      { 
        opacity: 0, 
        y: 100,
        rotateX: -20,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1 // Staggered entrance
      }
    );
  });

  // Fade in the title area
  gsap.fromTo(".career-title-area",
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".career-title-area",
        start: "top 95%",
        toggleActions: "play none none reverse"
      }
    }
  );
}
