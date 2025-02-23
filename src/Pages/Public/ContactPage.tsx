import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from "motion/react";
import emailjs from '@emailjs/browser';
import { AtSign, User } from "lucide-react";

import Loader from "@/Components/Global/Loader/Loader";
import CustomToast from "@/Components/Global/Toast/CustomToast";
import backgroundContact from "@/Assets/Background/background-contact.jpg";
import Input from "@/Components/Global/Input/Input";
import ActionButton from "@/Components/Global/Button/ActionButton";
import BackgroundImage from "@/Components/Global/BackgroundImage/BackgroundImage";

const contactSchema = yup.object({
  name: yup.string().max(40, "Your must have less than 40 characters").required("Your name is required"),
  email: yup.string().required("Your email is required").email("Your email must be valid"),
  message: yup.string().required("Your message is required")
});

type ContactFormData = yup.InferType<typeof contactSchema>;

const ContactPage = () => {

  const { register, control, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
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
      CustomToast({ variant: "success", message: "Success Your Email Was Sent!"});
    } catch (error) {
      CustomToast({ variant: "failed", message: "An Error Occured Sending Your Email!"});
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
      className={`h-screen bg-blog-up-black relative flex flex-row md:gap-x-26 select-none ${
        isEmailSent && "overflow-hidden"
      }`}
    >
      <BackgroundImage backgroundImage={backgroundContact} title={"CONTACT"} />
      {isEmailSent && <Loader />}
      <div className="h-full w-full md:w-4/5 px-6 pt-13 pb-5 md:pt-24  flex flex-col justify-between gap-y-2">
        <div className="flex flex-col items-start md:gap-y-12">
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
            className="pt-9 flex flex-col w-full gap-y-8 md:max-w-[508px]"
          >
            <Controller
              control={control}
              name={"name"}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={"Whats your name ?"}
                  error={errors.name?.message}
                  icon={<User className="w-5 h-5 opacity-60" />}
                />
              )}
            />
            <Controller
              control={control}
              name={"email"}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={"Whats your email ?"}
                  error={errors.email?.message}
                  icon={<AtSign className="w-5 h-5 opacity-60" />}
                />
              )}
            />
            <div className="flex flex-col">
              <textarea
                {...register("message")}
                className="font-inria-sans w-full h-[215px] max-w-[508px] border-2 border-blog-up-green py-4 pl-6 rounded-[5px] focus:outline-none resize-none"
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
            <ActionButton type="submit" variant="valid" label={"SEND IT"}/>
          </form>
        </div>
        <div className="flex items-end justify-start md:justify-start">
          <span className="font-inria-sans">
            © 2025 Blog Up. All rights reserved.
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactPage