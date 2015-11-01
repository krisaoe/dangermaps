import merge from '../libraries/_merge';

var Datastore = function() {
    var self = {
        get: function(key) {
            if ( (self.store[key]) && typeof self.store[key] == "object") {
                if ( self.store[key].constructor === Array) {
                    return self.store[key].slice(0);
                } else {
                    return merge( {}, self.store[key] );
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
        watchings: []
    }

    return self;
};

export default Datastore;