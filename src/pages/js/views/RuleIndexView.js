var RuleIndexView = Backbone.View.extend({

  el: '.content',

  events: {},

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
  }
});