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
      className={`font-inria-sans font-bold rounded-[10px] max-w-[150px] ${getButtonColor()}  text-lg h-10 w-52 max-w-[150px] cursor-pointer`}
    >
      {label}
    </button>
  );
};

export default ActionButton;