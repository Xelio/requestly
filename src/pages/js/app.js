var RQ = RQ || {},
  BG = chrome.extension.getBackgroundPage();

RQ.Templates = {
  RULE_INDEX_TEMPLATE: $('#rule-index-template').html(),
  RULE_CARDS_TEMPLATE: $('#rule-cards-template').html(),
  REDIRECT_RULE_EDITOR_TEMPLATE: $('#redirect-rule-editor-template').html(),
  CANCEL_RULE_EDITOR_TEMPLATE: $('#cancel-rule-editor-template').html(),
  REPLACE_RULE_EDITOR_TEMPLATE: $('#replace-rule-editor-template').html()
};

RQ.init = function(options) {
  this.Models = {};

  this.Collections = {};

  this.showView = function(view, options) {
    if (this.currentView) {
      this.currentView.close();
    }

    this.currentView = view;
    this.currentView.render(options);

    $('#content').html(this.currentView.el);
  };

  this.router = new RQ.Router();

  Backbone.history.start();
};

Backbone.View.prototype.close = function() {
  this.remove();
  this.unbind();
};