RQ.Router = Backbone.Router.extend({
  routes: {
    '': 'showRulesList',
    'new/:type': 'showRuleCreator',
    'edit/:type/:date': 'showRuleEditor'
  },

  ruleModelMap: {
    BASE: BaseRuleModel,
    REDIRECT: RedirectRuleModel
  },

  showRulesList: function() {
    RQ.Views.ruleIndexView.render({template: RQ.Templates.RULE_INDEX_TEMPLATE, el: '.content'});
  },

  showRuleCreator: function(ruleType) {
    var model = new this.ruleModelMap[ruleType.toUpperCase()]();
    RQ.Views.ruleEditView.render({template: RQ.Templates.RULE_EDITOR_TEMPLATE, el: '.content', model: model });
  },

  showRuleEditor: function(ruleType, date) {
    //TODO: fetch model here and render the view
    var model = new RQ.RULE_MODEL(ruleType.toUpperCase())();
    RQ.Views.ruleEditView.render({template: RQ.Templates.RULE_EDITOR_TEMPLATE, el: '.content', model: model });
  }
});