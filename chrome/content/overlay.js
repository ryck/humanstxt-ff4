function loadHumans(url, success, error) {

  var u = parseUri(url),
      humansLink = u.protocol + "://" + u.host + "/humans.txt";

  var ajax = $.ajax({ type: "GET", url: humansLink })
    .success(function(text, status, xhr) { 
      console.log("xhr", xhr.getResponseHeader("Content-Type"));
      return (/text\/plain/.test(xhr.getResponseHeader("Content-Type"))) ?
        success(text, humansLink) : error(url, humansLink);
    })
    .error(function() { error(url, humansLink); })
    
}

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
    var src = gBrowser.selectedBrowser.currentURI;

    humantxtButton.removeAttribute("source");

    var u = parseUri(src), site = u.protocol + "://" + u.host;
    if (u.port && u.port.strlen) site += ":" + u.port      

    if (loadHumans(site)) {
      humanstxtButton.collapsed = false;
      if (site.length == 1) {
        feedButton.setAttribute("source", src);
      }        
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
