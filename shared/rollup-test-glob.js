const join = require('path').join;
const glob = require('glob').sync;

module.exports = function () {
    return {
        name: 'test-glob',
        resolveId: function (importee) {
            // required to mark glob file pattern as resolved id
            if (importee && importee.startsWith('**')) {
                return importee;
            }
            return null;
        },
        load(id) {
            if (id.startsWith('**')) {
                // glob files and generate source code like
                // import _0 from 'C:\dev\test\file01.test.js'; export { _0 };
                // import _1 from 'C:\dev\test\file02.test.js'; export { _1 };
                // ...
                const files = glob(id, {
                    cwd: process.cwd()
                });
                const source = files
                    .map((file, i) =>
                        `import _${i} from ${JSON.stringify(join(process.cwd(), file))}; export { _${i} };`)
                    .join('\n');
                return source;
            }
            return null;
        }
    };
};
