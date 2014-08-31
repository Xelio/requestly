var RuleIndexView = Backbone.View.extend({

  Template: function() {
    return RQ.Templates.RULE_INDEX_TEMPLATE;
  },

  events: {
    'click .ruleName': 'showRuleEditor',
    'click .toggle-status-icon': 'toggleStatus',
    'click .delete-rule-icon': 'deleteRule',
    'click .btn-export': 'exportAllRules',
    'click .btn-import': 'importAllRules'
  },

  initialize: function() {
    this.rulesCollection = new RulesCollection();

    this.listenTo(this.rulesCollection, 'loaded', this.render);
    this.listenTo(this.rulesCollection, 'add', this.render);
    this.listenTo(this.rulesCollection, 'change', this.render);
    this.listenTo(this.rulesCollection, 'remove', this.render);
  },

  updateCollection: function() {
    this.rulesCollection.fetchRules();
  },

  render: function(options) {
    if (options && options.update) {
      // updateCollection will trigger 'loaded' event which will render the view
      this.updateCollection();
    } else {
      var markup = _.template(this.Template(), { rules: this.rulesCollection.models });
      this.$el.html(markup);
    }
  },

  showRuleEditor: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      id = $ruleItemRow.data('id');

    RQ.router.navigate('/edit/' + id, { trigger: true });
  },

  toggleStatus: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      ruleModel = this.rulesCollection.get($ruleItemRow.data('id'));

    if (ruleModel.getStatus() === RQ.RULE_STATUS.ACTIVE) {
      ruleModel.setStatus(RQ.RULE_STATUS.INACTIVE);
    } else {
      ruleModel.setStatus(RQ.RULE_STATUS.ACTIVE);
    }

    ruleModel.save();
    return false;
  },

  deleteRule: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      ruleModel = this.rulesCollection.get($ruleItemRow.data('id')),
      that = this;

    if (window.confirm(RQ.MESSAGES.DELETE_RULE)) {
      that.rulesCollection.remove(ruleModel);
      ruleModel.remove();
    }

    return false;
  },

  exportAllRules: function() {
    var rules = _.pluck(this.rulesCollection.models, 'attributes');
    Backbone.trigger('file:save', JSON.stringify(rules), 'requestly_rules');
  },

  importAllRules: function() {
    var that = this;

    Backbone.trigger('file:load', function(data) {
      var rules = JSON.parse(data);
      _.each(rules, function(rule) {
        var ruleModel = new BaseRuleModel(rule);
        ruleModel.save();
      });
      that.rulesCollection.add(rules, { remove: false });
    });
  }
});