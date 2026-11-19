import axios from "axios";

const PAYMENT_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL;

/* ------------------------------------------------------------------ *
 *  Live course + ticket data from GET /tpnEvent/getEventDetails
 *  (no params). One request per page load, shared by the pricing card,
 *  checkout, preview page and tracking.
 *
 *  Keys used from the response:
 *    eventCode            → sent to registerAndInitiatePayment
 *    registrationOpen     → false = enrollment closed
 *    registrationClosesAt → ms timestamp; past = closed (null = never)
 *    eventEndAt           → ms timestamp; past = closed (null = n/a)
 *    course.available     → false = enrollment unavailable
 *    currency, supportEmail
 *    tickets[]: ticketCode, audienceType, label, benefits, seats,
 *               baseAmount, netAmount, gstPercent, gstAmount,
 *               totalAmount, isTaxInclusive, soldOut
 *
 *  React hooks for this are in lib/useEventDetails.js (this file has
 *  no React, so server code like lib/tracking.js can import it).
 *
 *  Until it loads the UI shows a loading state; if it fails, the copy
 *  in data/courses.js is used so the page still works.
 * ------------------------------------------------------------------ */

let request = null;
let cached = null;

export function fetchEventDetails() {
  if (cached) return Promise.resolve(cached);
  if (!request) {
    request = axios
      .get(`${PAYMENT_BASE_URL}/tpnEvent/getEventDetails`)
      .then((res) => {
        const event = res.data?.success ? res.data?.result?.[0] || null : null;
        if (!event) throw new Error(res.data?.message || "Event details not found");
        cached = event;
        return event;
      })
      .catch((err) => {
        request = null; // let the next caller retry
        throw err;
      });
  }
  return request;
}

/* Already-loaded event, or null. For code that can't wait (tracking). */
export const getCachedEvent = () => cached;

export const findTicket = (event, ticketCode) =>
  event?.tickets?.find((t) => t.ticketCode === ticketCode) || null;

/* Whether the course is open for enrollment at all. */
export function eventAvailability(event, now = Date.now()) {
  if (!event) return { open: true, reason: "" }; // unknown → don't block
  if (event.course && event.course.available === false) return { open: false, reason: "Not available right now" };
  if (event.registrationOpen === false) return { open: false, reason: "Enrollment closed" };
  if (event.registrationClosesAt && now > event.registrationClosesAt) return { open: false, reason: "Enrollment closed" };
  if (event.eventEndAt && now > event.eventEndAt) return { open: false, reason: "Enrollment closed" };
  return { open: true, reason: "" };
}

/* Whether one ticket can be bought right now. */
export function ticketAvailability(event, ticket) {
  const base = eventAvailability(event);
  if (!base.open) return base;
  if (event && !ticket) return { open: false, reason: "Not available right now" };
  if (ticket?.soldOut) return { open: false, reason: "Sold out" };
  return { open: true, reason: "" };
}

export const formatINR = (amount, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

/* Headline price: tax-inclusive tickets show the total, others the
 * pre-GST amount with "Plus x% GST." underneath. */
export const headlinePrice = (ticket) => (ticket.isTaxInclusive ? ticket.totalAmount : ticket.baseAmount);

/* The course's plans (data/courses.js tiers) with live data merged in.
 * Plans whose ticket isn't in the response are dropped once it loads. */
export function mergePlans(course, event) {
  if (!event) return course.tiers.map((t) => ({ ...t, live: false, available: true, reason: "" }));
  return course.tiers
    .map((t) => {
      const ticket = findTicket(event, t.ticketCode);
      if (!ticket) return null;
      const { open, reason } = ticketAvailability(event, ticket);
      const tax = ticket.isTaxInclusive ? "Including all taxes." : `Plus ${ticket.gstPercent}% GST.`;
      return {
        ...t,
        live: true,
        ticket,
        price: formatINR(headlinePrice(ticket), event.currency),
        total: formatINR(ticket.totalAmount, event.currency),
        note: `${tax} Interest-free EMI available.`,
        seats: ticket.audienceType === "enterprise" || ticket.seats > 1
          ? `For up to ${ticket.seats} team member${ticket.seats === 1 ? "" : "s"}`
          : "For one learner",
        benefits: ticket.benefits?.length ? ticket.benefits : null,
        available: open,
        reason,
      };
    })
    .filter(Boolean);
}
