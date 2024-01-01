import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './Navbar_Top/context';
import { AuthProvider } from './contexts/AuthContext';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>

);

serviceWorkerRegistration.register();
