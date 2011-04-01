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
    humantxtButton.removeAttribute("source");

    var uri = content.document.location;
    
    var req = new XMLHttpRequest();
    req.open('GET', uri + "/humans.txt", true);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
         if(req.status == 200)
          var htxt = req.responseText;
      }
    };
    req.send(null);
    

    if (htxt.length > 0) {
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
