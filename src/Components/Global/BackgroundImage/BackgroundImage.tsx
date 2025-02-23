import { motion } from 'motion/react';
import React from 'react'

interface IBackgroundImage {
    backgroundImage: string;
    title: string;
}

const BackgroundImage: React.FC<IBackgroundImage> = ({ backgroundImage, title }) => {
    return (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }}   
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.01 }} 
          className="hidden md:flex h-full w-1/4 left-0 justify-center items-center bg-white bg-center bg-cover relative"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="w-[5px] h-full z-10 bg-blog-up-green-dark mix-blend-exclusion absolute right-0 opacity-75" />
          <div className="font-inria-sans -rotate-90 text-8xl z-10 text-nowrap text-blog-up-green-dark/80">
            {title}
          </div>
          <div className="absolute bg-black h-full w-full opacity-75" />
        </motion.div>
      );
}

export default BackgroundImage