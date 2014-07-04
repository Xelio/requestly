var RuleCardsView = Backbone.View.extend({
  events: {
    'click .select-icon': 'selectRule'
  },

  render: function(options) {
    if (options.model && options.model instanceof Backbone.Model) {
      this.model = options.model;
    }

    var markup = _.template(options.template, { rule: this.model });
    $(this.el).html(markup);
  },

  selectRule: function(event) {
    var $panel = $(event.target).parents('.panel'),
      ruleEditorRoute = $panel.attr('data-target');

    this.$el.find('.panel').removeClass('selected');
    $panel.toggleClass('selected');

    this.$el.find('.create-rule-button')
      .attr({ href: ruleEditorRoute, disabled: false });
  }
});