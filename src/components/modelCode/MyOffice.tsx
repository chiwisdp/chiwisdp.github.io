import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useAnimate } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { SkillDisplay } from "../experience/SkillDisplay";

export const MyOffice: React.FC = () => {
  const sectionNumber = useSelector(
    (state: RootState) => state.landingPageSection.section
  );
  const { nodes, materials } = useGLTF("/models/myOfficeFinal.glb");
  const [scope, animate] = useAnimate();
  const officeScalingFactor = Math.min(
    Math.max(window.innerWidth / 1920, 0.05),
    1.4
  );
  const officePosFactor = window.innerWidth / 1920;
  useMemo(() => {
    // Set the opacity of all materials to 0
    Object.values(materials).forEach((material) => {
      if (material instanceof THREE.MeshStandardMaterial) {
        material.opacity = 0;
        material.transparent = true;
      }
    });
  }, [materials]);

  useEffect(() => {
    switch (sectionNumber) {
      case 0:
        animate(
          scope!.current,
          { y: -10 * officePosFactor, scale: officeScalingFactor * 0.5 },
          { duration: 0.4, ease: "backOut" }
        );
        if (materials.carpet.opacity !== 0) {
          Object.values(materials).forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              animate(
                material,
                { opacity: 0 },
                { duration: 0.4, ease: "backOut" }
              );
            }
          });
        }
        break;
      case 1:
        animate(
          scope!.current,
          { y: -0.5 * officePosFactor, scale: officeScalingFactor },
          { duration: 0.75, type: "spring", bounce: 0.3, delay: 0 }
        );
        if (materials.carpet.opacity !== 1) {
          Object.values(materials).forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              animate(
                material,
                { opacity: 1 },
                { duration: 0.75, type: "spring", bounce: 0.3, delay: 0 }
              );
            }
          });
        }
        break;
      case 2:
        animate(
          scope!.current,
          { y: 0 * officePosFactor, scale: officeScalingFactor },
          { duration: 0.75, type: "spring", bounce: 0.3, delay: 0 }
        );
        if (materials.carpet.opacity !== 1) {
          Object.values(materials).forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              animate(
                material,
                { opacity: 1 },
                { duration: 0.75, type: "spring", bounce: 0.3, delay: 0 }
              );
            }
          });
        }
        break;
      case 3:
        animate(
          scope!.current,
          { y: -10 * officePosFactor, scale: officeScalingFactor * 0.5 },
          { duration: 0.4, ease: "backOut" }
        );
        if (materials.carpet.opacity !== 0) {
          Object.values(materials).forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              animate(
                material,
                { opacity: 0 },
                { duration: 0.4, ease: "backOut" }
              );
            }
          });
        }
        break;
      case 4:
        animate(
          scope!.current,
          { y: -0 * officePosFactor, scale: officeScalingFactor },
          { duration: 0.75, type: "spring", bounce: 0.3, delay: 0 }
        );
        if (materials.carpet.opacity !== 1) {
          Object.values(materials).forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              animate(
                material,
                { opacity: 1 },
                { duration: 0.75, type: "spring", bounce: 0.3, delay: 0 }
              );
            }
          });
        }
        break;
      case 5:
        animate(
          scope!.current,
          { y: 0 * officePosFactor, scale: officeScalingFactor },
          { duration: 0.75, type: "spring", bounce: 0.3, delay: 0 }
        );
        if (materials.carpet.opacity !== 1) {
          Object.values(materials).forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              animate(
                material,
                { opacity: 1 },
                { duration: 0.75, type: "spring", bounce: 0.3, delay: 0 }
              );
            }
          });
        }
        break;
      default:
        animate(
          scope!.current,
          { y: -10 * officePosFactor, scale: officeScalingFactor * 0.5 },
          { duration: 0.4, ease: "backOut" }
        );
        break;
    }
  }, [sectionNumber]);

  return (
    <motion.group dispose={null} ref={scope}>
      <group position={[5, -3, -8]} rotation={[0, 0, 0]} scale={12.961}>
        <mesh
          geometry={(nodes.rugSquare_2 as THREE.Mesh).geometry}
          material={materials.carpet}
          receiveShadow
        >
          {/* <primitive object={nodes.rugSquare_2} /> */}
        </mesh>
        <mesh
          geometry={(nodes.rugSquare_2_1 as THREE.Mesh).geometry}
          material={materials.carpetDarker}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_2 as THREE.Mesh).geometry}
          material={materials["Material.002"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_3 as THREE.Mesh).geometry}
          material={materials["Material.003"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_4 as THREE.Mesh).geometry}
          material={materials["Material.004"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_5 as THREE.Mesh).geometry}
          material={materials["Material.005"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_6 as THREE.Mesh).geometry}
          material={materials["Material.006"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_7 as THREE.Mesh).geometry}
          material={materials.M_plastic_bone_shad}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_8 as THREE.Mesh).geometry}
          material={materials.M_lam_darkgrey}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_9 as THREE.Mesh).geometry}
          material={materials.M_plastic_bone}
          receiveShadow
        />

        <mesh
          geometry={(nodes.rugSquare_2_11 as THREE.Mesh).geometry}
          material={materials.M_plastic_cream}
          receiveShadow
        />
        <group>
          <mesh
            geometry={(nodes.rugSquare_2_12 as THREE.Mesh).geometry}
            material={materials.M_lam_black}
          >
            <meshStandardMaterial
              color={"#11610a"}
              transparent
              opacity={sectionNumber > 0 ? 1 : 0}
            />
          </mesh>

          {sectionNumber > 0 ? (
            <SkillDisplay
              canShow={sectionNumber > 0 ? true : false}
              sectionNumber={sectionNumber}
            />
          ) : null}
        </group>

        <mesh
          geometry={(nodes.rugSquare_2_13 as THREE.Mesh).geometry}
          material={materials["Material.007"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_14 as THREE.Mesh).geometry}
          material={materials.mat9}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_15 as THREE.Mesh).geometry}
          material={materials.mat17}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_16 as THREE.Mesh).geometry}
          material={materials.mat23}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_17 as THREE.Mesh).geometry}
          material={materials.Black}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_18 as THREE.Mesh).geometry}
          material={materials.Brown}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_19 as THREE.Mesh).geometry}
          material={materials.Plant_Green}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_20 as THREE.Mesh).geometry}
          material={materials["Black.001"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_21 as THREE.Mesh).geometry}
          material={materials["Brown.001"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_22 as THREE.Mesh).geometry}
          material={materials["Plant_Green.001"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_23 as THREE.Mesh).geometry}
          material={materials["carpetDarker.001"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_24 as THREE.Mesh).geometry}
          material={materials.carpetWhite}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_25 as THREE.Mesh).geometry}
          material={materials.plant}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_26 as THREE.Mesh).geometry}
          material={materials["metal.001"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_27 as THREE.Mesh).geometry}
          material={materials.lamp}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_28 as THREE.Mesh).geometry}
          material={materials["metal.002"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_29 as THREE.Mesh).geometry}
          material={materials.bar}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_30 as THREE.Mesh).geometry}
          material={materials.curtain}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_31 as THREE.Mesh).geometry}
          material={materials.Frame}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_32 as THREE.Mesh).geometry}
          material={materials.Poster}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_33 as THREE.Mesh).geometry}
          material={materials.pFrame}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_34 as THREE.Mesh).geometry}
          material={materials["Material.001"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_35 as THREE.Mesh).geometry}
          material={materials["Material.010"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_36 as THREE.Mesh).geometry}
          material={materials["Material.008"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_37 as THREE.Mesh).geometry}
          material={materials["Material.009"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_38 as THREE.Mesh).geometry}
          material={materials["Material.011"]}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_39 as THREE.Mesh).geometry}
          material={materials.stand}
          receiveShadow
        />
        <mesh
          geometry={(nodes.rugSquare_2_40 as THREE.Mesh).geometry}
          material={materials["Material.013"]}
          receiveShadow
        />
      </group>
    </motion.group>
  );
};

useGLTF.preload("/models/myOfficeFinal.glb");
