import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import _ from 'lodash';
import { AtSign, Eye, EyeOff } from 'lucide-react';

import { logInWithEmailAndPassword } from '@/Firebase/authentication';
import { getUserByUid } from '@/Controllers/usersControllers';
import { setUser } from '@/Redux/Slices/userSlice';
import { login } from '@/Redux/Slices/authSlice';
import { LoginSchema, FormLogin } from '@/Schemas/LoginSchema';

import Input from '@/Components/Global/Input/Input';
import CustomToast from '@/Components/Global/Toast/CustomToast';
import backgroundLogin from "@/Assets/Background/background-login.jpg"
import { AppDispatch } from '@/Redux/configureStore';
import ActionButton from '@/Components/Global/Button/ActionButton';
import BackgroundImage from '@/Components/Global/BackgroundImage/BackgroundImage';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

    const { handleSubmit,control, formState: { errors } } = useForm<FormLogin>({
      resolver: yupResolver(LoginSchema),
      mode: "onSubmit"
    });

    const onSubmit = async (formLogin: FormLogin) => {
      const { email, password } = formLogin;
      try {
        const response = await logInWithEmailAndPassword(email, password);
        if (response.status === "success")  {
          const user = await getUserByUid(response.user.uid);
          dispatch(login(response.user));
          dispatch(setUser(user));
          CustomToast({ variant: "success", message: "You're now logged in!"});
          navigate("/lastest")
        } else {
          CustomToast({ variant: "failed", message: "Email/Password incorrect!"});
        }
      } catch (error) {
        console.log("Error On Submit()", error)
      }
    }

  return (
    <div className="h-screen w-screen overflow-hidden relative md:flex md:flex-row md:gap-x-26 select-none">
      <BackgroundImage backgroundImage={backgroundLogin} title={"LOGIN"}/>
      <div className="h-full w-full px-6 flex flex-col justify-center gap-10">
        <div className="text-center xs:text-start">
          <h1 className="font-inria-sans text-5xl">Welcome</h1>
          <h2 className="font-inria-sans text-2xl opacity-75">
            Let’s log you in quickly
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-y-4"
        >
          <Controller
            control={control}
            name={"email"}
            render={({ field }) => (
              <Input
                {...field}
                inputMode="email"
                type="email"
                autoComplete="on"
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
                inputMode="text"
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
          <ActionButton variant={"valid"} label={"LOGIN"} />
        </form>
        <div className="flex flex-col text-xl font-inria-sans bold">
          <span className="text-blog-up-white">Don't have an account ?</span>
          <Link
            to="/sign-up"
            className="text-blog-up-green cursor-pointer hover:text-blog-up-green-dark"
          >
            {" "}
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage