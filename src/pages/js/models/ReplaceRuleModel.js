var ReplaceRuleModel = BaseRuleModel.extend({
  defaults: function() {
    return _.extend(BaseRuleModel.prototype.defaults(), {
      ruleType: RQ.RULE_TYPES.REPLACE,
      pairs: [
        this.getDefaultPair()
      ]
    });
  },

  getDefaultPair: function() {
    return { from: '', to: '', status: RQ.RULE_STATUS.INACTIVE };
  },

  getPairs: function() {
    return this.get('pairs');
  },

  setPair: function(index, pair) {
    var pairs = this.getPairs();
    pairs[index] = pair;
  }
});