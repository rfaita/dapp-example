# 1. dApp

- [1. dApp](#1-dapp)
  - [1.1. Initial configuration](#11-initial-configuration)
  - [1.2. WebPack 5 solve problem](#12-webpack-5-solve-problem)

## 1.1. Initial configuration

```sh
npm install -g create-react-app

npx create-react-app dapp

npm install --save web3
```

add to `package.json`:
```js
"contracts": "file:./../contracts/build/contracts",
```

```sh
npm install
```

## 1.2. WebPack 5 solve problem

```sh
npm install --save-dev react-app-rewired
npm install --save-dev crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process
```

Create at root of project:

```js
//config-overrides.js
const webpack = require('webpack'); 
module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "url": require.resolve("url")
  })
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ])
  return config;
}
```

Replace at `package.json`:

```json
"scripts": { 
	"start": "react-app-rewired start", 
  "build": "react-app-rewired build", 
  "test": "react-app-rewired test", 
  "eject": "react-scripts eject" 
 },
 ```


Change the package.json start command:
```js
"start": "react-scripts --openssl-legacy-provider start",
```

```sh
npm start
```