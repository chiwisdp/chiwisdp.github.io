import React from "react";
import SectionDisplay from "./sectionComponents/SectionDisplay";

const AwardsSection: React.FC = () => {
  return (
    <section
      id="awardSection"
      className="relative pointer-events-auto overflow-y-clip text-primary
      lg:max-h-4/5 md:max-h-4/5 sm:max-h-4/5 xs:max-h-4/5 xxs:max-h-5/5
      xl:max-w-4/8 lg:max-w-4/5 md:max-w-5/5 sm:max-w-5/5 xs:max-w-6/5  xxs:max-w-7/5
       lg:bottom-4 md:bottom-10 sm:bottom-10/20 xs:bottom-7/20  xxs:bottom-1/20
      "
    >
      <SectionDisplay title="Awards">
        <div className="flex lg:flex-row md:flex-row sm:flex-row xs:flex-col xxs:flex-col items-start justify-start m-2">
          <div className="mr-4">
            <h2 className="lg:text-2xl  font-f5000 ">Awards</h2>
            <ul
              className="text-primary-light font-fusion 
            lg:text-xs md:text-[10px] sm:text-[8px] xs:text-[8px] xxs:text-[8px]"
            >
              <li className="mb-2">
                2020: My Famicase Exhibition : Karaoke Hell
              </li>

              <li className="mb-2">
                2012: San Francisco Global Game Jam : Most Polish For Dynamice{" "}
              </li>
              <li className="mb-2">
                2010: Independent Games Festival Student Showcase Winner For
                Spectre{" "}
              </li>
              <li className="mb-2">2009: Indiecade Finalist For Spectre </li>
              <li className="mb-2">
                2009: Independent Games Festival Student Showcase Winner For Kid
                the World Saver
              </li>
              <li className="mb-2">
                2007: California Governor’s Safety Award For Disaster Zone
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="lg:text-2xl font-f5000">Media </h2>
            <ul
              className="text-primary-light font-fusion 
             lg:text-xs md:text-[10px] sm:text-[8px] xs:text-[8px] xxs:text-[8px]"
            >
              <li className="mb-2">
                PC Gamer Magazine Issue #280 July 2016 Top 10 Downloads : Cold
                Email{" "}
              </li>
              <li className="mb-2">PCGamer.com March 2016 : Cold Email</li>
              <li className="mb-2">
                <a
                  className="underline text-primary"
                  href="https://www.rockpapershotgun.com/best-free-games-of-the-week-15"
                >
                  Rock Paper Shotgun:
                </a>{" "}
                Cold Email{" "}
              </li>
              <li className="mb-2">Indiegames.com: Cold Email</li>
              <li className="mb-2">
                <a
                  className="underline text-primary"
                  href="https://www.youtube.com/watch?v=X1Bi6Q-fp2E&t=287s"
                >
                  Pewdiepie:
                </a>{" "}
                Cold Email{" "}
              </li>
              <li className="mb-2">Indiegames.com: Type Set </li>
            </ul>
          </div>
        </div>
      </SectionDisplay>
    </section>
  );
};

export default AwardsSection;
