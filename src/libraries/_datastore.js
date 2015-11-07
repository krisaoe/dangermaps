//import merge from '../libraries/_merge';
import $ from 'jquery';

var Datastore = function() {
    var self = {
        get: function(key) {
            if ( (self.store[key]) && typeof self.store[key] == "object") {
                if ( self.store[key].constructor === Array) {
                    return self.store[key].slice(0);
                } else {
                    return $.extend( {}, self.store[key] );
                }
            }
            else
                return self.store[key];
        },
        set: function(key, value) {
            self.store[key] = value;

            //Execute any actions that are interested in this variable
            var reactions = self.watchings.filter(function(d) {
                return d.variable == key;
            });
            reactions.forEach(function(reaction) {
                reaction.action(value); //offer the new value for use in the callback
            });

            return value;
        },
        listen: function(variable, callback, signature) {
            self.watchings.push({
                variable: variable,
                action: callback,
                signature: signature
            });
            //Callbacks must have a signature to be unlisten-able
        },

        stopListening: function(variable, signature) {

            var match = self.watchings.filter(function(listener) {
                listener.signature = listener.signature || null;
                return (listener.variable == variable && listener.signature == signature);
            })[0];

            var index = self.watchings.indexOf(match);
            if (index > -1) {
                self.watchings.splice(index,1);
            }
        },

        store: {},
        watchings: [],

        /* New feature.... */
        /* Events: Do something when something else in the app happens. Does not know or care about the new value */
        /* Would be cool if eventKey could be an array too, so component could execute one callback on a few different events */

        oneTimeActions: [], /* store the actions */
        when: function(eventKey, callback) {
            /* When this happens, do this thing */
            self.oneTimeActions.push({
                eventKey: eventKey,
                action: callback
            });
        },
        eventHappened: function(eventKey) {
           var reactions = self.oneTimeActions.filter(function(action) {
              return eventKey == action.eventKey;
           });

            reactions.forEach(function(reaction) {
               reaction.action();
            });

        },


    }

    return self;
};

export default Datastore;