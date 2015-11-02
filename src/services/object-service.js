var initialMapData = {
    //id: "sample-dangercrew-map-001",
    //title: "Drew's First Map",
    backgroundImage: "1.png",
    width: 20,
    height: 17,
    cells: [

    ]
}



var ObjectService = function() {
    return {

        map: initialMapData,

        get() {
            return this.map
        },
        set: function(id,x,y, type, action) {
            var self = this;
            self.objects.push({
                id:id,
                x:x,
                y:y,
                type: type,
                action: action || null
            })
    }
    }
}

module.exports = ObjectService();