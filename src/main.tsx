import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import Lenis from 'lenis'
import store from './Redux/store';
import './index.css'
import App from './App.tsx'


new Lenis({
  autoRaf: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
