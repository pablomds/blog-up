import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import MobileBackgroundImage from "../../Assets/Background/background-about-page-mobile.jpg";
import DesktopBackgroundImage from "../../Assets/Background/desktop-background.jpg";

const AboutPage = () => {

  const Mobile = () => {
    return (
      <div
        className="md:hidden min-h-screen w-screen select-none bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(${MobileBackgroundImage})` }}
      >
        {/* Overlay transparent avec opacité uniquement sur l'image de fond */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#2C2C2C] opacity-97"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#2C2C2C] to-transparent" />

        <div className="container mx-auto px-2.5 pt-13 flex flex-col gap-y-6 relative z-10">
          <h1 className="font-inria-sans font-bold text-center text-5xl">
            About
          </h1>
          <div className="flex flex-col gap-y-7">
            <p className="font-inria-sans text-base">
              Welcome to Blog Up – a space where creativity and imagination
              converge. Here, every post is a canvas, and every word is a
              brushstroke of self-expression. Blog Up is designed to inspire,
              inform, and connect, offering a platform for sharing ideas,
              stories, and passions that resonate. Whether you're here to
              explore fresh perspectives, discover engaging content, or find
              your voice as a writer, Blog Up is your companion on this journey.
              Let your imagination speak, and together, let’s build a world of
              endless inspiration.
            </p>
            <div className="flex flex-col">
              <p className="font-inria-sans italic text-2xl">
                “Logic will get you from A to B. Imagination will take you
                everywhere.”
              </p>
              <span className="font-inria-sans text-base">Albert Einstein</span>
            </div>
            <p className="font-inria-sans text-base">
              Blog Up is more than just a website; it’s a hub for creativity,
              connection, and exploration. My goal with this platform is to
              provide a space where ideas come to life, stories are shared, and
              voices are heard. Whether it’s through insightful articles,
              engaging stories, or inspiring perspectives, I want Blog Up to be
              a place where readers and writers alike can find value and
              inspiration. This website is about building a community that
              thrives on imagination, fuels curiosity, and empowers everyone to
              express themselves authentically. Together, let’s create something
              meaningful.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const SECTION_HEIGHT = 1200;

  const Hero = () => {

    return (
      <div
        className="hidden md:block relative w-full" 
        style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)`}}
      >
        <CenterImage />
        <ParallaxDivs />

        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-[#2C2C2C]/0 to-[#2C2C2C]" />
      </div>
    );
  };
  
  const CenterImage = () => {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0]);
    const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ["170%", "100%"]);

    const clip1 = useTransform(scrollY, [0, SECTION_HEIGHT], [25,0]);
    const clip2 = useTransform(scrollY, [0, SECTION_HEIGHT], [75,100]);

    const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%,
    ${clip2}% ${clip1}%,
    ${clip2}% ${clip2}%,
    ${clip1}% ${clip2}%)`;

    return (
      <div className="sticky top-0 h-screen w-full">
        <motion.h1 style={{
          opacity
        }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference font-inria-sans text-9xl text-white z-20">
          About
        </motion.h1>
        <div className="absolute w-full h-full bg-[#2C2C2C]/50"/>
        <motion.div
          className="h-full w-full sticky top-0"
          style={{
            opacity,
            backgroundSize,
            clipPath,
            backgroundImage: `url(${DesktopBackgroundImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    );
  };

  const ParallaxDivs = () => {
    return (
      <div className="mx-auto flex flex-col max-w-5xl px-4">
        <ParallaxText className="relative w-full z-20" start={-200} end={-500}>
          <div className="p-2">
            <p className="font-inria-sans text-white text-xl">
              Welcome to Blog Up – a space where creativity and imagination
              converge. Here, every post is a canvas, and every word is a
              brushstroke of self-expression. Blog Up is designed to inspire,
              inform, and connect, offering a platform for sharing ideas,
              stories, and passions that resonate. Whether you're here to
              explore fresh perspectives, discover engaging content, or find
              your voice as a writer, Blog Up is your companion on this journey.
              Let your imagination speak, and together, let’s build a world of
              endless inspiration.
            </p>
          </div>
        </ParallaxText>
        <ParallaxText
          className="relative w-full z-20  size-56 font-inria-sans"
          start={-300}
          end={-200}
        >
          <div className="p-2">
            <p className="font-inria-sans italic text-2xl">
              “Logic will get you from A to B. Imagination will take you
              everywhere.”
            </p>
            <span className="font-inria-sans text-white text-base">
              Albert Einstein
            </span>
          </div>
        </ParallaxText>

        <ParallaxText
          className="relative z-20 w-full font-inria-sans"
          start={-400}
          end={-150}
        >
          <div className="p-2">
            <p className="font-inria-sans text-xl">
              Blog Up is more than just a website; it’s a hub for creativity,
              connection, and exploration. My goal with this platform is to
              provide a space where ideas come to life, stories are shared, and
              voices are heard. Whether it’s through insightful articles,
              engaging stories, or inspiring perspectives, I want Blog Up to be
              a place where readers and writers alike can find value and
              inspiration. This website is about building a community that
              thrives on imagination, fuels curiosity, and empowers everyone to
              express themselves authentically. Together, let’s create something
              meaningful.
            </p>
          </div>
        </ParallaxText>
      </div>
    );
  };

  const ParallaxText = ({
    className,
    start,
    end,
    children
  }: {
    className?: string;
    start: number;
    end: number;
    children: ReactNode
  }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: [`${start}px end`, `end ${end *- 1}px`]
    });
    
    const opacity = useTransform(scrollYProgress, [0.75,1], [1,0]);
    const scale = useTransform(scrollYProgress, [0.75,1], [1,0.85]);
    const y = useTransform(scrollYProgress, [0, 1], [start,end]);

    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})` ;
    
    return <motion.div className={className} ref={ref} style={{
      opacity,
      transform
    }}> 
      {children}
    </motion.div>
  }

  return (
    <div id="about" className="bg-[#2C2C2C]">
      <Mobile />
      <Hero />
      <div className="max-md:hidden h-1/4"/>
    </div>
  );
}

export default AboutPage