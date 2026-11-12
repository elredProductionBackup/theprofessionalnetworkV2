"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/tracking";

/* Sends a Meta ViewContent event when the course page is viewed. */
export default function TrackViewContent({ eventCode, ticketCode }) {
  useEffect(() => {
    trackViewContent({ eventCode, ticketCode });
  }, [eventCode, ticketCode]);

  return null;
}
