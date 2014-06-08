var BaseRuleModel = Backbone.Model.extend({
  defaults: function() {
    return {
      name: '',
      description: '',
      ruleType: '',
      status: 'active',
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

  getRuleType: function() {
    return this.get('ruleType');
  },

  getStatus: function() {
    return this.get('status');
  },

  save: function(options) {
    var objectKey = this.getRuleType() + '_' + this.getTimestamp(),
      storageObject = {},
      storageService = BG.StorageService;

    storageObject[objectKey] = this.toJSON();

    options.callback = options.callback || function() {
      console.log('object saved');
    };

    storageService.saveRecord(storageObject, options.callback);
  }
});