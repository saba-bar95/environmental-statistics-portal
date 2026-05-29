/** Shown while a lazy-loaded page chunk is loading. */
export default function RouteFallback() {
  return (
    <div
      className="route-fallback"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "40vh",
        padding: "2rem",
      }}
      aria-live="polite"
      aria-busy="true">
      <div style={{ textAlign: "center" }}>
        <div className="spinner" style={{ margin: "0 auto 1rem" }} />
        <p style={{ color: "#6c757d", margin: 0 }}>Loading…</p>
      </div>
    </div>
  );
}
