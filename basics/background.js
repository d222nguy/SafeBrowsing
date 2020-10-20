var pluginOn = false;
(function() {

function blur() {
    
    chrome.tabs.query({}, function(tabs) { //set of tabs
        for (var i = 0; i < tabs.length; i++){
            //mute the tab
            chrome.tabs.update(tabs[i].id, {"muted": true});
            //blur the tab
            chrome.tabs.executeScript(tabs[i].id, 
                {
                    code: 'document.body.style.WebkitFilter = ' + '"grayscale('+80+'%) blur('+25+'px)"'
                });
        }
        chrome.browserAction.setIcon({path: "icona32.png"});
    });
}

function unblur() {
  chrome.tabs.query({}, function(tabs) {
           for (var i = 0; i < tabs.length; i++) {
             chrome.tabs.update(tabs[i].id, {"muted": false});
             chrome.tabs.executeScript(tabs[i].id, {
             code: 'document.body.style.WebkitFilter = ' + '"grayscale(0%) blur(0px)"'
           });
           }
           //chrome.browserAction.setIcon({path:"blockicon.png"});
       });
}

chrome.browserAction.onClicked.addListener(function(tab) {
          if (pluginOn) {
            pluginOn = false;
            unblur();
          } else {
            pluginOn = true;
            blur();
          }
        //   chrome.tabs.create({'url': chrome.extension.getURL('VnExpress.html')}, function(tab) {
        //     //tab opened

        var newURL = "http://vnexpress.net";
        chrome.tabs.create({ url: newURL });
    
});

chrome.idle.onStateChanged.addListener(function(state) {
  if (state == "locked") {
  pluginOn = true;
  blur();
}
});

})();