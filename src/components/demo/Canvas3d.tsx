import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three-stdlib";

type threeDTypes = {
  src: string;
};

const Canvas3d: React.FC<threeDTypes> = ({ src }) => {
  const { theme, showGrid, rotationSpeed } = useControls("Scene Settings", {
    theme: { value: "light", label: "Theme", options: ["light", "dark"] },
    showGrid: { value: true, label: "Grid" },
    rotationSpeed: {
      value: 0,
      label: "Auto Rotation",
      max: 10,
      min: 0,
      step: 1,
    },
  });

  const { directionalLight } = useControls("Light Settings", {
    directionalLight: { value: 2, label: "Direction", min: 0, max: 10 },
  });

  const canvasTheme = theme === "light" ? "#F5F5F5" : "#000";
  return (
    <div className="flex justify-center items-center">
      <div className="absolute right-3 top-16 z-20">
        <Leva fill />
      </div>
      <Canvas
        style={{
          width: "100%",
          height: "850px",
          backgroundColor: canvasTheme,
        }}
        camera={{ position: [0, 1, 5], fov: 100 }}
        shadows
      >
        <pointLight position={[10, 10, 10]} />
        <Model src={src} />

        <OrbitControls
          autoRotate
          autoRotateSpeed={rotationSpeed}
          enableZoom={true}
          minDistance={2}
          maxDistance={10}
          dampingFactor={0.1}
        />
        <>
          <ambientLight />
          <directionalLight position={[5, 5, 5]} intensity={directionalLight} />
          <directionalLight
            position={[-5, 5, 5]}
            intensity={directionalLight}
          />
          <directionalLight
            position={[0, 5, -5]}
            intensity={directionalLight}
          />
        </>

        {showGrid && <gridHelper args={[25, 10]} position={[0, -1, 0]} />}
      </Canvas>
    </div>
  );
};

const Model: React.FC<threeDTypes> = ({ src }) => {
  const modelRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const model = useLoader(OBJLoader, src);

  useEffect(() => {
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        // Gán vật liệu luôn
        mesh.material = new THREE.MeshStandardMaterial({
          color: "gray",
          metalness: 0.1,
          roughness: 0.9,
          side: THREE.DoubleSide,
        });
      }
    });

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z);

    console.log("Model center:", center);
    console.log("Model size:", size);
    console.log("maxAxis:", maxAxis);

    model.position.sub(center);
    model.scale.setScalar(0.01);

    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [model, camera]);

  return <primitive object={model} ref={modelRef} />;
};

export default Canvas3d;
