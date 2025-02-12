import { CircleCheck, CircleX } from "lucide-react";
import toast from "react-hot-toast";

interface ICustomToast {
  variant: "success" | "failed";
  message: string;
}

const CustomToast = ({ variant, message }: ICustomToast) => {
  const Icon = () => {
    switch (variant) {
      case "success":
        return <CircleCheck className="w-6 h-6 text-blog-up-black" />;
      case "failed":
        return <CircleX className="w-6 h-6 text-blog-up-black" />;
      default:
        return null;
    }
  };

  return toast.custom(
    (t) => (
      <div
        className={`flex items-center gap-3 p-4 rounded-lg shadow-lg transition-opacity ${
          t.visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: variant === "success" ? "#6EEB83" : "#FF5E5B",
          color: "#2C2C2C",
        }}
      >
        <Icon />
        <span className="font-inria-sans font-medium font-lg">{message}</span>
      </div>
    ),
    {
      duration: 4000,
      position: "top-center",
    }
  );
};

export default CustomToast;
