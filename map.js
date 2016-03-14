'use strict';
var fs = require('fs');
var turf = require('turf');

var users = JSON.parse(fs.readFileSync(global.mapOptions.usersFile));

var filter = {
    //geometry: 'LineString',
    //tag: 'highway',
    //experience: 'highways'
    geometry: 'Polygon',
    tag: 'building',
    experience: 'buildings'
}

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

    layer.features.forEach(function(feature) {
        var user = feature.properties._uid;
        if (!users[user] || !users[user][filter.experience])
            console.error('unable to find experience data for uid '+user);
        else
            feature.properties._userExperience = users[user][filter.experience]; // todo: include all/generic experience data?
    });

    writeData(layer);

    done();
};
