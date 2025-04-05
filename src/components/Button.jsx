"use client";

import { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { gsap } from "gsap";

export default function Button({ value, width = "100%", height = "45px", size = "20px", shadow = true, custom = "" }) {
  useEffect(() => {
    const buttons = document.querySelectorAll(".animated-button");

    buttons.forEach((button) => {
      const hoverEffect = button.querySelector(".hover-effect");

      const onPointerEnter = (e) => {
        gsap.set(hoverEffect, {
          width: 0,
          height: 0,
          top: 0,
          left: 0,
          backgroundColor: "var(--gray-light)",
        });

        gsap.to(hoverEffect, {
          width: "225%",
          height: "562.5px",
          duration: 0.1,
          ease: "power1.out",
        });
      };

      const onPointerLeave = (e) => {
        gsap.to(hoverEffect, {
          width: 0,
          height: 0,
          duration: 0.4,
          ease: "power1.in",
          top: "100%",
          left: "100%",
        });
      };

      button.addEventListener("pointerenter", onPointerEnter);
      button.addEventListener("pointerleave", onPointerLeave);

      return () => {
        button.removeEventListener("pointerenter", onPointerEnter);
        button.removeEventListener("pointerleave", onPointerLeave);
      };
    });
  }, []);

    const buttonStyles = `animated-button font-secondary border-[1px] flex justify-evenly items-center self-center border-grayLight relative overflow-hidden ${shadow ? "shadow-md shadow-grayLight" : ""} ${custom}`;
    const textStyles = `button-text flex items-center justify-center h-full`;
    const arrowStyles = `button-arrow flex items-center justify-center h-full w-[25%] border-l-[1px]`;

    return (
        <button
            className={`${buttonStyles} isolate select-none sm:h-[50px] lg:h-[60px]`}
            style={{
                width: width,
                height: height,
            }}
        >
            <span className="hover-effect z-20 mix-blend-difference w-0 h-0 rounded-full"></span>
            <p
                className={`${textStyles} z-20 mix-blend-difference text-[${size}] sm:text-[18px] lg:text-[20px]`}
                style={{ width: "100%" }}
            >
                {value}
            </p>
            <p className={`${arrowStyles} z-20 mix-blend-difference`}>
                <IoIosArrowForward style={{ height: size }} />
            </p>
        </button>
    );
}
