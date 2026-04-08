"use client";

import { useEffect, useRef, useState } from "react";

type TurnstileRenderOptions = {
  action?: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  "timeout-callback"?: () => void;
  sitekey: string;
  theme?: "auto" | "dark" | "light";
};

type TurnstileApi = {
  remove: (widgetId: string) => void;
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SCRIPT_ID = "galeo-turnstile-script";
const TURNSTILE_SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let turnstileLoadPromise: Promise<TurnstileApi> | null = null;

function loadTurnstileApi() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Turnstile can only load in the browser."));
  }

  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  if (turnstileLoadPromise) {
    return turnstileLoadPromise;
  }

  turnstileLoadPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;

    const handleLoad = () => {
      if (window.turnstile) {
        resolve(window.turnstile);
        return;
      }

      turnstileLoadPromise = null;
      reject(new Error("Turnstile loaded, but the widget API was unavailable."));
    };

    const handleError = () => {
      turnstileLoadPromise = null;
      reject(new Error("Failed to load the human verification widget."));
    };

    if (existingScript) {
      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    document.head.appendChild(script);
  });

  return turnstileLoadPromise;
}

export function TurnstileWidget({
  action = "booking_submit",
  onTokenChange,
  onWidgetError,
  resetKey,
  siteKey,
}: {
  action?: string;
  onTokenChange: (token: string | null) => void;
  onWidgetError: (message: string | null) => void;
  resetKey: number;
  siteKey: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteKey) {
      onTokenChange(null);
      onWidgetError(null);
      setLoadError(null);
      return;
    }

    let active = true;
    onTokenChange(null);
    onWidgetError(null);
    setLoadError(null);

    loadTurnstileApi()
      .then((turnstile) => {
        if (!active || !containerRef.current) {
          return;
        }

        if (widgetIdRef.current) {
          turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          theme: "light",
          callback: (token) => {
            if (!active) {
              return;
            }

            onWidgetError(null);
            onTokenChange(token);
          },
          "expired-callback": () => {
            if (!active) {
              return;
            }

            onTokenChange(null);
            onWidgetError("The human verification expired. Please try again.");
          },
          "timeout-callback": () => {
            if (!active) {
              return;
            }

            onTokenChange(null);
            onWidgetError("The human verification timed out. Please try again.");
          },
          "error-callback": () => {
            if (!active) {
              return;
            }

            const message = "The human verification widget is unavailable right now. Please try again.";
            onTokenChange(null);
            onWidgetError(message);
            setLoadError(message);
          },
        });
      })
      .catch((error: unknown) => {
        if (!active) {
          return;
        }

        const message =
          error instanceof Error && error.message
            ? error.message
            : "The human verification widget is unavailable right now. Please try again.";
        onTokenChange(null);
        onWidgetError(message);
        setLoadError(message);
      });

    return () => {
      active = false;

      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
      }

      widgetIdRef.current = null;
    };
  }, [action, onTokenChange, onWidgetError, resetKey, siteKey]);

  return (
    <div className="space-y-3 rounded-xl border border-border/60 bg-secondary/20 p-4">
      <div>
        <p className="text-sm font-medium text-foreground">Human Verification</p>
        <p className="mt-1 text-xs text-muted-foreground">
          This helps us block automated booking spam before it reaches the salon team.
        </p>
      </div>

      <div ref={containerRef} className="min-h-[66px]" />

      {loadError && (
        <p className="text-xs text-red-600">{loadError}</p>
      )}
    </div>
  );
}
