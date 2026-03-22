import * as THREE from "three";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.bias = -0.0001;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 512; // Optimized for performance
  pointLight.shadow.mapSize.height = 512;
  scene.add(pointLight);

  // Dedicated Face Fill Light (Front-Center-Left)
  const faceLight = new THREE.PointLight(0xffffff, 0, 25, 2);
  faceLight.position.set(-4, 6, 10); 
  faceLight.castShadow = false; // Disable for performance
  scene.add(faceLight);

  // Ultra-Bright Central Studio Light (Direct Front - High Intensity)
  const studioLight = new THREE.PointLight(0xffffff, 0, 35, 1.5);
  studioLight.position.set(0, 7, 15); 
  studioLight.castShadow = false; // Disable for performance
  scene.add(studioLight);

  // Soft Hemisphere Ambient Fill (Maximum global visibility)
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0x1a1a1a, 0);
  scene.add(ambientLight);

  scene.environment = null;
  scene.environmentIntensity = 0;

  function setPointLight(screenLight: THREE.Object3D | null) {
    if (!(screenLight instanceof THREE.Mesh)) {
      pointLight.intensity = 0;
      return;
    }

    const material = Array.isArray(screenLight.material)
      ? screenLight.material[0]
      : screenLight.material;

    if (!(material instanceof THREE.MeshStandardMaterial)) {
      pointLight.intensity = 0;
      return;
    }

    pointLight.intensity = material.opacity > 0.9 ? material.emissiveIntensity * 20 : 0;
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(directionalLight, {
      intensity: 1.5,
      duration: duration,
      ease: ease,
    });
    gsap.to(faceLight, {
      intensity: 4.5, // Brighter face fill
      duration: duration,
      ease: ease,
    });
    gsap.to(studioLight, {
      intensity: 6.0, // High-end studio fill
      duration: duration,
      ease: ease,
    });
    gsap.to(ambientLight, {
      intensity: 1.5, // Brighter global fill
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
