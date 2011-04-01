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
    var humantxtButton = document.getElementById("humanstxt-button");
    var uri = window.content.location.href;

    humantxtButton.removeAttribute("source");

    var req = new XMLHttpRequest();
    req.open('GET', uri + "/humans.txt", false);
    req.send(null);
    if(req.status == 200)
    var txt = req.responseText;
    

    if (txt.length > 0) {
      humanstxtButton.collapsed = false;
      feedButton.setAttribute("tooltiptext", src);
    } else {
      humanstxtButton.collapsed = true;
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
