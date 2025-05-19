import React from "react";
import SectionDisplay from "./sectionComponents/SectionDisplay";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contactSection"
      className="pointer-events-auto max-h-4/6  overflow-clip "
    >
      <SectionDisplay title="Contact">
        <section className="text-primary p-4">
          <div>
            <h2 className="lg:text-2xl font-fx300-angular mb-4">what up!</h2>
            <p className="text-primary-light font-fusion lg:text-xs md:text-[10px] sm:text-[10px] xs:text-[10px] xxs:text-[10px]">
              Find the real me at:
            </p>
            <br />
            <p className="text-primary-light font-fusion lg:text-xs md:text-[10px] sm:text-[10px] xs:text-[10px] xxs:text-[10px]">
              <a
                className="underline text-primary"
                href="https://www.linkedin.com/in/daniel-ponce-51038413/"
              >
                Linkedin
              </a>
            </p>
            <br />
            <p className="text-primary-light font-fusion lg:text-xs md:text-[10px] sm:text-[10px] xs:text-[10px] xxs:text-[10px] mb-4">
              <a
                className="underline text-primary"
                href="mailto:chiwisdp@gmail.com"
              >
                My Email
              </a>
            </p>
          </div>
        </section>
      </SectionDisplay>
    </section>
  );
};

export default ContactSection;
