#!/usr/bin/env bash

node ./examples/node/node-modules-01.js
node ./examples/node/node-modules-02.js
node ./examples/node/node-modules-03.js
node ./examples/node/node-modules-04.js
node ./examples/node/node-modules-05.js
node ./examples/node/node-modules-06.js
node ./examples/node/node-modules-07.js

node ./examples/node/es6-index.js

./node_modules/.bin/tsc ./examples/typescript/index.ts
node ./examples/typescript/index.js

./node_modules/.bin/webpack --config ./examples/webpack/webpack.config.js
node ./examples/webpack/webpack-bundle.js
