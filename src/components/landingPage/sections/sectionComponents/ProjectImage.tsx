import React from "react";

interface ProjectImage {
  imageUrl?: string;
  altText?: string;
  glowColor?: string;
}

export const ProjectImage: React.FC<ProjectImage> = ({
  imageUrl = "/api/placeholder/600/400",
  altText = "Cyberpunk image",
  glowColor = "#d5ff18", // Default cyan color
}) => {
  return (
    <div className="relative lg:max-w-3/5 md:max-w-4/5 sm:max-w-2/5 xs:max-w-3/5 xxs:max-w-5/5  mx-auto ">
      {/* Main container */}
      <div className="relative border-1 border-primary-light bg-black">
        {/* Corner accents */}
        <div
          className="absolute -top-2 -left-2 w-8 h-8 border-t-1 border-l-1"
          style={{ borderColor: glowColor }}
        ></div>
        <div
          className="absolute -top-2 -right-2 w-8 h-8 border-t-1 border-r-1"
          style={{ borderColor: glowColor }}
        ></div>
        <div
          className="absolute -bottom-2 -left-2 w-8 h-8 border-b-1 border-l-1"
          style={{ borderColor: glowColor }}
        ></div>
        <div
          className="absolute -bottom-2 -right-2 w-8 h-8 border-b-1 border-r-1"
          style={{ borderColor: glowColor }}
        ></div>

        {/* Image container */}
        <div className="relative p-1 overflow-hidden">
          <img src={imageUrl} alt={altText} className="w-fit h-fit" />

          {/* HUD-like elements */}
          <div
            className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-xs font-mono p-1 border border-gray-600"
            style={{ color: glowColor }}
          >
            <div className="flex items-center gap-1 lg:text-[9px] md:text-[8px] sm:text-[7px] xs:text-[6px] xxs:text-[5px]">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              SYS.45.3/x
            </div>
            <div className="text-right text-xs opacity-70 lg:text-[9px] md:text-[8px] sm:text-[7px] xs:text-[6px] xxs:text-[5px]">
              [ФЖ-22]
            </div>
          </div>

          {/* Top left readout */}
          <div
            className="absolute top-2 left-3 text-xs font-mono"
            style={{ color: glowColor }}
          >
            <div className="flex flex-col lg:text-[9px] md:text-[0px] sm:text-[0px] xs:text-[0px] xxs:text-[0px]">
              <span>ID:// CASE STUDY</span>
              <span>&gt; STANDBY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative text */}
      <div
        className="mt-2 text-center font-mono lg:text-[9px] md:text-[0px] sm:text-[0px] xs:text-[0px] xxs:text-[0px] tracking-widest opacity-80 uppercase"
        style={{ color: glowColor }}
      >
        NEURAL•INTERFACE•PROCESS
      </div>
    </div>
  );
};
