var BG = {
  Methods: {}
};

BG.Methods.setupRules = function() {
  BG.Methods.registerListeners();
};

BG.Methods.matchesRedirectRule = function(rule, url) {
  var source = rule.source,
    operator = source.operator,
    value;

  for (var i = 0; i < source.values.length; i++) {
    value = source.values[i];

    if (operator === RQ.RULE_OPERATORS.EQUALS && value === url) {
      return true;
    }

    if (operator === RQ.RULE_OPERATORS.CONTAINS && url.indexOf(value) !== -1) {
      return true;
    }
  }

  return false;
};

BG.Methods.registerListeners = function() {
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      for (var i = 0; i < StorageService.records.length; i++) {
        var rule = StorageService.records[i];

        if (rule.status !== RQ.RULE_STATUS.ACTIVE) {
          continue;
        }

        // Setup Redirect Rule
        switch(rule.ruleType) {
          case RQ.RULE_TYPES.REDIRECT:
            if (BG.Methods.matchesRedirectRule(rule, details.url)) {
              return { redirectUrl: rule.destination };
            }
            break;
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

StorageService.getRecords({ callback: BG.Methods.setupRules });
