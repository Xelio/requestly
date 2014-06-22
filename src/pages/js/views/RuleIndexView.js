var RuleIndexView = Backbone.View.extend({

  el: '.content',

  events: {
    'click .ruleName': 'showRuleEditor',
    'click .toggle-status-icon': 'toggleStatus',
    'click .delete-rule-icon': 'deleteRule'
  },

  initialize: function() {
    this.rulesCollection = new RulesCollection();
  },

  render: function(options) {
    var that = this;

    if (options.el) {
      this.$el = $(options.el);
    }

    this.rulesCollection.fetchRules({
      success: function(rules) {
        var markup = _.template(options.template, { rules: rules.models });
        that.$el.html(markup);
      }
    });
  },

  showRuleEditor: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      creationDate = $ruleItemRow.attr('data-creationDate'),
      ruleType = $ruleItemRow.attr('data-type');

    RQ.router.navigate('/edit/' + ruleType + '/' + creationDate, { trigger: true });
  },

  toggleStatus: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      ruleType = $ruleItemRow.attr('data-type'),
      objectKey = ruleType + '_' + $ruleItemRow.attr('data-creationDate'),
      that = this,
      ruleModel;

    //TODO: Get Model from Collection instead of fetching from DB
    BG.StorageService.getRecord(objectKey, function(modelJSON) {
      modelJSON = modelJSON[objectKey];
      var model = new RQ.router.ruleModelMap[ruleType.toUpperCase()](modelJSON),
        currentStatus = model.getStatus();

      if (currentStatus === RQ.RULE_STATUS.ACTIVE) {
        model.setStatus(RQ.RULE_STATUS.INACTIVE);
      } else {
        model.setStatus(RQ.RULE_STATUS.ACTIVE);
      }

      //TODO: Figure out a way to update the specific model instead of whole collection
      model.save({ callback:function() {
        that.render({ template: RQ.Templates.RULE_INDEX_TEMPLATE });
      }});

    });

    return false;
  },

  deleteRule: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      objectKey = $ruleItemRow.attr('data-type') + '_' + $ruleItemRow.attr('data-creationDate'),
      that = this;

    if (window.confirm(RQ.MESSAGES.DELETE_RULE)) {
      BG.StorageService.removeRecord(objectKey, function() {
        that.render({ template: RQ.Templates.RULE_INDEX_TEMPLATE });
      });
    }

    return false;
  }
});