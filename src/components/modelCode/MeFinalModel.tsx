import * as THREE from "three";
import { useGLTF, useAnimations, Select, Float } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion } from "framer-motion-3d";
import {
  AnimationPlaybackControls,
  AnimationSequence,
  useAnimate,
} from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useFrame } from "@react-three/fiber";

interface MeModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  animationName?: string;
  scale?: number;
  fadeInTime?: number;
}
export const MeModel: React.FC<MeModelProps> = ({
  position = [0, 0, 0],
  rotation = [Math.PI / 2, 0, 0],
  scale = 0.3,
  fadeInTime = 0.5,
}) => {
  const sectionNumber = useSelector(
    (state: RootState) => state.landingPageSection.section
  );
  const { nodes, materials, animations } = useGLTF("models/meFinalModel.glb");
  const chibiModel = useGLTF("models/meFinalModel.glb");
  const { ref, actions } = useAnimations(animations);
  const [scope, animate] = useAnimate();
  const [currentAnimationName, setCurrentAnimationName] =
    useState<string>("neutralIdle");
  const [currentClickAnimationName, setCurrentClickAnimationName] =
    useState<string>("groinHit");
  const [clickTiming, setClickTiming] = useState<number>(1000);
  let hitTimeOut: ReturnType<typeof setTimeout> | undefined = undefined;
  let isGroinHit = false;
  const [hasPlayedMelt, setHasPlayedMelt] = useState(false);
  let meltAnim: AnimationPlaybackControls | null = null;
  const [aboutAnim, setAboutAnim] = useState<AnimationPlaybackControls | null>(
    null
  );

  const mePosFactor = window.innerWidth / 1920;
  const isMobile = window.innerWidth <= 768;
  const meScalingFactor = Math.min(Math.max(window.innerWidth / 1920, 1), 1.1);
  const meltSequence: AnimationSequence = [
    [
      scope.current,
      {
        rotateY: 0,
        x: 0,
        y: 40 * mePosFactor,
        z: 0 * mePosFactor,
        scale: 0,
      },
      { duration: 0, type: "spring", bounce: 0.6 },
    ],
    [
      scope.current,
      {
        rotateY: 0,
        x: 0,
        y: isMobile ? 20 * mePosFactor : 9 * mePosFactor,
        z: 0 * mePosFactor,
        scale: meScalingFactor,
      },
      {
        duration: 0.3,
        type: "spring",
        bounce: 0.3,
        delay: 0.75,
      },
    ],
    [
      scope.current,
      {
        rotateY: 0,
        x: 0,
        y: 0 * mePosFactor,
        z: 0 * mePosFactor,
      },
      {
        duration: 0.3,
        type: "spring",
        bounce: 0.3,
        delay: 0.75,
      },
    ],
  ];
  const aboutMeSequence: AnimationSequence = [
    [
      scope.current,
      {
        x: 0 * mePosFactor,
        y: 0 * mePosFactor,
        z: 0 * mePosFactor,
        rotateY: 0,
      },
      {
        rotateY: {
          duration: 0.4,
        },
        duration: 0.5,
        ease: "easeInOut",
        delay: 0,
      },
    ],
    [
      scope.current,
      {
        x: 3.75 * mePosFactor,
        y: 0 * mePosFactor,
        z: -3 * mePosFactor,
        rotateY: 1.6,
      },
      {
        rotateY: {
          duration: 0.4,
        },
        duration: 2,
        ease: "easeInOut",
        delay: 1,
      },
    ],
    [
      scope.current,
      {
        x: 1 * mePosFactor,
        y: 0 * mePosFactor,
        z: 1 * mePosFactor,
        rotateY: 0,
      },
      {
        rotateY: {
          duration: 0.4,
        },
        duration: 2,
        ease: "easeInOut",
        delay: 4,
      },
    ],
    [
      scope.current,
      {
        x: -7 * mePosFactor,
        y: 0 * mePosFactor,
        z: -8 * mePosFactor,
        rotateY: 3.25,
      },
      {
        rotateY: {
          duration: 0.4,
        },
        duration: 5,
        ease: "easeInOut",
        delay: 10,
      },
    ],
    [
      scope.current,
      {
        x: 0 * mePosFactor,
        y: 0 * mePosFactor,
        z: -8 * mePosFactor,
        rotateY: 1.6,
      },
      {
        rotateY: {
          duration: 0.4,
        },
        duration: 2,
        ease: "easeInOut",
        delay: 8,
      },
    ],
    [
      scope.current,
      {
        rotateY: 3.25,
      },
      {
        duration: 1,
        ease: "easeInOut",
        delay: 0,
      },
    ],
    [
      scope.current,
      {
        rotateY: 1.6,
      },
      {
        duration: 1,
        ease: "easeInOut",
        delay: 8,
      },
    ],
    [
      scope.current,
      {
        x: -2 * mePosFactor,
        y: 0 * mePosFactor,
        z: -8 * mePosFactor,
        rotateY: -1.6,
      },
      {
        rotateY: {
          duration: 1,
        },
        duration: 2,
        ease: "easeInOut",
        delay: 8,
      },
    ],
    [
      scope.current,
      {
        x: 0 * mePosFactor,
        y: 0 * mePosFactor,
        z: 0 * mePosFactor,
        rotateY: 0,
      },
      {
        rotateY: {
          duration: 1,
        },
        duration: 4,
        ease: "easeInOut",
        delay: 0,
      },
    ],
  ];
  useEffect(() => {
    if (isGroinHit) {
      resetClickAnimation();
    }
    switch (sectionNumber) {
      case 0:
        if (aboutAnim) {
          aboutAnim.stop();
          aboutAnim.complete();
        }
        setCurrentAnimationName("tPose");
        setCurrentClickAnimationName("tPose");
        setClickTiming(1000);
        animate(
          scope!.current,
          {
            x: 0 * mePosFactor,
            y: 0 * mePosFactor,
            z: 0 * mePosFactor,
            rotateY: 0,
          },
          { duration: 0.75, ease: "linear" }
        );
        setHasPlayedMelt(false);
        break;
      case 1:
        setCurrentAnimationName("neutralIdle");
        setCurrentClickAnimationName("groinHit");
        setClickTiming(2900);
        if (!hasPlayedMelt) {
          animate(meltSequence).then(() => {
            setAboutAnim(
              animate(aboutMeSequence, {
                delay: 0,
                repeat: 0,
                repeatDelay: 0,
              })
            );
            meltAnim = null; // Reset meltAnim if needed
          });
        } else {
          meltAnim?.complete();
          animate(
            scope!.current,
            {
              x: 0 * mePosFactor,
              y: 0 * mePosFactor,
              z: 0 * mePosFactor,
              rotateY: 0,
            },
            { duration: 0, ease: "linear" }
          );
          setTimeout(() => {
            setAboutAnim(
              animate(aboutMeSequence, {
                delay: 0,
                repeat: 0,
                repeatDelay: 0,
              })
            );
          }, 750);
        }
        break;
      case 2:
        setHasPlayedMelt(true);
        if (aboutAnim) {
          aboutAnim.stop();
          aboutAnim.complete();
        }
        animate(
          scope!.current,
          {
            x: 4.5 * mePosFactor,
            y: 2 * mePosFactor,
            z: -1.45 * mePosFactor,
            rotateY: 2,
          },
          { duration: 0.75, ease: "linear" }
        );
        setCurrentAnimationName("typing");
        setCurrentClickAnimationName("typing");
        setClickTiming(2900);
        break;
      case 3:
        setHasPlayedMelt(true);
        if (aboutAnim) {
          aboutAnim.stop();
          aboutAnim.complete();
        }
        animate(
          scope!.current,
          {
            x: 0 * mePosFactor,
            y: 0 * mePosFactor,
            z: 0 * mePosFactor,
            rotateY: 0,
          },
          { duration: 0.75, ease: "linear" }
        );
        setCurrentAnimationName("breathIdle");
        setCurrentClickAnimationName("wave");
        setClickTiming(4500);
        break;
      case 4:
        setHasPlayedMelt(true);
        if (aboutAnim) {
          aboutAnim.stop();
          aboutAnim.complete();
        }
        animate(
          scope!.current,
          {
            x: 0 * mePosFactor,
            y: 0 * mePosFactor,
            z: 0 * mePosFactor,
            rotateY: 0,
          },
          { duration: 0.75, ease: "linear" }
        );
        setCurrentAnimationName("victoryIdle");
        setCurrentClickAnimationName("salute");
        setClickTiming(2800);
        break;
      case 5:
        setHasPlayedMelt(true);
        if (aboutAnim) {
          aboutAnim.stop();
          aboutAnim.complete();
        }
        animate(
          scope!.current,
          {
            x: 0 * mePosFactor,
            y: 0 * mePosFactor,
            z: 0 * mePosFactor,
            rotateY: 0,
          },
          { duration: 0.75, ease: "linear" }
        );
        setCurrentAnimationName("clap");
        setCurrentClickAnimationName("gangnam");
        setClickTiming(12300);
        break;
      default:
        setCurrentAnimationName("tPose");
        break;
    }
  }, [sectionNumber]);

  useFrame(() => {
    if (aboutAnim && sectionNumber === 1) {
      if (aboutAnim?.time < 1.6) {
        setCurrentAnimationName("neutralIdle");
      } else if (aboutAnim?.time > 1.6 && aboutAnim?.time < 1.7) {
        setCurrentAnimationName("normalWalk");
      } else if (aboutAnim?.time > 3.4 && aboutAnim?.time < 3.5) {
        setCurrentAnimationName("talking");
      } else if (aboutAnim?.time > 7.5 && aboutAnim?.time < 7.6) {
        setCurrentAnimationName("normalWalk");
      } else if (aboutAnim?.time > 9 && aboutAnim?.time < 9.1) {
        setCurrentAnimationName("neutralIdle");
      } else if (aboutAnim?.time > 19.5 && aboutAnim?.time < 19.6) {
        setCurrentAnimationName("normalWalk");
      } else if (aboutAnim?.time > 23.5 && aboutAnim?.time < 23.6) {
        setCurrentAnimationName("talking");
      } else if (aboutAnim?.time > 32.5 && aboutAnim?.time < 32.6) {
        setCurrentAnimationName("normalWalk");
      } else if (aboutAnim?.time > 35.5 && aboutAnim?.time < 35.6) {
        setCurrentAnimationName("neutralIdle");
      } else if (aboutAnim?.time > 43.5 && aboutAnim?.time < 43.6) {
        setCurrentAnimationName("normalWalk");
      } else if (aboutAnim?.time > 44.5 && aboutAnim?.time < 44.6) {
        setCurrentAnimationName("point");
      } else if (aboutAnim?.time > 52.5 && aboutAnim?.time < 52.6) {
        setCurrentAnimationName("normalWalk");
      } else if (
        aboutAnim?.time > 57.8 &&
        currentAnimationName !== "sillyDance"
      ) {
        setCurrentAnimationName("sillyDance");
      }
    }
  });

  useEffect(() => {
    actions[currentAnimationName]?.reset().fadeIn(fadeInTime).play();
    return () => {
      actions[currentAnimationName]?.fadeOut(fadeInTime);
    };
  }, [currentAnimationName]);

  const handleClick = () => {
    if (sectionNumber === 1 || sectionNumber === 2) return;
    if (
      actions[currentClickAnimationName] &&
      actions[currentAnimationName] &&
      !isGroinHit
    ) {
      isGroinHit = true;
      actions[currentAnimationName]?.fadeOut(fadeInTime);
      actions[currentClickAnimationName].clampWhenFinished = true;
      actions[currentClickAnimationName]
        ?.reset()
        .setLoop(THREE.LoopOnce, 1)
        .fadeIn(fadeInTime)
        .play();

      hitTimeOut = setTimeout(() => {
        resetClickAnimation();
      }, clickTiming);
    }
  };

  const resetClickAnimation = () => {
    actions[currentClickAnimationName]?.reset().fadeOut(fadeInTime);
    actions[currentAnimationName]?.reset().fadeIn(fadeInTime).play();
    isGroinHit = false;
  };

  return (
    <>
      <motion.group ref={scope} scale={meScalingFactor}>
        <group dispose={null} ref={ref as any}>
          <Select box onClick={() => handleClick()}>
            <group
              name="meModel"
              rotation={rotation}
              castShadow
              receiveShadow
              scale={scale}
              position={new THREE.Vector3(...position)}
            >
              <primitive object={nodes.mixamorigHips} />
              <skinnedMesh
                name="bodyMesh"
                geometry={(nodes.bodyMesh as THREE.Mesh).geometry}
                material={materials["Material.001"]}
                skeleton={(nodes.bodyMesh as THREE.SkinnedMesh).skeleton}
                castShadow
                receiveShadow
                visible={sectionNumber !== 0 ? true : false}
              ></skinnedMesh>
            </group>
          </Select>
        </group>
      </motion.group>
      {sectionNumber === 0 ? (
        <Float
          speed={0.5}
          rotationIntensity={10}
          floatIntensity={0}
          rotateZ={false}
          rotateX={false}
        >
          <group dispose={null} scale={isMobile ? 0.3 : 1}>
            <mesh
              geometry={(chibiModel.nodes.bodyMesh as THREE.Mesh).geometry}
              scale={80}
              position={[0, -14, 1]}
            >
              <meshStandardMaterial
                wireframe
                flatShading
                wireframeLinewidth={1}
                color={"#2300ff"}
              />
            </mesh>
          </group>
        </Float>
      ) : null}
    </>
  );
};

useGLTF.preload("models/meFinalModel.glb");
