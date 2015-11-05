
var merge = function(target, source) {

    /* Merges two (or more) objects,
     giving the last one precedence */

    /* I added this to use copies of each before merge, to not mutate the original */
    function cloneObject(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        var temp = obj.constructor(); // give temp the original obj's constructor
        for (var key in obj) {
            temp[key] = cloneObject(obj[key]);
        }

        return temp;
    }

    if ( typeof target !== 'object' ) {
        target = {};
    }


    var target = cloneObject(target), //save from mutation
        source = cloneObject(source); //


    for (var property in source) {

        if ( source.hasOwnProperty(property) ) {

            var sourceProperty = source[ property ];

            if ( typeof sourceProperty === 'object' ) {
                target[ property ] = util.merge( target[ property ], sourceProperty );
                continue;
            }

            target[ property ] = sourceProperty;

        }

    }

    for (var a = 2, l = arguments.length; a < l; a++) {
        merge(target, arguments[a]);
    }




    return target;
};

module.exports = merge;