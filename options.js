// This is for Options page (when you right-click on a given extension)
// When the options page is entered, grab the Limit information that already
// exists in Chrome storage (if there is one)

// When a user enters a value in the input box and chooses to save the
// limit, the chrome storage value is set to the new value the user
// specified, and the page is closed

$(function(){

    chrome.storage.sync.get('limit',function(budget){
        $('#limit').val(budget.limit);
    })
    $('#saveLimit').click(function(){
        var limit = $('#limit').val();
        if(limit){
            chrome.storage.sync.set({'limit': limit},function(){
                close();
            })
        }
    });
    // The user is sent a notification that their spending total
    // has been reset to zero
    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total': 0},function(){
            var notifOptions = {
                type: 'basic',
                iconURL: 'icon48.png',
                title: 'Total Reset!',
                message: "Your spending total has been reset to zero (0)"
            };
            chrome.notifications.create('limitNotif',notifOptions);
        });
    });
});