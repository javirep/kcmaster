import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

import { ChemsProvider } from './context/ChemContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChemsProvider>
      <App />
    </ChemsProvider>
  </React.StrictMode>
);
