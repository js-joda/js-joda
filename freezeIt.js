/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

function freezeClassesAndStaticClassProperties(JSJodaModule) {
    Object.getOwnPropertyNames(JSJodaModule).forEach(function (className){
        if (className.indexOf('_') === 0 || className[0] !== className[0].toUpperCase()){
            return;
        }
        var JSJodaClass = JSJodaModule[className];
        if(Object.isFrozen(JSJodaClass)){
            return;
        }
        Object.getOwnPropertyNames(JSJodaClass).forEach(function(classProp){
            if(JSJodaClass[classProp] instanceof JSJodaClass){
                // console.log('about to freeze static instance: ' + className + '.' + classProp);
                Object.freeze(JSJodaClass[classProp]);
            }
        });
        // console.log('about to freeze class: ' + className);
        Object.freeze(JSJodaClass);
    });

}


var JSJoda = require('js-joda');

freezeClassesAndStaticClassProperties(JSJoda);

// modify static class properties
JSJoda.LocalTime.MIDNIGHT = JSJoda.LocalTime.of(12,1);
console.log(JSJoda.LocalTime.MIDNIGHT.toString());

JSJoda.LocalTime.NOON._hour = -1;
console.log(JSJoda.LocalTime.NOON.toString());

JSJoda.Instant.MIN_SECONDS = 0;
console.log(JSJoda.Instant.MIN_SECONDS);



