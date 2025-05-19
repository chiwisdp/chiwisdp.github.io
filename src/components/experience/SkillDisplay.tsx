import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion-3d";
import { Image, RoundedBox } from "@react-three/drei";
import HolographicMaterial from "../materials/HolographicMaterial";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { SkillStats } from "./SkillStats";

interface SkillDisplayProps {
  canShow: boolean;
  sectionNumber: number;
}

export const SkillDisplay: React.FC<SkillDisplayProps> = ({
  canShow,
  sectionNumber,
}) => {
  const skillToDisplay = useSelector((state: RootState) => state.skill.skill);

  const skillDisplay = useRef(null);
  const [skillData, setSkillData] = useState<any>({});
  useEffect(() => {
    fetch("/data/Skills.json")
      .then((response) => response.json())
      .then((data) => {
        setSkillData(data);
      })
      .catch((error) => {
        console.error("Error fetching skill data:", error);
      });
  }, []);
  if (!skillData) return;
  return (
    <group rotation={[0, 0, -0.34]}>
      <motion.group
        ref={skillDisplay}
        position={[-0.045, 0.3524, 0.4275]}
        scale={1}
        rotation={[0.0, -1.575, 0]} //-1.575
      >
        {/*  <SkillStats /> */}
        <RoundedBox args={[0.115, 0.093, 0.01]} radius={0.001}>
          <HolographicMaterial
            fresnelAmount={1}
            fresnelOpacity={1}
            scanlineSize={5.0}
            hologramBrightness={1}
            signalSpeed={1}
            hologramColor={"#74fb68"}
            enableBlinking={false}
            blinkFresnelOnly={false}
            enableAdditive={false}
            hologramOpacity={0.7}
            side={"FrontSide"}
          />
        </RoundedBox>
        {sectionNumber !== 4 && skillToDisplay.logo !== undefined ? (
          <Image
            url={skillToDisplay.logo}
            position={[0, 0, 0.01]}
            scale={0.07}
            transparent={true}
            opacity={0.8}
          ></Image>
        ) : null}
      </motion.group>
    </group>
  );
};
