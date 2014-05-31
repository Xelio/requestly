var RQ = {
  init: function(options) {
    this.Templates = {
      RULE_EDITOR_TEMPLATE: $('#rule-editor-template').html()
    };

    this.Models = {

    };

    this.Collections = {

    };

    this.Views = {
      ruleEditView: new RuleEditorView()
    };

    this.router = new RQ.Router();

    Backbone.history.start();
  }
};