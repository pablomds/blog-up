import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AtSign, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router';

import backgroundLogin from "../../Assets/Background/background-login.jpg"

import Input from '../../Components/Global/Input/Input';
import Loader from '../../Components/Global/Loader/Loader';

const loginSchema = yup.object({
  email: yup.string().required("Your email is required").email("Your email must be valid"),
  password: yup.string().required("Your password is required"),
});

type FormLogin = yup.InferType<typeof loginSchema>;

const LoginPage = () => {

  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

    const { register, handleSubmit,control, formState: { errors } } = useForm<FormLogin>({
      resolver: yupResolver(loginSchema),
      mode: "onSubmit" // Errors will only show after submitting
    });

    const onSubmit = async (formLogin: FormLogin) => {
      console.log(formLogin);
      setIsFormSubmited(true);
    }

  return (
    <div className="h-screen w-screen overflow-hidden relative md:flex md:flex-row md:gap-x-26 select-none">
      <div className="hidden md:flex h-full w-1/4 left-0 justify-center items-center bg-white bg-center bg-cover relative" style={{ backgroundImage: `url(${backgroundLogin})` }}>
        <div className="w-[5px] h-full bg-blog-up-white z-10 absolute right-0"/>
        <div className="font-inria-sans -rotate-90 text-8xl z-10">Login</div>
        <div className="absolute bg-black h-full w-full opacity-50" />
      </div>
      <div className="h-full w-full px-6 flex flex-col justify-center gap-10">
        <div className="text-center xs:text-start">
          <h1 className="font-inria-sans text-5xl">Welcome</h1>
          <h2 className="font-inria-sans text-2xl opacity-75">
            Let’s log you in quickly
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-y-8"
        >
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
          <Controller
            control={control}
            name={"password"}
            render={({ field }) => (
              <Input
                {...field}
                type={showPassword ? "password" : "text"}
                autoComplete="on"
                placeholder={"Whats your password ?"}
                error={errors.password?.message}
                icon={
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5 opacity-60" />
                    ) : (
                      <EyeOff className="w-5 h-5 opacity-60" />
                    )}
                  </div>
                }
              />
            )}
          />
          <button
            type="submit"
            className="font-inria-sans font-bold rounded-[10px] text-2xl bg-blog-up-green h-10 w-52 max-w-[150px] text-blog-up-black cursor-pointer flex justify-center items-center"
          >
            {"LOGIN"}
          </button>
        </form>
        <div className="flex flex-col text-xl font-inria-sans bold">
          <span className="text-blog-up-white">Don't have an account ?</span>
          <Link to="/sign-up" className="text-blog-up-green cursor-pointer"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage