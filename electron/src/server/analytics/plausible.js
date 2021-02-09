// TODONOW: replacement for google analytics

const got = require("got");

// const { isBuildTestEnv, isBuildProductionEnv, isDevEnv } = require("../env");

const logEvent = async ({ type, props, screenWidth = 0 }) => {
  console.log(`PAUSIBLE: ${type} : ${JSON.stringify(props)}`);

  const body = {
    d: null,
    n: type, // event type: pageview or custom events. Declare in web UI first!
    p: JSON.stringify(props),
    // TODONOW: dynamic connect to dashboard, using env variable
    r: "https://plausible.io/plausible.io",
    u: "http://test.1234.com", // project URL, used as UID
    w: screenWidth,
  };

  try {
    await got.post("https://plausible.io/api/event", {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

// logEvent({
//   type: "supFriend",
//   props: { size: "small (1GB)" },
//   screenWidth: 10,
// });

module.exports = {
  logEvent,
};
