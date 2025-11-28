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
// Optimized with requestAnimationFrame for better frame timing
const loader = document.getElementById('initial-loader');
if (loader) {
  // Wait for the browser to be ready to paint the next frame
  requestAnimationFrame(() => {
    // Small delay to ensure the App component has rendered its initial state
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none'; // Prevent interactions during fade
      
      // Remove from DOM exactly after transition completes (matching 0.5s CSS)
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }, 30); 
  });
}