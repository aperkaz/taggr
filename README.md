# taggr

Rediscover your **memories** while keeping your **privacy**.

Powered by machine learning.

## Architecture

**Modularized structure** for UI and backend, running on separated `BrowserWindow` processes: `renderer` for UI, `background` for backend.

This allows to perform the long and resource intensive backend operations without blocking the UI thread.

**Message passing** interconnection betweeen modules, through [IPC](https://www.electronjs.org/docs/api/ipc-renderer).

Since the backend executes long running tasks, sync connections are not an option. The message passing acts as a the communication interfact between modules. Each module implements `services`, which deal with the incomming and outgoing messages for that module

### Folder structure

```
src
└───background -- BACKEND: io disk, long computations, machine learning
│   └───features -- utils as pure functions
│   └───flows -- high level flows (create project...). Use features and triggered by service layer
│   └───services -- interface layer with the renderer process
│   └───statics -- statics for electron process
│   └───store -- persistence layer. Simple JSON storage for now.
│   │   index.js -- module entry point
│   │   types.js -- jsDoc types
│
└───main -- Main process of electron. Spins off background/renderer processes
│   │   analytics.js -- google event analytics setup
│   │   index.js -- main entry point
│
└───renderer -- UI. React and Redux. Smart / dummy components
│   └───components -- React components. molecules / organisms / pages
│   └───services -- interface layer with the background process 
│   └───statics -- statics for electron process
│   └───store -- Redux store, actions and reducers.
│   │   index.js -- module entry point
│   │   types.js -- jsDoc types
│  
└───shared -- shared code between renderer/background. Actions, Constants...
│   │   ipcChannels.js -- definition of ipc channel to use between modules
│   │   trackEventInProd.js -- helper to track events in both modules
│   │   ... TODO: expose each modules public actions
│
stories -- storybook stories for isolated component testing
README.md
webpack
```


## Issues

- **Too much ram**: chromium caches the images as they are loaded. When the images are big, the cache grows very fast.
  - Solutions: Resize images to size -> speeds up loading, ML computations and removes cache issue. [sharp](https://github.com/lovell/sharp) . Exaple: https://github.com/aperkaz/tensorflow-playground

- **Too much ram**: when anaylzing many images, the ram grows over time, eventually killing the app.

## Future Features

- Certificate trust increase: https://support.ksoftware.net/support/solutions/articles/215894-what-is-this-file-is-not-commonly-downloaded-and-could-harm-your-computer-message-smartscreen-
- Add github actions build: https://github.com/malept/electron-forge-demo123/actions/runs/116519042/workflow
- Some images are displayed rotated, example in thailand trip 
- Remove text selection: https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting
- Image editor: https://ui.toast.com/tui-image-editor/
- Integration with 3rd party image sharing programs.
- Project information persistence: https://github.com/sindresorhus/electron-store
- Images rotation: [sharp](https://github.com/lovell/sharp)
- Replace gallery view with lazy loading: https://github.com/xiaolin/react-image-gallery
- Timeline with pictures https://github.com/rmariuzzo/react-chronos
- Timeline display of images per day http://tany.kim/quantify-your-year/#/
- Add more ML: look into tensorflow alternatives: evaluate performance: with article https://learn.ml5js.org/docs/#/reference/face-api?id=demo
- Speed up app by paralelization. Exaple: https://github.com/aperkaz/tensorflow-playground
- Food classification: https://github.com/stratospark/food-101-keras/issues/14

## Releases

https://github.com/aperkaz/taggr-releases/releases

## Resources of interes

- High-level project structure: https://blog.axosoft.com/electron-things-to-know/
- Window builds fail randomly due to problems with the cache. Try to clean cache and delete package-lock as in: https://github.com/cncjs/cncjs/issues/172
