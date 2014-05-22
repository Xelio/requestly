// http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js
// http://documentcloud.github.io/underscore/underscore.js

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
  chrome.tabs.create({'url': chrome.extension.getURL('pages/f.html')}, function(tab) {
    // Tab opened.
  });
});