import { animate, motion, useInView } from "framer-motion";
import { ProjectImage } from "./ProjectImage";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface ProjectButtonProps {
  label: string;
  imageUrl?: string;
  linkURL?: string;
  animationDelay?: number;
}

export const ProjectButton: React.FC<ProjectButtonProps> = ({
  label,
  imageUrl,
  linkURL,
  animationDelay = 1,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    animate(
      ref.current,
      { scaleY: isInView ? 1 : 0 },
      {
        delay: isInView ? animationDelay : 0,
        duration: isInView ? 0.25 : 0,
        type: "spring",
        bounce: 0.5,
      }
    );
  }, [isInView]);
  return (
    <Link to={linkURL ? linkURL : "/"}>
      <motion.div
        ref={ref}
        className="project-button flex flex-col items-center cursor-default hover:cursor-pointer"
        whileHover={{
          scale: 0.9,
          transition: { duration: 0.2, type: "spring", bounce: 0.5 },
        }}
      >
        <h1
          className="text-bg font-fx300-angular bg-primary p-2
      lg:text-lg md:text-xs sm:text-[10px] xs:text-[8px] xxs:text-[8px] "
        >
          {label}
        </h1>
        <div className="project-image-container">
          <ProjectImage imageUrl={imageUrl} />
        </div>
      </motion.div>
    </Link>
  );
};
