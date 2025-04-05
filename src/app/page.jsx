"use client";

import { useState, useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import Button from "@/components/Button";
import ScrollProgress from "@/components/ScrollProgress";
import PostCard from "@/components/PostCard";
import Glow from "@/components/Glow";
import SplitText from "@/utils/SplitText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import seedrandom from "seedrandom";


export default function Home() {
  const [starCount, setStarCount] = useState(100);
  const [stars, setStars] = useState([]);
  const exigentRef = useRef(null);
  const aravindhRef = useRef(null);
  
  gsap.registerPlugin(ScrollTrigger);

  const generateStars = (count, seed = "default-seed") => {
    const rng = seedrandom(seed);
    return Array.from({ length: count }).map(() => ({
      top: `${rng() * 100}vh`,
      left: `${rng() * 100}vw`,
      animationDelay: `${rng() * 5}s`,
    }));
  };
  
  useEffect(() => {
    const seed = "static-seed";
    setStars(generateStars(starCount, seed));
  }, [starCount]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setStarCount(100);
      } else if (window.innerWidth >= 768) {
        setStarCount(50);
      } else {
        setStarCount(25);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    setStars(generateStars(starCount));

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [starCount]);

  useEffect(() => {
    const exigentElements = document.querySelectorAll('.exigent .split-text-char');
    const aravindhElements = document.querySelectorAll('.aravindh .split-text-char');

    if (exigentElements.length && aravindhElements.length) {
      const handleMouseEnterExigent = () => {
        gsap.to(exigentElements, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
        });
      };

      const handleMouseLeaveExigent = () => {
        gsap.to(exigentElements, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.in",
          onComplete: () => {
            gsap.to(exigentElements, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "power3.out",
            });
          }
        });
      };

      const handleMouseEnterAravindh = () => {
        gsap.to(aravindhElements, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
        });
      };

      const handleMouseLeaveAravindh = () => {
        gsap.to(aravindhElements, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.in",
          onComplete: () => {
            gsap.to(aravindhElements, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "power3.out",
            });
          }
        });
      };

      const exigentContainer = document.querySelector('.exigent');
      
      const aravindhContainer = document.querySelector('.aravindh');

      if (exigentContainer) {
        
        exigentContainer.addEventListener("mouseenter", handleMouseEnterExigent);
        exigentContainer.addEventListener("mouseleave", handleMouseLeaveExigent);
      }

      if (aravindhContainer) {
        aravindhContainer.addEventListener("mouseenter", handleMouseEnterAravindh);
        aravindhContainer.addEventListener("mouseleave", handleMouseLeaveAravindh);
      }

      return () => {
        if (exigentContainer) {
          exigentContainer.removeEventListener("mouseenter", handleMouseEnterExigent);
          exigentContainer.removeEventListener("mouseleave", handleMouseLeaveExigent);
        }
        if (aravindhContainer) {
          aravindhContainer.removeEventListener("mouseenter", handleMouseEnterAravindh);
          aravindhContainer.removeEventListener("mouseleave", handleMouseLeaveAravindh);
        }
      };
    }
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("#home-about, #home-blog, #home-work");
  
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 200,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "+=25% 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);
  

  return (
    <main id="home" className="min-h-screen w-full flex flex-col items-center">
      <Nav />
      <Glow />

      <section
        id="home-landing"
        className="relative flex flex-col items-center justify-center h-screen w-full text-center px-4 sm:px-6 md:px-12"
      >
        <h2 className="text-grayLight font-secondary text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          こんにちは
        </h2>
        <h2 className="text-background select-none font-secondary text-outline text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]">
          ?
        </h2>
        <h2 className="intro-text select-none text-grayLight cursor-pointer font-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <span ref={exigentRef} className="exigent">
            <SplitText text={"Exigent"} />
          </span> 
          <span className="mx-4">/</span>
          <span ref={aravindhRef} className="aravindh">
            <SplitText text={"Aravindh"} />
          </span>
        </h2>
        <div
          className="absolute bottom-0 z-1 w-screen h-[4rem] bg-background opacity-[1] blur-3xl rounded-full flex justify-center items-center"
          style={{
            boxShadow: "0 0 50px 20px rgba(0, 0, 0, 1)",
          }}
        />
        <div className="absolute top-0 left-0 w-screen h-screen bg-transparent z-[-1]">
          <div className="stars">
            {stars.map((star, index) => (
              <div
                key={index}
                className="star"
                style={{
                  top: star.top,
                  left: star.left,
                  animationDelay: star.animationDelay,
                }}
              ></div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="home-about"
        className="flex flex-col relative z-20 lg:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-16 px-6 lg:px-12 w-screen h-screen"
      >
        <div className="flex flex-col w-full lg:w-1/4 items-center lg:items-start text-grayLight font-headings text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
          <h3 className="mb-6 sm:mb-8 lg:mb-16 text-center select-none lg:text-left">
            Unraveling Stories, Exploring Mysteries.
          </h3>
          <Button value="Know More" width="250px" height="50px" />
        </div>
        <div className="hidden lg:block w-[1px] h-[60%] bg-gradient-to-b from-transparent via-grayLight to-transparent"></div>
        <div className="text-grayLight font-display text-xl sm:text-xl md:text-xl lg:text-3xl max-w-full lg:max-w-2xl text-center lg:text-left px-4 lg:px-0">
          <p>
            This is where I bring together my interest in solving puzzles and sharing ideas. From decoding challenges to diving into creative projects, every post is about discovering something new. Stick around—there's always a story to uncover.
          </p>
        </div>
      </section>

      <section
        id="home-blog"
        className="flex flex-col relative z-20 lg:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-16 px-6 lg:px-12 w-screen min-h-screen"
      >
        <div className="flex flex-col w-full lg:w-1/4 items-center lg:items-start text-grayLight font-headings text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
          <h3 className="mb-6 sm:mb-8 lg:mb-16 text-center select-none lg:text-left">
            New stories, fresh insights.
          </h3>
          <Button value="Visit Blog" width="250px" height="50px" />
        </div>
        <div className="hidden lg:block w-[1px] h-[60vh] bg-gradient-to-b from-transparent via-grayLight to-transparent"></div>
        <div className="text-grayLight font-display flex gap-20 text-xl flex-col sm:flex-col md:flex-col lg:flex-row max-w-full lg:max-w-2xl text-center lg:text-left px-4 lg:px-0">
            <PostCard />
            <PostCard />
        </div>
      </section>

      <section
        id="home-work"
        className="flex flex-col relative z-20 lg:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-16 px-6 lg:px-12 w-screen min-h-screen"
      >
        <div className="flex flex-col w-full lg:w-1/4 items-center lg:items-start text-grayLight font-headings text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
          <h3 className="mb-6 sm:mb-8 lg:mb-16 text-center select-none lg:text-left">
            Building ideas, to write code.
          </h3>
          <Button value="View Works" width="250px" height="50px" />
        </div>
        <div className="hidden lg:block w-[1px] h-[60vh] bg-gradient-to-b from-transparent via-grayLight to-transparent"></div>
        <div className="text-grayLight font-display flex gap-20 text-xl flex-col sm:flex-col md:flex-col lg:flex-row max-w-full lg:max-w-2xl text-center lg:text-left px-4 lg:px-0">
            <PostCard />
            <PostCard />
        </div>
      </section>

      <ScrollProgress />
    </main>
  );
}
