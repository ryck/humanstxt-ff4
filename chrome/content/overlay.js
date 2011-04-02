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
    
    var uri = window.content.location.href;
    
    var u = parseUri(uri), site = u.protocol + "://" + u.host;
    if (u.port && u.port.strlen) site += ":" + u.port  
    
    htxt = null;
    var req = new XMLHttpRequest();
    req.open('GET', site + "/humans.txt", true);

    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        htxt = req.responseText;
        rps = req.getResponseHeader("Content-Type");
        if (htxt.length > 0 && rps.match("text/plain")) {
          humanstxtButton.collapsed = false;
          humanstxtButton.setAttribute("tooltiptext", htxt);
        }         
      } else {
        humanstxtButton.collapsed = true;
      }
      
    };
    req.send(null);

  },

  onHumantxtClick: function(event) {
    event.stopPropagation();

    var uri = window.content.location.href;
    
    var u = parseUri(uri), site = u.protocol + "://" + u.host;
    if (u.port && u.port.strlen) site += ":" + u.port  
        
    var site = uri + "/humans.txt";
    var tBrowser = top.document.getElementById("content");
    var tab = tBrowser.addTab(site);
    // use this line to focus the new tab, otherwise it will open in background
    tBrowser.selectedTab = tab;


  },  
}

window.addEventListener("load", function() { humanstxt.init(); }, false);
