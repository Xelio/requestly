var RuleCardsView = Backbone.View.extend({

  Template: function() {
    return RQ.Templates.RULE_CARDS_TEMPLATE;
  },

  events: {
    'click .select-icon': 'selectRule'
  },

  render: function(options) {
    if (options && options.model && options.model instanceof Backbone.Model) {
      this.model = options.model;
    }

    var markup = _.template(this.Template(), { rule: this.model });
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