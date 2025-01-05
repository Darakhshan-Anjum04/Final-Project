import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CombinedProvider } from './Context'; // Import CombinedProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CombinedProvider> {/* Wrap your app with CombinedProvider */}
      <BrowserRouter> {/* Wrap your app with BrowserRouter */}
        <App />
      </BrowserRouter>
    </CombinedProvider>
  </StrictMode>
);