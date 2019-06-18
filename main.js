blacklistDomain = function(e){
  var domain = e.linkUrl.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/im)[0];
  
  chrome.storage.sync.get('domains', function(result) {
    if(result.domains !== 'undefined' && result.domains instanceof Array) { 
      result.domains.push(domain);
    } else {
      result.domains = [ domain ];
    }
    chrome.storage.sync.set({ 'domains': result.domains }); 
    alert(`${ domain } added to blacklist`);
  });
};

chrome.contextMenus.create({
  title: "Blacklist Domain",
  contexts:["link"],
  onclick: blacklistDomain
});

var _queryString = '';

chrome.webRequest.onHeadersReceived.addListener(function (details) {
  if (_queryString == "") {
    _queryString += '+-site:'
    chrome.storage.sync.get('domains', function(result) {
      var blacklist = result.domains;
      if(blacklist !== null && blacklist !== undefined) {
        _queryString += blacklist.join('+-site:');
      }
    });   
    chrome.tabs.reload();
  }
}, {
  urls: ['*://www.google.com/*']
}, ["blocking", "responseHeaders"]);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
  if(_queryString !== ''){
    return {
      redirectUrl: details.url.replace(/q(?:\\)?=([^&]+)/, '$&' + _queryString)
    };
  }
},
{ urls: ['*://www.google.com/*'] },
['blocking']);










