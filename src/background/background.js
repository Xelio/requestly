var BG = {
  Methods: {}
};

BG.Methods.setupRules = function() {
  BG.Methods.registerListeners();
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

StorageService.getRecords({ callback: BG.Methods.setupRules });
