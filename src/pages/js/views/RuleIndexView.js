var RuleIndexView = Backbone.View.extend({

  el: '.content',

  events: {
    'click .rule-item-row': 'showRuleEditor'
  },

  initialize: function() {
    this.rulesCollection = new RulesCollection();
  },

  render: function(options) {
    var that = this;

    if (options.el) {
      this.$el = $(options.el);
    }

    this.rulesCollection.fetchRules({
      success: function(rules) {
        var markup = _.template(options.template, { rules: rules.models });
        that.$el.html(markup);
      }
    });
  },

  showRuleEditor: function(event) {
    var $target = $(event.currentTarget),
      creationDate = $target.attr('data-creationDate'),
      ruleType = $target.attr('data-type');

    RQ.router.navigate('/edit/' + ruleType + '/' + creationDate, { trigger: true });
  }
});