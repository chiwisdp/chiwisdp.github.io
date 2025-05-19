import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { motion } from "framer-motion-3d";
import { Float } from "@react-three/drei";
//import { MeshWobbleMaterial } from "@react-three/drei";

interface StarFieldProps {
  canShowStarField: boolean;
}

const StarField: React.FC<StarFieldProps> = ({ canShowStarField }) => {
  const sphere = useRef(null);
  const pointSphere = useRef(null);
  const sprite = useLoader(THREE.TextureLoader, "/circle.png");
  const scalingFactor = Math.min(Math.max(window.innerWidth / 1920, 0.2), 1.4);
  const blobGeo = new THREE.IcosahedronGeometry(4, 4);
  const coords = blobGeo.attributes.position;

  return (
    <Float speed={0.05} rotationIntensity={10} floatIntensity={0}>
      <motion.group
        initial={{ scale: 0 }}
        animate={{ scale: canShowStarField ? 1 * scalingFactor : 0 }}
        transition={{
          duration: canShowStarField ? 2 : 0.1,
          delay: canShowStarField ? 0.5 : 0,
          type: "spring",
          bounce: 0.5,
        }}
      >
        <mesh ref={sphere} position={[0, 0, 0]} scale={1.01}>
          <icosahedronGeometry args={[4, 4]} />

          <meshStandardMaterial wireframe color={"#1a00b9"} />
        </mesh>
        <points ref={pointSphere}>
          <bufferGeometry>
            <bufferAttribute
              attach={"attributes-position"}
              args={[coords.array, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.2 * scalingFactor}
            map={sprite}
            transparent
            color={"#d5ff18"}
            opacity={canShowStarField ? 1 : 0}
          />
        </points>
      </motion.group>
    </Float>
  );
};

export default StarField;
