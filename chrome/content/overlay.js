/*
# ***** BEGIN LICENSE BLOCK *****
# Version: MPL 1.1/GPL 2.0/LGPL 2.1
#
# The contents of this file are subject to the Mozilla Public License Version
# 1.1 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
# http://www.mozilla.org/MPL/
#
# Software distributed under the License is distributed on an "AS IS" basis,
# WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
# for the specific language governing rights and limitations under the
# License.
#
# The Original Code is Mozilla Communicator client code, released
# March 31, 1998.
#
# The Initial Developer of the Original Code is
# Netscape Communications Corporation.
# Portions created by the Initial Developer are Copyright (C) 1998-2000
# the Initial Developer. All Rights Reserved.
#
# Contributor(s):
#         Mozilla Contributors
#         Ricardo Gonzalez <info@ryck.me>
#
# Alternatively, the contents of this file may be used under the terms of
# either the GNU General Public License Version 2 or later (the "GPL"), or
# the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
# in which case the provisions of the GPL or the LGPL are applicable instead
# of those above. If you wish to allow use of your version of this file only
# under the terms of either the GPL or the LGPL, and not to allow others to
# use your version of this file under the terms of the MPL, indicate your
# decision by deleting the provisions above and replace them with the notice
# and other provisions required by the GPL or the LGPL. If you do not delete
# the provisions above, a recipient may use your version of this file under
# the terms of any one of the MPL, the GPL or the LGPL.
#
# ***** END LICENSE BLOCK *****
*/


var humanstxt = {

  // parseUri 1.2.2
  // (c) Steven Levithan <stevenlevithan.com>
  // MIT License

  parseUri: function (str) {
  
    this.options = {
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
  
    var o   = this.options,
      m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
      uri = {},
      i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
      if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
  },

  init: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("humanstxt-strings");
    var appcontent = document.getElementById("appcontent");
    
    appcontent.addEventListener("pageshow", humanstxt.onPageLoad, true);
    
    var container = gBrowser.tabContainer;  
    container.addEventListener("TabSelect", humanstxt.onPageSelect, false);  
        
  },

  onPageLoad: function(aEvent) {
    var humanstxtButton = document.getElementById("humanstxt-button");
    
    var uri = window.content.location.href;
    
    var u = humanstxt.parseUri(uri), site = u.protocol + "://" + u.host;
    if (u.port && u.port.strlen) site += ":" + u.port  
    
    var htxt = null;
    var req = new XMLHttpRequest();
    req.open('GET', site + "/humans.txt", true);

    humanstxtButton.collapsed = true;
    
    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        htxt = req.responseText;
        document.setAttribute("req-humanstxt", req.responseText);
        var rps = req.getResponseHeader("Content-Type");
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

  onPageSelect: function(aEvent) {
    var humanstxtButton = document.getElementById("humanstxt-button");
    
    humanstxtButton.collapsed = true;

    if (document.getAttribute("humanstxt")) {
      humanstxtButton.collapsed = false;
      humanstxtButton.setAttribute("tooltiptext", document.getAttribute("req-humanstxt"));   
    } else {
      humanstxtButton.collapsed = true;
    }
      
    req.send(null);

  },

  onHumantxtClick: function(event) {
    event.stopPropagation();

    var uri = window.content.location.href;
    
    var u = humanstxt.parseUri(uri), site = u.protocol + "://" + u.host;
    if (u.port && u.port.strlen) site += ":" + u.port  
        
    var site = site + "/humans.txt";
    var tBrowser = top.document.getElementById("content");
    var tab = tBrowser.addTab(site);
    // use this line to focus the new tab, otherwise it will open in background
    tBrowser.selectedTab = tab;


  },  
}

window.addEventListener("load", function() { humanstxt.init(); }, false);
