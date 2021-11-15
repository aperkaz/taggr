# taggr

Rediscover your **memories** while keeping your **privacy**.

Powered by machine learning.

## Architecture

IS_DEV dev / production

TOODNOW: rewrite

`frontend` and `backend` are one.

**Modularized structure** for UI and backend, running on separated `BrowserWindow` processes: `renderer` for UI, `background` for backend.

This allows to perform the long and resource intensive backend operations without blocking the UI thread (in development only). In production, the backend BrowserWindow is hidden.

**Message passing** interconnection betweeen modules, through [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API).

Since the backend executes long running tasks, sync connections are not an option. The message passing acts as a the communication interfact between modules. Each module (FE/BE) implements a `message-handler`, which deal with the incomming (`message`) on a given topic.

Available messaging topics and action cretors are shared and centralized in `./shared/message-passing`.

## Environments

3 app environments. `DEVELOP`, `BUILD_TEST` and `BUILD_PROD`.

Manually set the value in `src/shared/active-env.js`.

## Publishing

Run:

```javascript
npm run publish
```

Generated prod buil and updates the `taggr-releases` repo. Generate build in windows and update it manually. Make sure that the `taggr` version in the package.json is updated.

1. Execute `npm run publish`
2. Increate the version in `electron/package.json`
3. Build windows and upload manually.

### Releases

https://github.com/aperkaz/taggr-releases/releases

## Future Features

- Layout masonry: https://github.com/bvaughn/react-virtualized/issues/1366
- Certificate trust increase: https://support.ksoftware.net/support/solutions/articles/215894-what-is-this-file-is-not-commonly-downloaded-and-could-harm-your-computer-message-smartscreen-
- Add github actions build: https://github.com/malept/electron-forge-demo123/actions/runs/116519042/workflow
- Some images are displayed rotated, example in thailand trip
- Replace gallery view with lazy loading: https://github.com/xiaolin/react-image-gallery
- Timeline with pictures https://github.com/rmariuzzo/react-chronos
- Timeline display of images per day http://tany.kim/quantify-your-year/#/
- Add more ML: look into tensorflow alternatives: evaluate performance: with article https://learn.ml5js.org/docs/#/reference/face-api?id=demo
- Speed up app by paralelization. Example: https://github.com/aperkaz/tensorflow-playground
- Food classification: https://github.com/stratospark/food-101-keras/issues/14
- File sharing options:
  https://share.storewise.tech/upload
  https://safenote.co/upload-file ??
