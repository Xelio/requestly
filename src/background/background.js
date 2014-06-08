var BG = {
  Methods: {},
  activeRules: []
};

BG.Methods.setupRules = function(rules) {
  // Create only active rules
  BG.activeRules = rules.filter(function(rule) {
    return rule.status === RQ.RULE_STATUS.ACTIVE;
  });

  if (BG.activeRules.length > 0) {
    BG.Methods.registerListeners(BG.activeRules);
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

StorageService.getRecords({ callback: BG.Methods.setupRules });

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({'url': chrome.extension.getURL('src/pages/index.html')}, function(tab) {
    // Tab opened.
  });
});