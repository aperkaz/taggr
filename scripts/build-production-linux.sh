#!/bin/bash

# build frontend statics
npm run build --prefix ./frontend

# remove existing frontend statics from backend
rm -rf electron/frontend-statics 

# copy frontend statics to backend
mv ./frontend/build ./electron/frontend-statics

# setup build-test env in backend
cp electron/src/env/build-production.json electron/src/env.json

# build backend
npm run make --prefix ./electron