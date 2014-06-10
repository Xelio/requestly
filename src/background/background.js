var BG = {
  Methods: {},
  activeRules: []
};

BG.Methods.setupRules = function(rules) {
  // Create only active rules
  BG.activeRules = rules.filter(function(rule) {
    return rule.status === RQ.RULE_STATUS.ACTIVE;
  });

  BG.Methods.registerListeners(BG.activeRules);
};

BG.Methods.addNewRule = function(rule) {
  if (rule.status === RQ.RULE_STATUS.ACTIVE) {
    BG.activeRules.push(rule);
  }
};

BG.Methods.registerListeners = function(activeRules) {
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      for (var i = 0; i < activeRules.length; i++) {
        var rule = activeRules[i];

        // Setup Redirect Rule
        if (rule.ruleType === RQ.RULE_TYPES.REDIRECT && details.url === rule.source) {
          return { redirectUrl: rule.destination };
        }
      }
    },
    {
      urls: ["<all_urls>"]
    },
    ["blocking"]
  );
};

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({'url': chrome.extension.getURL('src/pages/index.html')}, function(tab) {
    // Tab opened.
  });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (StorageService.DB === chrome.storage[namespace]) {
    for (key in changes) {
      var change = changes[key];

      /* Add Rule operation */
      if (typeof change.newValue !== 'undefined' && typeof change.oldValue === 'undefined') {
        BG.Methods.addNewRule(change.newValue);
      }
    }
  }
});

StorageService.getRecords({ callback: BG.Methods.setupRules });
