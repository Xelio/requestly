var RQ = {
  init: function(options) {
    // Create models, collections, views here
    this.router = new RQ.Router();
    Backbone.history.start();
  }
};