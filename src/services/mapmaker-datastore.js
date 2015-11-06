/* Manages State in overworld experience */
import Datastore from '../libraries/_datastore';

var MapmakerDatastore = new Datastore();

MapmakerDatastore.store = {
    currentTool: "Hank",
    showGridLines: true,
    wallOpacity: 0.7,
    useBackgroundImage: true
}

export default MapmakerDatastore;