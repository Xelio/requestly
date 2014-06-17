var BaseRuleModel = Backbone.Model.extend({
  defaults: function() {
    return {
      name: '',
      description: '',
      ruleType: '',
      status: RQ.RULE_STATUS.ACTIVE,
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

  getCreationDate: function() {
    return this.get('creationDate');
  },

  hasCreationDate: function() {
    return typeof this.get('creationDate') !== 'undefined' && this.get('creationDate');
  },

  getRuleType: function() {
    return this.get('ruleType');
  },

  getStatus: function() {
    return this.get('status');
  },

  save: function(options) {
    var creationDate = this.hasCreationDate() ? this.getCreationDate() : this.getTimestamp(),
      objectKey = this.getRuleType() + '_' + creationDate,
      storageObject = {},
      storageService = BG.StorageService;

    storageObject[objectKey] = this.toJSON();

    options.callback = options.callback || function() {
      console.log('object saved');
    };

    storageService.saveRecord(storageObject, options.callback);
  }
});