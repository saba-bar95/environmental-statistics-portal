import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { searchIndex } from "../../../chartRegistry/index.js";
import {
  normalizePathname,
  scrollToChartById,
} from "../../../hooks/useScrollToChartHash.js";
import "./SearchBar.scss";

const SearchBar = ({ onSelectChart }) => {
  const { language } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  const getFilteredSuggestions = useCallback(
    (query) => {
      return searchIndex.filter((chart) =>
        (language === "en" ? chart.title_en : chart.title_ge)
          ?.toLowerCase()
          .includes(query.toLowerCase())
      );
    },
    [language]
  );

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      setSuggestions(getFilteredSuggestions(query));
    }
  }, [query, getFilteredSuggestions]);

  const handleSelect = (chart) => {
    setQuery("");
    setSuggestions([]);
    setIsFocused(false);

    const targetPath = normalizePathname(`/${language}/${chart.path}`);
    const currentPath = normalizePathname(location.pathname);
    const hash = `#${chart.chartID}`;

    if (currentPath === targetPath) {
      // Already on this page — scroll only, no route navigation (avoids remount / reload)
      scrollToChartById(chart.chartID);
      if (location.hash !== hash) {
        window.history.replaceState(
          window.history.state,
          "",
          `${currentPath}${location.search}${hash}`
        );
      }
    } else {
      navigate(`/${language}/${chart.path}${hash}`, {
        preventScrollReset: true,
      });
    }

    onSelectChart?.(chart.chartID);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative w-full max-w-[300px] mx-auto px-4 sm:px-6 lg:px-8 search-bar"
      ref={searchRef}>
      <input
        type="text"
        className="w-full p-3 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003D2F]"
        placeholder={
          language === "en" ? "Search charts..." : "მოძებნე გრაფიკები..."
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute top-8 w-full bg-white border border-gray-300 rounded-lg shadow-md">
          {suggestions.map((chart) => (
            <li
              key={`${chart.path}-${chart.chartID}`}
              className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-blue-100"
              onClick={() => handleSelect(chart)}>
              {chart[`title_${language}`]}
              {chart[`path_${language}`] && (
                <span> ({chart[`path_${language}`]}) </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
