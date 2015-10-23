var __slice = [].slice;

export function assert() {
    var args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return console.assert.apply(console, args);
}
