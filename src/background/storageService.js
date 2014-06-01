var StorageService = {
  records: [],
  isRecordsFetched: false,
  DB: chrome.storage.sync
};

StorageService.printRecords = function() {
  this.DB.get(null, function(o) {
    console.log(o);
  });
};

StorageService.getRecords = function(options) {
  var self = this;

  options = options || {};

  /* If records have been read from storage, return the cached values */
  if (this.isRecordsFetched && !options.forceFetch) {
    typeof options.callback === 'function' && options.callback(this.records);
    return;
  }

  // Clear the existing records
  this.records.length = 0;

  this.DB.get(null, function(superObject) {
    for (var key in superObject) {
      if (typeof superObject[key].ruleType !== 'undefined') {
        self.records.push(superObject[key]);
      }
    }

    self.isRecordsFetched = true;

    typeof options.callback === 'function' && options.callback(self.records);
  });
};

StorageService.saveRecord = function(object, callback) {
  callback = callback || function() {};
  this.DB.set(object, callback);
};