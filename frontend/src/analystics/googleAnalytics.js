import { isDevEnv, isBuildTestEnv, isBuildProductionEnv } from "../environment";

(() => {
  console.log("window.IS_DEV ", isDevEnv());
  console.log("window.IS_BUILD_TEST ", isBuildTestEnv());
  console.log("window.IS_BUILD_PRODUCTION ", isBuildProductionEnv());
})();

class Firebase {
  constructor() {
    this.isBuildTestEnv = isBuildTestEnv();
    this.isBuildProductionEnv = isBuildProductionEnv();

    // TODONOW: initialize firebase
  }
  /**
   * Report analytics event to Firebase
   *
   * @param {string} event
   */
  track(event) {
    //TODONOW: send event to firebase
    if (this.isBuildTestEnv) {
      //TODONOW: send event to firebase: test-env
    }
    if (this.isBuildProductionEnv) {
      // TODONOW: send event to firebase
    }

    console.log("EVENT (not-send): ", event);
  }
}

const FirebaseSingelton = new Firebase();

export default FirebaseSingelton;
