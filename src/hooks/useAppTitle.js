import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const APP_TITLE = {
  ge: "გარემოს სტატისტიკის პორტალი",
  en: "Environmental Statistics Portal",
};

/** Sets browser tab title and document lang from the :language route param. */
export function useAppTitle() {
  const { language } = useParams();

  useEffect(() => {
    document.title = APP_TITLE[language] ?? APP_TITLE.en;
    document.documentElement.lang = language === "ge" ? "ka" : "en";
  }, [language]);
}
