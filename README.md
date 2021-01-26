# taggr

Rediscover your **memories** while keeping your **privacy**.

Powered by machine learning.

## Architecture

`frontend` (./frontend) and `backend` (./electron) are separated. Build following the idea: https://github.com/jlongster/electron-with-server-example

`backend` in `browserwindow` during dev, in `node-process` in production.

**Modularized structure** for UI and backend, running on separated `BrowserWindow` processes: `renderer` for UI, `background` for backend.

This allows to perform the long and resource intensive backend operations without blocking the UI thread (in development only). In production, `node-process` is used.

**Message passing** interconnection betweeen modules, through [node-ipc](https://github.com/Rokt33r/node-ipc).

Since the backend executes long running tasks, sync connections are not an option. The message passing acts as a the communication interfact between modules. Each module implements `services`, which deal with the incomming (`handlers`) and outgoing (`services`) messages for that module.

### Folder structure

```
electron
└───frontend-statics -- copy of create-react-app build command, without source maps
└───out -- generated executables (win/linux/mac)
└───resources -- statics for building the app (certificates, icon files)
└───src
│   └───env -- env and client-preload scripts injected to the client window, with the environmental variables
│   └───obfuscate-server -- script for obfuscating backend code before prod
│   └───server -- backend
│   │   entry.js -- entry point for the node-process to the ofuscated code
│
frontend -- create-react-app structure
scripts -- scripts for dev/building/publishing the app
```

## Environments

3 app environments. `dev`, `build-test` and `build-production`.

The frontend gets the env variables (helpers at `./src/env`): -`WINDOW.IS_DEV` -`WINDOW.IS_BUILD_TEST` -`WINDOW.IS_BUILD_PRODUCTION`

The backend gets an single environment: `process.env.TAGGR_ENV`, with value: `dev`, `build-test`, `build-production`. Helpers at `./src/env`

- `dev`: `frontend` served from webpack server. `backend` running inside browserwindow (reload with Ctrl+R). Sentry disabled. Firebase events disabled.

- `build:test`: `frontend` served from statics. `backend` running inside browserwindow (reload with Ctrl+R). Sentry disabled. Firebase events enabled.

- `build:test`: `frontend` served from statics. `backend` running inside node process. Sentry integration enabled. Firebase events enabled.

```json
// NOTE: in windows, execute the commands from git-bash console

// ----- dev -----
npm run dev

// ----- build-test -----
npm run build:test

// ----- build-production -----
npm run build:production
```

## Publishing

Run:

```javascript
npm run publish
```

Generated prod buil and updates the `taggr-releases` repo. Generate build in windows and update it manually. Make sure that the `taggr` version in the package.json is updated.

1. Execute `npm run publish`
2. Increate the version in `electron/package.json`
3. Build windows and upload manually.

### Production build

In order to obfuscate the contents, we use [bytenode](https://github.com/OsamaAbbas/bytenode).
Obfuscates the js into v8 bytecode. `src/obfuscate-server/index.js` script.

**IMPORTANT**: make sure the READMEs and JS files are removed before `buid:production` and `publish`.

In order to publish the app, TODONOW: complete

### Releases

https://github.com/aperkaz/taggr-releases/releases

## Future Features

- Generate lisence: https://github.com/nicroto/license-key
- Future Landing page: https://twizzle.app/
- Add node_modules migration, to fix the known issue.
- Certificate trust increase: https://support.ksoftware.net/support/solutions/articles/215894-what-is-this-file-is-not-commonly-downloaded-and-could-harm-your-computer-message-smartscreen-
- Add github actions build: https://github.com/malept/electron-forge-demo123/actions/runs/116519042/workflow
- Some images are displayed rotated, example in thailand trip
- Image editor: https://ui.toast.com/tui-image-editor/
- Integration with 3rd party image sharing programs.
- Project information persistence: https://github.com/sindresorhus/electron-store
- Images rotation: [sharp](https://github.com/lovell/sharp)
- Replace gallery view with lazy loading: https://github.com/xiaolin/react-image-gallery
- Timeline with pictures https://github.com/rmariuzzo/react-chronos
- Timeline display of images per day http://tany.kim/quantify-your-year/#/
- Add more ML: look into tensorflow alternatives: evaluate performance: with article https://learn.ml5js.org/docs/#/reference/face-api?id=demo
- Speed up app by paralelization. Example: https://github.com/aperkaz/tensorflow-playground
- Food classification: https://github.com/stratospark/food-101-keras/issues/14
- Reverse geocoding: https://docs.mapbox.com/help/how-mapbox-works/geocoding/
- File sharing options:
  https://share.storewise.tech/upload
  https://send.firefox.com/
  https://safenote.co/upload-file ??
- Partial hash

```
//whirlpoolHash.js

const len = 4096,
pos = 0, offset =0,
file = './video.mp4',
buff = Buffer.alloc(len);

fs.open(file, 'r', (err, fd) => {
 fs.read(fd, buff, offset, len, pos, (err, bytes, buff) => {
 const hash = crypto
 .createHash('whirlpool')
 .update(buff)
 .digest('hex');
 console.log(hash);
 /* prints following hash
  ea8f4f1c979cd850bde3dd731b283c31ed6658c3e01
  d3f47538967e07a9d37cfca8cf22e744bd6f14977b9
  c81fc116c4009dd93018ff5526602e35b2e305f1ac
 */
 });
});
```

- micro animations: https://www.joshwcomeau.com/react/boop/

## Known Issues

- **Windows / Mac build**: the tfjs bindings for windows are not located properly, they are built into `napi-v6`, it should be renamed to `napi-v5`. In `electron/node_modules/@tensorflow/tfjs-node/lib/napi-v6`, rename.

## Resources of interes

- Modern electron apps: https://github.com/jlongster/electron-with-server-example
- High-level project structure: https://blog.axosoft.com/electron-things-to-know/
- Window builds fail randomly due to problems with the cache. Try to clean cache and delete package-lock as in: https://github.com/cncjs/cncjs/issues/172
