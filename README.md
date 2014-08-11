##search-destination-async
###General
Node.js module for geocoding and reverse geocoding ASYNCHRONOUSLY.
Search geographic destination by name or address, by location or point of interest, by coordinates.

###Installation
>npm install search-destination-async [-S]

###Used external modules
As entry point for communication with external providers
* [Module search-destination. Entry point](https://github.com/kolegm/search-destination).
As communicators for searching
* [Module search-google-geocode. Used Google geocoding API](https://github.com/kolegm/google-geocoder).
* [Search search-geonames. Used Geonames API](https://github.com/kolegm/search-geonames).
* [Search search-osm-geocode. Used Open Street Map (OSM) API](https://github.com/kolegm/search-osm-geocode).

### Usage example
```javascript
// initialize searcher instance
var searcher = require('search-destination-async');

// request parameters
const ADDRESS = 'Paris';
const LATITUDE = '48.833330';
const LONGITUDE = '2.333330';
const LANGUAGE = 'en';

// use callback for one task, when search in some external system was finished
function callbackOnTask (error, result) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(result);
  }
}

// use callback to return full result from search process
function callbackOnFinish () {
  console.log('search process has been finished');
}

searcher.search({
  address:ADDRESS,
  callbackOnTask: callbackOnTask,
  callbackOnFinish: callbackOnFinish,
  options: options
});

searcher.reverse({
  latitude: LATITUDE,
  longitude: LONGITUDE,
  callbackOnTask: callbackOnTask,
  callbackOnFinish: callbackOnFinish,
  options: options
});

```
