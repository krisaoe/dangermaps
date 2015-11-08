import Firebase from 'firebase';
import MStore from './mapmaker-datastore';
import ENV from '../env';


var FirebaseService = function() {
    var self = this;

    //Check if in Dev environment
    var FIREBASE_URL = ENV.isDev ? "https://dangerstudio.firebaseio.com" : "https://dangerstudio-prod.firebaseio.com";


    self.createNewMap = function(mapModel) {
        var fb = new Firebase(FIREBASE_URL+"/maps");
        fb.child(mapModel.id).set(mapModel, function () {
            MStore.set('currentMap', mapModel); //send local copy to the editor
        });
    }


    self.updateCurrentMap = function(newValues, callback) {
        var fb = new Firebase(FIREBASE_URL+"/maps/" + MStore.get('currentMap').id );
        fb.update(newValues, callback);
    };

    self.getCurrentMapJsonLink = function() {
        return FIREBASE_URL+"/maps/" + MStore.get('currentMap').id + ".json";
    };

    self.getAllMaps = function(callback) {
        var fb = new Firebase(FIREBASE_URL);

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