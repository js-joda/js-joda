#!/usr/bin/env bash

# NODE_PATH ensures @js-joda/locale is resolvable from within prebuilt locale packages
# when they are loaded via file: symlinks (local development only)
export NODE_PATH="$(pwd)/node_modules"

node ./examples/node/node-core.js
node ./examples/node/node-extra.js
node ./examples/node/node-extra-import-order.js
node ./examples/node/node-timezone.js
node ./examples/node/node-timezone-empty.js
node ./examples/node/node-locale.js
node ./examples/node/node-locale-without-timezone.js
node ./examples/node/node-locale-cldr.js

node ./examples/node/es6-core.mjs
node ./examples/node/es6-extra.mjs
node ./examples/node/es6-extra-import-order.mjs
node ./examples/node/es6-timezone.mjs
node ./examples/node/es6-timezone-empty.mjs
node ./examples/node/es6-locale.mjs
node ./examples/node/es6-locale-without-timezone.mjs
node ./examples/node/es6-locale-cldr.mjs

node ./examples/bundler/build.mjs

npx tsc ./examples/typescript/index.ts
node ./examples/typescript/index.js

