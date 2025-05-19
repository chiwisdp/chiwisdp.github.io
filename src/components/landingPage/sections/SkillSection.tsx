import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { setSkill } from "../../../store/slices/SkillSlice";
import { motion } from "framer-motion";
import SkillButton from "./sectionComponents/SkillButtons";
import SectionDisplay from "./sectionComponents/SectionDisplay";

const SkillSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

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
  if (!skillData) return <div>Loading...</div>;

  function handleSkillHover(skill: {}) {
    dispatch(setSkill(skill));
  }
  return (
    <motion.section
      id="skillSection"
      className="pointer-events-auto max-h-4/5   "
    >
      <SectionDisplay title="Skills">
        <div>
          <div className="flex flex-row items-center justify-start">
            <h2 className="lg:text-lg md:text-lg sm:text-lg xs:text-md xxs:text-sm mb-4 text-primary font-fx300-angular ">
              UX Skills
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            {skillData.title !== undefined ? (
              skillData.skills.uxSkills.map((skill: any, index: number) => {
                return (
                  <SkillButton
                    skill={skill}
                    skillSelected={handleSkillHover}
                    index={index}
                    key={skill.name + index}
                  />
                );
              })
            ) : (
              <div>loading</div>
            )}
          </div>
          <h2 className="lg:text-lg md:text-lg sm:text-lg xs:text-md xxs:text-sm mb-4 text-primary font-fx300-angular">
            Code Skills
          </h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {skillData.title !== undefined ? (
              skillData.skills.codeSkills.map((skill: any, index: number) => {
                return (
                  <SkillButton
                    skill={skill}
                    skillSelected={handleSkillHover}
                    index={index}
                    key={skill.name + index}
                  />
                );
              })
            ) : (
              <div>loading</div>
            )}
          </div>
          <h2 className="lg:text-lg md:text-lg sm:text-lg xs:text-md xxs:text-sm mb-4 text-primary font-fx300-angular">
            Game Engines
          </h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {skillData.title !== undefined ? (
              skillData.skills.gameSkills.map((skill: any, index: number) => {
                return (
                  <SkillButton
                    skill={skill}
                    skillSelected={handleSkillHover}
                    index={index}
                    key={skill.name + index}
                  />
                );
              })
            ) : (
              <div>loading</div>
            )}
          </div>
        </div>
      </SectionDisplay>
    </motion.section>
  );
};

export default SkillSection;
