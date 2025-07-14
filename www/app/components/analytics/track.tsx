import { useLocation } from "@remix-run/react";
import { useEffect } from "react";

export function useTagTrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "AW-428437575", {
        page_path: location.pathname + location.search,
      });
      // window.gtag("config", "G-K727R6YZS5", {
      //   page_path: location.pathname + location.search,
      // });
    }
  }, [location]);
}

export function useTrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.dataLayer !== "undefined") {
      window.dataLayer.push({
        event: "pageview",
        page: location.pathname + location.search,
      });
    }
  }, [location]);
}
