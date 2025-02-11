import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Lenis from 'lenis';
import { store, persistor } from './Redux/configureStore.ts';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import './index.css';

new Lenis({
  autoRaf: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>   
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
