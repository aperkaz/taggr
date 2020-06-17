# taggr

Rediscover your **memories** while keeping your **privacy**.

Powered by machine learning.

## Architecture

`frontend` (./frontend) and `backend` (./electron) are separated.

Navigate to each folder for further information.

## Environments

3 app environments. `dev`, `build-test` and `build-production`.

The frontend gets the env variables (helpers at `./src/env`):
-`WINDOW.IS_DEV`
-`WINDOW.IS_BUILD_TEST`
-`WINDOW.IS_BUILD_PRODUCTION`

The backend gets an single environment: `process.env.TAGGR_ENV`, with value: `dev`, `build-test`, `build-production`. Helpers at `./src/env`

- `dev`: `frontend` served from webpack server. `backend` running inside browserwindow (reload with Ctrl+R). Sentry disabled. Firebase events disabled.

- `build:test`: `frontend` served from statics. `backend` running inside browserwindow (reload with Ctrl+R). Sentry disabled. Firebase events enabled.

- `build:test`: `frontend` served from statics. `backend` running inside node process. Sentry integration enabled. Firebase events enabled.

```json
// NOTE: in windows, fire the commands from git-bash console

// ----- dev -----
npm run dev:linux

// ----- build-test -----
npm run build:test

// ----- build-production -----
npm run build:production
```

## Publishing

TODONOW: define app publising steps.