import React from "react";
import { Link } from "react-router-dom";
import ASCIIText from "../sharedComponents/ASCIIText";
import TypewriterEffect from "../../TypewritterEffect";

const XDefiant: React.FC = () => {
  return (
    <div className="content text-primary-light w-svw h-svh flex flex-col items-center justify-center">
      <ASCIIText text="XDefiant" enableWaves={true} asciiFontSize={10} />
      <div className="fixed bottom-10 flex flex-col items-center justify-center">
        <div className=" flex flex-col items-center justify-center mb-10 font-fx300-angular text-4xl text-primary">
          <TypewriterEffect
            text="XDefiant Case Study"
            blockColor="bg-my-blue"
            additionalDelay={1}
          />
          <div className=" text-3xl text-primary-light">
            <TypewriterEffect
              text="Under construction"
              blockColor="bg-my-blue"
              additionalDelay={2}
            />
          </div>
        </div>
        <Link to="/">
          <div className="font-fx300-angular text-primary underline text-xl">
            Back to Daniel Simulation
          </div>
        </Link>
      </div>
    </div>
  );
};

export default XDefiant;
