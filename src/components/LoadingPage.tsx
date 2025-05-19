import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { animate, motion } from "framer-motion";

interface LoadingPageProps {
  onShowLandingPage: () => void;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({
  onShowLandingPage,
}) => {
  const { progress } = useProgress();
  const loadingSection = useRef(null);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        animate(
          loadingSection?.current,
          {
            opacity: 0,
          },
          {
            duration: 1,
            onComplete: () => {
              onShowLandingPage(); // Call the function to show the landing page
            },
          }
        );
      }, 1500);
      // Delay for 1 second after loading is complete
    }
  }, [progress]);

  return (
    <motion.div
      className="fixed flex flex-col items-center top-0 left-0 w-lvw h-lvh pointer-events-none  z-5500 bg-black"
      ref={loadingSection}
      initial={{ opacity: 1 }}
    >
      <div className="absolute bottom-10 ">
        <p className="text-primary text-6xl font-fx300-angular ">
          loading <a className="text-primary-light">{Math.round(progress)}%</a>
        </p>
      </div>
    </motion.div>
  );
};
