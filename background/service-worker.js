let interval = 15;
var prev_msg = "";
var counter  = 0;

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        let tab = sender.tab;
        if (message.command != prev_msg || counter == interval) {
            if (message.command == "prev") {
                chrome.windows.update(tab.index - 1, {focused: true})
            }
            if (message.command == "next") {
                chrome.windows.update(tab.index + 1, {focused: true})
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
    }
);
