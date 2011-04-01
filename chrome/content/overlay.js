var humanstxt = {
  init: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("humanstxt-strings");
    var appcontent = document.getElementById("appcontent");
    
    appcontent.addEventListener("pageshow", humanstxt.onPageLoad, true);
    
    var container = gBrowser.tabContainer;  
    container.addEventListener("TabSelect", humanstxt.onPageLoad, false);  
        
  },

  onPageLoad: function(aEvent) {
    var humanstxtButton = document.getElementById("humanstxt-button");

    var uri = content.document.location;
    
    var req = new XMLHttpRequest();
    req.open('GET', uri + "/humans.txt", false);

    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200 && req.getResponseHeader("Content-Type") == "text/plain") {
          htxt = req.responseText;
      }
    };
    req.send(null);

    if (htxt.length > 0) {
      humanstxtButton.collapsed = false;
      humanstxtButton.setAttribute("tooltiptext", htxt);
    } else {
      humanstxtButton.collapsed = true;
    }

  },

  onHumantxtClick: function(event) {
    event.stopPropagation();
    
    if (event.target.hasAttribute("feed") &&
        event.eventPhase == Event.AT_TARGET &&
        (event.button == 0 || event.button == 1)) {
        FeedHandler.subscribeToFeed(null, event);
    }

  },  
}

window.addEventListener("load", function() { humanstxt.init(); }, false);
