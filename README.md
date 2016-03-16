# oqt-filter

Filters out specific features from [osm-qa-tiles](http://osmlab.github.io/osm-qa-tiles/) and enhances feature properties with external [user experience](https://github.com/tyrasd/oqt-user-experience) data.

Usage:

    node index.js <path-to-osmqatiles.mbtiles> <path-to-user-filter.json> | tippecanoe …

See [`filter.example.json`](blob/master/filter.example.json) for how to set filter criteria.
