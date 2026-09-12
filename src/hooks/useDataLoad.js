"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Shared admin data-loading hook. Runs the initial fetch once on mount
 * (cancelled safely on unmount) and exposes a `reload` for after mutations,
 * replacing the old `load()` + `useEffect` double-fetch pattern used in every
 * admin page.
 *
 * @param {string} url endpoint to fetch on mount
 * @param {(json: any) => any} pick maps the JSON body to the stored value
 * @param {string} [errorMessage]
 */
export default function useDataLoad(url, pick, errorMessage = "Could not load data.") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pickRef = useRef(pick);
  const errorMessageRef = useRef(errorMessage);
  useEffect(() => {
    pickRef.current = pick;
    errorMessageRef.current = errorMessage;
  }, [pick, errorMessage]);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) {
          setError(json.error || errorMessageRef.current);
          setLoading(false);
          return;
        }
        setData(pickRef.current(json));
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError(errorMessageRef.current);
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url]);

  const reload = useCallback(async () => {
    setError("");
    try {
      const res = await fetch(url);
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || errorMessageRef.current);
        setData(null);
        return;
      }
      setData(pickRef.current(json));
    } catch {
      setError(errorMessageRef.current);
    }
  }, [url]);

  return { data, setData, loading, error, setError, reload };
}