var UniqueId = function(prefix) {

    if (typeof prefix != "string") {
        throw "WHOOPS! You need to specify a prefix like 'wall' or something when using UniqueId"
        return
    }

    function randomCharacaterString(stringLength) {
        var text = "";
        var possible = "0123456789abcdefg";

        for( var i=0; i < stringLength; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    return prefix + '_' + randomCharacaterString(14);
};

export default UniqueId;