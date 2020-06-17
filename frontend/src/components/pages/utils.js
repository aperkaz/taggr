import * as Sentry from "@sentry/browser";
import { isDevEnv } from "../../environment";

// TODONOW: make sure this works, sentry too
/**
 * Initialize Sentry in production env
 */
export const setupCrashAnalyticsInProd = () => {
  if (!isDevEnv)
    Sentry.init({
      dsn:
        "https://c413216c810946559e9d5c1feb34c92f@o385452.ingest.sentry.io/5218191",
    });
};

/**
 * Add overlay with FPS count in dev environment
 */
export const setupFpsOverlayInDev = () => {
  if (isDevEnv()) {
    var script = document.createElement("script");
    script.onload = function () {
      var stats = new Stats();
      document.body.appendChild(stats.dom);
      requestAnimationFrame(function loop() {
        stats.update();
        requestAnimationFrame(loop);
      });
    };
    script.src = "//mrdoob.github.io/stats.js/build/stats.min.js";
    document.head.appendChild(script);
  }
};
