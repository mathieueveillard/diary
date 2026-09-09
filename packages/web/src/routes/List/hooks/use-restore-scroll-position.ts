import { useEffect, useLayoutEffect } from "react";

let savedScrollY = 0;

// Tracks the scroll position while the list is mounted and restores it once the
// (cached) entries are rendered again, so coming back from an entry lands where
// the user left. React Router's <ScrollRestoration> is deliberately not used:
// it fires before the list has its data and would reset to the top.
export const useRestoreScrollPosition = (ready: boolean) => {
  useLayoutEffect(() => {
    if (ready) window.scrollTo(0, savedScrollY);
  }, [ready]);

  useEffect(() => {
    const save = () => {
      savedScrollY = window.scrollY;
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, []);
};
