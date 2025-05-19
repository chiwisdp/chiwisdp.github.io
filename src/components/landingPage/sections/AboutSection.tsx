import React from "react";
import SectionDisplay from "./sectionComponents/SectionDisplay";

const AboutSection: React.FC = () => {
  return (
    <div
      className="relative pointer-events-auto max-h-6/6 overflow-clip 
      lg:max-w-2/5 md:max-w-3/5 sm:max-w-4/5 xs:max-w-5/5  xxs:max-w-5/5
    bottom-0 lg:bottom-12 md:bottom-1/5 sm:bottom-12/20 xs:bottom-13/20  xxs:bottom-12/20"
    >
      <section id="aboutSection">
        <SectionDisplay title="Who is this guy?">
          <div className="section-content flex flex-row">
            {/*  <img
              src="/public/profilePic/profile.png"
              className="relative w-3/4 h-fit mr-8 border-1 border-primary"
            /> */}
            <div>
              <p className="xl:text-md lg:text-sm md:text-xs sm:text-[11px] xs:text-[9px] xxs:text-[9px] text-primary-light font-fusion">
                {" "}
                &nbsp;&nbsp;&nbsp;From a young age, Daniel knew that he wanted
                to be part of the creative industry. He made that dream a
                reality after getting an MFA from USC's Interactive Media
                Division.{" "}
              </p>
              <br />
              <p className="xl:text-md lg:text-sm md:text-xs sm:text-[11px] xs:text-[9px] xxs:text-[9px] text-primary-light font-fusion">
                &nbsp;&nbsp;&nbsp;He's a creative designer with diverse working
                experience. Designed for small projects to products with
                millions of daily active users. At the intersection of design,
                art, and engineering, he can bring designs to life.
              </p>
            </div>
          </div>
        </SectionDisplay>
      </section>
    </div>
  );
};

export default AboutSection;
