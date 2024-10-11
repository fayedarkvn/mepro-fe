import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { ConfigurationError } from './components/configuration-error';
import { envError } from './config/env.client';
import './index.css';

const root = createRoot(document.getElementById('root')!);

if (envError) {
  root.render(
    <ConfigurationError
      message="Environment configuration error"
    />
  );
  throw envError;
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
