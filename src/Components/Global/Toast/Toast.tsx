import React,{ useState, useMemo, useEffect} from 'react';
import { ToastContext } from '../../../Context/ToastContext';
import { CircleCheck, CircleX } from 'lucide-react';

type ToastProperties = {
    variant: string;
    message: string;
};

type ToastProviderProperties = {
    children: React.ReactElement;
};


type ToastType = {
    variant: string;
    message: string;
    id: number;
};

export const Toast = ({ variant, message } : ToastProperties) => {

    const [show, setShow] = useState(false);

    useEffect(() => {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000); // Hide after 3s
      return () => clearTimeout(timer);
    }, []);

  const Icon = () => {
    switch(variant) {
        case "success": 
            return <CircleCheck className="w-8 h-8 text-blog-up-black" />
        case "failed": 
            return <CircleX className="w-8 h-8 text-blog-up-black" />
    }
  }

  return (
    <div
      className={`fixed ${
        variant === "success" ? "bg-blog-up-green" : "bg-blog-up-red"
      } w-72 h-20 top-[10px] right-[10px] md:top-[100px] md:right-[10px] z-30 rounded-sm py-3 px-5 flex flex-row justify-between items-center
  transition-all duration-500 ease-in-out transform ${
    show ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
  }`}
    >
      <div className="flex flex-col">
        <span className="font-inria-sans text-lg font-bold text-blog-up-black">
          {variant === "success" ? "SUCCESS" : "FAILED"}
        </span>
        <p className="font-inria-sans text-base text-blog-up-black">{message}</p>
      </div>
      <div>
        <Icon/>
      </div>
    </div>
  );
};



export const ToastProvider = ({
    children
}: ToastProviderProperties) => {

    const [toasts, setToasts] = useState<ToastType[]>([]);

    const openToast = (message: string, variant: string) => {
        const newToast = {
            variant,
            id: Date.now(),
            message: message
        };
        setToasts((previousToasts) => [...previousToasts, newToast])
    };

    const closeToast = (id: number) => setToasts((previousToasts) => previousToasts.filter(toast => toast.id !== id));

    const contextValue = useMemo(() => ({
        open: openToast,
        close: closeToast
    }), [])

    return (
        <>
            <ToastContext.Provider value={contextValue}>
                {children}
                {
                    toasts && toasts.map(toast => {
                        return (
                            <Toast variant={toast.variant} key={toast.id} message={toast.message} />
                        )
                    })
                }
            </ToastContext.Provider>
        </>
    )
};