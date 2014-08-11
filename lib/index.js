var Scheduler = require('./scheduler');

function SearchDestinationAsync() {}

/**
 * @access public
 */
SearchDestinationAsync.prototype.search = function (data) {
  var scheduler = new Scheduler();
  scheduler.runAsyncProcessSearch(data);
};

/**
 * @access public
 */
SearchDestinationAsync.prototype.reverse = function (data) {
  var scheduler = new Scheduler();
  scheduler.runAsyncProcessReverse(data);
};

module.exports = new SearchDestinationAsync();
