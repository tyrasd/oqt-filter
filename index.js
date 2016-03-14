#!/usr/bin/env node
'use strict';
var tileReduce = require('tile-reduce');
var path = require('path');

var mbtilesPath = process.argv[2] || "osm.mbtiles",
    usersFile = process.argv[3] || './users.json';

tileReduce({
    map: path.join(__dirname, '/map.js'),
    sources: [{
        name: 'osm',
        mbtiles: mbtilesPath,
        raw: false
    }],
    mapOptions: {
        usersFile: usersFile
    },
    maxWorkers: 3
})
.on('reduce', function(d) {
    process.stdout.write(d);
})
.on('end', function() {
    //process.stdout.write("---\n");
});
