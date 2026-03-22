import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      decryptFile("/models/character.enc?v=2", "MyCharacter12")
        .then((encryptedBlob) => {
          const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

          loader.load(
            blobUrl,
            async (gltf) => {
              const character = gltf.scene;
              await renderer.compileAsync(character, camera, scene);
              character.traverse((child) => {
                if (!(child instanceof THREE.Mesh)) return;

                const mesh = child;
                const cloned = Array.isArray(mesh.material)
                  ? mesh.material[0]?.clone()
                  : mesh.material.clone();
                const mat = cloned as THREE.MeshStandardMaterial;
                mesh.material = mat;

                mat.envMapIntensity = 0;
                mat.emissive.set(0x000000);
                mat.metalness = 0;

                if (mesh.name.includes("CAP")) {
                  mesh.visible = true;
                } else if (mesh.name === "Hair" || mesh.name === "Eyebrow") {
                  mesh.visible = true;
                  mat.color = new THREE.Color("#050505");
                  mat.roughness = 0.3;
                } else if (mesh.name.includes("Plane010")) {
                  mesh.visible = false;
                } else if (
                  mesh.name.toLowerCase().includes("face") ||
                  mesh.name.toLowerCase().includes("head") ||
                  mesh.name === "Neck" ||
                  mesh.name === "Hand" ||
                  mesh.name === "Ear001"
                ) {
                  mat.color = new THREE.Color("#ffffff");
                  mat.roughness = 0.35;
                  mat.emissive = new THREE.Color("#2a2a2a");
                  mat.emissiveIntensity = 0.5;

                  if (mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
                    const targets: Record<string, number> = {
                      Smile: 0.85,
                      mouthSmile: 0.85,
                      MouthSmile: 0.85,
                      Smile_Left: 0.7,
                      Smile_Right: 0.7,
                      mouthSmile_L: 0.7,
                      mouthSmile_R: 0.7,
                      EyeSquint: 0.4,
                      eyeSquint: 0.4,
                      EyeSquint_L: 0.4,
                      EyeSquint_R: 0.4,
                      BrowsUp: 0.3,
                      browsUp: 0.3,
                      mouthOpen: 0.05,
                    };

                    Object.entries(targets).forEach(([target, value]) => {
                      const index = mesh.morphTargetDictionary?.[target];
                      if (index === undefined) return;
                      mesh.morphTargetInfluences![index] = value;
                    });
                  }
                }

                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.frustumCulled = true;
              });
              resolve(gltf);
              setCharTimeline(character, camera);
              setAllTimeline();
              character.getObjectByName("footR")!.position.y = 3.36;
              character.getObjectByName("footL")!.position.y = 3.36;

              dracoLoader.dispose();
            },
            undefined,
            (error) => {
              console.error("Error loading GLTF model:", error);
              reject(error);
            }
          );
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };

  return { loadCharacter };
};

export default setCharacter;
