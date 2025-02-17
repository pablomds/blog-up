import { forwardRef, HTMLProps, Ref, ReactNode } from "react";

interface IInputProps extends HTMLProps<HTMLInputElement>{
  name: string;
  placeholder: string;
  type?: string | "text";
  error?: string;
  icon?: ReactNode;
  isDisabled?: boolean
};

const Input = forwardRef((props: IInputProps, ref: Ref<HTMLInputElement>) =>  {
  const { placeholder, error, icon, isDisabled, ...IInputProps} =  props;
  return (
    <div className="flex flex-col relative w-full max-w-[508px]">
      <div className="relative w-full">
        <input
          disabled={isDisabled}
          readOnly={isDisabled}
          className={`font-inria-sans w-full h-14 border-2 py-4 pl-6 pr-12 rounded-[5px] focus:outline-none ${isDisabled ? 'border-blog-up-gray/70 text-blog-up-gray/70' :'border-blog-up-green'}`}
          ref={ref}
          {...IInputProps}
          placeholder={placeholder}
        />
        {icon && (
          <span className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDisabled ? 'text-blog-up-gray/70' :'text-blog-up-green'}`}>
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
