import XDLogo from "/projectButtons/xdLogo.png";
import RSLogo from "/projectButtons/rLogo.png";
import SALogo from "/projectButtons/indeedLogo.png";
import OtherLogo from "/projectButtons/otherProj.png";
import { ProjectButton } from "./sectionComponents/ProjectButton";
import TypewriterEffect from "../../TypewritterEffect";

const ProjectSection: React.FC = () => {
  return (
    <div className=" flex w-full  items-center justify-center pointer-events-auto overflow-clip pt-8">
      <section
        id="projectSection"
        className="flex flex-col justify-center items-center w-4/5"
      >
        <div className="font-fx300-angular text-primary-light lg:text-4xl md:text-4xl sm:text-3xl xs:text-lg xxs:text-sm mb-16 ">
          <TypewriterEffect
            text="Selected Projects"
            blockColor="bg-my-blue"
            additionalDelay={0.5}
          />
        </div>
        <div
          className="lg:flex lg:flex-row lg:items-center lg:justify-evenly 
        md:flex md:flex-row md:items-center md:justify-evenly
        sm:grid sm:grid-cols-2 sm:gap-2 sm:justify-evenly
        xs:grid xs:grid-cols-2 xs:gap-2 xs:justify-evenly
        xxs:grid xxs:grid-cols-2 xxs:gap-8 xxs:justify-evenly"
        >
          <ProjectButton
            label="XDefiant"
            imageUrl={XDLogo}
            linkURL="/XDefiant"
            animationDelay={2}
          />
          <ProjectButton
            label="Rocksmith+"
            imageUrl={RSLogo}
            linkURL="/Rocksmith"
            animationDelay={2.25}
          />
          <ProjectButton
            label="Indeed"
            imageUrl={SALogo}
            linkURL="/Indeed"
            animationDelay={2.5}
          />
          <ProjectButton
            label="MOre..."
            imageUrl={OtherLogo}
            linkURL="/OtherProjects"
            animationDelay={2.75}
          />
        </div>
      </section>
    </div>
  );
};

export default ProjectSection;
