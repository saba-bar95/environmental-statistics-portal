import { useCallback, useEffect, useState } from "react";

/**
 * Shared fetch lifecycle for chart pages: loading, error, and retry without reload.
 */
export function useChartFetch(loadFn, deps) {
  const [retryKey, setRetryKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const retry = useCallback(() => {
    setError(null);
    setRetryKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await loadFn({ cancelled });
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError(
            err?.message ||
              "Failed to load chart data. Please try again."
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps + retryKey drive refetch
  }, [...deps, retryKey]);

  return { isLoading, error, retry };
}
