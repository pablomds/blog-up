import React from 'react'

interface IButton {
    variant: "valid" | "delete";
    type?: "submit";
    label: string;
};

const ActionButton: React.FC<IButton> = ({ variant, type, label }) => {

    const getButtonColor = () => {
        switch(variant) {
            case "valid":
                return "bg-blog-up-green text-blog-up-black hover:bg-blog-up-green-dark"
            case "delete":
                return "bg-blog-up-red text-blog-up-white hover:bg-blog-up-red-dark"
        }
    };

  return (
    <button
      type={type}
      className={`${getButtonColor()} font-inria-sans font-bold rounded-[10px] max-w-[150px] text-2xl h-10 w-52 cursor-pointer flex justify-center items-center `}
    >
      {label}
    </button>
  );
};

export default ActionButton;