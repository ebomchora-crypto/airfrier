import { PRODUCT } from "../config";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fires Meta Pixel InitiateCheckout when a purchase button is clicked. */
export function trackCheckoutClick(location: string) {
  try {
    window.fbq?.("track", "InitiateCheckout", {
      value: PRODUCT.priceValue,
      currency: PRODUCT.currency,
      content_name: PRODUCT.name,
      content_category: location,
    });
  } catch {
    /* never block navigation */
  }
}
