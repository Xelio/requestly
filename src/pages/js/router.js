RQ.Router = Backbone.Router.extend({
  routes: {
    '': 'showRulesList',
    'selectRule': 'showRuleCardsView',
    'new/:type': 'showRuleCreator',
    'edit/:id': 'showRuleEditor'
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

  showRulesList: function() {
    var ruleIndexView = new RuleIndexView();
    RQ.showView(ruleIndexView, { update: true });
  },

  showRuleCardsView: function() {
    var ruleCardsView = new RuleCardsView();
    RQ.showView(ruleCardsView);
  },

  showRuleCreator: function(ruleType) {
    var ruleTypeUpperCase = ruleType.toUpperCase(),
      editorView = new this.ruleViewMap[ruleTypeUpperCase]();

    RQ.showView(editorView);
  },

  showRuleEditor: function(ruleId) {
    var that = this;

    BG.StorageService.getRecord(ruleId, function(modelJSON) {
      var ruleModelJSON = modelJSON[ruleId],
        ruleTypeUpperCase = ruleModelJSON.ruleType.toUpperCase(),
        editorView = new that.ruleViewMap[ruleTypeUpperCase](),
        model;

      model = new that.ruleModelMap[ruleTypeUpperCase](ruleModelJSON);

      RQ.showView(editorView, { model: model });
    });
  }
});