import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

import store, {persistor} from './redux/store.ts';

const root = createRoot(document.getElementById('root')!);
root.render(
  <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    </PersistGate>
)
