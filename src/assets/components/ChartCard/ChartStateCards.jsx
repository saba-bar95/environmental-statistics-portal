import { forwardRef } from "react";

/**
 * Shared presentational cards for a chart's loading / error / empty states.
 *
 * These reproduce the exact markup (class names, structure, text) that was
 * previously inlined in every chart component, so styling in
 * `SpinnerAndError.scss` / `ChartWrapper.scss` and behavior are unchanged.
 *
 * Props (all cards):
 *   id          -> chart-wrapper id (used by search/hash scroll)
 *   title       -> already language-resolved title string
 *   unit        -> already language-resolved unit string
 *   language    -> "ge" | "en" (drives the fixed UI strings)
 *   icon        -> optional node rendered inside `.ll` (default: empty)
 *   style       -> optional inline style for `.chart-wrapper`
 *   headerStyle -> optional inline style for `.header`
 *   titleStyle  -> optional inline style for title `<h1>`
 *   loadingMessage -> overrides default loading body text
 *   headerLeft  -> replaces download placeholder in header `.left` (e.g. Info button)
 *   hideUnit    -> omit unit line when true
 *
 * ChartErrorCard also takes:
 *   error   -> error message string
 *   onRetry -> optional retry handler (default: full page reload)
 */

const ChartHeader = ({
  title,
  unit,
  icon,
  headerStyle,
  titleStyle,
  hideUnit,
  children,
}) => (
  <div className="header" style={headerStyle}>
    <div className="right">
      <div className="ll">{icon}</div>
      <div className="rr">
        <h1 style={titleStyle}>{title}</h1>
        {!hideUnit && unit != null && unit !== "" && <p>{unit}</p>}
      </div>
    </div>
    <div className="left">{children}</div>
  </div>
);

export const ChartLoadingCard = forwardRef(function ChartLoadingCard(
  {
    id,
    title,
    unit,
    language,
    icon = null,
    style,
    headerStyle,
    titleStyle,
    hideUnit,
    loadingMessage,
    headerLeft,
  },
  ref
) {
  const bodyText =
    loadingMessage ??
    (language === "ge" ? "მონაცემების ჩატვირთვა..." : "Loading data...");
  const left =
    headerLeft ??
    (
      <div className="download-placeholder">
        <span className="loading-spinner"></span>
        <span>{language === "ge" ? "ჩატვირთვა..." : "Loading..."}</span>
      </div>
    );

  return (
    <div className="chart-wrapper" id={id} ref={ref} style={style}>
      <ChartHeader
        title={title}
        unit={unit}
        icon={icon}
        headerStyle={headerStyle}
        titleStyle={titleStyle}
        hideUnit={hideUnit}>
        {left}
      </ChartHeader>
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>{bodyText}</p>
        </div>
      </div>
    </div>
  );
});

export const ChartErrorCard = forwardRef(function ChartErrorCard(
  {
    id,
    title,
    unit,
    language,
    error,
    icon = null,
    style,
    headerStyle,
    titleStyle,
    hideUnit,
    headerLeft,
    onRetry,
  },
  ref
) {
  const retry = onRetry || (() => window.location.reload());
  return (
    <div className="chart-wrapper" id={id} ref={ref} style={style}>
      <ChartHeader
        title={title}
        unit={unit}
        icon={icon}
        headerStyle={headerStyle}
        titleStyle={titleStyle}
        hideUnit={hideUnit}>
        {headerLeft ?? (
          <button className="retry-btn" onClick={retry}>
            {language === "ge" ? "ხელახლა ცდა" : "Retry"}
          </button>
        )}
      </ChartHeader>
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
          <button className="retry-btn" onClick={retry}>
            {language === "ge" ? "ხელახლა ჩატვირთვა" : "Reload Chart"}
          </button>
        </div>
      </div>
    </div>
  );
});

export const ChartEmptyCard = forwardRef(function ChartEmptyCard(
  {
    id,
    title,
    unit,
    language,
    icon = null,
    style,
    headerStyle,
    titleStyle,
    hideUnit,
    headerLeft,
    emptyMessage,
  },
  ref
) {
  const bodyText =
    emptyMessage ??
    (language === "ge" ? "მონაცემები არ მოიძებნა" : "No data available");

  return (
    <div className="chart-wrapper" id={id} ref={ref} style={style}>
      <ChartHeader
        title={title}
        unit={unit}
        icon={icon}
        headerStyle={headerStyle}
        titleStyle={titleStyle}
        hideUnit={hideUnit}>
        {headerLeft ?? (
          <div className="download-placeholder">
            {language === "ge" ? "მონაცემები არ მოიძებნა" : "No data to download"}
          </div>
        )}
      </ChartHeader>
      <div className="empty-state">
        <p>{bodyText}</p>
      </div>
    </div>
  );
});
