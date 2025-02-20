import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Lenis from 'lenis';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/Redux/configureStore.ts';

import App from '@/App.tsx';
import '@/index.css';

new Lenis({
  autoRaf: true,
});

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>   
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
);
