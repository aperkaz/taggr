# taggr

Rediscover your **memories** while keeping your **privacy**.

Powered by machine learning.

## Architecture

`frontend` and `backend` are composed following [this repo](https://github.com/jlongster/electron-with-server-example).

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

### Not so relevant

- micro animations: https://www.joshwcomeau.com/react/boop/
- Add node_modules migration, to fix the known issues.
- Image editor: https://ui.toast.com/tui-image-editor/

## Known Issues

- **Windows / Mac build**: the tfjs bindings for windows are not located properly, they are built into `napi-v6`, it should be renamed to `napi-v5`. In `electron/node_modules/@tensorflow/tfjs-node/lib/napi-v6`, rename.

## Resources of interes

- Modern electron apps: https://github.com/jlongster/electron-with-server-example
- High-level project structure: https://blog.axosoft.com/electron-things-to-know/
- Window builds fail randomly due to problems with the cache. Try to clean cache and delete package-lock as in: https://github.com/cncjs/cncjs/issues/172
- EU vat (local VAT up to 10.000E a year): https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/provide-services-abroad/index_es.htm#rules-annual-turnovers
