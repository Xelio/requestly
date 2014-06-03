var RedirectRuleModel = BaseRuleModel.extend({
  defaults: function() {
    return _.extend(BaseRuleModel.prototype.defaults(), {
      source: '',
      destination: '',
      ruleType: RQ.RULE_TYPES.REDIRECT
    });
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
  }
});