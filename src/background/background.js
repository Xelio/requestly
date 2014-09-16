var BG = {
  Methods: {}
};

BG.Methods.setupRules = function() {
  BG.Methods.registerListeners();
};

BG.Methods.matchUrlWithRule = function(rule, url) {
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

BG.Methods.matchUrlWithReplaceRulePairs = function(rule, url) {
  var pairs = rule.pairs,
    pair = null,
    matchRegExp = null,
    from = null,
    resultingUrl = null;

  for (var i = 0; i < pairs.length; i++) {
    pair = pairs[i];
    pair.from = pair.from || '';

    // When string pair.from looks like a RegExp, create a RegExp object from it
    matchRegExp = pair.from.match(/^\/(.+)\/(|i|g|ig|gi)$/);
    from = matchRegExp ? new RegExp(matchRegExp[1], matchRegExp[2]) : pair.from;

    if (url.match(from)) {
      console.log('matched');
      resultingUrl = url.replace(from, pair.to);
      break;
    }
  }

  return resultingUrl;
};

BG.Methods.registerListeners = function() {
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      for (var i = 0; i < StorageService.records.length; i++) {
        var rule = StorageService.records[i];

        if (rule.status !== RQ.RULE_STATUS.ACTIVE) {
          continue;
        }

        switch(rule.ruleType) {
          case RQ.RULE_TYPES.REDIRECT:
            if (BG.Methods.matchUrlWithRule(rule, details.url)) {
              return { redirectUrl: rule.destination };
            }
            break;

          /**
            * In case of Cancel Request, destination url is 'javascript:'
            */
          case RQ.RULE_TYPES.CANCEL:
            if (BG.Methods.matchUrlWithRule(rule, details.url)) {
              return { redirectUrl: 'javascript:' };
            }
            break;

          case RQ.RULE_TYPES.REPLACE:
            var resultingUrl = BG.Methods.matchUrlWithReplaceRulePairs(rule, details.url);
            if (resultingUrl !== null) {
              return { redirectUrl: resultingUrl };
            }
            break;

          default:
            console.log('Unknown rule type in rule:', rule);
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
