import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import Lenis from 'lenis'

import { ToastProvider } from './Components/Global/Toast/Toast.tsx'
import './index.css'
import App from './App.tsx'


new Lenis({
  autoRaf: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastProvider>
  </StrictMode>
);
