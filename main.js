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

