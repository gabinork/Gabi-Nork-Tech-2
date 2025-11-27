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

// Smoothly fade out the loader immediately after React mounts
// We use a tiny delay (50ms) just to ensure the DOM has painted the App frame
// This makes the app feel instant compared to the previous 800ms delay
const loader = document.getElementById('initial-loader');
if (loader) {
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none'; // Prevent interactions during fade
    
    // Remove from DOM after fade transition completes
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 600);
  }, 50); 
}