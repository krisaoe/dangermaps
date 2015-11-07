import merge from '../libraries/_merge';
import UniqueId from '../services/unique-id';

/* Returns Map Model */
var Map = function(params) {

    var defaultParams = {
        id: UniqueId('map'),
        name: "Map Name",
        width: 20,
        height: 15,
        backgroundImage: null,
        walls: []
    };

    return merge(defaultParams, params);
}

export default Map;