import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from "motion/react";
import emailjs from '@emailjs/browser';

import Loader from "../../Components/Global/Loader/Loader";
import backgroundContact from "../../Assets/Background/background-contact.jpg";
import { useToast } from "../../Context/ToastContext";

const contactSchema = yup.object({
  name: yup.string().max(40, "Your must have less than 40 characters").required("Your name is required"),
  email: yup.string().required("Your email is required").email("Your email must be valid"),
  message: yup.string().required("Your message is required")
})

type ContactFormData = yup.InferType<typeof contactSchema>;

const ContactPage = () => {

  const toast = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    mode: "onSubmit" // Errors will only show after submitting
  });
  
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsEmailSent(false), 3000); // Hide after 3s
      return () => clearTimeout(timer);
    }, [isEmailSent]);

  const onSubmit = async (formValues: ContactFormData) => {
    setIsEmailSent(true);
    try {
      await emailjs.send(import.meta.env.VITE_EMAIL_JS_SERVICE_ID, import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID, formValues , {
        publicKey: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY,
      })
      toast?.open("Success your email was sent!", "success")
    } catch (error) {
      toast?.open("Internal error occured while sending your email!", "failed")
    }
  }

  return (
    <motion.div
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
      viewport={{ amount: 0.6 }}
      id="contact"
      className="h-screen bg-blog-up-black relative flex flex-row md:gap-x-28 select-none"
    >
      <div
        className="max-md:hidden w-1/5 h-full bg-blog-up-white left-0 top-0 bg-cover bg-center flex justify-between items-center relative"
        style={{ backgroundImage: `url(${backgroundContact})` }}
      >
        <div className="absolute bg-black h-full w-full opacity-60" />
        <div />
        <h1 className="font-inria-sans text-7xl -rotate-90 z-10">Contact</h1>
        <div className="h-full w-1 bg-white z-10"></div>
      </div>
      <div className="h-full w-full md:w-4/5 px-6 pt-13 md:pt-24 pb-5 flex flex-col justify-between">
        <div className="flex flex-col items-center md:items-start md:gap-y-12">
          <h1 className="md:hidden font-inria-sans text-5xl">Contact</h1>
          <div className="pt-6 gap-y-3 md:gap-y-2">
            <p className="font-inria-sans text-xl md:text-4xl">
              What if creativity and connection found a home?
            </p>
            <span className="font-inria-sans text-lg md:text-3xl text-blog-up-white opacity-70">
              Let’s connect!
            </span>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pt-9 flex flex-col w-full gap-y-9 md:max-w-[508px]"
          >
            <div className="flex flex-col">
              <input
                {...register("name")}
                type="text"
                className="font-inria-sans w-full h-14 border-2 border-blog-up-green py-4 pl-6 rounded-[5px] focus:outline-none"
                placeholder="Whats your name ?"
              />
              <span
                className={`font-inria-sans text-blog-up-red h-5 transition-all duration-300 ${
                  errors.name ? "opacity-100" : "opacity-0"
                }`}
              >
                {errors.name?.message || " "}
              </span>
            </div>
            <div className="flex flex-col">
              <input
                {...register("email")}
                type="email"
                className="font-inria-sans w-full h-14 border-2 border-blog-up-green py-4 pl-6 rounded-[5px] focus:outline-none"
                placeholder="Whats your email ?"
              />
              <span
                className={`font-inria-sans text-blog-up-red h-5 transition-all duration-300 ${
                  errors.name ? "opacity-100" : "opacity-0"
                }`}
              >
                {errors.email?.message || " "}
              </span>
            </div>
            <div className="flex flex-col">
              <textarea
                {...register("message")}
                className="font-inria-sans w-full h-[215px] border-2 border-blog-up-green py-4 pl-6 rounded-[5px] focus:outline-none resize-none"
                placeholder="Whats your message ?"
              />
              <span
                className={`font-inria-sans text-blog-up-red h-5 transition-all duration-300 ${
                  errors.message ? "opacity-100" : "opacity-0"
                }`}
              >
                {errors.message?.message || " "}
              </span>
            </div>
            <button
              type="submit"
              className="font-inria-sans font-bold rounded-[10px] text-2xl bg-blog-up-green h-10 w-52 md:max-h-[40px] md:max-w-[150px] text-blog-up-black cursor-pointer flex justify-center items-center"
            >
              { isEmailSent ? <Loader/> : "SEND IT"}
            </button>
          </form>
        </div>
        <div className="flex items-end justify-center md:justify-start">
          <span className="font-inria-sans">
            © 2025 Blog Up. All rights reserved.
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactPage