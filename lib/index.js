var Scheduler = require('./scheduler');

/**
 * Child constructor
 */
function SearchDestinationAsync() {
  this.scheduler = new Scheduler();
}

/**
 * @access public
 */
SearchDestinationAsync.prototype.search = function (address, callback, options) {
  this.scheduler.runAsyncProcessSearch(address, callback, options);
};

/**
 * @access public
 */
SearchDestinationAsync.prototype.reverse = function (lat, lng, callback, options) {
  this.scheduler.runAsyncProcessReverse(lat, lng, callback, options);
};

module.exports = new SearchDestinationAsync();
