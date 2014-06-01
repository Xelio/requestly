var BG = {
  Methods: {}
};

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url === 'http://www.google.com/') {
      console.log('Redirection Successful');
      return {redirectUrl: 'http://cricket.yahoo.com'};
    }
  },
  {
    urls: ["<all_urls>"]
  },
  ["blocking"]
);

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({'url': chrome.extension.getURL('src/pages/index.html')}, function(tab) {
    // Tab opened.
  });
});