import React from 'react';
import ReactDOM from 'react-dom/client';

import SessionProvider from './contexts/sessionContext';

import './index.css';
import Routes from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <SessionProvider>
      <Routes />
    </SessionProvider>
  </React.StrictMode>,
);
