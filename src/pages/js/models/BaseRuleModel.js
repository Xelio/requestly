var BaseRuleModel = Backbone.Model.extend({
  defaults: function() {
    return {
      name: '',
      description: '',
      ruleType: '',
      creationDate: ''
    }
  },

  getName: function() {
    return this.get('name');
  },

  setName: function(name) {
    this.set('name', name);
  },

  getDescription: function() {
    return this.get('description');
  },

  setDescription: function(des) {
    this.set('description', des);
  },

  getTimestamp: function() {
    return Date.now();
  },

  setCreationDate: function(date) {
    this.set('creationDate', date);
  },

  getRuleType: function() {
    return this.get('ruleType');
  },

  save: function() {
    var objectKey = this.getRuleType() + '_' + this.getTimestamp(),
      storageObject = {},
      BG = chrome.extension.getBackgroundPage(),
      storageService = BG.StorageService;

    storageObject[objectKey] = this.toJSON();

    storageService.saveRecord(storageObject, function() {
      console.log('object saved');
    });
  }
});