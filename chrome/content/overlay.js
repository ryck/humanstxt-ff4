// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
  var o   = parseUri.options,
    m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    uri = {},
    i   = 14;

  while (i--) uri[o.key[i]] = m[i] || "";

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });

  return uri;
};

parseUri.options = {
  strictMode: false,
  key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
  q:   {
    name:   "queryKey",
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};


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
    humanstxtButton.collapsed = true;
    humanstxtButton.removeAttribute("tooltiptext");
    
    var uri = content.document.location;
    
    var u = parseUri(uri), site = u.protocol + "://" + u.host;
    if (u.port && u.port.strlen) site += ":" + u.port  
    
    htxt = null;
    var req = new XMLHttpRequest();
    req.open('GET', site + "/humans.txt", false);

    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
          htxt = req.responseText;
          rps = req.getResponseHeader("Content-Type");
      }
      
    };
    req.send(null);

    if (htxt.length > 0 && rps.match("text/plain")) {
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
