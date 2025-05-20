import gsap from "gsap";

import s from "../../components/loader/loader.module.scss";

export function animateIn() {
  const tl = gsap.timeline();
  const className = [`.${s.bar}`, `.${s.bars}`];
  tl.set(className, { yPercent: 0, height: "100%" }).to(className, {
    yPercent: -100,
    height: 0,
    transformOrigin: "top",
    ease: "expo.inOut",
    duration: 1,
    stagger: { amount: 0.8 },
    delay: 0,
  });
}

interface AnimateOutParams {
  href: string;
  router: {
    push: (href: string) => void;
  };
}

export function animateOut(
  href: AnimateOutParams["href"],
  router: AnimateOutParams["router"]
): void {
  const tl = gsap.timeline();
  const className: string[] = [`.${s.bar}`, `.${s.bars}`];
  tl.set(className, { yPercent: 0, height: "100svh" }).to(className, {
    yPercent: 100,
    transformOrigin: "top",
    ease: "expo.inOut",
    duration: 1,
    stagger: { amount: 0.8 },
    onComplete: (): void => {
      router.push(href);
    },
  });
}
