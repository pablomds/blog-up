import { motion, useAnimate } from "motion/react";
import { useEffect } from "react";

const Loader = () => {
  const text = "Blog Up.  Blog Up.  Blog Up.";
  const characters = text.split("");

  const radius = 80;
  const letterSpacing = 12.5;

  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateLoader = async () => {
      const letterAnimation: any = [];
      characters.forEach((_, i) => {
        letterAnimation.push([
          `.letter-${i}`,
          { opacity: 0 },
          { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" }
        ]);
      });
      characters.forEach((_, i) => {
        letterAnimation.push([
          `.letter-${i}`,
          { opacity: 1 },
          { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" }
        ]);
      });
      animate(letterAnimation, {
        ease: "linear",
        repeat: Infinity
      });
      animate(
        scope.current,
        { rotate: 360 },
        { duration: 4, ease: "linear", repeat: Infinity }
      );
    };
    animateLoader();
  }, []);

  return (
<div className="w-full h-full fixed inset-0 flex justify-center items-center z-50"> 
  <motion.div ref={scope} className="aspect-square relative" style={{ width: radius * 2 }}>
    <p aria-label={text} />
    <p aria-hidden="true" className="text text-blog-up-green">
      {characters.map((ch, i) => (
        <motion.span
          key={i}
          className={`letter letter-${i} text-lg`}
          style={{
            transformOrigin: `0 ${radius}px`,
            transform: `rotate(${i * letterSpacing}deg)`,
          }}
        >
          {ch}
        </motion.span>
      ))}
    </p>
  </motion.div>
</div>

  );
};

export default Loader;
