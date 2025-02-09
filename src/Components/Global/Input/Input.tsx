import { forwardRef, HTMLProps, Ref, ReactNode } from "react";

interface IInputProps extends HTMLProps<HTMLInputElement>{
  name: string;
  placeholder: string;
  type?: string | "text";
  error?: string;
  icon?: ReactNode;
};

const Input = forwardRef((props: IInputProps, ref: Ref<HTMLInputElement>) =>  {
  const { placeholder, error, icon , ...IInputProps} =  props;
  return (
    <div className="flex flex-col relative w-full max-w-[508px]">
      <div className="relative w-full">
        <input
          className={`font-inria-sans w-full h-14 border-2 border-blog-up-green py-4 pl-6 pr-12 rounded-[5px] focus:outline-none`}
          ref={ref}
          {...IInputProps}
          placeholder={placeholder}
        />
        {icon && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blog-up-green">
            {icon}
          </span>
        )}
      </div>
      <span
        className={`font-inria-sans text-blog-up-red h-5 transition-all duration-300 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error || " "}
      </span>
    </div>
  );
})

export default Input;
