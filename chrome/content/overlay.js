var humanstxt = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("humanstxt-strings");
    var appcontent = document.getElementById("appcontent");
    
    appcontent.addEventListener("pageshow", humanstxt.onPageLoad, true);
    
    var container = gBrowser.tabContainer;  
    container.addEventListener("TabSelect", humanstxt.onPageLoad, false);  
        
  },

  onPageLoad: function(aEvent) {
    var feedButton = document.getElementById("humanstxt-button");
    var feeds = gBrowser.selectedBrowser.feeds;
    
    feedButton.removeAttribute("feed");
    
    if (feeds && feeds.length > 0) {      
      feedButton.collapsed = false;
        
      if (feeds.length == 1) {
        feedButton.setAttribute("feed", feeds[0].href);
      }  
    } else {
      feedButton.collapsed = true;
    }
  },

  onFeedButtonClick: function(event) {
    event.stopPropagation();
    
    if (event.target.hasAttribute("feed") &&
        event.eventPhase == Event.AT_TARGET &&
        (event.button == 0 || event.button == 1)) {
        FeedHandler.subscribeToFeed(null, event);
    }

  },  
};

window.addEventListener("load", function () { humanstxt.onLoad(); }, false);
