'use strict';
var fs = require('fs');

var filter = JSON.parse(fs.readFileSync(global.mapOptions.filterPath));

var users = {};
if (filter.experience.file)
    users = JSON.parse(fs.readFileSync(filter.experience.file));

// Filter features touched by list of users defined by users.json
module.exports = function(tileLayers, tile, writeData, done) {
    var layer = tileLayers.osm.osm;

    // filter
    layer.features = layer.features.filter(function(feature) {
        function hasTag(tag) {
            return feature.properties[tag] && feature.properties[tag] !== 'no';
        }
        return feature.geometry.type === filter.geometry && hasTag(filter.tag);
    });

    // enhance with user experience data
    layer.features.forEach(function(feature) {
        var user = feature.properties._uid;
        if (users[user] && users[user][filter.experience.field])
            feature.properties._userExperience = users[user][filter.experience.field]; // todo: include all/generic experience data?
    });

    // output
    if (layer.features.length > 0)
        writeData(JSON.stringify(layer)+'\n');

    done();
};
