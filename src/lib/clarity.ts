import Clarity from "@microsoft/clarity";

declare global {
  interface Window {
    __SNACKLERY_CLARITY_INIT__?: boolean;
  }
}

const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID || "xx8q8p2zzk";

export const initializeClarity = () => {
  if (typeof window === "undefined" || !import.meta.env.PROD) {
    return;
  }

  if (window.__SNACKLERY_CLARITY_INIT__) {
    return;
  }

  try {
    Clarity.init(CLARITY_PROJECT_ID);
    window.__SNACKLERY_CLARITY_INIT__ = true;
  } catch (error) {
    console.error("Clarity initialization failed", error);
  }
};
