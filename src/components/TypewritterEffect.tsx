import { motion } from "framer-motion";

interface TypewriterEffectProps {
  text: string;
  additionalDelay?: number;
  blockColor?: string;
  timeScale?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  additionalDelay = 0,
  blockColor,
  timeScale = 1,
}) => {
  const letterDelay = 0.05 * timeScale; //0.025
  const boxFadeDuration = 0.15 * timeScale; // 0.125
  // Delay in milliseconds between each letter
  return (
    <span>
      {text.split("").map((l, i) => {
        return (
          <motion.span key={i + Math.random()} className="relative">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: additionalDelay + i * letterDelay,
                duration: boxFadeDuration,
                ease: "easeOut",
              }}
            >
              {l}
            </motion.span>
            <motion.span
              className={`absolute bottom-[-3px] left-[-1px] right-0 top-[-3px] ${blockColor}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                delay: additionalDelay + i * letterDelay,
                times: [0, 0.1, 1],
                duration: boxFadeDuration,
                ease: "easeOut",
              }}
            />
          </motion.span>
        );
      })}
    </span>
  );
};

export default TypewriterEffect;
