var RQ = RQ || {};

RQ.init = function(options) {
  this.Templates = {
    RULE_EDITOR_TEMPLATE: $('#rule-editor-template').html(),
    RULE_INDEX_TEMPLATE: $('#rule-index-template').html()
  };

  this.Models = {

  };

  this.Collections = {

  };

  this.Views = {
    ruleEditView: new RuleEditorView(),
    ruleIndexView: new RuleIndexView()
  };

  this.router = new RQ.Router();

  Backbone.history.start();
};