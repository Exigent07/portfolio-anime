"use client";

import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { gsap } from "gsap";
import SplitText from "@/utils/SplitText";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Works", path: "/works" },
    { name: "Blog", path: "/blog" },
  ];

  useEffect(() => {
    const buttons = document.querySelectorAll(".hover-button");
  
    buttons.forEach((button) => {
      const hoverEffect = button.querySelector(".hover-effect");
  
      let hoverInTimeline = null;
      let hoverOutTimeline = null;
  
      const onPointerEnter = () => {
        if (hoverOutTimeline) hoverOutTimeline.kill();
  
        hoverInTimeline = gsap.timeline();
        hoverInTimeline
          .set(hoverEffect, {
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            backgroundColor: "var(--gray-light)",
          })
          .to(hoverEffect, {
            width: "225%",
            height: "562.5px",
            duration: 0.1,
            ease: "power1.out",
          });
      };
  
      const onPointerLeave = () => {
        if (hoverInTimeline) hoverInTimeline.kill();
  
        hoverOutTimeline = gsap.timeline();
        hoverOutTimeline
          .to(hoverEffect, {
            width: 0,
            height: 0,
            top: "100%",
            left: "100%",
            duration: 0.3,
            ease: "power1.in",
          });
      };
  
      button.addEventListener("pointerenter", onPointerEnter);
      button.addEventListener("pointerleave", onPointerLeave);
  
      return () => {
        button.removeEventListener("pointerenter", onPointerEnter);
        button.removeEventListener("pointerleave", onPointerLeave);
        if (hoverInTimeline) hoverInTimeline.kill();
        if (hoverOutTimeline) hoverOutTimeline.kill();
      };
    });
  }, []);  

  useEffect(() => {
    const menu = document.querySelector("#nav-menu");

    if (window.innerWidth >= 1024) {
      gsap.set(menu, { clearProps: "all" });
      return;
    }

    if (menuOpen) {
      gsap.set(menu, { display: "flex" });
      gsap.to(menu, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(menu, { display: "none" });
        },
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    const element = document.querySelector(".hover-slide");
    const text = element.querySelectorAll(".hover-content span");
  
    let hoverInTimeline = null;
    let hoverOutTimeline = null;
  
    const onHover = () => {
      if (hoverOutTimeline) hoverOutTimeline.kill();
  
      hoverInTimeline = gsap.timeline();
      hoverInTimeline.to(text, {
        y: "100%",
        opacity: 1,
        stagger: 0.025,
        duration: 0.3,
        ease: "power1.out",
      });
    };
  
    const onHoverOut = () => {
      if (hoverInTimeline) hoverInTimeline.kill();
  
      hoverOutTimeline = gsap.timeline();
      hoverOutTimeline.to(text, {
        y: "0%",
        opacity: 0,
        stagger: 0.025,
        duration: 0.4,
        ease: "power1.out",
      });
    };
  
    element.addEventListener("pointerenter", onHover);
    element.addEventListener("pointerleave", onHoverOut);
  
    return () => {
      element.removeEventListener("pointerenter", onHover);
      element.removeEventListener("pointerleave", onHoverOut);
      if (hoverInTimeline) hoverInTimeline.kill();
      if (hoverOutTimeline) hoverOutTimeline.kill();
    };
  }, []);
  

  return (
    <nav
      id="nav"
      className={`fixed z-50 w-screen top-0 px-6 select-none sm:px-12 text-grayLight ${
        menuOpen ? "" : "mix-blend-difference"
      }`}
    >
      <div className="flex justify-between items-center py-4">
        <h3 className="hover-slide hover:opacity-85 transition-opacity text-grayLight flex items-center justify-center self-start text-4xl z-[99] sm:text-5xl lg:text-6xl font-logo cursor-pointer">
          Exigent
          <span
            className="hover-content hidden lg:block absolute text-transparent bottom-0 text-3xl z-[99] stroke-grayLight sm:text-4xl md:text-4xl lg:text-5xl font-logo"
            style={{
              WebkitTextStroke: "1px white",
              textStroke: "1px white",
            }}
          >
            <SplitText 
                text={"Aravindh"}
                customCSS={{
                    opacity: 0
                }}
            />
          </span>
        </h3>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-grayLight text-2xl z-[99]"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <MdClose /> : <RxHamburgerMenu />}
        </button>

        <div
          id="nav-menu"
          className={`fixed lg:static top-0 left-0 w-screen lg:w-auto h-screen lg:h-auto bg-background lg:bg-transparent flex flex-col justify-center lg:justify-end items-center gap-4 sm:gap-4 lg:gap-4 lg:opacity-100 lg:translate-y-0 ${
            menuOpen ? "opacity-1 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          {navItems.map((item) => (
            <button
                key={item.path}
                className="hover-button font-secondary shadow-md shadow-grayLight isolate text-xl sm:text-2xl border border-grayLight w-[150px] sm:w-[150px] md:w-[150px] lg:w-[200px] h-[50px] sm:h-[50px] md:h-[45px] lg:h-[60px] transition-all relative overflow-hidden"
                data-path={item.path}
            >
                <span className="hover-effect !z-50 pointer-events-none mix-blend-difference"></span>
                {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
