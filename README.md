# taggr

> Rediscover your **memories** while keeping your **privacy**.

Powered by [TypeScript](https://www.typescriptlang.org/), [Electron](https://www.electronjs.org/), [React](https://reactjs.org/), [Redux](https://redux-toolkit.js.org/), [Node.js](https://nodejs.org/en/) and [TensorFlow.js](https://www.tensorflow.org/) 🚀

Keeping you data 100% private 🔒

## Motivation

There is great software out there that provides image exploration capabilities using machine learning (Google Photos, iCloud), but generally is not build with privacy in mind.

At the end of the day, you have to upload your pictures to a server (which perform the machine learning operations), so you have to trust a third party with your data.

What if we could run image classification and tagging machine learning operations 100% locally?
You dont have to trust a server if there is no server 😉

👇 _Under this premise, **taggr** was born_ 👇

A photo explorer, which uses offline machine learning for enriched exploration.

Build with privacy in mind, all the image processing is performed locally, and no data ever leaves you computer 😊

## High-level architecture

This is my first electron project, so I iterated multiple times until I settled on a general strucutere I was happy with (at developer experience and performance levels).

In my case, I found the sweet spot by keeping as close to the web standard as possible, and leveraging the existing web / Node.js tooling that already exists. That mweant

**taggr** is composed by two main modules (`frontend`, `backend`), a `shared` module, and a `communication bus`.

The app is split into two distinct and independent processes, the `frontend` and the `backend` (mapping to the main modules), for the sake of separation of concerns. Each process runs in an [independent Electron process](https://blog.logrocket.com/advanced-electron-js-architecture/).

[TODONOW: add schema]

### Frontend

The 'face' of the app, this module takes care of all things UI.
It does **not** hold business logic. It communicates with the `backend` for performing business logic operations (ex. filter the images, reset the database).

**Build with React components**, following (loosely) the [Atomic Design Principles](https://bradfrost.com/blog/post/atomic-web-design/). I used [Storybook](https://storybook.js.org/) for that.

The whole UI is **[controlled](https://www.robinwieruch.de/react-controlled-components)**, so it renders determinstically based in props, using [pure componets](https://www.geeksforgeeks.org/reactjs-pure-components/). Note that some state is kept local with Hooks, but thats UI state (ex. input contents before submission).

Uses the **'smart' and 'dumb' component** [pattern](https://jaketrent.com/post/smart-dumb-components-react), only the `Page` component have side effects, passed as props by wrappers. The whole UI can be tested and migrated form Redux and Electron easily. Check `frontend/src/components/pages/**/WithStore.tsx` wrappers for examples.

### Backend

The 'brain' of the app, this module focuses on the business logic, processing and persistence of the data.

### Shared

### Message bug

### Environments

The app can be configured to run in `development` and `production` environtments, by setting a variable in the `shared` module.

- `development`: the frontend runs in a separate process and is loaded into electron as a url.

- `production`: the frontend is loaded from static files, and the backend window is hidden. All the debugging tools and extensions are not mounted.

## Run it

TODONOW

## Credit

Here are some of the great resources I have leveraged to build **taggr**, in no particular order:

- Great electron boilerplate: https://github.com/sindresorhus/electron-boilerplate
- Modern electron apps: https://archive.jlongster.com/secret-of-good-electron-apps
- Loading the Frontend from a separate process: https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3?p=a0468ecb1da3

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

`frontend` and `backend` are one.

**Modularized structure** for UI and backend, running on separated `BrowserWindow` processes: `renderer` for UI, `background` for backend.

This allows to perform the long and resource intensive backend operations without blocking the UI thread (in development only). In production, the backend BrowserWindow is hidden.

**Message passing** interconnection betweeen modules, through [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API).

Since the backend executes long running tasks, sync connections are not an option. The message passing acts as a the communication interfact between modules. Each module (FE/BE) implements a `message-handler`, which deal with the incomming (`message`) on a given topic.

Available messaging topics and action cretors are shared and centralized in `./shared/message-passing`.

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
