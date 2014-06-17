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

StorageService.clearDB = function() {
  this.DB.clear();
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

StorageService.getRecord = function(key, callback) {
  callback = callback || function() { console.log('Default handler called when record is fetched:', key) };
  StorageService.DB.get(key, callback);
};

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (StorageService.DB === chrome.storage[namespace]) {
    for (changedObjectkey in changes) {
      var change = changes[changedObjectkey],
        objectExists = false;

      /* Add/Edit Rule operation */
      if (typeof change.oldValue === 'undefined' && typeof change.newValue !== 'undefined') {
        for (var i = 0; i < StorageService.records.length; i++) {
          var recordKey = StorageService.records[i].ruleType + '_' + StorageService.records[i].creationDate;

          if (recordKey === changedObjectkey) {
            StorageService.records[i] = change.newValue;
            objectExists = true;
            break;
          }
        }

        if (!objectExists) {
          StorageService.records.push(change.newValue);
        }
      }

      /* Delete Rule Operation */
    }
  }
});