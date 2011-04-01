humanstxt.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ humanstxt.showFirefoxContextMenu(e); }, false);
};

humanstxt.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-humanstxt").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { humanstxt.onFirefoxLoad(); }, false);
