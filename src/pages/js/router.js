RQ.Router = Backbone.Router.extend({
  routes: {
    '': 'showRulesList',
    'new': 'showRuleEditor'
  },

  showRulesList: function() {
    alert('Rules List');
  },

  showRuleEditor: function() {
    alert('Rules Editor will be displayed here');
  }
});