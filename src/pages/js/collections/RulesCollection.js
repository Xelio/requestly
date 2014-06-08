var RulesCollection = Backbone.Collection.extend({
  model: BaseRuleModel,

  fetchRules: function(options) {
    var that = this;
    options = options || {};

    BG.StorageService.getRecords({
      forceFetch: true,
      callback: function(rules) {
        that.models.length = 0;
        _.each(rules, function(ruleObject) {
          that.models.push(new that.model(ruleObject));
        });

        if (typeof options.success === 'function') {
          options.success(that);
        }
      }
    });
  }

});