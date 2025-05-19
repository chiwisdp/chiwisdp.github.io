import gsap from "gsap";

export const gsapLoader = () => {
  return gsap.to(".content", {
    opacity: 0,
    scaleX: 0,
    duration: 0.5,
    ease: "back.inOut",
  });
};
