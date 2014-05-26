var RQ = {
  init: function(options) {

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