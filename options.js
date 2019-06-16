$(function() {
    chrome.storage.sync.get('domains', function(result) {
        if(result.domains !== 'undefined' && result.domains instanceof Array) { 
            var domains = result.domains;
            var ul = '<ul>';

            if (!domains.length) {
                ul += '<li>No Domains are currently blacklisted</li>';
            }

            domains.forEach(val => {
                var li = '<li><span class="list-item" data-domain="' + val + '">' + val + '</span></li>';
                ul += li;
            })
            
            ul += '</ul>'
            $('#blacklisted').append(ul);
        }
    });

    $('#blacklisted').on('click', '.list-item', function() {
        var self = $(this);
        var domain = self.data('domain');
        self.parents('li').hide();

        chrome.storage.sync.get('domains', function(result) {
            if(result.domains !== 'undefined' && result.domains instanceof Array) { 
                var index = result.domains.indexOf(domain);
                result.domains.splice(index, 1);
                chrome.storage.sync.set({ 'domains': result.domains }); 
            }
        });
    });
})