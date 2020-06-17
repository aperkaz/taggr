REM build frontend statics
npm run build --prefix frontend

REM remove existing frontend statics from backend
rm -rf electron/frontend-statics

REM copy frontend statics to backend
REM mv ./frontend/build ./electron/frontend-statics

REM setup build-test env in backend
REM COPY cp electron/src/env/build-test.json electron/src/env.json

# build backend
REM npm run make --prefix ./electron