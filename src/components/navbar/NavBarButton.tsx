import { useState } from "react";
import { NavBarSubMenu } from "./NavBarSubMenu";

interface NavBarButtonProps {
  label: string;
  isSelected?: boolean;
  canShowSubMenu?: boolean;
  onClick: () => void;
}

const NavBarButton: React.FC<NavBarButtonProps> = ({
  label,
  isSelected,
  canShowSubMenu,
  onClick,
}) => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const subMenuItems = [
    { label: "XDefiant", link: "/XDefiant" },
    { label: "Rocksmith+: Case Study", link: "/Rocksmith" },
    { label: "Indeed Smart Apply: Case Study", link: "/Indeed" },
    { label: "Other Projects", link: "/OtherProjects" },
  ];
  return (
    <div
      className=" h-fit w-fit flex flex-row relative"
      onMouseEnter={() => setOpenSubMenu(true)}
      onMouseLeave={() => setOpenSubMenu(false)}
    >
      <div
        className={` ${
          openSubMenu ? " bg-primary text-bg " : " bg-bg text-primary"
        } font-f5000 lg:w-42 lg:p-3 lg:text-1xl  md:w-fit md:text-base md:p-4 sm:p-6 sm:w-fit sm:text-xs xs:py-6 xxs:py-6 xs:w-fit xxs:w-fit xs:text-[8px] xxs:text-[8px] xs:px-1 xxs:px-1`}
      >
        <li className="navbar-button flex flex-row " onClick={onClick}>
          {isSelected ? <div className="">////</div> : null}
          <p>{label}</p>
        </li>
      </div>

      {openSubMenu && canShowSubMenu ? (
        <div className="absolute left-42">
          <NavBarSubMenu items={subMenuItems} />
        </div>
      ) : null}
    </div>
  );
};

export default NavBarButton;
