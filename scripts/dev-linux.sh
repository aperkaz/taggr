#!/bin/bash

# setup dev env in backend
cp electron/src/env/dev.json electron/src/env.json;

# run frontend and backend concurrently
concurrently "npm run start:linux --prefix ./frontend" "npm run start --prefix ./electron"