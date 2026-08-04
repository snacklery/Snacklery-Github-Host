declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __SNACKLERY_GA_LOADED__?: boolean;
    __SNACKLERY_GA_INIT__?: boolean;
  }
}

const GA_SCRIPT_ID = "ga4-gtag-script";
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

const ensureGtagQueue = () => {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
};

export const loadGoogleAnalytics = () => {
  if (typeof window === "undefined") {
    return;
  }

  if (!GA_MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      console.warn("VITE_GA_MEASUREMENT_ID is missing. Google Analytics 4 will not be initialized.");
    }
    return;
  }

  if (window.__SNACKLERY_GA_LOADED__) {
    return;
  }

  ensureGtagQueue();

  const existingScript = document.getElementById(GA_SCRIPT_ID);
  if (!existingScript) {
    const script = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  window.__SNACKLERY_GA_LOADED__ = true;
};

export const initializeGoogleAnalytics = () => {
  if (typeof window === "undefined") {
    return;
  }

  if (!GA_MEASUREMENT_ID) {
    return;
  }

  if (window.__SNACKLERY_GA_INIT__) {
    return;
  }

  ensureGtagQueue();

  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
  });

  window.__SNACKLERY_GA_INIT__ = true;
};

export const trackPageView = (path: string) => {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  const pagePath = path || window.location.pathname;
  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_location: window.location.href,
  });
};
