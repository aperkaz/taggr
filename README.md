# taggr

> Rediscover your **memories** while keeping your **privacy**.

Powered by [TypeScript](https://www.typescriptlang.org/), [Electron](https://www.electronjs.org/), [React](https://reactjs.org/), [Redux](https://redux-toolkit.js.org/), [Node.js](https://nodejs.org/en/) and [TensorFlow.js](https://www.tensorflow.org/) 🚀

![taggr screenshot](./test-images/screenshot.png "taggr")

<p style="text-align: center;">👉 <a href="https://twitter.com/aperkaz">Keep up to date with my next side-projects</a> 👈</p>

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

### Message bus

Before we cover the modules, lets discuss the communication layer.

The `frontend` and `backend` modules communicate through an asynchonous and bidirectional message bus.
Its implemented using Electron's [IPC module](https://www.electronjs.org/docs/latest/api/ipc-main/).

The supported events are defined as types in the `shared` module, so type-safe handlers can be implemented in either side of the bus. For example in `frontend/src/message-bus/index.ts`.

Since the message bus relies on the `BrowserWindow.id`, the Electron main process keeps a heartbeat with the render process ids.

### Frontend → `./frontend`

The 'face' of the app, this module takes care of all things UI.

It does **not** hold business logic. It communicates with the `backend` for performing business logic operations (through the message bus).

**Built with Typescript + React components**, following (loosely) the [Atomic Design Principles](https://bradfrost.com/blog/post/atomic-web-design/). I used [Storybook](https://storybook.js.org/) for that.

The whole UI is **[controlled](https://www.robinwieruch.de/react-controlled-components)**, so it renders determinstically based on props, using [pure componets](https://www.geeksforgeeks.org/reactjs-pure-components/). Note that some state is kept local with Hooks, but thats UI state (ex. input contents before submission).

Uses the **'smart' and 'dumb' component** [pattern](https://jaketrent.com/post/smart-dumb-components-react), only the `Page` component have side effects, passed as props by container components. The whole UI can be tested and migrated form Redux and Electron easily. Check `frontend/src/components/pages/**/WithStore.tsx` for examples.

In order to deploy the app, the `frontend` gets build into static assets and copied over to the `backend` module.

### Backend → `./electron`

The 'brain' of the app, this module focuses on the business logic, processing and persistence of the data.

The module also contains the Electron logic for bootstraping the render processes (one for `frontend` and another for the `backend`) and for packaging the app.

**Written in TypeScript**, it operates as a Node.js backed. Runs withing a [Electron renderer process](https://www.electronjs.org/docs/latest/tutorial/process-model), with the Node.js APIs enabled. Source code available in `./electron/renderer-backend/src`

The message bus handler triggers [transactional scripts](https://martinfowler.com/eaaCatalog/transactionScript.html), which composes the functionality provided by a service layer.

The service layer uses dependency injection through [factory functions](https://www.javascripttutorial.net/javascript-factory-functions/), so it can be easily tested with unit tests.

The machine-learning uses classification and object recognition for extracting searchable tags from images, through [Tensorflow](https://github.com/tensorflow/tfjs).

The storage of extracted tags is managed using [electron-store](https://github.com/sindresorhus/electron-store).

### Shared → `./shared`

A type-only module, helps keep type consistency between `frontend` and `backend`.

It keeps shared data such as the available frontend routes, the supported message bus messages and typed representations of the shared domain entities (such as `Image`).

This enables compile-time checks on the touch points at the message bus level. Also, it helps keep domain entities consistently typed accross the app.

### Environments

The app can be configured to run in `development` and `production` environtments, by setting a variable in the `shared` module.

- `development`: the frontend runs in a separate process and is loaded into electron as a url.

- `production`: the frontend is loaded from static files, and the backend window is hidden. All the debugging tools and extensions are not mounted.

## Run it

Requires `"node": ">=14.0.0"` and `"yarn": "^1.22.0"`.

```bash
# install dependencies
yarn

# run unit test
yarn test:ci

# start app
yarn app

# build app
yarn build
```

## Releases

<https://github.com/aperkaz/taggr-releases/releases>

## Future

**taggr** has been a great side project for the past year, I learned plenty about how Electron works internally, how to structure controlled frontends and had lots of fun 🎉

I have other ideas I want to develop, so I dont plan on working on taggr any time soon.

Feel free to **fork** or open PRs!!

## Credit

Here are some of the great resources I have leveraged to build **taggr**, in no particular order:

- [Great electron boilerplate](https://github.com/sindresorhus/electron-boilerplate)
- [Modern electron apps](https://archive.jlongster.com/secret-of-good-electron-apps)
- [Loading the Frontend from a separate process](https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3?p=a0468ecb1da3)
- [awesome-electron](https://github.com/sindresorhus/awesome-electron)
