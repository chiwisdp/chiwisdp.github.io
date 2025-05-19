import { useGSAP } from "@gsap/react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

interface ScrollManagerProps {
  onSectionChange: (section: number) => void;
}
export const ScrollManager: React.FC<ScrollManagerProps> = ({
  onSectionChange,
}) => {
  const section = useSelector(
    (state: RootState) => state.landingPageSection.section
  );
  const data = useScroll();
  const lastScrollPos = useRef(0);
  const lastSection = useRef(0);
  const isAnimating = useRef(false);
  const canScroll = useRef(false);
  const scrollThreshold = 0.075;

  //fix for useScroll messing up css
  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useGSAP(() => {
    gsap.to(data.el, {
      duration: 0.4,
      ease: "power4.out",
      scrollTo: { y: section * data.el.clientHeight },

      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
        lastSection.current = section;
        canScroll.current = true;
        lastScrollPos.current = section / (data.pages - 1);
      },
    });
  }, [section]);

  useFrame(() => {
    if (isAnimating.current) {
      return;
    }

    if (data.offset > lastScrollPos.current + scrollThreshold) {
      canScroll.current = false;
      onSectionChange(
        gsap.utils.clamp(0, data.pages - 1, lastSection.current + 1)
      );
    }

    if (data.offset < lastScrollPos.current - scrollThreshold) {
      canScroll.current = false;
      onSectionChange(
        gsap.utils.clamp(0, data.pages - 1, lastSection.current - 1)
      );
    }
  });

  return null;
};
