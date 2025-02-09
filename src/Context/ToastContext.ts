import { createContext, useContext } from 'react';

type ToastContextValue = {
    open: (message: string, variant: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => useContext(ToastContext)