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
SearchDestinationAsync.prototype.search = function (data) {
  this.scheduler.runAsyncProcessSearch(data);
};

/**
 * @access public
 */
SearchDestinationAsync.prototype.reverse = function (data) {
  this.scheduler.runAsyncProcessReverse(data);
};

module.exports = new SearchDestinationAsync();
