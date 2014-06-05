var RuleIndexView = Backbone.View.extend({

  el: '.content',

  RulesCollection: '',

  events: {},

  render: function(options) {
    if (options.el) {
      this.$el = $(options.el);
    }

    var markup = _.template(options.template, {});
    this.$el.html(markup);
  }
});