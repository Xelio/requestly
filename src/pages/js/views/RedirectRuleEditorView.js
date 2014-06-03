var RuleEditorView = Backbone.View.extend({

  el: '.content',

  Model: RedirectRuleModel,

  events: {
    'keyup .rule-name-input': 'updateRuleName',
    'keyup .rule-description': 'updateRuleDescription',
    'keyup .source-url-input': 'updateRuleSourceUrl',
    'keyup .destination-url-input': 'updateRuleDestinationUrl',
    'click #save-redirect-rule': 'saveRule'
  },

  initialize: function(options) {
    options = options || {};
    this.model = new (options.model || this.Model);
  },

  render: function(options) {
    if (options.el) {
      this.$el = $(options.el);
    }

    var markup = _.template(options.template, this.model.toJSON());
    this.$el.html(markup);
  },

  updateRuleName: function(event) {
    this.model.setName(event.target.value);
  },

  updateRuleDescription: function(event) {
    this.model.setDescription(event.target.value);
  },

  updateRuleSourceUrl: function(event) {
    this.model.setSource(event.target.value);
  },

  updateRuleDestinationUrl: function(event) {
    this.model.setDestination(event.target.value);
  },

  saveRule: function() {
    this.model.setCreationDate(this.model.getTimestamp());
    this.model.save();
  }
});