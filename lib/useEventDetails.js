"use client";

import { useEffect, useState } from "react";
import { fetchEventDetails, getCachedEvent, mergePlans } from "./eventDetails";

/* { event, status: "loading" | "ready" | "error" } */
export function useEventDetails() {
  const [state, setState] = useState(() => (getCachedEvent() ? { event: getCachedEvent(), status: "ready" } : { event: null, status: "loading" }));

  useEffect(() => {
    // No early return when cached: the data may have arrived (from another
    // component's request) after this component's first render.
    let alive = true;
    fetchEventDetails()
      .then((event) => alive && setState({ event, status: "ready" }))
      .catch((err) => {
        console.warn("Event details fetch failed:", err?.message);
        if (alive) setState({ event: null, status: "error" });
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}

/* Hook: { event, status, plans, eventCode } for a course. */
export function useCoursePlans(course) {
  const { event, status } = useEventDetails();
  return {
    event,
    status,
    plans: mergePlans(course, event),
    eventCode: event?.eventCode || course.eventCode,
  };
}
