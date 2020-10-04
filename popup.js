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

    $('#spendAmount').click(function(){
        chrome.storage.sync.get('total',function(budget){
            var newTotal = 0;
            if(budget.total){
                newTotal += parseInt(budget.total);
            }
            var amount = $('amount').val();
            if(amount){
                newTotal += parseInt(amount);
            }
            chrome.storage.sync.set({'total': newTotal});
            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});