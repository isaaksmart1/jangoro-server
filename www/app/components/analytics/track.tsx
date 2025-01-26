import { useLocation } from "@remix-run/react";
import { useEffect } from "react";

export function useTagTrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-C2JMQQ75FT", {
        page_path: location.pathname + location.search,
      });
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
