var searcher = require('./');

const ADDRESS = 'Paris';
const LATITUDE = '48.833330';
const LONGITUDE = '2.333330';
const LANGUAGE = 'en';

var options = {
  language: LANGUAGE
}

function callbackOnTask (error, result) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(result);
  }
}

function callbackOnFinish () {
  console.log('search process has been finished');

  var m = process.memoryUsage();
  console.log('Used memory: ' + m.heapUsed + ' / ' + m.heapTotal);
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
