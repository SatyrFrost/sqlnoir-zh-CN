// src/hooks/useBackGuard.ts
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Intercepts the next browser Back on the current page and asks the user to confirm.
 * If confirmed, navigates to fallbackPath; otherwise stays on the page.
 */
export function useBackGuard({
  enabled = true,
  onPrompt,
  fallbackPath = "/",
}: {
  enabled?: boolean;
  onPrompt: () => boolean | Promise<boolean>; // return true to exit
  fallbackPath?: string;
}) {
  const nav = useNavigate();
  const loc = useLocation();
  const armed = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    // Push a guard state so the very next "Back" hits our popstate handler
    history.pushState({ sqlnoir_guard: true, at: loc.pathname }, "");

    const onPop = async (e: PopStateEvent) => {
      // If this pop is our guard (or we've already handled one), intercept it
      if ((e.state && e.state.sqlnoir_guard) || armed.current) {
        // Re-arm so subsequent backs still come to us until user confirms exit
        armed.current = true;
        history.pushState({ sqlnoir_guard: true, at: loc.pathname }, "");

        const ok = await onPrompt(); // show confirm/modal
        if (ok) {
          // let them leave the case (to Dashboard or wherever)
          nav(fallbackPath, { replace: true });
        }
        // else do nothing; we just re-pushed our guard state to keep them here
      }
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [enabled, loc.pathname, nav, onPrompt, fallbackPath]);
}
