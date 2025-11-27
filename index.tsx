import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Smoothly fade out the loader after a short delay
// This ensures the App has time to paint its first frame behind the loader
const loader = document.getElementById('initial-loader');
if (loader) {
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none'; // Prevent interactions during fade
    
    // Remove from DOM after fade transition completes (0.6s defined in CSS)
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 600);
  }, 800); // Wait 800ms to show the branding animation properly
}