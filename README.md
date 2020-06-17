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
// ----- dev -----
npm run dev:linux
// TODONOW
npm run dev:windows

// ----- build-test -----
// linux
npm run build:test
// windows
TODONOW

// ----- build-production -----
// linux
npm run build:production
// windows
TODONOW
```

## Publishing

TODONOW: define app publising steps.