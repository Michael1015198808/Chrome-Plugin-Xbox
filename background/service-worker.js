let interval = 15;
var prev_msg = "";
var counter  = 0;

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        let tab = sender.tab;
        if (message.command != prev_msg || counter == interval) {
            if (message.command == "prev") {
                chrome.tabs.query({index: tab.index - 1}, (tabs) => {
                    if (tabs.length > 0) {
                        chrome.tabs.update(tabs[0].id, {active: true});
                    }
                })
            }
            if (message.command == "next") {
                chrome.tabs.query({index: tab.index + 1}, (tabs) => {
                    chrome.tabs.update(tabs[0].id, {active: true});
                })
            }
            if (message.command == "close") {
                chrome.tabs.remove(tab.id);
            }
        }
        if (message.command != prev_msg) {
            prev_msg = message.command;
        } else {
            counter += 1;
            if (counter > interval) {
                counter = 0;
            }
        }
        sendResponse({farewell: message.command + tab.index});
    }
);
