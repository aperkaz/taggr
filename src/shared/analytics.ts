import Plausible from "plausible-tracker";

import ACTIVE_ENV, { ENVS } from "./active-env";
import logger from "./logger";

const { trackEvent } = Plausible({
  domain: "app.taggr.ai",
  trackLocalhost: true,
});

const EVENTS = {
  LOAD_MEMORIES: "LOAD_MEMORIES",
};

/**
 * Simple analytics about the size of projects
 * @param imageCountInThousands in 1000s
 * @param sizeInMB in MB
 */
export const registerLoadMemories = (
  imageCountInThousands: string,
  sizeInMB: string
) => {
  if (ACTIVE_ENV !== ENVS.BUILD_PROD) {
    logger.log(
      "In prod, will send event: ",
      JSON.stringify({
        type: EVENTS.LOAD_MEMORIES,
        props: { imageCount: imageCountInThousands, sizeInMB },
      })
    );
    return;
  }

  trackEvent(EVENTS.LOAD_MEMORIES, {
    props: { imageCountInThousands, sizeInMB },
  });
};
