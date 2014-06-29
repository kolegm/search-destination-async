var _ = require('underscore');
var async = require('async');
var searcher = require('search-destination');

var config = require('../config.json');

const DEFAULT_CONCURRENCY_VALUE = 2;

function Scheduler () {}

/**
 * @access public
 */
Scheduler.prototype.runAsyncProcessSearch = function (address, callback, options) {
  var tasks = this._prepareTasksForSearch(address);
  this._getQueue().push(tasks, callback);
};

/**
 * @access public
 */
Scheduler.prototype.runAsyncProcessReverse = function (lat, lng, callback, options) {
  var tasks = this._prepareTasksForReverse(lat, lng);
  this._getQueue().push(tasks, callback);
};

/**
 * @access protected
 */
Scheduler.prototype._prepareTasksForSearch = function (address) {
  var tasks = _.map(
    this._getProviderList(),
    function (values) {
      return {
        search: true, // task for search by query (address)
        address: address,
        provider: values.name,
        options: values.options // default provider options for work with API
      };
    });

  return tasks;
}

/**
 * @access protected
 */
Scheduler.prototype._prepareTasksForReverse = function (lat, lng) {
  var tasks = _.map(
    this._getProviderList(),
    function (values) {
      return {
        reverse: true, // task for search by coordinates (latitude/longitude)
        latitude: lat,
        longitude: lng,
        provider: values.name,
        options: values.options // default provider options for work with API
      };
    });

  return tasks;
}

/**
 * @access protected
 */
Scheduler.prototype._getProviderList = function () {
  if (!this.providerList && ('provider' in config)) {
    this.providerList = _.filter(config.provider, function (values) {
      // use only active providers
      return (values.active == true);
    });
  }

  return this.providerList;
}

/**
 * @access protected
 */
Scheduler.prototype._getQueue = function () {
  if (!_.isObject(this.queue)) {
    this.queue = async.queue(
      this._getWorker(),
      this._getConcurrency()
    );
    
    /*
    this.queue.drain = function() {
      console.log('drain');
    };
    
    this.queue.pause = function() {
      console.log('paused');
    };
    this.queue.saturated = function() {
      console.log('saturated');
    };
    */
  }

  return this.queue;
}

/**
 * @access protected
 */
Scheduler.prototype._getWorker = function () {
  return function (task, callback) {
    searcher.useProvider(task.provider, task.options); // set options

    if ('search' in task) {
      searcher.search(task.address, callback); // set options
    } else if ('reverse' in task) {
      searcher.reverse(task.latitude, task.longitude, callback); // set options
    } else {
      callback();
    }
  };
}

/**
 * @access protected
 */
Scheduler.prototype._getConcurrency = function () {
  return config.concurrency || DEFAULT_CONCURRENCY_VALUE;
}

module.exports = Scheduler;
