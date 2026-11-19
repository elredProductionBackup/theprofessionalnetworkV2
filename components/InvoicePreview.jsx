"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  Invoice preview: each PDF page drawn as a full-width image with
 *  pdf.js, so it reads the same on phones and desktops. No PDF viewer,
 *  no inner scroll box — the page itself scrolls, and people can
 *  pinch-zoom the image.
 *  pdf.js is loaded only when a preview is opened.
 * ------------------------------------------------------------------ */

const MIN_SCALE = 2; // sharp enough to zoom into on a phone
const A4_RATIO = 297 / 210;

let pdfjsPromise = null;
function loadPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist/legacy/build/pdf.min.mjs")
      .then((pdfjs) => {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/legacy/build/pdf.worker.min.mjs", import.meta.url).toString();
        return pdfjs;
      })
      .catch((err) => {
        pdfjsPromise = null;
        throw err;
      });
  }
  return pdfjsPromise;
}

export default function InvoicePreview({ blob, title = "Invoice" }) {
  const boxRef = useRef(null);
  const [pages, setPages] = useState([]); // [{ url, width, height }]
  const [state, setState] = useState("loading"); // loading | ready | error

  useEffect(() => {
    if (!blob) return;
    let cancelled = false;
    let doc = null;
    const urls = [];

    (async () => {
      try {
        const pdfjs = await loadPdfjs();
        doc = await pdfjs.getDocument({ data: new Uint8Array(await blob.arrayBuffer()) }).promise;
        const boxWidth = boxRef.current?.clientWidth || 600;
        const dpr = Math.min(window.devicePixelRatio || 1, 3);
        const rendered = [];

        for (let n = 1; n <= doc.numPages; n++) {
          const page = await doc.getPage(n);
          const base = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: Math.max((boxWidth * dpr) / base.width, MIN_SCALE) });
          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;
          const image = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
          if (cancelled) return;
          const url = URL.createObjectURL(image);
          urls.push(url);
          rendered.push({ url, width: canvas.width, height: canvas.height });
          setPages([...rendered]);
          setState("ready");
        }
      } catch (err) {
        console.warn("Invoice preview failed:", err?.message);
        if (!cancelled) setState("error");
      }
    })();

    return () => {
      cancelled = true;
      urls.forEach((u) => URL.revokeObjectURL(u));
      doc?.destroy();
    };
  }, [blob]);

  return (
    <div ref={boxRef} className="w-full">
      {state === "error" && (
        <p className="rounded-[14px] bg-paper p-4 text-[14px] text-ink-2">
          The preview couldn’t be shown on this device. Use Download to save the invoice.
        </p>
      )}

      {state !== "error" && (
        <div className="space-y-3">
          {pages.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.url}
              src={p.url}
              width={p.width}
              height={p.height}
              alt={`${title}, page ${i + 1}`}
              className="block h-auto w-full rounded-[10px] bg-white shadow-[0_1px_0_var(--line),0_12px_32px_-18px_rgba(22,23,27,0.35)] ring-1 ring-line"
            />
          ))}
          {state === "loading" && (
            <div
              aria-label="Loading invoice preview"
              className="w-full animate-pulse rounded-[10px] bg-paper ring-1 ring-line"
              style={{ aspectRatio: `1 / ${A4_RATIO}` }}
            />
          )}
        </div>
      )}
    </div>
  );
}
