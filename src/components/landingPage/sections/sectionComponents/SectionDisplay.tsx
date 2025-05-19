import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import TypewriterEffect from "../../../TypewritterEffect";

interface SectionDisplayProps {
  title: string;
  children?: React.ReactNode;
}

const SectionDisplay: React.FC<SectionDisplayProps> = ({ title, children }) => {
  const bottomBlock = useRef(null);
  const topBlock = useRef(null);
  const isInView = useInView(bottomBlock, { once: false });
  const [uniqueId] = useState(() => Math.floor(Math.random() * 9000) + 1000);

  useEffect(() => {
    animate(
      bottomBlock.current,
      { scaleY: isInView ? 1 : 0 },
      {
        delay: isInView ? 2 : 0,
        duration: isInView ? 0.25 : 0,
        type: "spring",
        bounce: 0.5,
      }
    );
    animate(
      topBlock.current,
      { scaleX: isInView ? 1 : 0 },
      {
        delay: isInView ? 0.75 : 0,
        duration: isInView ? 0.2 : 0,
        type: "spring",
        bounce: 0.5,
      }
    );
  }, [isInView]);

  return (
    <div className="section-display relative z-7000">
      <motion.div
        className="lg:text-2xl md:text-xl sm:text-lg xs:text-xs xxs:text-xs font-fx300-angular text-bg bg-primary p-2 text-left w-fit relative z-10 
        [clip-path:polygon(calc(0%+10px)_0%,100%_0%,100%_100%,0%_100%,0%_calc(0%+10px))]"
        initial={{ scaleX: 0 }}
        ref={topBlock}
      >
        <div className="flex flex-row items-center space-x-2">
          <TypewriterEffect
            text={title}
            blockColor="bg-bg"
            additionalDelay={1}
            timeScale={0.75}
          />
          {/*  <DiagonalBarcode
            height={24}
            width={50}
            colors={["#d5ff18", "#0a0a0a"]}
          /> */}
        </div>
      </motion.div>

      <motion.div
        className="[clip-path:polygon(0%_0%,100%_0%,100%_calc(100%-50px),calc(100%-50px)_100%,0%_100%)] bg-primary relative "
        ref={bottomBlock}
        initial={{ scaleY: 0 }}
      >
        <div
          className="section-content p-4 pr-10 bg-[radial-gradient(#2e3904_1px,transparent_1px)] [background-size:24px_24px] border-2 border-primary bg-bg
          [clip-path:polygon(0%_0%,100%_0%,100%_calc(100%-52px),calc(100%-52px)_100%,0%_100%)] relative"
        >
          <div className="p-2">{children}</div>
          {/* Top-right corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24">
            <div className="absolute top-1 right-1 text-[9px] text-primary font-mono">
              SEC-{uniqueId}
            </div>
            <div className="absolute top-6 right-2 w-3 h-3 border border-primary flex items-center justify-center">
              <div className="w-1 h-1 bg-primary"></div>
            </div>
          </div>

          {/* Bottom-left corner accent */}
          <div className="absolute bottom-0 left-0 w-24 h-24">
            <div className="absolute bottom-0 left-1 text-[9px] text-primary font-mono">
              D-{Math.floor(uniqueId / 10)}
            </div>
            <div className="absolute bottom-6 left-1 w-3 h-3 border border-primary flex items-center justify-center">
              <div className="w-1 h-1 bg-primary"></div>
            </div>

            {/* Vertical barcode-like pattern */}
            <div className="absolute bottom-10 left-1 h-6 flex flex-col space-y-[2px]">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`bl-bar-${i}`}
                  className="h-[2px] bg-primary"
                  style={{ width: `${Math.floor(Math.random() * 6) + 2}px` }}
                />
              ))}
            </div>
          </div>

          {/* Technical spec line across the bottom */}
          <div className="absolute bottom-0 left-20 xxs:left-10 right-20 flex justify-between">
            <div className="text-[9px] text-primary font-mono">
              ID:{uniqueId.toString(16).toUpperCase()}
            </div>
            <div className="text-[9px] text-primary font-mono flex items-center">
              <span className="w-4 h-px bg-primary mx-1"></span>
              SPEC.{Math.floor(Math.random() * 90) + 10}
              <span className="w-4 h-px bg-primary mx-1"></span>
            </div>
            <div className="text-[9px] text-primary font-mono">
              {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionDisplay;
