import { useState } from "react";
import { Link } from "react-router-dom";

interface NavBarSubMenuProps {
  items: { label: string; link: string }[];
}

export const NavBarSubMenu: React.FC<NavBarSubMenuProps> = ({ items }) => {
  const [selectedLink, setSelectedLink] = useState(-1);
  return (
    <div className="navbar-submenu relative [clip-path:polygon(0%_0%,100%_0%,100%_calc(100%-24px),calc(100%-24px)_100%,0%_100%)] -top-4 shadow-2xlg shadow-my-blue">
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="submenu-item text-bg bg-primary font-f5000 w-96 p-2"
            onMouseEnter={() => setSelectedLink(index)}
            onMouseLeave={() => setSelectedLink(-1)}
          >
            <div className="flex flex-row ">
              <div className="">
                {selectedLink === index ? <div>////</div> : null}
              </div>
              <Link to={item.link}>
                <a>{item.label}</a>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
