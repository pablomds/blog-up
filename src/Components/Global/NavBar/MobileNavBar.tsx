"use client"
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx"
import { AiOutlineClose } from "react-icons/ai"
import { motion, AnimatePresence } from 'motion/react';
import { HashLink as Link } from 'react-router-hash-link'

const MobileNavBar = ({ navLinks } : any) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownVariants = {
    hidden: {
      y: "-100vh",
    },
    visible: {
      y: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    exit: {
      y: "-100vh",
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.3,
      },
    },
  };

  const linkItemVariants = {
    hidden: { opacity: 0 , y: '50%'},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: '50%',
      transition: {
        duration: 0.1,
        ease: "easeOut"
      }
    }
  };

  const navLinksVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const NavBarLinks = () => {
    return (
      <>
        <motion.ul
          className="w-full flex flex-col items-center justify-center"
          variants={navLinksVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {navLinks.map((navItem: any, index: number) => {
            return (
              <motion.li
                key={index}
                className="w-full flex justify-center items-center font-inria-sans text-center h-[40px] active:bg-[#FF5E5B] duration-100 text-[24px]"
                variants={linkItemVariants}
              >
                <Link onClick={() => setIsOpen(false)} key={index} to={navItem.link}>{navItem.label}</Link> 
              </motion.li>
            );
          })}
        </motion.ul>
      </>
    );
  };

  const ClosedNavBar = () => {
    const transition = {
      duration: 0.3,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01],
    };

    return (
      <motion.div
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={transition}
        onClick={() => setIsOpen(true)}
        className="fixed top-5 left-5 z-50"
      >
        <div className="bg-[#101010] p-3 rounded-full shadow-md cursor-pointer">
          <RxHamburgerMenu size={20} className="text-white" />
        </div>
      </motion.div>
    );
  };


  const OpenedNavBar = () => {
    return (
      <motion.div
        variants={dropDownVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-w-screen min-h-screen bg-[#101010] gap-y-12 select-none top-0 left-0 z-50 overflow-hidden fixed"
      >
        <div
          className="w-full flex justify-between px-3 py-3"
        >
          <motion.div onClick={() => setIsOpen(false)} className="text-xl font-inria-sans">Blog Up</motion.div>
          <div
            onClick={() => setIsOpen(false)}
            className="flex flex-col justify-center items-center select-none"
          >
            <AiOutlineClose size={22} className="text-white" />
            <p className="font-inria-sans text-xs">CLOSE</p>
          </div>
        </div>
        <NavBarLinks />
      </motion.div>
    );
  };


  return (
    <nav className="block md:hidden">
      <AnimatePresence>{isOpen && <OpenedNavBar />}</AnimatePresence>
      <AnimatePresence>{!isOpen && <ClosedNavBar />}</AnimatePresence>
    </nav>
  );
}
export default MobileNavBar

