import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safeguard against libraries trying to polyfill fetch in environments where it's read-only
if (typeof window !== 'undefined') {
  // Polyfill global if it doesn't exist (needed by some Node-targeted libs)
  if (!(window as any).global) {
    (window as any).global = window;
  }
  
  // Try to prevent assignment to fetch from throwing
  try {
    const originalFetch = window.fetch;
    // We try to define a property that behaves like fetch but has a no-op setter
    // This only works if window.fetch is configurable.
    Object.defineProperty(window, 'fetch', {
      value: originalFetch,
      writable: false,
      configurable: true // If we can't set it, we at least try to make it configurable
    });
  } catch (e) {
    // If it's already non-configurable, we just have to hope for the best or catch it globally
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
