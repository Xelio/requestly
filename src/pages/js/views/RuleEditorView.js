var RuleEditorView = Backbone.View.extend({
  /* Default element in which view will be rendered */
  el: '.content',

  events: {

  },

  render: function(options) {
    if (options.el) {
      this.$el = $(options.el);
    }

    if (!options.id) {
      var markup = _.template(options.template, {});
      this.$el.html(markup);
    }
  }
});