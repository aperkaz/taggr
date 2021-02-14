const trackEvent = async ({ type, props, screenWidth = 0 }) => {
  console.log(`PAUSIBLE: ${type} : ${JSON.stringify(props)}`);

  const body = {
    d: null,
    n: type, // event type: pageview or custom events. Declare in web UI first!
    p: JSON.stringify(props),
    // TODONOW: dynamic connect to dashboard, using env variable
    r: "https://plausible.io/plausible.io",
    u: "http://app.taggr.ai", // project URL, used as UID
    w: window.innerWidth,
  };

  try {
    // await got.post("https://plausible.io/api/event", {
    //   body: JSON.stringify(body),
    //   headers: {
    //     "Content-Type": "text/plain",
    //   },
    // });

    const res = await fetch("https://plausible.io/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.log(err);
  }
};
(() => {
  // TODONOW: add tracking when users init a collection of photos (size...)
  //   trackEvent({ type: "test" });
})();

export default trackEvent;
