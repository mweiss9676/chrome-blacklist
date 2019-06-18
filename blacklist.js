$(function() {
    if(window.location.href.indexOf('www.google.chrome')){
        chrome.storage.sync.get(['domains'], function(result) {
            var anchors = $('.g a');
            var blacklist = result.domains;
            
            anchors.each((ind, val) => {
                var link = $(val);
                var href = link[0].hostname;

                var exists = blacklist.findIndex(b => b.includes(href)) > -1;
                if(exists){
                    link.parents('.g').hide();
                }
            })
        });
    }  
    
    $('form[action="/search"]').submit(function(e){
        e.preventDefault();

    })
})







