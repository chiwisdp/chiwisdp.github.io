import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import NavBarButton from "./NavBarButton";

interface TopNavBarProps {
  onSectionChange: (section: number) => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({ onSectionChange }) => {
  const section = useSelector(
    (state: RootState) => state.landingPageSection.section
  );
  const sections = [
    "START",
    "ABOUT",
    "SKILLS",
    "PROJECTS",
    "AWARDS",
    "CONTACT",
  ];
  const isMobile = window.innerWidth <= 1024;
  return (
    <>
      <nav className="z-3000 fixed lg:top-0 left-0 p-0 lg:w-fit md:w-full md:bottom-0 sm:bottom-0 sm:w-full xs:w-full xs:bottom-0 xxs:w-full xxs:bottom-0 ">
        <ul
          className="flex lg:flex-col gap-0 md:flex-row sm:flex-row xs:flex-row md:bg-bg sm:bg-bg xs:bg-bg xxs:bg-bg
        md:justify-evenly sm:justify-evenly xs:justify-evenly xxs:justify-evenly  lg:border-r-1 lg:border-b-1 lg:border-primary  "
        >
          {sections.map((sectionLabel, index) => (
            <NavBarButton
              key={index}
              label={sectionLabel}
              onClick={() => onSectionChange(index)}
              isSelected={section === index ? true : false}
              canShowSubMenu={
                sectionLabel === "PROJECTS" && !isMobile ? true : false
              }
            />
          ))}
        </ul>
      </nav>
    </>
  );
};
