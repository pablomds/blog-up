import { useRef, useEffect, ReactNode } from "react";
import { motion, useAnimation , useInView } from 'motion/react';

type props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Slide({ children, delay, className }: props) {
    const ref = useRef(null);
    const isInview = useInView(ref, { once: true });
    const controls = useAnimation();
  
    useEffect(() => {
      if (isInview) {
        controls.start("visible");
      }
    }, [isInview]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: "easeOut" }, // Slower appearance
      }}
      exit={{
        opacity: 0,
        y: 50,
        transition: { duration: 0.8, ease: "easeInOut" }, // Faster disappearance
      }}
      viewport={{ amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}