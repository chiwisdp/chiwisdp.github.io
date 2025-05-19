import { motion } from "framer-motion";

interface SkillButtonProps {
  skill: {
    name: string;
    logo: string;
    color: string;
    description: string;
  };
  skillSelected: (skill: {}) => void;
  index: number;
}

const SkillButton: React.FC<SkillButtonProps> = ({
  skill,
  skillSelected,
  index,
}) => {
  return (
    //[clip-path:polygon(calc(0%+10px)_0%,100%_0%,100%_100%,0%_100%,0%_calc(0%+10px))]
    <motion.div
      className="skill-button flex flex-col items-center justify-center bg-primary-light hover:bg-primary  cursor-pointer 
      border-primary-light hover:border-primary border-1
      [clip-path:polygon(calc(0%+10px)_0%,100%_0%,100%_calc(100%-11px),calc(100%-10px)_100%,0%_100%,0%_calc(0%+10px))]"
      onClick={() => skillSelected(skill)}
      onMouseEnter={() => skillSelected(skill)}
      key={skill.name + index * Math.random()}
    >
      <div
        className="flex flex-col items-center justify-center space-y-1 w-full  p-2 bg-bg hover:bg-primary
        text-primary-light hover:text-bg font-fx300
      [clip-path:polygon(calc(0%+11px)_0%,100%_0%,100%_calc(100%-11px),calc(100%-11px)_100%,0%_100%,0%_calc(0%+11px))]"
      >
        <motion.img
          src={skill.logo}
          alt={skill.name}
          className="lg:w-8 sm:w-8 xs:w-8 xxs:w-4 lg:h-8 sm:h-8 xs:h-8 xxs:h-4 pointer-events-none"
        />
        <motion.h3 className="lg:text-[10px] md:text-[8px] sm:text-[0px] xs:text-[0px] xxs:text-[0px] bottom-0 left-0 ">
          {skill.name}
        </motion.h3>
      </div>
    </motion.div>
  );
};

export default SkillButton;
