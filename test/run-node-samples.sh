#!/usr/bin/env bash

node ./examples/node/node-modules-01.js
node ./examples/node/node-modules-02.js
node ./examples/node/node-modules-03.js

node ./examples/node/es6-index.js

# FIXME
./node_modules/.bin/webpack --config ./examples/webpack/webpack.config.js
node ./examples/webpack/webpack-bundle.js
