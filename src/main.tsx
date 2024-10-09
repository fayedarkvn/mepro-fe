import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './config/env.client';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
