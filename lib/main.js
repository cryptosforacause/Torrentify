var contextMenu = require("sdk/context-menu");
var selection = require("sdk/selection");
var Request = require("sdk/request").Request;
var tabs = require("sdk/tabs");
// var text_entry = require ("sdk/panel").Panel({
//   contentURL: data.url("text-entry.html"),
//   contentScriptFile: data.url("get-text.js")
// });

 var menuItem = contextMenu.Item({
  label: "Find torrent",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  self.postMessage(text);' +
                 '});',
  onMessage: function (text) {
    if (text.length===0) {
      throw ('Text must not be empty');
    }

    var req = Request ({
      url:"https://yify-torrents.com/api/list.json?keywords="+text,

      onComplete: function (response) {
        
        var sriki=response.json["MovieList"][0]["TorrentMagnetUrl"];
        
        // tabs activeTab.attach({
        //   contentScript: contentScriptString
        // });

        tabs.open(sriki);
        console.log(sriki);
      }
    });

    req.get();
  }
});