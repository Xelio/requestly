var RQ = RQ || {},
  BG = chrome.extension.getBackgroundPage();

RQ.init = function(options) {
  this.Templates = {
    REDIRECT_RULE_EDITOR_TEMPLATE: $('#redirect-rule-editor-template').html(),
    CANCEL_RULE_EDITOR_TEMPLATE: $('#cancel-rule-editor-template').html(),
    RULE_INDEX_TEMPLATE: $('#rule-index-template').html()
  };

  this.Models = {

  };

  this.Collections = {

  };

  this.Views = {
    redirectRuleEditView: new RedirectRuleEditorView(),
    cancelRuleEditView: new CancelRuleEditorView(),
    ruleIndexView: new RuleIndexView()
  };

  this.router = new RQ.Router();

  Backbone.history.start();
};