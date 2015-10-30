export function assert(assertion, msg) {
    if(!assertion){
        throw new Error(msg);
    }
}
