RQ.Router = Backbone.Router.extend({
  routes: {
    '': 'showRulesList',
    'new': 'showRuleEditor'
  },

  showRulesList: function() {
    alert('Rules List');
  },

  showRuleEditor: function() {
    RQ.Views.ruleEditView.render( {template: '#rule-editor-template', el: '.content' });
  }
});