import React from "react";
import Barcode from "../assets/barcode.svg";

const CyberElementsOverlay: React.FC = () => {
  return (
    <div
      className="cyber-elements-overlay fixed top-0 left-0 w-full h-full pointer-events-none z-2000 
    lg:border-b-1 lg:border-t-0 md:border-b-0 md:border-t-1 sm:border-t-1 xs:border-t-1 xxs:border-t-1
    lg:border-r-0  md:border-r-1  sm:border-r-1 xs:border-r-1 xxs:border-r-1 
    border-l-1 border-primary "
    >
      {/* Add your cyber elements or overlay content here */}
      <div
        className="fixed bottom-0 right-0
        lg:top-auto lg:left-auto md:top-0 sm:top-0 xs:top-0 xxs:top-0
        md:left-0 sm:left-0 xs:left-0 xxs:left-0
        
        rotate-0 lg:rotate-0 md:rotate-180 sm:rotate-180 xs:rotate-180 xxs:rotate-180
      w-2/10 lg:w-2/10 md:w-3/10 sm:w-3/10 xs:w-3/10 xxs:w-3/10
      h-fit object-cover  pointer-events-none 
      flex flex-col items-end justify-center "
      >
        <p
          className="text-primary  font-fx300-angular text-[7px] 
        lg:text-[5px] md:text-[4px] sm:text-[3px] xs:text-[3px] xxs:text-[2px] border-l-1 border-t-1 pl-1 pt-1  lg:pt-1 md:pt-1 sm:pt-1 xs:pt-1 xxs:pt-0 pr-1"
        >
          original daniel design and code
        </p>
        <img src={Barcode} alt="Cyber Elements" />
      </div>
    </div>
  );
};

export default CyberElementsOverlay;
