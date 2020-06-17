REM  setup dev env in backend
COPY .\electron\src\env\dev.json .\electron\src\env.json

REM  run frontend and backend concurrently
concurrently "npm run start --prefix frontend" "npm run start --prefix electron"