/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/**
 * A map from {@link TemporalField} to value.
 *
 * Fields are matched by identity, like the `HashMap` used by java.time. Entries are bucketed
 * by `field.name()`, but fields with the same name are distinct keys: for example the
 * `WeekBasedYear` field of `@js-joda/locale` WeekFields is not `IsoFields.WEEK_BASED_YEAR`.
 *
 * @private
 */
export class EnumMap {
    constructor(){
        this._map = {};
    }

    /**
     * @param {TemporalField} key
     * @return {?{key: TemporalField, value: *}} the entry of key, or undefined
     * @private
     */
    _entry(key){
        const bucket = this._map[key.name()];
        if (bucket != null) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i].key === key) {
                    return bucket[i];
                }
            }
        }
        return undefined;
    }

    putAll(otherMap){
        const keys = otherMap.keys();
        for (let i = 0; i < keys.length; i++) {
            this.set(keys[i], otherMap.get(keys[i]));
        }
        return this;
    }

    containsKey(key){
        const entry = this._entry(key);
        return entry != null && entry.value !== undefined;
    }

    get(key) {
        const entry = this._entry(key);
        return entry != null ? entry.value : undefined;
    }

    put(key, val) {
        return this.set(key, val);
    }

    set(key, val) {
        const entry = this._entry(key);
        if (entry != null) {
            entry.value = val;
        } else {
            const name = key.name();
            // eslint-disable-next-line no-prototype-builtins
            if (this._map.hasOwnProperty(name) === false) {
                this._map[name] = [];
            }
            this._map[name].push({ key, value: val });
        }
        return this;
    }

    retainAll(keyList){
        const retained = new EnumMap();
        for (let i = 0; i < keyList.length; i++) {
            if (this.containsKey(keyList[i])) {
                retained.set(keyList[i], this.get(keyList[i]));
            }
        }
        this._map = retained._map;
        return this;
    }

    remove(key){
        const bucket = this._map[key.name()];
        if (bucket != null) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i].key === key) {
                    const val = bucket[i].value;
                    bucket.splice(i, 1);
                    return val;
                }
            }
        }
        return undefined;
    }

    /**
     * Returns the fields that have a value, a snapshot that is not changed by later updates.
     *
     * @return {TemporalField[]}
     */
    keys(){
        const keys = [];
        for (const name in this._map) {
            // eslint-disable-next-line no-prototype-builtins
            if (this._map.hasOwnProperty(name)) {
                const bucket = this._map[name];
                for (let i = 0; i < bucket.length; i++) {
                    if (bucket[i].value !== undefined) {
                        keys.push(bucket[i].key);
                    }
                }
            }
        }
        return keys;
    }

    clear(){
        this._map = {};
    }

    toString(){
        return `{${this.keys().map((key) => `${key}=${this.get(key)}`).join(', ')}}`;
    }
}
