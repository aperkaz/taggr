# ef6-sharp
Electron Forge 6 + Sharp test

This Electron + React App (w/ Webpack & Forge) shows how to create and show a grayscale basic png using [Sharp](https://github.com/lovell/sharp)

### Instructions to run:

#### Developer Mode
1. Pull in this repo
2. `npm i`
3. `npm start`

#### Production Mode
1. Pull in this repo
2. `npm i`
3. `npm run package`
4. go to the `./out` folder to find the executable file that was just packaged and double click / invoke


### DIY

To create a similar project from scratch:
1. Install electron-forge v6 npm i -g @electron-forge/cli
2. create electron-forge project w/ webpack electron-forge init ef6-sharp --template=webpack
3. add react: npm i --save react react-dom
4. add babel: npm i --save-dev babel-loader @babel/core @babel/preset-env
5. add .babelrc and update webpack.rules.js & app.js as shown in above repo
