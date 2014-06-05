RQ.Router = Backbone.Router.extend({
  routes: {
    '': 'showRulesList',
    'new': 'showRuleEditor'
  },

  showRulesList: function() {
    RQ.Views.ruleIndexView.render({template: RQ.Templates.RULE_INDEX_TEMPLATE, el: '.content'});
  },

  showRuleEditor: function() {
    RQ.Views.ruleEditView.render({template: RQ.Templates.RULE_EDITOR_TEMPLATE, el: '.content' });
  }
});