import { useProgress } from "@react-three/drei";
import TypewriterEffect from "../../TypewritterEffect";

const LandingSection: React.FC = () => {
  const { progress } = useProgress();
  return (
    <section
      id="landingSection"
      className="pointer-events-auto max-h-4/6 overflow-clip text-primary-light absolute lg:bottom-48 lg:left-42 md:bottom-32 sm:bottom-32 xs:bottom-32 xxs:bottom-32"
    >
      {progress >= 100 ? (
        <>
          <h1 className="mb-8  lg:text-2xl md:text-xl sm:text-xl xs:text-xs xxs:text-xs   font-fx300-angular ">
            <TypewriterEffect
              text="STARTING ONLINE"
              blockColor="bg-my-blue"
              additionalDelay={3}
            />
            <br />
            <span className="lg:text-7xl md:text-6xl sm:text-5xl xs:text-3xl xxs:text-3xl font-fx300-angular text-primary">
              <TypewriterEffect
                text="DANIEL PONCE"
                blockColor="bg-my-blue"
                additionalDelay={4.5}
              />
              <br />
            </span>
            <span className="lg:text-5xl md:text-5xl sm:text-5xl xs:text-lg xxs:text-lg">
              <TypewriterEffect
                text="SIMULATION"
                blockColor="bg-my-blue"
                additionalDelay={5}
              />
            </span>
          </h1>
          <p className="lg:text-sm sm:text-[11px] xs:text-[8px] xxs:text-[8px] font-fx300">
            <TypewriterEffect
              text="Scroll down to begin."
              blockColor="bg-my-blue"
              additionalDelay={5.5}
              timeScale={0.25}
            />
          </p>
          <p className="lg:text-sm sm:text-[11px] xs:text-[8px] xxs:text-[8px] font-fx300">
            <TypewriterEffect
              text="[ or click on the buttons . . . ]"
              blockColor="bg-my-blue"
              additionalDelay={6}
              timeScale={0.25}
            />
          </p>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default LandingSection;
