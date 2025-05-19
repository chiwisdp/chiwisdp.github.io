import { motion } from "framer-motion";

interface LandingPageSectionProps {
  id: string;
  displaySide?: number; // 0 = start, 1 = center, 2 = end
  children?: React.ReactNode;
}

const LandingPageSection: React.FC<LandingPageSectionProps> = ({
  id,
  children,
  displaySide = 0,
}) => {
  const getAlignmentClass = () => {
    switch (displaySide) {
      case 0:
        return "items-start";
      case 1:
        return "items-center";
      case 2:
        return "items-start";
      case 3:
        return "items-end";

      default:
        return "items-start";
    }
  };

  const getJustifyClass = () => {
    switch (displaySide) {
      case 0:
        return "justify-center";
      case 1:
        return "justify-start";
      case 2:
        return "justify-end";
      case 3:
        return "justify-start";
      default:
        return "justify-end";
    }
  };

  return (
    <div id={id} className="z-1000 ">
      <motion.section
        className={`h-screen  p-8 mx-auto flex flex-col max-h-screen overflow-clip ${getAlignmentClass()} ${getJustifyClass()}`}
      >
        {children}
      </motion.section>
    </div>
  );
};

export default LandingPageSection;
