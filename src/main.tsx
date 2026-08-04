import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initializeClarity } from "./lib/clarity";
import { initializeGoogleAnalytics } from "./lib/analytics";
import "./index.css";

initializeClarity();
initializeGoogleAnalytics();

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
