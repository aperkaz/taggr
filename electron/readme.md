# electron-boilerplate

> Boilerplate to kickstart creating an app with [Electron](https://github.com/electron/electron)

See [awesome-electron](https://github.com/sindresorhus/awesome-electron) for more useful Electron resources.

See [Caprine](https://github.com/sindresorhus/caprine) for a production app based on this boilerplate.

## Features

- [`electron-builder`](https://www.electron.build) fully set up to create cross-platform builds
- [Builds the app on CI](https://www.electron.build/multi-platform-build.html)
- [Silent auto-updates](https://www.electron.build/auto-update.html)
- App menu that adheres to the system user interface guidelines
- [Config handling](https://github.com/sindresorhus/electron-store)
- [Context menu](https://github.com/sindresorhus/electron-context-menu)
- [User-friendly handling of unhandled errors](https://github.com/sindresorhus/electron-unhandled)
- Ts support for the render-backend
- [Auto reload of electron on changes](https://github.com/sindresorhus/electron-reloader)
- Easily publish new versions to GitHub Releases

## Getting started

**Click the "Use this template" button.**

Alternatively, create a new directory and then run:

```
$ curl -fsSL https://github.com/sindresorhus/electron-boilerplate/archive/main.tar.gz | tar -xz --strip-components 1
```

There's also a [Yeoman generator](https://github.com/sindresorhus/generator-electron).

---

**Remove everything from here and above**

---

# App Name

> The best app ever

## Install

_macOS 10.10+, Linux, and Windows 7+ are supported (64-bit only)._

**macOS**

[**Download**](https://github.com/user/repo/releases/latest) the `.dmg` file.

**Linux**

[**Download**](https://github.com/user/repo/releases/latest) the `.AppImage` or `.deb` file.

_The AppImage needs to be [made executable](http://discourse.appimage.org/t/how-to-make-an-appimage-executable/80) after download._

**Windows**

[**Download**](https://github.com/user/repo/releases/latest) the `.exe` file.

---

## Dev

Built with [Electron](https://electronjs.org).

### Run

```
$ yarn
$ yarn start
```

### Publish

```
$ yarn release
```

After Travis finishes building your app, open the release draft it created and click "Publish".
