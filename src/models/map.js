import merge from '../libraries/_merge';

/* Returns Map Model */
var Map = function(params) {

    var defaultParams = {
        id: 'map_' + Math.floor((Math.random() * 999999) + 1),
        name: "Map Name",
        width: 20,          /* cells */
        height: 15,
        backgroundImage: null
    };

    return merge(defaultParams, params);
}

export default Map;