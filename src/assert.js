export function assert(assertion, msg, error) {
    if(!assertion){
        if (error) {
            throw new error(msg);
        } else {
            throw new Error(msg);
        }
    }
}
