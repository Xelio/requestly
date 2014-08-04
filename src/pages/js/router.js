RQ.Router = Backbone.Router.extend({
  routes: {
    '': 'showRulesList',
    'selectRule': 'showRuleCardsView',
    'new/:type': 'showRuleCreator',
    'edit/:type/:date': 'showRuleEditor'
  },

  ruleModelMap: {
    REDIRECT: RedirectRuleModel,
    CANCEL: CancelRuleModel,
    REPLACE: ReplaceRuleModel
  },

  ruleViewMap: {
    REDIRECT: RedirectRuleEditorView,
    CANCEL: CancelRuleEditorView,
    REPLACE: ReplaceRuleEditorView
  },

  ruleTemplateMap: {
    REDIRECT: RQ.Templates.REDIRECT_RULE_EDITOR_TEMPLATE,
    CANCEL: RQ.Templates.CANCEL_RULE_EDITOR_TEMPLATE,
    REPLACE: RQ.Templates.REPLACE_RULE_EDITOR_TEMPLATE
  },

  showRulesList: function() {
    var ruleIndexView = new RuleIndexView();
    RQ.showView(ruleIndexView, { template: RQ.Templates.RULE_INDEX_TEMPLATE });
  },

  showRuleCardsView: function() {
    var ruleCardsView = new RuleCardsView();
    RQ.showView(ruleCardsView, { template: RQ.Templates.RULE_CARDS_TEMPLATE });
  },

  showRuleCreator: function(ruleType) {
    var ruleTypeUpperCase = ruleType.toUpperCase(),
      template = this.ruleTemplateMap[ruleTypeUpperCase],
      editorView = new this.ruleViewMap[ruleTypeUpperCase](),
      model = new this.ruleModelMap[ruleTypeUpperCase]();

    RQ.showView(editorView, { template: template });
  },

  showRuleEditor: function(ruleType, date) {
    var objectKey = ruleType + '_' + date,
      that = this;

    BG.StorageService.getRecord(objectKey, function(modelJSON) {
      var ruleTypeUpperCase = ruleType.toUpperCase(),
        template = that.ruleTemplateMap[ruleTypeUpperCase],
        editorView = new that.ruleViewMap[ruleTypeUpperCase](),
        model;

      modelJSON = modelJSON[objectKey];
      model = new that.ruleModelMap[ruleTypeUpperCase](modelJSON);

      RQ.showView(editorView, {template: template, model: model });
    });
  }
});