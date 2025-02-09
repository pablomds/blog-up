import { createContext, useContext } from 'react';

type ToastContextValue = {
    open: (message: string, variant: "success" | "failed") => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => useContext(ToastContext)