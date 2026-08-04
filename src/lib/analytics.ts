declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-9JXZJLDT1Y";

export const trackPageView = (path: string) => {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  const pagePath = path || window.location.pathname;
  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_location: window.location.href,
  });
};
