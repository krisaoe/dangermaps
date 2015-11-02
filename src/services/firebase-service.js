import Firebase from 'firebase';
import MStore from './mapmaker-datastore';

var FirebaseService = function() {
    var self = this;
    //var fb = new Firebase("https://dangerstudio.firebaseio.com/maps");

    var getCurrentMap = function(callback) {
    };

    /* --- PUBLIC API --- */

    self.updateCurrentMap = function(newValues, callback) {

        var currentMapId = MStore.get('currentMap').id;
        var fb = new Firebase("https://dangerstudio.firebaseio.com/maps/" + currentMapId);

        fb.update(newValues, callback);
    };


    return self;
};

export default FirebaseService;