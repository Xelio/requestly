var RedirectRuleModel = Backbone.Model.extend({
  defaults: function() {
    return {
      name: '',
      description: '',
      source: '',
      destination: '',
      ruleType: RQ.RULE_TYPES.REDIRECT
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

  getSource: function() {
    return this.get('source');
  },

  setSource: function(sourceUrl) {
    this.set('source', sourceUrl);
  },

  getDestination: function() {
    return this.get('destination');
  },

  setDestination: function(destUrl) {
    this.set('destination', destUrl);
  },

  getTimestamp: function() {
    return Date.now();
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