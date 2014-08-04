var ReplaceRuleModel = BaseRuleModel.extend({
  defaults: function() {
    return _.extend(BaseRuleModel.prototype.defaults(), {
      pairs: [{
        from: '',
        to: '',
        status: RQ.RULE_STATUS.INACTIVE
      }],
      ruleType: RQ.RULE_TYPES.REPLACE
    });
  }
});