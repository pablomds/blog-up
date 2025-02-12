import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtSign, User, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router';
import { useNavigate } from "react-router";

import Input from '../../Components/Global/Input/Input';
import { createUser } from '../../Controllers/usersControllers';
import { signUpWithEmailAndPassword } from '../../Firebase/authentication';
import { SignUpSchema, FormSignUpSchema } from '../../Schemas/SignUpSchema';
import CustomToast from '../../Components/Global/Toast/CustomToast';

import backgroundSignUp from "../../Assets/Background/background-sign-up.jpg";


const SignUpPage = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setConfirmShowPassword] = useState(true);

        const {
          register,
          handleSubmit,
          control,
          formState: { errors },
        } = useForm<FormSignUpSchema>({
          resolver: yupResolver(SignUpSchema),
          mode: "onSubmit",
        });

    const onSubmit = async (formValues: FormSignUpSchema) => {
      const { email, name, password } = formValues;
      try {
        const uid = await signUpWithEmailAndPassword(email, password);
        if (uid) await createUser(email, name, uid);
        CustomToast({ variant: "success" , message: "You're Signed Up!"});
        navigate("/login")
      } catch (error) {
        console.log("Error On onSubmit()", error);
        CustomToast({ variant: "failed" , message: "Sign Up failed!"});
      }
    };
  return (
    <div className="h-screen w-screen overflow-hidden relative md:flex md:flex-row md:gap-x-26 select-none">
      <div
        className="hidden md:flex h-full w-1/4 left-0 justify-center items-center bg-white bg-center bg-cover relative"
        style={{ backgroundImage: `url(${backgroundSignUp})` }}
      >
        <div className="w-[5px] h-full z-10 bg-blog-up-white mix-blend-exclusion absolute right-0 opacity-75" />
        <div className="font-inria-sans -rotate-90 text-8xl z-10 mix-blend-difference text-nowrap">
          Sign Up
        </div>
        <div className="absolute bg-black h-full w-full opacity-75" />
      </div>
      <div className="h-full w-full px-6 flex flex-col justify-center gap-10">
        <div className="text-center xs:text-start">
          <h1 className="font-inria-sans text-5xl">Welcome</h1>
          <h2 className="font-inria-sans text-2xl opacity-75">
            Let’s sign up quickly
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-y-4"
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
          <Controller
            control={control}
            name={"confirmPassword"}
            render={({ field }) => (
              <Input
                {...field}
                type={showConfirmPassword ? "password" : "text"}
                autoComplete="on"
                placeholder={"Can you confirm your password ?"}
                error={errors.confirmPassword?.message}
                icon={
                  <div
                    className="cursor-pointer"
                    onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
            {"SIGN UP"}
          </button>
        </form>
        <div className="flex flex-col text-xl font-inria-sans bold">
          <span className="text-blog-up-white">Already have an account ?</span>
          <Link to="/login" className="text-blog-up-green cursor-pointer">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage