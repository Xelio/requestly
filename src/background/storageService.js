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

StorageService.removeRecord = function(key, callback) {
  callback = callback || function() { console.log('Default handler called when record is removed:', key) };
  StorageService.DB.remove(key, callback);
};

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (StorageService.DB === chrome.storage[namespace]) {
    for (changedObjectkey in changes) {
      var change = changes[changedObjectkey],
        objectExists = false,
        i,
        recordKey;

      /*
        StorageService.records are updated on every add/edit/delete operation
        So that background rules can be updated which are executed when each request URL is intercepted
       */

      /* Add/Edit Rule operation */
      if (typeof change.oldValue === 'undefined' && typeof change.newValue !== 'undefined') {
        for (i = 0; i < StorageService.records.length; i++) {
          recordKey = StorageService.records[i].id || (StorageService.records[i].ruleType + '_' + StorageService.records[i].creationDate);

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
      if (typeof change.oldValue !== 'undefined' && typeof change.newValue === 'undefined') {
        for (i = 0; i < StorageService.records.length; i++) {
          recordKey = StorageService.records[i].id || (StorageService.records[i].ruleType + '_' + StorageService.records[i].creationDate);

          if (recordKey === changedObjectkey) {
            StorageService.records = StorageService.records.splice(i, 1);
            break;
          }
        }
      }
    }
  }
});