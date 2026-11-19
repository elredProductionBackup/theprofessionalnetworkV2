"use client";

/* ------------------------------------------------------------------ *
 *  Razorpay Standard Checkout, driven by the response of
 *  /tpnEvent/registerAndInitiatePayment (checkoutOptions, redirectMode).
 * ------------------------------------------------------------------ */

const DEFAULT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
let scriptPromise = null;

export function loadRazorpay(src = DEFAULT_SRC) {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"));
  if (window.Razorpay) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src || DEFAULT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      script.remove();
      reject(new Error("The payment window didn't load. Check your connection and try again."));
    };
    document.body.appendChild(script);
  });
  return scriptPromise;
}

/*
 * redirectMode false → Razorpay calls `onSuccess` in the page. callback_url
 *   is left out, otherwise Razorpay would redirect instead of calling it.
 * redirectMode true  → Razorpay posts to callback_url itself; onSuccess never runs.
 *
 * `payment.failed` fires while Razorpay's window is still open (the buyer can
 * retry another method), so we only report the failure when they close it.
 */
export function openRazorpayCheckout(payment, { onSuccess, onDismiss }) {
  const { callback_url, cancel_url, ...options } = payment.checkoutOptions || {};
  let lastError = null;

  const rzp = new window.Razorpay({
    ...options,
    ...(payment.redirectMode ? { callback_url, redirect: true } : {}),
    handler: (response) => onSuccess?.(response),
    modal: {
      confirm_close: true,
      ondismiss: () => onDismiss?.(lastError),
    },
  });

  rzp.on("payment.failed", (response) => {
    lastError = response?.error || { description: "Payment failed" };
  });

  rzp.open();
  return rzp;
}
