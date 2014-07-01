RQ.Router = Backbone.Router.extend({
  routes: {
    '': 'showRulesList',
    'new/:type': 'showRuleCreator',
    'edit/:type/:date': 'showRuleEditor'
  },

  ruleModelMap: {
    BASE: BaseRuleModel,
    REDIRECT: RedirectRuleModel,
    CANCEL: CancelRuleModel
  },

  getRuleView: function(ruleType) {
    var ruleViewMap = {
      REDIRECT: RQ.Views.redirectRuleEditView,
      CANCEL: RQ.Views.cancelRuleEditView
    };

    return ruleViewMap[ruleType];
  },

  getRuleEditorTemplate: function(ruleType) {
    var ruleTemplateMap = {
      REDIRECT: RQ.Templates.REDIRECT_RULE_EDITOR_TEMPLATE,
      CANCEL: RQ.Templates.CANCEL_RULE_EDITOR_TEMPLATE
    };

    return ruleTemplateMap[ruleType];
  },

  showRulesList: function() {
    RQ.Views.ruleIndexView.render({template: RQ.Templates.RULE_INDEX_TEMPLATE, el: '.content'});
  },

  showRuleCreator: function(ruleType) {
    var ruleTypeUpperCase = ruleType.toUpperCase(),
      template = this.getRuleEditorTemplate(ruleTypeUpperCase),
      editorView = this.getRuleView(ruleTypeUpperCase),
      model = new this.ruleModelMap[ruleTypeUpperCase]();

    editorView.render({template: template, el: '.content', model: model });
  },

  showRuleEditor: function(ruleType, date) {
    var objectKey = ruleType + '_' + date,
      that = this;

    BG.StorageService.getRecord(objectKey, function(modelJSON) {
      var ruleTypeUpperCase = ruleType.toUpperCase(),
        template = that.getRuleEditorTemplate(ruleTypeUpperCase),
        editorView = that.getRuleView(ruleTypeUpperCase),
        model;

      modelJSON = modelJSON[objectKey];
      model = new that.ruleModelMap[ruleTypeUpperCase](modelJSON);

      editorView.render({template: template, el: '.content', model: model });
    });
  }
});