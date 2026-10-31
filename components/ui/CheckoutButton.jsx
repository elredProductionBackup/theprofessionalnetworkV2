"use client";

/* Opens checkout (ApplyPopup) straight away for a given course + plan. */
export default function CheckoutButton({ eventCode, ticketCode, children, className = "" }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        window.dispatchEvent(new CustomEvent("openApplyPopup", { detail: { eventCode, ticketCode } }))
      }
    >
      {children}
    </button>
  );
}
