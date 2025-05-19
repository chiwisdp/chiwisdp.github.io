import LandingPageSection from "../components/landingPage/LandingPageSection";
import AboutSection from "../components/landingPage/sections/AboutSection";
import AwardsSection from "../components/landingPage/sections/AwardsSection";
import ContactSection from "../components/landingPage/sections/ContactSection";
import LandingSection from "../components/landingPage/sections/LandingSection";
import ProjectSection from "../components/landingPage/sections/ProjectSection";
import SkillSection from "../components/landingPage/sections/SkillSection";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

interface LandingPageProps {
  onSectionChange: (section: number) => void;
}

export const HTMLLandingRenderPage: React.FC<LandingPageProps> = ({
  onSectionChange,
}) => {
  const section = useSelector(
    (state: RootState) => state.landingPageSection.section
  );

  const comp = useRef<HTMLDivElement | null>(null);
  let canScrollTrigger = true;

  useGSAP(() => {
    const landingSections = gsap.utils.toArray<HTMLElement>(
      "#landing-section-0, #landing-section-1, #landing-section-2, #landing-section-3, #landing-section-4, #landing-section-5"
    );
    landingSections.forEach((landingSection, index) => {
      gsap.to(landingSection, {
        scrollTrigger: {
          trigger: landingSection,
          start: "35% bottom",
          end: "bottom 35%",
          markers: false,

          onEnter: () => {
            //console.log("onEnter: ", index);
            if (canScrollTrigger) {
              onSectionChange(index);
            }
          },
          onEnterBack: () => {
            //console.log("onEnterBack: ", index);
            if (canScrollTrigger) {
              onSectionChange(index);
            }
          },
        },
      });
    });
  });
  let triggers = ScrollTrigger.getAll();

  useGSAP(() => {
    gsap.to(window, {
      duration: 1,
      ease: "power4.out",
      scrollTo: "#landing-section-" + section,
      onStart: () => {
        canScrollTrigger = false;
        //console.log("onStart: ", canScrollTrigger);
        triggers.forEach((trigger) => {
          trigger.disable();
        });
      },
      onComplete: () => {
        canScrollTrigger = true;
        //console.log("onComplete: ", canScrollTrigger);
        triggers.forEach((trigger) => {
          trigger.enable();
        });
        ScrollTrigger.refresh();
      },
    });
  }, [section]);

  return (
    <div
      id="smooth-content"
      className=" flex flex-col items-left top-0 left-0 w-auto "
      ref={comp}
    >
      <LandingPageSection id="landing-section-0">
        <LandingSection />
      </LandingPageSection>
      <LandingPageSection id="landing-section-1" displaySide={2}>
        <AboutSection />
      </LandingPageSection>
      <LandingPageSection id="landing-section-2" displaySide={1}>
        <SkillSection />
      </LandingPageSection>
      <LandingPageSection id="landing-section-3" displaySide={1}>
        <ProjectSection />
      </LandingPageSection>
      <LandingPageSection id="landing-section-4" displaySide={2}>
        <AwardsSection />
      </LandingPageSection>
      <LandingPageSection id="landing-section-5" displaySide={1}>
        <ContactSection />
      </LandingPageSection>
    </div>
  );
};
