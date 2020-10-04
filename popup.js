// When the user clicks on the spendAmount button
// the Chrome Storage API gets the "total" property of
// the budget object, if it already exists.

// If it does exist, then the new total is updated with the current
// budget value total.  If it does not exist, it is set to 0

// Store the value of the Amount box in the amount variable, and
// add that to the new total, when the Submit button is clicked

// Then we need to set this new value, overwriting what may have
// already been stored in the Chrome storage

$(function(){
    // when the Chrome extension is opened, if the budget
    // object already exists, display that in the extension UI

    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    })

    // on click, the current total and limit values are populated,
    // if they exist
    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total','limit'],function(budget){
            var newTotal = 0;
            if(budget.total){
                newTotal += parseInt(budget.total);
            }
            var amount = $('amount').val();
            if(amount){
                newTotal += parseInt(amount);
            }
            // The user is sent a notification that they have reached their
            // desired spending limit
            chrome.storage.sync.set({'total': newTotal},function(){
                if(amount && newTotal >= budget.limit){
                    var notifOptions = {
                        type: 'basic',
                        iconURL: 'icon48.png',
                        title: 'Limit reached!',
                        message: "Uh-oh.  Looks like you've reached your spending limit!"
                    };
                    chrome.notifications.create('limitNotif',notifOptions);
                }
            });
            // update the current spent total,
            // and clear the input box of the user's reported value
            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});