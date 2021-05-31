#!/bin/bash

#  TODONOW: set end files!
# setup dev env in backend
# cp electron/src/env/dev.json electron/src/env.json

rimraf ./backend/build
mkdir ./backend/build
cp ./backend/server-dev.html ./backend/build/server-dev.html
tsc -w --preserveWatchOutput