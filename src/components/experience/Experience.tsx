import { MyOffice } from "../modelCode/MyOffice";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { CameraControls, Environment } from "@react-three/drei";
import {
  EffectComposer,
  Glitch,
  Scanline,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { MeModel } from "../modelCode/MeFinalModel";
import { Suspense, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import StarField from "./experienceComponents/StarField";
import { Trophies } from "./experienceComponents/Trophies";

export const Experience: React.FC = () => {
  const sectionNumber = useSelector(
    (state: RootState) => state.landingPageSection.section
  );
  const cameraControlRef = useRef<CameraControls | null>(null);
  const cameraPosFactor = window.innerWidth / 1920;
  const lightRef = useRef<THREE.DirectionalLight>(new THREE.DirectionalLight());
  const isMobile = window.innerWidth <= 768; // Adjust this value based on your design breakpoints

  useEffect(() => {
    switch (sectionNumber) {
      case 0:
        cameraControlRef.current?.setLookAt(
          0,
          4 * cameraPosFactor,
          9 * cameraPosFactor,
          0,
          0,
          0,
          true
        );

        break;
      case 1:
        cameraControlRef.current?.setLookAt(
          0,
          isMobile ? 4 * cameraPosFactor : 3 * cameraPosFactor,
          isMobile ? 20 * cameraPosFactor : 4 * cameraPosFactor,
          0,
          isMobile ? 2 * cameraPosFactor : 1 * cameraPosFactor,
          0,
          true
        );
        break;
      case 2:
        cameraControlRef.current?.setLookAt(
          2 * cameraPosFactor,
          5 * cameraPosFactor,
          -2.5 * cameraPosFactor,
          15 * cameraPosFactor,
          0.5 * cameraPosFactor,
          -2.5 * cameraPosFactor,
          true
        );
        break;
      case 3:
        cameraControlRef.current?.setLookAt(
          0,
          -1.5 * cameraPosFactor,
          3 * cameraPosFactor,
          0,
          2.5 * cameraPosFactor,
          0,
          true
        );
        break;
      case 4:
        cameraControlRef.current?.setLookAt(
          0,
          isMobile ? 3 * cameraPosFactor : -2 * cameraPosFactor,
          isMobile ? 20 * cameraPosFactor : 8 * cameraPosFactor,
          0,
          isMobile ? 5 * cameraPosFactor : 0 * cameraPosFactor,
          0,
          true
        );
        break;
      case 5:
        cameraControlRef.current?.setLookAt(
          0,
          isMobile ? 4 * cameraPosFactor : 3 * cameraPosFactor,
          isMobile ? 3 * cameraPosFactor : 5 * cameraPosFactor,
          0,
          isMobile ? 2.5 * cameraPosFactor : 2 * cameraPosFactor,
          0,
          true
        );
        break;
      default:
        cameraControlRef.current?.setLookAt(
          0,
          4 * cameraPosFactor,
          7 * cameraPosFactor,
          0,
          0,
          0,
          true
        );
        break;
    }
  }, [sectionNumber]);

  return (
    <div className="fixed h-screen w-screen top-0 left-0 z-1000">
      <Canvas
        gl={{ alpha: true }}
        shadows
        camera={{
          fov: 60,
          near: 0.05,
          position: [0, 4 * cameraPosFactor, 9 * cameraPosFactor],
        }}
        flat
        linear
      >
        <Suspense fallback={null}>
          <group>
            <ambientLight intensity={0.3} color={"purple"} />
            <directionalLight
              position={[5, 12, 12]}
              rotation={[0, 0, 0]}
              intensity={3}
              color={"#5500b9"}
              ref={lightRef}
              castShadow
            />
            <CameraControls
              ref={cameraControlRef}
              enabled={true}
              mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
              touches={{ one: 0, two: 0, three: 0 }}
              minZoom={1}
              maxZoom={1}
              azimuthAngle={0}
              polarAngle={Math.PI / 2}
            />
            <Environment
              files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
              background={false}
              backgroundBlurriness={1}
            />
            <EffectComposer>
              <Vignette darkness={0.5} />
              <ToneMapping
                blendFunction={BlendFunction.LIGHTEN}
                adaptive={true} // toggle adaptive luminance map usage
                resolution={256} // texture resolution of the luminance map
                middleGrey={0.1} // middle grey factor
                maxLuminance={24} // maximum luminance
                averageLuminance={1} // average luminance
                adaptationRate={1} // luminance adaptation rate
              />
              {/* <Scanline
                blendFunction={BlendFunction.OVERLAY} // blend mode
                density={0.5} // scanline density
                slope={0.5} // scanline slope
                lineWidth={1} // scanline width
                color={"#000000"} // scanline color /
              /> */}
              <Glitch
                delay={
                  sectionNumber !== 3
                    ? new THREE.Vector2(1.0, 5.5)
                    : new THREE.Vector2(4.0, 10.5)
                } // min and max glitch delay
                duration={
                  sectionNumber !== 3
                    ? new THREE.Vector2(0.1, 0.75)
                    : new THREE.Vector2(0.1, 0.35)
                } // min and max glitch duration
                strength={
                  sectionNumber !== 3
                    ? new THREE.Vector2(0.3, 1.0)
                    : new THREE.Vector2(0.1, 0.3)
                }
                mode={GlitchMode.SPORADIC}
                active={sectionNumber === 0 ? true : false} // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                ratio={0.95} // min and max glitch strength
              />
            </EffectComposer>
            <MeModel
              position={[0, -2.95 * cameraPosFactor, -1 * cameraPosFactor]}
              scale={0.175 * cameraPosFactor}
            />
            <StarField canShowStarField={sectionNumber === 3 ? true : false} />
            <Trophies canShowTrophies={sectionNumber >= 4 ? true : false} />
            <MyOffice />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};
