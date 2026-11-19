"use client";

import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 *  Address input with Google Maps suggestions (Places API (New)).
 *
 *  Picking a suggestion fills the street part of the address and calls
 *  onPlace with { state, city, pincode, country, placeId, formattedAddress }. Without NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
 *  or if Maps fails to load, it is a plain text field.
 *  Google Cloud: enable "Maps JavaScript API" + "Places API (New)".
 * ------------------------------------------------------------------ */

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

let placesPromise = null;
function loadPlaces() {
  if (placesPromise) return placesPromise;
  placesPromise = new Promise((resolve, reject) => {
    if (window.google?.maps?.importLibrary) return resolve();
    const cb = "__tpnMapsReady";
    window[cb] = () => resolve();
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(MAPS_KEY)}&loading=async&libraries=places&callback=${cb}`;
    s.async = true;
    s.onerror = () => {
      placesPromise = null;
      reject(new Error("Google Maps failed to load"));
    };
    document.head.appendChild(s);
  }).then(() => window.google.maps.importLibrary("places"));
  return placesPromise;
}

/* "402, Yashodham Center, Film City Rd, Goregaon East, Mumbai, Maharashtra 400063, India"
 *  → "402, Yashodham Center, Film City Rd, Goregaon East" */
function streetLine(formatted, { city, state, pincode, country }) {
  const norm = (v) => String(v || "").toLowerCase().trim();
  const parts = String(formatted || "").split(",").map((p) => p.trim()).filter(Boolean);
  while (parts.length > 1) {
    const last = norm(parts[parts.length - 1]);
    const isTail =
      (country && last === norm(country)) ||
      last === "india" ||
      (pincode && last.includes(pincode)) ||
      (state && (last === norm(state) || last.startsWith(`${norm(state)} `))) ||
      (city && last === norm(city));
    if (!isTail) break;
    parts.pop();
  }
  return parts.join(", ");
}

const field =
  "h-12 w-full rounded-[12px] bg-paper px-4 text-[16px] text-ink ring-1 ring-transparent outline-none transition-[box-shadow,background-color] duration-200 placeholder:text-ink-3 hover:ring-line focus:bg-surface focus:ring-2 focus:ring-ink";

export default function AddressField({ label, value, onChange, onPlace, hint, ...rest }) {
  const id = React.useId();
  const listId = `${id}-list`;
  const required = label.includes("*");
  const text = label.replace("*", "");

  const [places, setPlaces] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const tokenRef = useRef(null);
  const timerRef = useRef(null);
  const reqRef = useRef(0);

  useEffect(() => {
    if (!MAPS_KEY) return;
    let alive = true;
    loadPlaces()
      .then((lib) => alive && setPlaces(lib))
      .catch((err) => console.warn(err.message)); // stays a plain field
    return () => {
      alive = false;
      clearTimeout(timerRef.current);
    };
  }, []);

  const search = (input) => {
    clearTimeout(timerRef.current);
    if (!places || input.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    timerRef.current = setTimeout(async () => {
      const req = ++reqRef.current;
      if (!tokenRef.current) tokenRef.current = new places.AutocompleteSessionToken();
      try {
        const { suggestions: found } = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input,
          sessionToken: tokenRef.current,
          includedRegionCodes: ["in"],
        });
        if (req !== reqRef.current) return;
        const list = found.filter((s) => s.placePrediction);
        setSuggestions(list);
        setOpen(list.length > 0);
        setActive(-1);
      } catch {
        if (req === reqRef.current) setSuggestions([]);
      }
    }, 250);
  };

  const pick = async (suggestion) => {
    const prediction = suggestion.placePrediction;
    setOpen(false);
    setSuggestions([]);
    onChange(prediction.text.toString());
    try {
      const place = prediction.toPlace();
      await place.fetchFields({ fields: ["formattedAddress", "addressComponents"] });
      tokenRef.current = null; // a details fetch ends the billing session
      const part = (type) => place.addressComponents?.find((c) => c.types.includes(type))?.longText || "";
      const state = part("administrative_area_level_1");
      const city = part("locality") || part("administrative_area_level_3") || part("administrative_area_level_2");
      const pincode = part("postal_code");
      const country = part("country");
      const formatted = place.formattedAddress || prediction.text.toString();
      // The address field keeps only the street part; city, state and
      // pincode go in their own fields.
      onChange(streetLine(formatted, { city, state, pincode, country }) || formatted);
      onPlace?.({ state, city, pincode, country, placeId: place.id || prediction.placeId, formattedAddress: formatted });
    } catch {
      /* keep the suggestion text */
    }
  };

  const onKeyDown = (e) => {
    if (!open || !suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      pick(suggestions[active]);
    } else if (e.key === "Escape") {
      e.stopPropagation();
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] font-medium text-ink">
        {text}
        {required && <span className="text-red"> *</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          required={required}
          value={value ?? ""}
          autoComplete={places ? "off" : "street-address"}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          placeholder={places ? "Start typing your address" : "Building, street, area, city"}
          onChange={(e) => {
            onChange(e.target.value);
            search(e.target.value);
          }}
          onKeyDown={onKeyDown}
          onFocus={() => suggestions.length && setOpen(true)}
          onBlur={() => setOpen(false)}
          className={field}
          {...rest}
        />
        {open && (
          <ul
            id={listId}
            role="listbox"
            className="absolute inset-x-0 top-[calc(100%+6px)] z-30 max-h-[280px] overflow-y-auto rounded-[14px] bg-surface p-1.5 shadow-[0_24px_48px_-20px_rgba(22,23,27,0.35)] ring-1 ring-line"
            data-lenis-prevent
          >
            {suggestions.map((s, i) => {
              const p = s.placePrediction;
              return (
                <li
                  key={p.placeId}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(s);
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={`flex cursor-pointer flex-col rounded-[10px] px-3 py-2.5 leading-snug ${i === active ? "bg-paper" : ""}`}
                >
                  <span className="text-[15px] text-ink">{(p.mainText || p.text).toString()}</span>
                  {p.secondaryText && <span className="text-[13px] text-ink-3">{p.secondaryText.toString()}</span>}
                </li>
              );
            })}
            <li aria-hidden="true" className="px-3 pb-1 pt-2 text-right text-[11px] text-ink-3">
              Powered by Google
            </li>
          </ul>
        )}
      </div>
      {hint && <p className="text-[13px] text-ink-3">{hint}</p>}
    </div>
  );
}
