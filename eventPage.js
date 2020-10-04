// Define what the context menu item will look like:
// - the id of the menu item
// - the name (how it appears to the end user)
// - the contexts for when it will appear
var contextMenuItem ={
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

function isInt(value){
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value,10));
}

// listen for the click event on the context menu
chrome.contextMenus.onClicked.addListener(function(clickData){
    // if the user clicked on the spendMoney item, and they have
    // text selected
    if(clickData.menuItemId == "spendMoney" && clickData.selectionText)
    {
        // if the selected data is an integer
        if(isInt(clickData.selectionText))
        {
            // get the total spend and the spend limit
            // if a total already exists, add already existed total
            // to the total spend to be added.  If there is not a
            // currently existing toal, then add to the total using the
            // selected text
            chrome.storage.sync.get(['total','limit'], function(budget){
                var newTotal = 0;
                if (budget.total){
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total': newTotal},function(){
                    // send notification if the newly appended value is over the
                    // defined spending limit
                    if (newTotal >= budget.limit)
                    {
                        var notifOptions = {
                            type: 'basic',
                            iconUrl: 'icon48.png',
                            title: 'Limit reached!',
                            message: "Uh-oh.  Looks like you've reached your spending limit!"
                        };
                        chrome.notifications.create('limitNotif',notifOptions);
                    }
                });
            });
        }
    }
});
// when the value of the total spend changes,
// show a badge over top of the extension icon, so that a user
// can quickly see what the total spend is, at a glance
chrome.storage.onChanged.addListener(function(changes,storageName){
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});

});