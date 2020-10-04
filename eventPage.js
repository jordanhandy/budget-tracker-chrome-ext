// Define what the context menu item will look like:
// - the id of the menu item
// - the name (how it appears to the end user)
// - the contexts for when it will appear
var contextMenuItem ={
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem)