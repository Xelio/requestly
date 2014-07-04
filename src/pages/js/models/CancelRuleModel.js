var CancelRuleModel = BaseRuleModel.extend({
  defaults: function() {
    return _.extend(BaseRuleModel.prototype.defaults(), {
      source: {
        key: RQ.RULE_KEYS.URL,
        operator: RQ.RULE_OPERATORS.EQUALS,
        values: ['']
      },
      ruleType: RQ.RULE_TYPES.CANCEL
    });
  },

  getSource: function() {
    return this.get('source');
  },

  setSourceOperator: function(operator) {
    var sourceObject = this.getSource();
    sourceObject.operator = operator;
    this.set('source', sourceObject);
  },

  setSourceValue: function(value, index) {
    var sourceObject = this.getSource();
    sourceObject.values[index] = value;
    this.set('source', sourceObject);
  }
});