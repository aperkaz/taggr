import { isDevEnv } from "../../environment";

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
