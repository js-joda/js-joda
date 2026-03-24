#!/usr/bin/env bash

# NODE_PATH ensures @js-joda/locale is resolvable from within prebuilt locale packages
# when they are loaded via file: symlinks (local development only)
export NODE_PATH="$(pwd)/node_modules"

node ./examples/node/node-modules-01.js
node ./examples/node/node-modules-02.js
node ./examples/node/node-modules-03.js
node ./examples/node/node-modules-04.js
node ./examples/node/node-modules-05.js
node ./examples/node/node-modules-06.js
node ./examples/node/node-modules-07.js
node ./examples/node/node-modules-07-ko.js
node ./examples/node/node-modules-08.js
node ./examples/node/node-modules-09-full-locale.js

node ./examples/node/es6-index.js

npx tsc ./examples/typescript/index.ts
node ./examples/typescript/index.js

