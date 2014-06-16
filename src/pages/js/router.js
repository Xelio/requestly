RQ.Router = Backbone.Router.extend({
  routes: {
    '': 'showRulesList',
    'new': 'showRuleEditor',
    'edit/:type/:name/:date': 'showRuleEditor'
  },

  showRulesList: function() {
    RQ.Views.ruleIndexView.render({template: RQ.Templates.RULE_INDEX_TEMPLATE, el: '.content'});
  },

  showRuleEditor: function(ruleType, name, date) {
    if (ruleType && name && date) {
      console.log(ruleType, name, date);
    } else {
      RQ.Views.ruleEditView.render({template: RQ.Templates.RULE_EDITOR_TEMPLATE, el: '.content' });
    }
  }
});