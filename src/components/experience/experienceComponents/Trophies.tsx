import { Clone, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion-3d";

interface TrophiesProps {
  canShowTrophies: boolean;
}
export const Trophies: React.FC<TrophiesProps> = ({ canShowTrophies }) => {
  const trophyYPos = -2.55; // Adjust this value based on your design breakpoints
  const trophyPositions = [
    new THREE.Vector3(-5, trophyYPos, 2),
    new THREE.Vector3(-3.5, trophyYPos, 1),
    new THREE.Vector3(-1.5, trophyYPos, 2),
    new THREE.Vector3(0.5, trophyYPos, 1.5),
    new THREE.Vector3(2, trophyYPos, 3),
    new THREE.Vector3(4, trophyYPos, 2),
  ];

  const { nodes } = useGLTF("/models/trophy1.glb");
  const trophyPosFactor = window.innerWidth / 1920;
  //const isMobile = window.innerWidth <= 768;
  const trophyScalingFactor = Math.min(
    Math.max(window.innerWidth / 1920, 0.2),
    1.1
  ); // Adjust this value based on your design breakpoints
  return (
    <>
      {trophyPositions.map((position, index) => (
        <motion.group
          key={index}
          position={position.clone().multiplyScalar(trophyPosFactor)}
          initial={{ scale: 0 }}
          animate={{ scale: canShowTrophies ? 1 : 0 }}
          transition={{
            duration: canShowTrophies ? 1 : 0.05,
            delay: canShowTrophies ? index * 0.2 : 0,
            type: "spring",
            bounce: 0.8,
          }}
        >
          <Clone
            key={index}
            object={nodes["Trophy_Cup_Materi��l067_0"] as THREE.Mesh}
            position={[0, 0, 0]}
            scale={0.3 * trophyScalingFactor}
            rotation={[-1.5, 0, -1.5]}
            castShadow
          />
        </motion.group>
      ))}
    </>
  );
};

useGLTF.preload("/models/trophy1.glb");
