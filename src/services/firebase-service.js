import Firebase from 'firebase';
import MStore from './mapmaker-datastore';

var FirebaseService = function() {
    var self = this;

    self.updateCurrentMap = function(newValues, callback) {
        var fb = new Firebase("https://dangerstudio.firebaseio.com/maps/" + MStore.get('currentMap').id );
        fb.update(newValues, callback);
    };

    self.getCurrentMapJsonLink = function() {
        return "https://dangerstudio.firebaseio.com/maps/" + MStore.get('currentMap').id + ".json";
    };

    self.getAllMaps = function(callback) {
        var fb = new Firebase("https://dangerstudio.firebaseio.com/");

        fb.child("maps").once("value", function(data) {
            var dataArray = [];
            data.forEach(function(snap) {
                var obj = snap.val();
                obj.id = snap.key(); //include id in value
                dataArray.push( obj );
            })

            callback(dataArray);
        });
    };


    return self;
};

export default new FirebaseService();