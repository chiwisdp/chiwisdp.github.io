import { motion } from "framer-motion-3d";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { Image, RoundedBox, Text3D, Text } from "@react-three/drei";

export const SkillStats: React.FC = () => {
  const skillToDisplay = useSelector((state: RootState) => state.skill.skill);

  return (
    <motion.group>
      {skillToDisplay.name !== undefined ? (
        <group rotation={[0, 0, 0]}>
          <group position={[-0.7, 0.75, 0]}>
            <RoundedBox
              args={[0.7, 0.7, 0.1]}
              radius={0.05}
              position={[0, 0, 0.105]}
            >
              {/*  <HolographicMaterial
                fresnelAmount={1}
                fresnelOpacity={0.5}
                scanlineSize={5.0}
                hologramBrightness={1}
                signalSpeed={1}
                hologramColor={skillToDisplay.color}
                enableBlinking={false}
                blinkFresnelOnly={true}
                enableAdditive={false}
                hologramOpacity={1}
                side={"FrontSide"}
              /> */}
              <meshBasicMaterial
                color={skillToDisplay.color}
                transparent
                opacity={0.7}
              />
            </RoundedBox>
            <Image
              url={skillToDisplay.logo}
              position={[0.015, 0, 0.2]}
              scale={0.65}
              transparent={true}
              opacity={0.8}
            >
              {/* <HolographicMaterial
                fresnelAmount={0.45}
                fresnelOpacity={0}
                scanlineSize={5.0}
                hologramBrightness={1}
                signalSpeed={1}
                hologramColor={"#51a4de"}
                enableBlinking={false}
                blinkFresnelOnly={true}
                enableAdditive={true}
                hologramOpacity={1}
                side={"FrontSide"}
              /> */}
            </Image>
          </group>
          <Text
            position={[0.15, 1, 0.11]}
            anchorX={"left"}
            scale={0.15}
            color={"#000"}
            font="/3Dfonts/super.otf"
          >
            {skillToDisplay.name}
          </Text>
          <Text
            position={[-1.21, 0, 0.11]}
            anchorX={"left"}
            scale={0.14}
            color={"#000"}
            font="/3Dfonts/super.otf"
          >
            Level: {skillToDisplay.level}
          </Text>
          <Text
            position={[-1.21, -0.2, 0.11]}
            rotation={[0, 0, 0]}
            anchorX={"left"}
            anchorY={"top"}
            scale={0.14}
            color={"#000"}
            lineHeight={1.2}
            font="/3Dfonts/super.otf"
          >
            {skillToDisplay.description}
          </Text>
        </group>
      ) : (
        <Text3D
          position={[0, 0, 0.105]}
          scale={0.1}
          font={"/3Dfonts/Hyper_Script_Regular.json"}
        >
          {"Loading..."}
          <meshNormalMaterial />
        </Text3D>
      )}
    </motion.group>
  );
};
