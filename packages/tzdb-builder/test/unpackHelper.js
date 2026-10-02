import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// @js-joda/timezone's unpack.js is an ES module in a CommonJS package, so load it from its source text
const unpackSource = fs.readFileSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'timezone', 'src', 'unpack.js'), 'utf8');

export const { unpack } = await import(`data:text/javascript,${encodeURIComponent(unpackSource)}`);
