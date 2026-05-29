import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_OPTIONS = {
  behavior: "smooth",
  block: "start",
  maxAttempts: 40,
  intervalMs: 100,
};

/**
 * Scroll to a chart by DOM id, retrying until the wrapper mounts.
 * @returns {() => void} cancel pending retries
 */
export function scrollToChartById(
  chartId,
  { behavior, block, maxAttempts, intervalMs } = DEFAULT_OPTIONS
) {
  const rawId = chartId.replace(/^#/, "");
  if (!rawId) return () => {};

  let attempts = 0;
  let timeoutId = null;
  let frameId = null;
  let cancelled = false;

  const tryScroll = () => {
    if (cancelled) return;

    const element = document.getElementById(rawId);
    if (element) {
      element.scrollIntoView({ behavior, block });
      return;
    }

    attempts += 1;
    if (attempts < maxAttempts) {
      timeoutId = window.setTimeout(tryScroll, intervalMs);
    }
  };

  frameId = requestAnimationFrame(tryScroll);

  return () => {
    cancelled = true;
    if (frameId !== null) cancelAnimationFrame(frameId);
    if (timeoutId !== null) clearTimeout(timeoutId);
  };
}

/** Normalize path for comparison (no trailing slash). */
export function normalizePathname(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

/**
 * Scrolls to the chart wrapper matching location.hash (#chartID).
 * Retries until the element exists (charts often mount after async data load).
 */
export function useScrollToChartHash(options = {}) {
  const location = useLocation();
  const {
    behavior = DEFAULT_OPTIONS.behavior,
    block = DEFAULT_OPTIONS.block,
    maxAttempts = DEFAULT_OPTIONS.maxAttempts,
    intervalMs = DEFAULT_OPTIONS.intervalMs,
  } = options;

  useEffect(() => {
    const rawHash = location.hash.replace(/^#/, "");
    if (!rawHash) return;

    return scrollToChartById(rawHash, {
      behavior,
      block,
      maxAttempts,
      intervalMs,
    });
  }, [location.pathname, location.hash, behavior, block, maxAttempts, intervalMs]);
}
