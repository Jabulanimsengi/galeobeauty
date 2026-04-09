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
const AUTO_RETRY_LIMIT = 2;
const RETRY_DELAY_MS = 1_500;

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
      existingScript.remove();
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
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (!siteKey) {
      onTokenChange(null);
      onWidgetError(null);
      setLoadError(null);
      setRetryCount(0);
      setIsRetrying(false);
      return;
    }

    let active = true;
    onTokenChange(null);
    onWidgetError(null);
    setLoadError((previous) => (retryCount === 0 ? null : previous));
    setIsRetrying(false);

    const clearRetryTimeout = () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };

    const scheduleRetry = (message: string) => {
      onTokenChange(null);
      onWidgetError(message);

      if (retryCount < AUTO_RETRY_LIMIT) {
        setLoadError("Human verification is reconnecting...");
        setIsRetrying(true);
        clearRetryTimeout();
        retryTimeoutRef.current = setTimeout(() => {
          if (!active) {
            return;
          }

          setRetryCount((current) => current + 1);
        }, RETRY_DELAY_MS);
        return;
      }

      setLoadError(message);
      setIsRetrying(false);
    };

    loadTurnstileApi()
      .then((turnstile) => {
        if (!active || !containerRef.current) {
          return;
        }

        clearRetryTimeout();

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

            setRetryCount(0);
            setLoadError(null);
            setIsRetrying(false);
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

            scheduleRetry("The human verification widget is unavailable right now. Please try again.");
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
        scheduleRetry(message);
      });

    return () => {
      active = false;
      clearRetryTimeout();

      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
      }

      widgetIdRef.current = null;
    };
  }, [action, onTokenChange, onWidgetError, resetKey, retryCount, siteKey]);

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
        <div className="flex flex-wrap items-center gap-3">
          <p className={`text-xs ${isRetrying ? "text-muted-foreground" : "text-red-600"}`}>
            {loadError}
          </p>
          {!isRetrying && (
            <button
              type="button"
              onClick={() => {
                setLoadError(null);
                setIsRetrying(false);
                setRetryCount((current) => current + 1);
              }}
              className="text-xs font-medium text-gold transition-colors hover:text-gold-dark"
            >
              Retry verification
            </button>
          )}
        </div>
      )}
    </div>
  );
}
