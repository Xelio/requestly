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
    var objectKey = ruleType + '_' + date,
      that = this;

    BG.StorageService.getRecord(objectKey, function(modelJSON) {
      modelJSON = modelJSON[objectKey];
      var model = new that.ruleModelMap[ruleType.toUpperCase()](modelJSON);
      RQ.Views.ruleEditView.render({template: RQ.Templates.RULE_EDITOR_TEMPLATE, el: '.content', model: model });
    });
  }
});