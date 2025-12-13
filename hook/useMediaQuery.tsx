// Codes by mahdi tasha
// Importing part
import { useState, useEffect } from "react";

// Creating and exporting useMediaQuery custom hook which indicated current media query
export function useMediaQuery(query: string): boolean {
  // Defining hooks
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  // Using useEffect to attach and de attach the listener
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", listener);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  // Returning part
  return matches;
}
